import { SyntaxToken } from "@balance/lexer";
import ExpressionSyntax from "./syntax/expression-syntax";

export default class SyntaxTree {
    constructor(
        public errors: Array<string>,
        public root: ExpressionSyntax,
        public endOfFileToken: SyntaxToken
    ){}
}