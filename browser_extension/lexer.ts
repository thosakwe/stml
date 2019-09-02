export enum StmlTokenType {
  STML_LPAREN = 0,
  STML_RPAREN = 1,
  STML_ID = 2,
  STML_STRING = 3
};

export interface StmlToken {
  type: StmlTokenType;
  text: string;
  line: number;
  column: number;
  value?: any;
};

export interface StmlLexResult {
  tokens: StmlToken[];
};

export interface StmlLexOptions {
  strict: boolean;
};

export const defaultStmlLexOptions: StmlLexOptions = {
  strict : false
};

export function stml_lex(text: string, options: StmlLexOptions = defaultStmlLexOptions): StmlLexResult {
  const tokens : StmlToken[] = [];
  var errors = [];
  let line = 1, column = 1;
  while (text.length) {
    // Track errors...
    var errorBuf = "";

    function flush_errors() {
      if (errorBuf.length) {
        const error = {
          message: 'Unexpected text: "' + errorBuf + '"',
          line: line,
          column: column
        };
        if (options.strict) {
          throw new Error(error.message);
        } else {
          errors.push(error);
        }
        column += errorBuf.length;
        errorBuf = "";
      }
    }

    function emit(type: StmlTokenType, str: string, value?: any) {
      flush_errors();
      tokens.push({
        type: type,
        value: value,
        text: str,
        line: line,
        column: column
      });
      column += str.length;
    }

    // Skip whitespace, comments...
    var wsMatch = text.match(/[ \n\r\t]+/);
    if (wsMatch) {
      text = text.substring(wsMatch[0].length);
      continue;
    }
    var commentMatch = text.match(/;[^\n]*/);
    if (commentMatch) {
      text = text.substring(commentMatch[0].length);
      continue;
    }

    // Scan actual tokens.
    if (text[0] === '(') {
      emit(StmlTokenType.STML_LPAREN, '(');
      text = text.substring(1);
    } else if (text[0] === ')') {
      emit(StmlTokenType.STML_RPAREN, ')');
      text = text.substring(1);
    } else {
      var idMatch = text.match(/[A-Za-z]+(-[A-Za-z]+)?/);
      if (idMatch) {
        var id = idMatch[0];
        emit(StmlTokenType.STML_ID, id, id);
      } else if (text[0] === '"') {
        
      } else {
        errorBuf += text[0];
        text = text.substring(1);
      }
    }
  }
  return {tokens}
}
