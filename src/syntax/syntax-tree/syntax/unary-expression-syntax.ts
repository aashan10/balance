import { SyntaxKind, SyntaxToken } from "@balance/syntax";
import SyntaxNode from "../nodes/syntax-node";
import ExpressionSyntax from "./expression-syntax";

export default class UnaryExpressionSyntax extends ExpressionSyntax{
    
    constructor(
        protected operator: SyntaxToken, 
        protected operand: ExpressionSyntax
    ){
        super();
    }
    
    public getOperator = () => this.operator;
    public getOperand = () => this.operand;

    public getKind(): SyntaxKind {
        return SyntaxKind.UnaryExpression;
    }
    public getChildren(): SyntaxNode[] {
        return [
            this.getOperator(),
            this.getOperand()
        ];
    }
    
}