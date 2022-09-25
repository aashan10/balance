enum SyntaxKind {
    // Tokens
    BadToken = 'BadToken',
    EndOfFileToken = 'EndOfFileToken',
    WhiteSpaceToken = 'WhiteSpaceToken',
    NumberToken = 'NumberToken',

    // Operators
    PlusToken = 'PlusToken',
    MinusToken = 'MinusToken',
    AsteriskToken = 'AsteriskToken',
    SlashToken = 'SlashToken',
    OpenParenthesisToken = 'OpenParenthesisToken',
    CloseParenthesisToken = 'CloseParenthesisToken',
    PercentageToken = 'PercentageToken',

    // Expressions
    BinaryExpression = 'BinaryExpression',
    ParenthesizedExpression = 'ParenthesizedExpression',
    LiteralExpression = 'LiteralExpression'
}

export default SyntaxKind;