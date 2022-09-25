import { PathLike } from "fs";
import {writeFile} from 'fs/promises';

export interface OutputInterface {
    write(text: string|Buffer): Promise<void>;
    writeLine(text: string|Buffer): Promise<void>;
}

export class ConsoleOutput implements OutputInterface {

    async write(text: string) {
        process.stdout.write(text);
    }

    async writeLine(text: string) {
        process.stdout.write(text + "\n");
    }
}

export class FileOutput implements OutputInterface {
    constructor(protected file: PathLike) {

    }

    async write(text: string | Buffer): Promise<void> {
        return await writeFile(this.file, text);
    }

    async writeLine(text: string | Buffer): Promise<void> {
        return await writeFile(this.file, text.toString() + "\n");
    }
}