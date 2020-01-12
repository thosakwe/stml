# Syntax
STML syntax consists solely of s-expressions, which can be parsed
very quickly.

## Tokens
The following is a `flex` unit that will lex all
valid syntax.

```flex
%x STRING

NUMBER -?[0-9]+(\.[0-9]+)?
ID [A-Za-z][A-Za-z0-9]*(-([A-Za-z][A-Za-z0-9]*))*
WHITESPACE [ \n\r\t]+
COMMENT ;[^\n]*

HEX \\x[A-Fa-f0-9][A-Fa-f0-9]
UNICODE \\u\{[A-Fa-f0-9]+\}

%%

WHITESPACE ;
COMMENT ;

'(' return LPAREN;
')' return RPAREN;
'?' return QUESTION;
'"' { yy_push_state(STRING); return DOUBLE_QUOTE; }
{NUMBER} return NUMBER;
{ID} return IDENTIFIER;

<STRING>\\" return ESCAPED_QUOTE;
<STRING>{HEX} return ESCAPED_HEX;
<STRING>{UNICODE} return ESCAPED_UNICODE;
<STRING>'"' { yy_pop_state(); return DOUBLE_QUOTE; }
<STRING>.+ return PLAIN_TEXT;
```

## Abstract Syntax Tree
STML is first parsed into an abstract syntax tree,
and is then "interpreted" by being rendered into
some (typically on-screen) display. Documents that
are syntactically valid may not be semantically
valid. Creators of STML documents are advised to
run validation tools before publishing content.

The following is a `bison` grammar that will parse
all valid syntax.

```yacc
compilation-unit: expression_list;

expression:
  IDENTIFIER
  | NUMBER
  | DOUBLE_QUOTE string_part_list DOUBLE_QUOTE
  | expression QUESTION
  | LPAREN expression RPAREN
  | LPAREN nonempty_expression_list RPAREN;

string_part_list:
  %empty
  | string_part_list string_part;

string_part:
  ESCAPED_QUOTE
  | ESCAPED_HEX
  | ESCAPED_UNICODE
  | PLAIN_TEXT;

expression_list:
  %empty
  | expression_list expression;

nonempty_expression_list:
  expression
  | expression_list expression;
```

## Structure
In practice, a semantically valid file will look
something like the following:

```lisp
; This is a comment!
(version "0.0.0")
(document
  (title "Hello, STML!")
  (heading "This is a simple page.")
  (link "Github Page" "https://github.com/thosakwe/stml"))
```

The root node is the
[Compilation Unit](#compilation-unit); start there.