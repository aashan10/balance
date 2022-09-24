import SyntaxKind from "../../lexer/syntax-kind";
import SyntaxToken from "../../lexer/syntax-token";
import ExpressionSyntax from "./expression-syntax";
import syntaxNode from "./syntax-node";
// import SyntaxNode from "./syntax-node";

export default class BinaryExpressionSyntax extends ExpressionSyntax {
    
    public getChildren(): syntaxNode[] {
        return [this.left, this.operator, this.right];
    }
    
    constructor(public left: ExpressionSyntax, public operator: SyntaxToken, public right: ExpressionSyntax) {
        super();
    }

    public getKind(): SyntaxKind {
        return SyntaxKind.BinaryExpression;
    }

}