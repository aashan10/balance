import {SyntaxKind} from "@balance/lexer";

export default abstract class SyntaxNode {
    
    public abstract getKind(): SyntaxKind;

    public abstract getChildren(): Array<SyntaxNode>;
}