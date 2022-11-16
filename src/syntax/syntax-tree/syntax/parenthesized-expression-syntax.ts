import { SyntaxKind, SyntaxToken } from "@balance/syntax";
import SyntaxNode from "../nodes/syntax-node";
import ExpressionSyntax from "./expression-syntax";

export default class ParenthesizedExpressionSyntax extends ExpressionSyntax {
    
    
    constructor(
        public open: SyntaxToken,
        public expresssion: ExpressionSyntax,
        public close: SyntaxToken
    ) {
        super();
    }

    public getOpen = () => this.open;
    public getExpression = () => this.expresssion;
    public getClose = () => this.close;

    public getKind(): SyntaxKind {
        return SyntaxKind.ParenthesizedExpression;
    }

    public getChildren(): SyntaxNode[] {
        return [
            this.getOpen(),
            this.getExpression(),
            this.getClose()
        ];
    }
    
}