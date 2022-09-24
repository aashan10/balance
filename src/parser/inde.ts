import { match } from "assert";
import Lexer from "../lexer";
import SyntaxKind from "../lexer/syntax-kind";
import SyntaxToken from "../lexer/syntax-token";
import SyntaxTree from "../syntax-tree";
import BinaryExpressionSyntax from "../syntax-tree/nodes/binary-expression";
import ExpressionSyntax from "../syntax-tree/nodes/expression-syntax";
import NumberExpressionSyntax from "../syntax-tree/nodes/number-expression-syntax";
import ParenthesizedExpressionSyntax from "../syntax-tree/nodes/parenthesized-expression-syntax";

export default class Parser {
    protected tokens: Array<SyntaxToken> = [];
    protected position: number = 0;
    public errors: Array<string> = [];

    constructor(protected text: string){
        const lexer = new Lexer(text);
        let token: SyntaxToken;
        do { 
            token = lexer.nextToken();
            if (token.kind !== SyntaxKind.BadToken && token.kind !== SyntaxKind.WhiteSpaceKind) {
                this.tokens.push(token);
            }
        } while(token.kind !== SyntaxKind.EndOfFileToken);

        this.errors = [...lexer.errorStack];
    }

    private peek(offset: number): SyntaxToken {
        let index = this.position + offset;

        if (index >= this.tokens.length) {
            return this.tokens[this.tokens.length - 1];
        }
        return this.tokens[index];
    }

    private current(): SyntaxToken {
        return this.peek(0);
    }

    private nextToken(): SyntaxToken {
        const current = this.current();
        this.position ++ ;
        return current;
    }

    public parseTerm(): ExpressionSyntax {
        let left = this.parseFactor();

        while(
            this.current().kind === SyntaxKind.PlusToken || 
            this.current().kind === SyntaxKind.MinusToken
        ) {
            let operatorToken  = this.nextToken();
            let right = this.parseFactor();
            left = new BinaryExpressionSyntax(left, operatorToken, right);
        }

        return left;
    }

    public parseFactor(): ExpressionSyntax {
        let left = this.parsePrimaryExpression();

        while(
            this.current().kind === SyntaxKind.MultiplyToken || 
            this.current().kind === SyntaxKind.DivideToken
        ) {
            let operatorToken  = this.nextToken();
            let right = this.parsePrimaryExpression();
            left = new BinaryExpressionSyntax(left, operatorToken, right);
        }

        return left;
    }

    public parse(): SyntaxTree {
        const expression = this.parseTerm();
        const eofToken = this.matchKind(SyntaxKind.EndOfFileToken);
        return new SyntaxTree(this.errors, expression, eofToken);
    }

    private matchKind(kind: SyntaxKind): SyntaxToken {
        const current = this.current();
        if (current.kind === kind) {
            return this.nextToken();
        }

        this.errors.push(`Error: Unexpected token <${current.kind}> at position: ${current.position}. Expected <${kind}>!`);

        // Fabricating a custom token because the tokens do not match!
        return new SyntaxToken(kind, this.current().position, null, null);
    }

    private parseExpression() {
        return this.parseTerm();
    }

    private parsePrimaryExpression(): ExpressionSyntax {

        if(this.current().kind === SyntaxKind.BracketOpenToken) {
            const left = this.nextToken();
            const expression = this.parseExpression();
            const right = this.matchKind(SyntaxKind.BracketCloseToken);

            return new ParenthesizedExpressionSyntax(left, expression, right);
        }
        const numberToken = this.matchKind(SyntaxKind.NumberKind);
        return new NumberExpressionSyntax(numberToken);
    }

}