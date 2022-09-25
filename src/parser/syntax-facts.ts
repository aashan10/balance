import { SyntaxKind } from "@balance/lexer";

export default class SyntaxFacts {
    static getBinaryOperatorPrecedence = (kind: SyntaxKind) : number => {
        switch(kind) {
            case SyntaxKind.PercentageToken:
                return 3;
            case SyntaxKind.AsteriskToken:
            case SyntaxKind.SlashToken:
                return 2;
            case SyntaxKind.PlusToken:
            case SyntaxKind.MinusToken:
                return 1;
            default:
                return 0;
        }
    }
}