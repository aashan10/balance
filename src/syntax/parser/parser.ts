import { 
    LexicalAnalyser, 
    SyntaxKind, 
    SyntaxToken, 
    UnaryExpressionSyntax, 
    BinaryExpressionSyntax, 
    ExpressionSyntax, 
    LiteralExpressionSyntax, 
    ParenthesizedExpressionSyntax, 
    SyntaxTree, 
    VariableAssignmentSyntax 
} from "@balance/syntax";
import SyntaxFacts from "./syntax-facts";

export default class Parser {
    protected tokens: Array<SyntaxToken> = [];
    protected position: number = 0;
    protected errors: Array<string> = [];
    protected variables: Record<string, any> = {};

    constructor(public text: string){
        const lexer = new LexicalAnalyser(text);
        let token: SyntaxToken;
        do {
            token = lexer.nextToken();
            if (
                token.getKind() !== SyntaxKind.BadToken && 
                token.getKind() !== SyntaxKind.WhiteSpaceToken
            ) {
                this.tokens.push(token);
            }

            if (token.getKind() === SyntaxKind.AlphaNumericToken) {
                this.variables[token.getValue()] = 1;
            }
        } while(token.getKind() !== SyntaxKind.EndOfFileToken);

        this.errors = [...lexer.getErrors()];
        this.variables = {...lexer.getVariables()};
    }

    public getErrors = (): Array<string> => this.errors;
    public getPosition = (): number => this.position;
    public getTokens = (): Array<SyntaxToken> => this.tokens;

    private peek = (offset: number) : SyntaxToken => {
        let index = this.position + offset;

        if (index >= this.tokens.length) {
            return this.tokens[this.tokens.length - 1];
        }
        return this.tokens[index];
    }
    
    private current = () : SyntaxToken => {
        return this.peek(0);
    }
    
    private next = () : SyntaxToken  => {
        const current = this.current();
        this.position++;
        return current;
    }

    private match = (kind: SyntaxKind) : SyntaxToken => {
        const current = this.current();
        if (current.getKind() === kind) {
            return this.next();
        }

        this.errors.push(`Error: Unexpected token <${current.getKind()}> at position: ${current.getPosition()}. Expected <${kind}>!`);

        // Fabricating a custom token because the tokens do not match!
        return new SyntaxToken(kind, this.current().getPosition(), null, null);
    }

    private parseExpression = (parentPrecedence: number = 0) : ExpressionSyntax => {
        let left: ExpressionSyntax;

        let unaryOperatorPrecedence = SyntaxFacts.getUnaryOperatorPrecedence(this.current().getKind());

        if (unaryOperatorPrecedence != 0 && unaryOperatorPrecedence >= parentPrecedence) {
            let operatorToken = this.next();
            let operand = this.parseExpression();
            left = new UnaryExpressionSyntax(operatorToken, operand);
        } else {
            left = this.parsePrimaryExpression();
        }

        let precedence:number ;
        while(true) {
            precedence = SyntaxFacts.getBinaryOperatorPrecedence(this.current().getKind());

            if(precedence === 0 || precedence <= parentPrecedence){
                break;
            }

            let operatorToken = this.next();
            let right = this.parseExpression(precedence);
            left = new BinaryExpressionSyntax(left, operatorToken, right);
        }

        return left;
    }
    private parsePrimaryExpression = () : ExpressionSyntax => {        
        
        if (this.current().getKind() === SyntaxKind.OpenParenthesisToken) {
            const left = this.next();
            const expression = this.parseExpression();
            const right = this.match(SyntaxKind.CloseParenthesisToken);

            return new ParenthesizedExpressionSyntax(left, expression, right);
        }

        if (this.current().getKind() === SyntaxKind.AlphaNumericToken) {
            const left = this.next();
            const operator = this.next();
            const right = this.next();

            switch(operator.getKind()) {
                case SyntaxKind.EqualsToken:
                    return new VariableAssignmentSyntax(left, right);
                default:
                    return new BinaryExpressionSyntax(left, operator, right);
            }

            
        }
        
        const numberToken = this.match(SyntaxKind.NumberToken);
        return new LiteralExpressionSyntax(numberToken);
    }

    public parse = (): SyntaxTree => {
        const expression = this.parseExpression();
        const eofToken = this.match(SyntaxKind.EndOfFileToken);
        return new SyntaxTree(this.errors, expression, eofToken);
    }

}