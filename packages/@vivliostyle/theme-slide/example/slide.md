---
title: Slideshow
---

# Brief History of JavaScript {.cover}

## from Wikipedia <https://en.wikipedia.org/wiki/JavaScript>

# ToC {.toc hidden}

1. History
2. Trademark
3. Website client-side usage
4. Other usage
5. Features
6. Syntax
7. Security
8. Development tools
9. Related technologies
10. References
11. Further reading
12. External links

# JavaScript

**JavaScript** (`/ˈdʒɑːvəˌskrɪpt/`),often abbreviated as JS, is a programming language that conforms to the ECMAScript specification.

JavaScript is _high-level_, often just-in-time compiled, and multi-paradigm. It has curly-bracket syntax, dynamic typing, prototype-based object-orientation, and first-class functions.

# Weakly typed

JavaScript is weakly typed, which means certain types are implicitly cast depending on the operation used.

- The binary `+` operator casts both operands to a string unless both operands are numbers. This is because the addition operator doubles as a concatenation operator
- The binary `-` operator always casts both operands to a number
- Both unary operators (+, -) always cast the operand to a number

# -{hidden}

#### JavaScript includes a number of quirks that have been subject to criticism

<div class="center">

| left operand     | operator | right operand     | result                     |
| ---------------- | -------- | ----------------- | -------------------------- |
| [](empty array)  | +        | [](empty array)   | ""(empty string)           |
| [] (empty array) | +        | {} (empty object) | "[object Object]" (string) |
| false (boolean)  | +        | [] (empty array)  | "false" (string)           |
| "123"(string)    | +        | 1 (number)        | "1231" (string)            |
| "123" (string)   | -        | 1 (number)        | 122 (number)               |

</div>

# -{hidden}

```javascript
('b' + 'a' + +'a' + 'a').toLowerCase(); // "banana"
```
