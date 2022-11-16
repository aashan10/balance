import { SyntaxKind, SyntaxToken } from "@balance/syntax";
import SyntaxNode from "../nodes/syntax-node";
import ExpressionSyntax from "./expression-syntax";

export default class VariableAssignmentSyntax extends ExpressionSyntax {
    
    constructor(
        protected variable: SyntaxToken,
        protected value: ExpressionSyntax,
    ){
        super();
    }
    
    public getVaraible = () => this.variable;
    public getValue = () => this.value;

    public getKind(): SyntaxKind {
        return SyntaxKind.VariableAssignmentExpression;
    }
    
    public getChildren(): SyntaxNode[] {
        return [
            this.getVaraible(),
            this.getValue()
        ];
    }

}