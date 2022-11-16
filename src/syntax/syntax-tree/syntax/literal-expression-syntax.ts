import { SyntaxKind, SyntaxToken } from "@balance/syntax";
import SyntaxNode from "../nodes/syntax-node";
import ExpressionSyntax from "./expression-syntax";

export default class LiteralExpressionSyntax extends ExpressionSyntax {
    
    constructor(
        public token: SyntaxToken
    ) {
        super();
    }
    
    public getToken = () => this.token;

    public getKind(): SyntaxKind {
        return SyntaxKind.LiteralExpression;
    }

    public getChildren(): SyntaxNode[] {
        return [
            this.getToken()
        ];
    }
    
}