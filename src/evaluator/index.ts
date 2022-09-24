import SyntaxKind from "../lexer/syntax-kind";
import BinaryExpressionSyntax from "../syntax-tree/nodes/binary-expression";
import ExpressionSyntax from "../syntax-tree/nodes/expression-syntax";
import NumberExpressionSyntax from "../syntax-tree/nodes/number-expression-syntax";
import ParenthesizedExpressionSyntax from "../syntax-tree/nodes/parenthesized-expression-syntax";

export default class Evaluator {
    constructor(public root: ExpressionSyntax) {

    }

    public evaluate() {
        return this.evaluateExpression(this.root);
    }

    private evaluateExpression(root: ExpressionSyntax): number {
        if (root instanceof NumberExpressionSyntax) {
            return root.token.value;
        }

        if (root instanceof BinaryExpressionSyntax) {
            const left  = this.evaluateExpression(root.left);
            const right  = this.evaluateExpression(root.right);

            if (root.operator.kind === SyntaxKind.PlusToken) {
                return left + right;
            } else if (root.operator.kind === SyntaxKind.MinusToken) {
                return left - right;
            } else if (root.operator.kind === SyntaxKind.MultiplyToken) {
                return left * right;
            } else if (root.operator.kind === SyntaxKind.DivideToken) {
                return left / right;
            } else {
                throw new Error(`Unexpected binary operator ${root.operator.kind}!`);
            }
        }

        if (root instanceof ParenthesizedExpressionSyntax) {
            return this.evaluateExpression(root.expresssion);
        }
        throw new Error(`Unexpected node ${root.getKind()}!`);
    }
}