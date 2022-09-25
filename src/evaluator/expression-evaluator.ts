import { SyntaxKind } from "@balance/lexer";
import { ExpressionSyntax } from "@balance/syntax-tree";

export default class ExpressionEvaluator {
    constructor(protected root: ExpressionSyntax) {}

    public evaluate = (): number => {
        return this.evaluateExpression(this.root);
    }

    public evaluateExpression = (root: ExpressionSyntax): number => {
        switch(root.getKind()) {
            case SyntaxKind.LiteralExpression:
                // @ts-ignore
                return root.getToken().getValue();
            case SyntaxKind.ParenthesizedExpression:
                // @ts-ignore
                return this.evaluateExpression(root.getExpression());
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
                        throw new Error(`Unexpected node ${root.getKind()}!`);
                }
            default:
                throw new Error(`Unexpected node ${root.getKind()}!`);
        }
    }
}
