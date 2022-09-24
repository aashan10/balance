import SyntaxKind from "../lexer/syntax-kind";
import SyntaxToken from "../lexer/syntax-token";
import ExpressionSyntax from "./nodes/expression-syntax";
import SyntaxNode from "./nodes/syntax-node";

export default class SyntaxTree {
    constructor(
        public errors: Array<string>,
        public root: ExpressionSyntax,
        public endOfFileToken: SyntaxToken
    ){}

}