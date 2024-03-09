/**
 * Letter parser: recursive descent implementation
 */
const { Tokenizer } = require('./Tokenizer');

class Parser {
    /**
     * Initialize the parser.
     */

    constructor() {
        this.string = '';
        this._tokenizer = new Tokenizer();
    }
    /**
     * Parses a string into an AST
     */
    parse(string) {
        this._string = string;
        this._tokenizer.init(string);

        // Starts the tokenizer to get the first token which is the lookahead.
        // The lookahed ia used for predictive parsing.
        this._lookahead = this._tokenizer.getNextToken();

        // Parse recursively starting from Program()
        return this.Program();
    }
    /**
     * Main entry point.
     * 
     * Program
     *  : Literal
     *  ;
     */
    Program() {
        return {
            type: 'Program',
            body: this.Literal(),
        }
    }

    /**
     * Literal
     *  : NumericLiteral
     *  | StringLiteral
     *  ;
     */

    Literal() {
        switch (this._lookahead.type) {
            case 'NUMBER':
                return this.NumericLiteral();
            case 'STRING':
                return this.StringLiteral();
        }
        throw new SyntaxError(`Literal: unexpected literal production`);
    }

    /**
     * StringLiteral
     *  : STRING
     *  ;
     */
    StringLiteral() {
        const token = this._eat('STRING');
        return {
            type: 'StringLiteral',
            value: token.value.slice(1, -1),
        };
    }
    /**
     * NumericLiteral
     *  : NUMBER
     *  ;
     */
    NumericLiteral() {
        const token = this._eat('NUMBER');
        return {
            type: 'NumericLiteral',
            value: Number(token.value),
        };
    }

    /**
     * Expects a token of a given type
     */
    _eat(tokenType) {
        const token = this._lookahead;

        if (token == null) {
            throw new SyntaxError(
                `Unexpected end of input, expected: "${tokenType}"`,
            );
        }

        if (token.type !== tokenType) {
            throw new SyntaxError(
                `Unexpected token: "${token.value}", expected: "${tokenType}"`,
            );
        }

        // Advance to next token
        this._lookahead = this._tokenizer.getNextToken();

        return token;
    }
}

module.exports = {
    Parser,
};