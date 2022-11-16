enum BoundNodeKind {
    UnaryExpression = 'UnaryExpression',
    LiteralExpression = 'LiteralExpression'
};

abstract class BoundNode {
    abstract getKind(): BoundNodeKind;
}

abstract class BoundExpression extends BoundNode {
    abstract getType(): Object
}

class BoundUnaryExpression extends BoundExpression {
    
    constructor(
        protected operatorKind: BoundNodeKind,
        protected operand: BoundExpression
    ){
        super();
    }

    getKind = (): BoundNodeKind => BoundNodeKind.UnaryExpression;
    getType = (): Object => this.operand.getType();
}

class BoundLiteralExpressio extends BoundExpression {
    constructor(protected value: Object){
        super();
    }
    getType = (): Object => typeof this.value;
    getKind = (): BoundNodeKind => BoundNodeKind.LiteralExpression;

}