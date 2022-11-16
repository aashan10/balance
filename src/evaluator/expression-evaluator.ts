import { SyntaxKind,  ExpressionSyntax } from "@balance/syntax";

export default class ExpressionEvaluator {
    protected variables: Record<string, any> = {};
    constructor(protected root: ExpressionSyntax) {}

    public getVariables = () => this.variables;
    public setVariables = (variables: Record<string, any>) => this.variables = variables;

    public evaluate = (): any => {
        return this.evaluateExpression(this.root);
    }

    public evaluateExpression = (root: ExpressionSyntax): any => {
        switch(root.getKind()) {
            case SyntaxKind.AlphaNumericToken:
                // @ts-ignore
                const name = root.getText();
                // @ts-ignore
                const position = root.getPosition();
                if (this.variables[name] !== undefined) {
                    return this.variables[name];
                }
                throw new Error(`Undefined variable ${name} at position ${position}`);
            case SyntaxKind.LiteralExpression:
                // @ts-ignore
                return root.getToken().getValue();
            case SyntaxKind.ParenthesizedExpression:
                // @ts-ignore
                return this.evaluateExpression(root.getExpression());
            case SyntaxKind.VariableAssignmentExpression:
                // @ts-ignore
                this.variables[root.getVaraible().getText()] = root.getValue().getValue(); 
                break;
            case SyntaxKind.UnaryExpression:
                // @ts-ignore
                // @ts-ignore
                const operand = this.evaluateExpression(root.getOperand());
                // @ts-ignore
                const unaryOperator = root.getOperator();
                
                switch(unaryOperator.getKind()){
                    case SyntaxKind.PlusToken:
                        return operand;
                    case SyntaxKind.MinusToken:
                        return - operand;
                    default:
                        throw new Error(`Unexpected unary operator ${unaryOperator.getKind()} on position ${unaryOperator.getPosition()}`);
                }
            case SyntaxKind.BinaryExpression:
                // @ts-ignore
                const left = root.getLeft();
                // @ts-ignore
                const right = root.getRight();
                // @ts-ignore
                const operator = root.getOperator();
                
                switch(operator.getKind()){
                    case SyntaxKind.PlusToken:
                        return this.evaluateExpression(left) + this.evaluateExpression(right);
                    case SyntaxKind.MinusToken:
                        return this.evaluateExpression(left) - this.evaluateExpression(right);
                    case SyntaxKind.AsteriskToken:
                        return this.evaluateExpression(left) * this.evaluateExpression(right);
                    case SyntaxKind.SlashToken:
                        return this.evaluateExpression(left) / this.evaluateExpression(right);
                    case SyntaxKind.PercentageToken:
                        return this.evaluateExpression(left) % this.evaluateExpression(right);
                    default:
                        throw new Error(`Unexpected node ${operator.getKind()}!`);
                }
            default:
                throw new Error(`Unexpected node ${root.getKind()}!`);
        }
    }
}
