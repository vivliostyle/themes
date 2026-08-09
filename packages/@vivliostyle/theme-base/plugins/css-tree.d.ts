import type { SyntaxDescriptor } from 'css-tree';

// @types/css-tree describes the lexer's matching methods but not the grammar
// dictionaries it is built from, which is what this plugin reads.
declare module 'css-tree' {
  interface Lexer {
    properties: Record<string, SyntaxDescriptor | undefined>;
    types: Record<string, SyntaxDescriptor | undefined>;
  }
}
