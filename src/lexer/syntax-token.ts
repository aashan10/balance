import SyntaxNode from "../syntax-tree/nodes/syntax-node";
import SyntaxKind from "./syntax-kind";

export default class SyntaxToken extends SyntaxNode {
    public getKind(): SyntaxKind {
        return this.kind;
    }
    public getChildren(): SyntaxNode[] {
        return [];
    }
    constructor(public kind: SyntaxKind, public position: number, public text: string|null, public value: any) {
        super();
    }
}