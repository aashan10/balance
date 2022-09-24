import { isDigit, isWhiteSpace } from "../helper";
import SyntaxKind from "./syntax-kind";
import SyntaxToken from "./syntax-token";

export default class Lexer {
    protected position: number = 0;
    public errorStack: Array<string> = [];

    constructor(protected text: string) {
        this.text = text;
    }

    public current(): string {
        if (this.position >= this.text.length) {
            return '\0';
        }

        return this.text[this.position];
    }

    public next() {
        this.position++;
    }

    public nextToken(): SyntaxToken {

        if (this.position >= this.text.length) {
            return new SyntaxToken(SyntaxKind.EndOfFileToken, this.position, '\0', null);
        }

        if (isDigit(this.current())) {
            const start = this.position;
            while(isDigit(this.current())) {
                this.next();
            }
            const text = this.text.substring(start, this.position);
            const value = parseInt(text);
            if (isNaN(value) || !isFinite(value)) {
                this.errorStack.push(`The number ${text} is not a valid number at ${this.position}!`);
            }
            return new SyntaxToken(SyntaxKind.NumberKind, start, text, value);
        }

        if (isWhiteSpace(this.current())) {
            const start = this.position;
            while(isWhiteSpace(this.current())) {
                this.next();
            }
            const text = this.text.substring(start, this.position);
            return new SyntaxToken(SyntaxKind.WhiteSpaceKind, start, text, text);
        }

        if (this.current() == '+') {    
            const token = new SyntaxToken(SyntaxKind.PlusToken, this.position, '+', null);
            this.next();
            return token;
        } else if (this.current() == '-') {
            const token = new SyntaxToken(SyntaxKind.MinusToken, this.position, '-', null);
            this.next();
            return token;
        } else if (this.current() == '*') {
            const token = new SyntaxToken(SyntaxKind.MultiplyToken, this.position, '*', null);
            this.next();
            return token;
        } else if (this.current() == '/') {
            const token = new SyntaxToken(SyntaxKind.DivideToken, this.position, '/', null);
            this.next();
            return token;
        } else if (this.current() == '(') {
            const token = new SyntaxToken(SyntaxKind.BracketOpenToken, this.position, '(', null);
            this.next();
            return token;
        } else if (this.current() == ')') {
            const token = new SyntaxToken(SyntaxKind.BracketCloseToken, this.position, ')', null);
            this.next();
            return token;
        }
        this.errorStack.push(`Syntax error: Unrecognized identifier '${this.current()}' at position: ${this.position}`);
        this.next();
        return new SyntaxToken(SyntaxKind.BadToken, this.position - 1, this.text.substring(this.position - 1, 1), null);
    }
}