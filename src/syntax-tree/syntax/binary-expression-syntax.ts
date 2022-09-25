import { SyntaxKind, SyntaxToken } from "@balance/lexer";
import SyntaxNode from "../nodes/syntax-node";
import ExpressionSyntax from "./expression-syntax";

export default class BinaryExpressionSyntax extends ExpressionSyntax{
    
    constructor(
        protected left: ExpressionSyntax, 
        protected operator: SyntaxToken, 
        protected right: ExpressionSyntax
    ){
        super();
    }
    
    public getLeft = () => this.left;
    public getRight = () => this.right;
    public getOperator = () => this.operator;

    public getKind(): SyntaxKind {
        return SyntaxKind.BinaryExpression;
    }
    public getChildren(): SyntaxNode[] {
        return [
            this.getLeft(), 
            this.getOperator(), 
            this.getRight()
        ];
    }
    
}