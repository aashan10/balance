enum SyntaxKind {
    NumberKind = 'NumberKind',
    WhiteSpaceKind = 'WhiteSpaceKind',
    PlusToken = 'PlusToken',
    MinusToken = 'MinusToken',
    MultiplyToken = 'MultiplyToken',
    DivideToken = 'DivideToken',
    BracketOpenToken = 'BracketOpenToken',
    BracketCloseToken = 'BracketCloseToken',
    BadToken = 'BadToken',
    EndOfFileToken = 'EndOfFileToken',
    NumberExpression = "NumberExpression",
    BinaryExpression = "BinaryExpression",
    ParenthesizedSyntax = "ParenthesizedSyntax"
}

export default SyntaxKind;