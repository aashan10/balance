import Evaluator from "./evaluator";
import Lexer from "./lexer";
import SyntaxKind from "./lexer/syntax-kind";
import SyntaxToken from "./lexer/syntax-token";
import Parser from "./parser/inde";
import SyntaxNode from "./syntax-tree/nodes/syntax-node";

const io = require('console-read-write');


export default class Balance {
    async run() {
        io.write('====== Balance REPL =====');
        io.write('Welcome to Balance programming language v0.0.1! Happy coding!');
        while(true) {
            let text = await io.read();
            if (text === 'exit') {
                io.write('Bye!');
                process.exit(0);
            }

            const parser = new Parser(text);
            const syntaxTree = parser.parse();

            this.prettyPrint(syntaxTree.root);

            if (syntaxTree.errors.length > 0) {
                
                syntaxTree.errors.map(error => {
                    console.error(error);
                });
                
                process.exit(1);
            } else {
                let evaluator = new Evaluator(syntaxTree.root);
                const result = evaluator.evaluate();
                console.log(result);
            }
        }
    }

    prettyPrint = (node: SyntaxNode, indent: string = '', isLast: boolean = true) => {
        const marker = isLast ? ' └── ' : ' ├── ';
        // @ts-ignore
        const value = (node instanceof SyntaxToken && node.value !== null) ? '   ===>   ' + node.value : '';
        console.log(indent + marker + node.getKind() + '  ' + value);

        indent += isLast ? '    ' : ' │   ';

        let lastChild = node.getChildren()[node.getChildren().length - 1];

        node.getChildren().map(child => {
            this.prettyPrint(child, indent, child === lastChild);
        });
    }
}