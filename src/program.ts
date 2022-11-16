import {SyntaxNode, Parser, SyntaxToken} from "@balance/syntax";
import {InputInterface, OutputInterface, ConsoleInput, ConsoleOutput} from "./io";
import { readFile } from "fs/promises";
import { readFileSync } from "fs";
import chalk from 'chalk';
import ExpressionEvaluator from "./evaluator/expression-evaluator";


export default class Program {

    protected output: OutputInterface;
    protected input: InputInterface;

    constructor(){
        this.output = new ConsoleOutput;
        this.input = new ConsoleInput;
    }

    async run() {
        const args = process.argv.slice(2);
        await this.printCompilerMessage();
        let variables: Record<string, any> = {};
        let showDebugInfo = false;
        let hasStartPoint = false;
        let fileText = '';

        if (args.length > 0) {
            const fileName = args[0];
            fileText = (await readFile(__dirname + '/../../' + fileName)).toString();
            hasStartPoint = true;
            if (args.indexOf('--show-debug-info') >= 0) {
                showDebugInfo = true;
            }
        }

        while (true) {
            let line: string = hasStartPoint ? fileText : await this.input.read('> ');
            
            if (line === '#exit') {
                this.output.write('Bye!');
                break;
            }

            if (line === '#clear') {
                variables = {};
                let lines = process.stdout.getWindowSize()[1];
                for(let i = 0; i < lines; i++) {
                    console.log('\r\n');
                }
                continue;
            }

            if (line === '#showDebugInfo') {
                showDebugInfo = true;
                console.log('Showing debug info now!');
                continue;
            }

            if (line === '#hideDebugInfo') {
                showDebugInfo = false;
                console.log('Hiding debug info now!');
                continue;
            }
            
            const parser = new Parser(line);
            const tree = parser.parse();
            if (showDebugInfo) {
                this.prettyPrintSyntaxNode(tree.root);
            }

            let errors = parser.getErrors();
            if (errors.length > 0) {
                errors.map(error => {
                    this.output.writeLine(chalk.red(error));
                });
            } else {
                let evaluator = new ExpressionEvaluator(tree.root);
                evaluator.setVariables(variables);
                try {
                    let value = evaluator.evaluate();
                    this.output.writeLine(chalk.green(`Expression evaluated to: ${chalk.bold(value)}`))
                    variables = evaluator.getVariables();
                } catch (e) {
                    this.output.writeLine(chalk.red(e));
                }
                

                if (showDebugInfo) {
                    console.log('========= VARIABLES ========');
                    console.log(variables);
                }
            }

            if (hasStartPoint) {
                break;
            }
        }

        
        
        this.output.writeLine('');
        process.exit(0);
    }
    async printCompilerMessage() {
        const logoText = readFileSync(__dirname + '/../../src/logo.txt')
        await this.output.write(logoText.toString());
        await this.output.writeLine('');
        await this.output.writeLine('Welcome to Balance REPL. Play around here!');
    }

    protected prettyPrintSyntaxNode(node: SyntaxNode, indent: string = '', isLast: boolean = true) {
        const marker = isLast ? ' └── ' : ' ├── ';
        const value = (node instanceof SyntaxToken && node.getValue() !== null) ? '   ===>   ' + node.getValue() : '';

        this.output.write(indent);
        this.output.write(chalk.bold(marker));
        this.output.write(chalk.red(chalk.bold(node.getKind().toString())));
        this.output.write('  ');
        this.output.writeLine(chalk.green(chalk.bold(value)));

        indent += isLast ? '    ' : ' │   ';

        let lastChild = node.getChildren()[node.getChildren().length - 1];

        node.getChildren().map(child => {
            this.prettyPrintSyntaxNode(child, indent, child === lastChild);
        });
    }
}