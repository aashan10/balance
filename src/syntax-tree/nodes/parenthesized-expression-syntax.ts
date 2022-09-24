import SyntaxKind from "../../lexer/syntax-kind";
import SyntaxToken from "../../lexer/syntax-token";
import ExpressionSyntax from "./expression-syntax";
import SyntaxNode from "./syntax-node";

export default class ParenthesizedExpressionSyntax extends SyntaxNode {
    public getKind(): SyntaxKind {
        return SyntaxKind.ParenthesizedSyntax;
    }
    public getChildren(): SyntaxNode[] {
        return [this.open, this.expresssion, this.close];
    }
    constructor(
        public open: SyntaxToken,
        public expresssion: ExpressionSyntax,
        public close: SyntaxToken
    ) {
        super();
    }
}