import { isDigit, isWhiteSpace } from "@balance/helper";
import SyntaxKind from "./syntax-kind";
import SyntaxToken from "./syntax-token";

export default class LexicalAnalyser {
    
    protected errors: Array<string> = [];
    protected position: number = 0;

    constructor(protected text: string){
        
    }

    public getErrors = () => this.errors;
    public getPosition = () => this.position;
    
    public current = () : string => {
        if (this.position >= this.text.length) {
            return '\0';
        }

        return this.text[this.position];
    }

    public next = (): void => {this.position++;}

    public nextToken = () => {
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
                this.errors.push(`The number ${text} is not a valid number at ${this.position}!`);
            }
            return new SyntaxToken(SyntaxKind.NumberToken, start, text, value);
        }

        if (isWhiteSpace(this.current())) {
            const start = this.position;
            while(isWhiteSpace(this.current())) {
                this.next();
            }
            const text = this.text.substring(start, this.position);
            return new SyntaxToken(SyntaxKind.WhiteSpaceToken, start, text, text);
        }

        const current = this.current();
        let token: SyntaxToken;
        switch(current){
            case '+':
                token = new SyntaxToken(SyntaxKind.PlusToken, this.position, '+', null);
                this.next();
                return token;
            case '-':
                token = new SyntaxToken(SyntaxKind.MinusToken, this.position, '-', null);
                this.next();
                return token;
            case '*':
                token = new SyntaxToken(SyntaxKind.AsteriskToken, this.position, '*', null);
                this.next();
                return token;
            case '/':
                token = new SyntaxToken(SyntaxKind.SlashToken, this.position, '/', null);
                this.next();
                return token;
            case '(':
                token = new SyntaxToken(SyntaxKind.OpenParenthesisToken, this.position, '(', null);
                this.next();
                return token;
            case ')':
                token = new SyntaxToken(SyntaxKind.CloseParenthesisToken, this.position, ')', null);
                this.next();
                return token;
            case '%':
                token = new SyntaxToken(SyntaxKind.PercentageToken, this.position, '%', null);
                this.next();
                return token;
            default:
                this.errors.push(`Syntax error: Unrecognized identifier '${this.current()}' at position: ${this.position}`);
                this.next();
                return new SyntaxToken(SyntaxKind.BadToken, this.position - 1, this.text.substring(this.position - 1, 1), null);
        }
    }
}