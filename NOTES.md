```mermaid
graph TD;
    Printstring-->Tokenizer;
    Tokenizer-->Tokens;
    Tokens-->Parser;
    C-->D;
```

**TOKENIZER** (lexical analysis)
- to take single characters into a recognizable string of tokens.
- Turning into tokens makes it easier to work with.
- Tokens have a type: value [ID: "print"] [String: "Hello"]
- Does not care if program is syntactically valid
- EX:
  > if req   <br>
  // Previous 'if' and 'req' creates the following tokens:
  token_1 = [keyword: "if"] <br>
  token_2 = [op: "req"]
  
**PARSER** (syntactic analysis)
- Actually checks if the syntax is valid!