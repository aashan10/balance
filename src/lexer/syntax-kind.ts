enum SyntaxKind {
    // Tokens
    BadToken = 'BadToken',
    EndOfFileToken = 'EndOfFileToken',
    EndOfLineToken = 'EndOfLineToken',
    WhiteSpaceToken = 'WhiteSpaceToken',
    NumberToken = 'NumberToken',
    AlphaNumericToken = 'AlphaNumericToken',

    // Operators
    PlusToken = 'PlusToken',
    MinusToken = 'MinusToken',
    AsteriskToken = 'AsteriskToken',
    SlashToken = 'SlashToken',
    OpenParenthesisToken = 'OpenParenthesisToken',
    CloseParenthesisToken = 'CloseParenthesisToken',
    PercentageToken = 'PercentageToken',
    EqualsToken = 'EqualsToken',

    // Expressions
    BinaryExpression = 'BinaryExpression',
    ParenthesizedExpression = 'ParenthesizedExpression',
    LiteralExpression = 'LiteralExpression',
    VariableAssignmentExpression = 'VariableAssignmentExpression'
}

export default SyntaxKind;