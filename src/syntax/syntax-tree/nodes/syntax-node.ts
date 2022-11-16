import {SyntaxKind} from "@balance/syntax";

export default abstract class SyntaxNode {
    
    public abstract getKind(): SyntaxKind;

    public abstract getChildren(): Array<SyntaxNode>;
}