import { SyntaxNode } from "../syntax-tree";
import SyntaxKind from "./syntax-kind";

export default class SyntaxToken extends SyntaxNode {
    
    constructor(
        protected kind: SyntaxKind, 
        protected position: number, 
        protected text: string|null, 
        protected value: any
    ) {
        super();
    }

    public getKind = () => this.kind;
    public getPosition = () => this.position;
    public getValue = () => this.value;
    public getChildren = () : SyntaxNode[] => [];

}