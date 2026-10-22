---
title: "Kestrel: Building Interpreters from First Principles"
lang: en
class: chapter
---

# Parsing Kestrel Programs

<p class="chapter-lead">The scanner of Chapter 3 reduced a file of characters
to a flat stream of tokens. A flat stream is not yet a program: nothing in it
records that the multiplication in <code>a + b * c</code> binds tighter than
the addition, that the <code>else</code> of a nested conditional belongs to
the inner <code>if</code>, or that a closing brace was never written at all.
Recovering that structure — and complaining precisely when it cannot be
recovered — is the work of the parser, and the work of this chapter.</p>

<nav class="chapter-toc">

- <a href="#sec-trees" data-ref="sec"></a>
- <a href="#sec-descent" data-ref="sec"></a>
- <a href="#sec-climbing" data-ref="sec"></a>
- <a href="#sec-statements" data-ref="sec"></a>
- <a href="#sec-errors" data-ref="sec"></a>
- <a href="#sec-guarantees" data-ref="sec"></a>

</nav>

## From Tokens to Trees {#sec-trees}

Kestrel is the small language we have been building since Chapter 1, and by
now its front end has two halves. The scanner reads characters and produces
tokens; the parser reads tokens and produces a tree. The interface between
them is deliberately thin, and it is worth restating before we write a single
procedure.

<aside class="sidenote" id="sn-1">

**def. token**

A kind, the text it was cut from, and a span. Whitespace and comments never
reach the parser.

</aside>

Each token carries three things. Its _kind_ is drawn from a small fixed
set and decides the shape of the program. Its text is needed only for
identifiers and literals. Its span — the byte range that produced it —
is needed only when something goes wrong,<a href="#sn-1" data-ref="sidenote"></a>&nbsp;which is exactly
when it matters most.

<div class="code">
<div class="lineno">1<br>2<br>3<br>4<br>5<br>6<br>7<br>8<br>9<br>10<br>11</div>

```rust
type Span  = { file: FileId, lo: u32, hi: u32 }
type Token = { kind: Kind, text: Str, span: Span }

fn peek() -> Token           // the lookahead; not consumed
fn shift() -> Token          // consume it and return it
fn at(k: Kind) -> Bool { peek().kind == k }

fn expect(k: Kind) -> Token {
    if at(k) { return shift(); }
    error(peek().span, "expected " + name(k));
}
```

</div>

Four operations, and no others: the parser may look at the next token, take
it, ask whether it has a given kind, and demand that it have a given kind.
Every procedure in this chapter is written over that interface, which means
every procedure in this chapter can be read without knowing anything about
files, encodings, or line breaks.

<aside class="sidenote" id="sn-2">

**note. eof**

The scanner appends one `eof` token and no procedure ever shifts it, so a
loop that stops there always stops.

</aside>

The kinds themselves are few.<a href="#sn-2" data-ref="sidenote"></a>&nbsp;Kestrel has ten keywords, three
kinds of literal, a handful of operators, six punctuation marks, and one
sentinel that the scanner appends to every file.

<div class="code">

```text
keywords     let fun if then else while do return true false
identifiers  ident           e.g. area, x1, to_celsius
literals     int float str   e.g. 42, 0.5, "kestrel"
operators    + - * / % < <= > >= == != = ^ and or not
punctuation  ( ) { } , ; :
end of file  eof             appended once by the scanner
```

</div>

<aside class="sidenote" id="sn-3">

**cf. §2.3**

Terminals are quoted, nonterminals are not. The star and the question mark
expand into ordinary productions.

</aside>

We describe the shape of a program with the grammar notation of §2.3:
nonterminals are set in lower case, terminals in quotation marks, a star
marks a part that may repeat, a question mark a part that may be
omitted, and a bar separates alternatives.<a href="#sn-3" data-ref="sidenote"></a>

<div class="code">

```text
program -> decl* eof
decl    -> "let" ident "=" expr ";"
         | "fun" ident "(" params ")" block
         | stmt
stmt    -> "if" expr "then" stmt ("else" stmt)?
         | "while" expr "do" stmt
         | "return" expr? ";"
         | block
         | expr ";"
block   -> "{" decl* "}"
params  -> (ident ("," ident)*)?
```

</div>

<aside class="sidenote" id="sn-4">

**def. abstract syntax**

A parse tree records every symbol; an abstract syntax tree records the
decisions. Punctuation is read, not remembered.

</aside>

The tree we build is not a transcript of the derivation. A parse tree has
one node for every symbol used, including every comma and every closing
brace; an abstract syntax tree keeps only what the phases after us will ask
about.<a href="#sn-4" data-ref="sidenote"></a>&nbsp;Nothing in an `Ast::Call` node records that the arguments
were written between parentheses, because no later phase has any use for
that fact.

Formally, the language of a grammar is the set of terminal strings derivable
from its start symbol,

$$
L(G) = \{\, w \in T^{*} \mid S \Rightarrow^{*} w \,\}
$$

<aside class="sidenote" id="sn-5">

**note**

Membership is not the interesting question. No user wants to be told only
that a program is in $L(G)$.

</aside>

and a parser is a decision procedure for membership in $L(G)$. That is the
smaller half of its job. The larger half is to return the derivation it
found, to say something useful when there is none,<a href="#sn-5" data-ref="sidenote"></a>&nbsp;and to do
both in time proportional to the length of the input.

We can now state the four obligations that the rest of the chapter
discharges. The parser must accept exactly the token strings the grammar
derives; it must build a tree whose shape agrees with the precedence and
associativity Kestrel promises; it must report the first thing it cannot
explain, at the position where it occurred; and it must terminate on every
input, including inputs that are not programs at all.

## Recursive Descent over Kestrel Grammars {#sec-descent}

Recursive descent is the workhorse of our front end. Given a grammar
that is suitably non-left-recursive and factored, we write a mutually
recursive family of procedures, one per nonterminal, each of which
recognizes a prefix of the token stream and returns an abstract syntax
tree (AST) node. The procedures communicate only through the stream
of tokens and the call stack.

<aside class="sidenote" id="sn-6">

**def. lookahead**

The next token, inspected but not consumed. `peek()` returns it,
`shift()` consumes it.

</aside>

The key operation is a single-token lookahead<a href="#sn-6" data-ref="sidenote"></a>: at any point we peek
at the next token to decide which production to use. If the token does
not fit any alternative, we report an error and attempt recovery (see <a href="#sec-errors" data-ref="sec"></a>).
Because Kestrel grammars are LL(1) after transformation, this one-token
discipline is sufficient.

A typical nonterminal procedure follows a simple pattern: inspect the
lookahead, choose a production, consume the leading symbols, and call
the appropriate subroutines. Terminals are matched by exact token kind;
nonterminals are handled by recursive calls.

<aside class="sidenote" id="sn-7">

**cf. §2.7**

On removing left recursion and factoring common prefixes: the language
is preserved, the parse tree shape is not.

</aside>

The translation is mechanical enough to be tabulated, and the table is worth
memorizing.<a href="#sn-7" data-ref="sidenote"></a>&nbsp;Every construct of the notation of §2.3 becomes one
construct of the procedure, and the correspondence is the whole method.

<div class="code">

```text
grammar construct       parser construct
--------------------    -------------------------------------
terminal "then"         expect(Then)
nonterminal expr        parse_expr()
alternation a | b       dispatch on the lookahead
repetition a*           while the lookahead is in FIRST(a)
option a?               if the lookahead is in FIRST(a)
```

</div>

<aside class="sidenote" id="sn-8">

**def. left fold**

`a + b + c` must group as `(a + b) + c`. The loop overwrites `node` at every
turn, so the tree grows down to the left.

</aside>

Consider expressions. The grammar eliminates left recursion in the usual
way, yielding a loop in the translator for left-associative operators.<a href="#sn-8" data-ref="sidenote"></a>

<div class="code">
<div class="lineno">1<br>2<br>3<br>4<br>5<br>6<br>7<br>8<br>9</div>

```rust
fn parse_expr() -> Ast {
    let mut node = parse_term();
    while peek().kind == Plus {      // loop for left associativity
        shift();                     // consume '+'
        let rhs = parse_term();      // parse the next term
        node = Ast::Add(node, rhs);  // build the left fold
    }
    return node;
}
```

</div>

<aside class="sidenote" id="sn-9">

**note**

Each call frame is one nonterminal occurrence, so correctness follows
by induction on the derivation.

</aside>

Inside `parse_term`, we dispatch on the lookahead to recognize factors.
The match is exhaustive over the FIRST set of factor.<a href="#sn-9" data-ref="sidenote"></a>

<div class="code">
<div class="lineno">1<br>2<br>3<br>4<br>5<br>6<br>7<br>8</div>

```rust
fn parse_factor() -> Ast {
    match peek().kind with
    | Ident  -> shift()
    | LParen -> shift(); let n = parse_expr(); expect(RParen); return n
    | IntLit -> shift()
    | Minus  -> shift(); Ast::Neg(parse_factor())
    | _      -> error("unexpected token in factor")
}
```

</div>

<aside class="sidenote" id="sn-10">

**def. LL(1)**

One token of lookahead must always decide the production. Left recursion and
common prefixes are the usual obstacles.

</aside>

Dispatching on one token is only sound when the alternatives can be told
apart by one token. For a nonterminal $A$ with alternatives
$A \to \alpha \mid \beta$, the LL(1) condition demands<a href="#sn-10" data-ref="sidenote"></a>

$$
\mathrm{FIRST}(\alpha) \cap \mathrm{FIRST}(\beta) = \varnothing
$$

and, when $\beta$ can vanish, that $\mathrm{FIRST}(\alpha)$ avoid $\mathrm{FOLLOW}(A)$.

Termination is equally easy to see, and worth seeing once. Each iteration of
a loop such as the one in `parse_expr` begins with a `shift`, so the stream
strictly shortens; each recursive call is made either after a `shift` or on a
strictly shorter suffix. The parser therefore performs at most one shift per
token and stops.

> A parser is a proof that the grammar means something.

The output of these procedures is an AST that faithfully mirrors the
structure imposed by the grammar. Subsequent phases — name resolution,
type checking, optimization, and code generation — consume this tree.
Correctness of the parser is thus foundational: any mistake here
invalidates everything that follows.

<div class="code">
<div class="lineno">1<br>2<br>3<br>4<br>5<br>6</div>

```rust
fn evaluate(node: Ast) -> Val {
    match node with
    | Add(l, r) -> evaluate(l) + evaluate(r)
    | Neg(x)    -> -evaluate(x)
    | Lit(n)    -> n
}
```

</div>

We will refine error recovery, extend the grammar for statements and
types, and show how small deviations from LL(1) can be handled without
abandoning the recursive descent style.

## Precedence Climbing for Binary Operators {#sec-climbing}

<aside class="sidenote" id="sn-11">

**note. cost**

A ladder of $k$ levels costs $k$ calls for every leaf, and $k$ procedures
that differ only in a token.

</aside>

The grammar of <a href="#sec-descent" data-ref="sec"></a>&nbsp;encodes precedence in its shape: `expr` calls `term`,
`term` calls `factor`, and the nesting of the nonterminals is the nesting of
the operators. The technique is sound and it scales badly. Kestrel has seven
levels of binary operator, so the ladder would need seven nearly identical
procedures, and every atom — every bare `1` — would descend all seven of
them before being recognized.<a href="#sn-11" data-ref="sidenote"></a>

Precedence climbing collapses the ladder into one procedure and a table. Each
binary operator is given a level, its _binding power_, and an associativity;
the procedure takes the lowest level it is willing to accept and refuses to
climb below it.

<div class="code">

```text
level  operators           associativity
  1    or                  left
  2    and                 left
  3    == !=               left
  4    < <= > >=           left
  5    + -                 left
  6    * / %               left
  7    ^                   right
```

</div>

<aside class="sidenote" id="sn-12">

**def. binding power**

The level at which an operator captures its operands. Higher levels bind
tighter and are parsed deeper in the tree.

</aside>

The loop reads an operand, then repeatedly checks whether the lookahead is a
binary operator strong enough to continue. If it is, the operator is
consumed and the right operand is parsed with a raised threshold — raised by
one for a left-associative operator, left alone for a right-associative
one.<a href="#sn-12" data-ref="sidenote"></a>

<div class="code">
<div class="lineno">1<br>2<br>3<br>4<br>5<br>6<br>7<br>8<br>9<br>10<br>11<br>12<br>13<br>14</div>

```rust
fn parse_binary(min: Level) -> Ast {
    let mut lhs = parse_unary();
    loop {
        let op = peek().kind;
        if !is_binary(op) { break; }
        let lv = level(op);
        if lv < min { break; }
        shift();
        let next = if right_assoc(op) { lv } else { lv + 1 };
        let rhs = parse_binary(next);
        lhs = Ast::Bin(op, lhs, rhs);
    }
    return lhs;
}
```

</div>

<aside class="sidenote" id="sn-13">

**cf.&nbsp;<a href="#sec-descent" data-ref="sec"></a>**

The ladder and the table accept the same language and build the same trees.
Only the number of calls differs.

</aside>

That single difference of one is the whole of associativity. With the
threshold raised, the recursive call for `a - b - c` refuses the second minus
and returns `b` alone, so the outer loop folds it to the left; with the
threshold left alone, the recursive call for `a ^ b ^ c` accepts the second
caret and swallows the rest.<a href="#sn-13" data-ref="sidenote"></a>

<div class="code">

```text
a - b - c                    a ^ b ^ c

      sub                          pow
     /   \                        /   \
   sub    c                      a    pow
  /   \                              /   \
 a     b                            b     c
```

</div>

Prefix and postfix operators sit outside the table. A prefix operator is
recognized before the operand, so it needs no threshold at all; a postfix
operator binds tighter than everything and is best handled by a small loop of
its own, which also gives calls and field accesses their natural left-to-right
reading.

<div class="code">
<div class="lineno">1<br>2<br>3<br>4<br>5<br>6<br>7<br>8<br>9<br>10<br>11<br>12<br>13<br>14<br>15</div>

```rust
fn parse_unary() -> Ast {
    match peek().kind with
    | Minus -> shift(); Ast::Neg(parse_unary())
    | Not   -> shift(); Ast::Not(parse_unary())
    | _     -> parse_postfix(parse_atom())
}

fn parse_postfix(mut n: Ast) -> Ast {
    loop {
        match peek().kind with
        | LParen -> shift(); n = Ast::Call(n, parse_args())
        | Dot    -> shift(); n = Ast::Field(n, expect(Ident))
        | _      -> return n
    }
}
```

</div>

<aside class="sidenote" id="sn-14">

**warning**

`=` is not an operator in Kestrel. `a = b;` is a statement; `a == b` is an
expression. The kinds differ.

</aside>

Kestrel deliberately keeps assignment out of the table.<a href="#sn-14" data-ref="sidenote"></a>&nbsp;In
languages where assignment is an operator at the lowest level, the expression
`a = b == c` parses without complaint and means something the author almost
never intended. Making assignment a statement costs one production and
removes an entire class of silent mistakes.

## Statements, Blocks, and the Dangling Else {#sec-statements}

Statements are parsed by the same method, and the dispatch is even simpler,
because every statement form of Kestrel begins with a distinct keyword or
with the start of an expression. Only the last alternative needs the FIRST
set: anything that can begin an expression begins an expression statement.

<div class="code">
<div class="lineno">1<br>2<br>3<br>4<br>5<br>6<br>7<br>8<br>9<br>10</div>

```rust
fn parse_stmt() -> Ast {
    match peek().kind with
    | If     -> parse_if()
    | While  -> shift(); let c = parse_expr();
                expect(Do); Ast::While(c, parse_stmt())
    | Return -> shift(); let e = parse_opt_expr();
                expect(Semi); Ast::Return(e)
    | LBrace -> parse_block()
    | _      -> let e = parse_expr(); expect(Semi); Ast::Expr(e)
}
```

</div>

<aside class="sidenote" id="sn-15">

**note. ambiguity**

A grammar is ambiguous when a sentence has two derivations. The parser must
still choose one tree, and say which.

</aside>

One statement form is not LL(1), and no amount of factoring will make it so.
The conditional has an optional trailing arm, and when two conditionals are
nested the grammar allows the arm to be attached to either of them. This is
the _dangling else_, and it is an ambiguity of the grammar rather than a
defect of the method.<a href="#sn-15" data-ref="sidenote"></a>

<div class="code">

```text
if a then if b then s1 else s2

(1) if a { if b { s1 } else { s2 } }      <- chosen
(2) if a { if b { s1 } } else { s2 }      <- rejected
```

</div>

<aside class="sidenote" id="sn-16">

**cf. §2.9**

Splitting the nonterminal into matched and unmatched statements removes it
too. Same language, twice the grammar.

</aside>

Recursive descent resolves the ambiguity by the order in which the code is
written. The procedure for a conditional parses its `then` arm and then, if
the very next token is `else`, takes it immediately. The `else` is therefore
claimed by the innermost call that is still looking for one — reading (1)
above — and the outer call, resuming later, never sees it.<a href="#sn-16" data-ref="sidenote"></a>

<div class="code">
<div class="lineno">1<br>2<br>3<br>4<br>5<br>6<br>7<br>8<br>9<br>10<br>11</div>

```rust
fn parse_if() -> Ast {
    expect(If);
    let cond = parse_expr();
    expect(Then);
    let then_arm = parse_stmt();
    if at(Else) {                 // greedy: bind to the nearest if
        shift();
        return Ast::If(cond, then_arm, Some(parse_stmt()));
    }
    return Ast::If(cond, then_arm, None);
}
```

</div>

<aside class="sidenote" id="sn-17">

**warning**

Every loop over `decl*` needs two exits: the terminator and `eof`. The second
keeps a truncated file from hanging.

</aside>

Blocks are the other place where a loop meets a terminator. The body of a
block is a possibly empty sequence of declarations, and the sequence ends at
the closing brace. It must also end at `eof`, or a file whose final brace was
forgotten would send the parser past the end of the token stream.<a href="#sn-17" data-ref="sidenote"></a>

<div class="code">
<div class="lineno">1<br>2<br>3<br>4<br>5<br>6<br>7<br>8<br>9</div>

```rust
fn parse_block() -> Ast {
    expect(LBrace);
    let mut items = [];
    while !at(RBrace) && !at(Eof) {
        items.push(parse_decl());
    }
    expect(RBrace);
    return Ast::Block(items);
}
```

</div>

<aside class="sidenote" id="sn-18">

**note**

Read the tree against the source: the `else` arm hangs from the conditional
that is still open.

</aside>

Collecting the pieces, here is a complete Kestrel program of five lines and
the tree the procedures of this chapter build from it.<a href="#sn-18" data-ref="sidenote"></a>&nbsp;Every node
is a decision; every comma, brace, and semicolon has been spent and
discarded.

<div class="code">

```text
fun min(a, b) {
  if a < b then return a; else return b;
}

let m = min(3, 4);
```

</div>

<div class="code">

```text
program
 |- fun min (a, b)
 |   `- block
 |       `- if
 |           |- cond: bin "<" (var a) (var b)
 |           |- then: return (var a)
 |           `- else: return (var b)
 `- let m = call min (int 3) (int 4)
```

</div>

## Detecting and Recovering from Errors {#sec-errors}

A parser that stops at the first error is easy to write and unpleasant to
use. A parser that continues without discipline is worse: it reports the one
real mistake and then twenty consequences of its own confusion. The aim of
this section is a parser that reports the first error faithfully and has a
fair chance of reporting the second.

<aside class="sidenote" id="sn-19">

**def. panic mode**

Report once, then discard tokens until one could plausibly begin the next
construct. Crude, and hard to beat.

</aside>

The standard method is _panic mode_.<a href="#sn-19" data-ref="sidenote"></a>&nbsp;When a procedure cannot
continue, it reports what it expected, and then the parser discards tokens
until it reaches one belonging to a chosen set of synchronizing tokens. The
set is the parser's guess about where the program becomes trustworthy again.

<div class="code">
<div class="lineno">1<br>2<br>3<br>4<br>5<br>6</div>

```rust
fn recover_to(sync: Set<Kind>) {
    while !at(Eof) {
        if sync.contains(peek().kind) { return; }
        shift();                    // discard and try again
    }
}
```

</div>

<aside class="sidenote" id="sn-20">

**warning**

Recovery must consume. Reporting and retrying at the same token is how a
one-character typo hangs a compiler.

</aside>

Two properties of `recover_to` deserve a name. It always terminates, because
`eof` is never shifted. And it makes progress only if the caller consumes at
least one token after it returns; otherwise the offending token is examined,
rejected, and examined again for ever.<a href="#sn-20" data-ref="sidenote"></a>

For Kestrel the useful synchronizing set is the set of tokens that begin a
declaration or a statement, together with the two tokens that end one. A
semicolon means the previous statement is over; a closing brace means the
enclosing block is over; a keyword such as `let` means a new declaration is
beginning, whatever came before it.

<div class="code">
<div class="lineno">1<br>2<br>3<br>4<br>5<br>6<br>7<br>8<br>9<br>10<br>11<br>12<br>13</div>

```rust
let stmt_sync = { Let, Fun, If, While, Return,
                  LBrace, RBrace, Semi };

fn parse_decl_seq(stop: Kind) -> [Ast] {
    let mut items = [];
    while !at(stop) && !at(Eof) {
        match attempt(parse_decl()) with
        | Ok(d)  -> items.push(d)
        | Err(e) -> report(e); recover_to(stmt_sync);
                    if at(Semi) { shift(); }
    }
    return items;
}
```

</div>

<aside class="sidenote" id="sn-21">

**note. spans**

The span of the missing `then` is not the span of `so`. Point at the token;
name the construct.

</aside>

The message matters more than the recovery. A diagnostic should name what was
expected, show the token that was found, and point at the place in the source
where the expectation arose — which is not always where the offending token
is.<a href="#sn-21" data-ref="sidenote"></a>&nbsp;Listing all forty alternatives that could have appeared is not
a service to anyone.

<div class="code">

```text
min.kes:2:14: error: expected 'then' after the condition of an if
    if a < b so return a;
             ^~ found identifier 'so'
```

</div>

<aside class="sidenote" id="sn-22">

**def. error production**

A rule that matches a known mistake in order to describe it. It turns a
recovery into a diagnosis.

</aside>

Some mistakes are common enough to deserve a production of their own. If a
statement is not followed by a semicolon, we can report the omission at the
end of the previous token and carry on as though it had been written; the
tree is then exactly the tree the author intended, and no synchronization is
needed at all.<a href="#sn-22" data-ref="sidenote"></a>

<div class="code">
<div class="lineno">1<br>2<br>3<br>4</div>

```rust
fn expect_semi() {
    if at(Semi) { shift(); return; }
    report(prev_span().after(), "missing ';' after a statement");
}
```

</div>

> Recovery is a guess; the diagnostic is a promise.

<aside class="sidenote" id="sn-23">

**note**

One syntax error should not become twenty type errors. The node absorbs
questions about a subtree that was never built.

</aside>

When a subtree cannot be built at all, we build an `Ast::Error` node in its
place rather than returning nothing. Later phases treat such a node as well
typed, well scoped, and silent, which lets name resolution run over the rest
of the file and report its own errors — but it also means the parser must
tell the driver that the program is not to be executed.<a href="#sn-23" data-ref="sidenote"></a>

## What the Parser Guarantees {#sec-guarantees}

<aside class="sidenote" id="sn-24">

**note. linearity**

Every token is shifted at most once and recovery only discards, so the parser
runs in linear time.

</aside>

Read as a whole, the procedures of this chapter make four promises. They
accept exactly the token strings the grammar derives, because each procedure
accepts exactly its nonterminal. They build trees whose shape agrees with the
levels of <a href="#sec-climbing" data-ref="sec"></a>, because the threshold is raised for left-associative
operators and not for right-associative ones. They report the first token
they cannot explain, with a span. And they terminate on every input, because
every loop either shifts or exits.<a href="#sn-24" data-ref="sidenote"></a>

<aside class="sidenote" id="sn-25">

**cf. Chapter 5**

Name resolution attaches each identifier to its declaration. Types follow in
Chapter 6, evaluation in Chapter 7.

</aside>

It is as important to be clear about what the parser does not promise. It
does not know whether `min` was declared, whether it takes two arguments, or
whether comparing a string with an integer means anything. A well formed
tree is not a meaningful program, and every question about meaning is
deferred.<a href="#sn-25" data-ref="sidenote"></a>

That deferral is the reason the tree is the interface, and the reason we have
spent a chapter on its shape. Chapter 5 takes the tree of <a href="#sec-statements" data-ref="sec"></a>&nbsp;and asks the
first question about meaning: for each name, which declaration does it refer
to? Every answer given there depends on the parser having placed the nodes
where the grammar said they belong.

## Exercises ##

<div class="exercises">

1. Compute $\mathrm{FIRST}$ for every nonterminal of the grammar in <a href="#sec-trees" data-ref="sec"></a>, and
   verify that the alternatives of `stmt` satisfy the LL(1) condition.
2. Replace `lv + 1` with `lv` in `parse_binary` and draw the tree it then
   builds for `9 - 4 - 2`. What does the evaluator of <a href="#sec-descent" data-ref="sec"></a>&nbsp;return for it?
3. Add the operator `%` to the table of <a href="#sec-climbing" data-ref="sec"></a>&nbsp;at level 6, and say what would
   go wrong if it were placed at level 5 instead.
4. Extend `parse_stmt` with a `for` statement of the form
   `"for" ident "in" expr "do" stmt`, and give the production it parses.
5. Rewrite the conditional productions into matched and unmatched statements
   so that the grammar is unambiguous, and argue that the language is
   unchanged.
6. Exhibit a Kestrel program on which the synchronizing set of <a href="#sec-errors" data-ref="sec"></a>&nbsp;produces
   a second, spurious error, and propose a set that does not.
7. Prove that `parse_decl_seq` terminates on every token stream. Which
   property of `recover_to` does your proof depend on?
8. Write the error production that catches `=` where `==` was meant, and
   explain why it must not simply shift the token and continue.
9. Implement `parse_args`, allowing a trailing comma. How many tokens of
   lookahead does your solution need?
10. The grammar `expr -> expr "+" term | term` is left recursive. Transform
    it by the method of §2.7 and show that the loop in `parse_expr` is the
    translation of the transformed rule.
11. A colleague proposes to drop `then` from the conditional. Which
    procedure of <a href="#sec-statements" data-ref="sec"></a>&nbsp;would have to change, and what would it need to
    decide that it does not decide today?
12. Give a token stream on which the parser of <a href="#sec-descent" data-ref="sec"></a>&nbsp;reports an error whose
    span lies before the first token it could not explain. Is the message
    still useful?

</div>

## Programming Project ##

The exercises above can be done on paper. This one cannot. It asks for a
working parser for Kestrel/1, the subset of the language given by the grammar
of <a href="#sec-trees" data-ref="sec"></a>&nbsp;together with the operator table of <a href="#sec-climbing" data-ref="sec"></a>. Chapter 5 assumes it, and
every chapter after that builds on it, so it is worth writing carefully.

Build it in four stages, and keep each stage running before starting the
next. The order below is the order of the chapter, and each stage has a test
you can write before the code.

<div class="code">

```text
stage 1   the token interface of §4.1, over a scanner stub
stage 2   expressions by precedence climbing (levels 1-7)
stage 3   statements, blocks, and the greedy else of §4.4
stage 4   panic-mode recovery over stmt_sync (§4.5)
```

</div>

Test each stage against programs that must be rejected as well as programs
that must be accepted; a parser that has only ever seen correct input is
half written. Keep the rejected programs in the suite from the first stage
onwards, even while the only answer your parser can give is to stop at the
first offending token.

Hand in three things: a program that reads a file and prints the tree in the
notation of <a href="#sec-statements" data-ref="sec"></a>; a suite of at least twenty inputs, half of which must be
rejected; and a page of your own diagnostics, one for each rejected input,
with a note on the token your parser was looking at when it gave up. The
last of the three is the one to spend time on. A parser is finished when its
error messages are written as carefully as its productions.
