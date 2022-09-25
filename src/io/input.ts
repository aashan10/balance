import * as readline from "node:readline/promises";
import {readFile} from "fs/promises";
import {PathLike} from 'fs';

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

export interface InputInterface {
    read(text: PathLike | string): Promise<string>;
}

export class ConsoleInput implements InputInterface {
    async read(text: PathLike = '> '): Promise<string> {
        return await rl.question(text.toString());
        
    }
}

export class FileInput implements InputInterface {
    async read(path: PathLike): Promise<string> {
        const fileContent = await readFile(path, {encoding: 'utf8'});
        return fileContent.toString();
    }
}