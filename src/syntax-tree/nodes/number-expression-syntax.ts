import SyntaxKind from "../../lexer/syntax-kind";
import SyntaxToken from "../../lexer/syntax-token";
import ExpressionSyntax from "./expression-syntax";
import syntaxNode from "./syntax-node";

export default class NumberExpressionSyntax extends ExpressionSyntax {
    public getChildren(): syntaxNode[] {
        return [this.token];
    }

    constructor(public token: SyntaxToken) {
        super();
    }

    public getKind(): SyntaxKind {
        return SyntaxKind.NumberExpression;
    }
    
}