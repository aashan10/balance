import SyntaxKind from "../../lexer/syntax-kind";

export default abstract class SyntaxNode {
    public abstract getKind(): SyntaxKind;

    public abstract getChildren(): Array<SyntaxNode>;
}