import fs from 'fs';
import util from 'util';

const fsAccessPromise = util.promisify(fs.access);
const fsReadFilePromise = util.promisify(fs.readFile);

export const checkFileExists = async (path: string): Promise<boolean> => {
    try {
        await fsAccessPromise(path);
        return true;
    } catch (error) {
        return false;
    }
}

export const readFile = async (path: string): Promise<string> => {
    const fileExists = await checkFileExists(path);
    
    if (!fileExists) {
        throw new Error(`The path: '${path}' does not exist.`);
    }

    const file = await fsReadFilePromise(path, { encoding: 'ascii' });
    return file;
}