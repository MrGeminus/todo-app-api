import fs from 'fs';
import path from 'path';

export const logEvents = async (event: string, filename: string): Promise<void> => {

    const timestamp: string = `${new Date()}`;
    const row: string = `${timestamp}\t${event}\n`

    try {
        if (!fs.existsSync(path.join(__dirname, '..', 'logs'))) await fs.promises.mkdir(path.join(__dirname, '..', 'logs'))
        await fs.promises.appendFile(path.join(__dirname, '..', 'logs', filename), row)
    }
    catch {

    }
}