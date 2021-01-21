import { readFile } from '../utils';
import { User } from './User';

export const ingestUserFile = async (filepath: string): Promise<User[]> => {
    const userFile = await readFile(filepath);

    const users: User[] = [];
    const usernameToIndexMap: {[name: string]: number } = {};

    const userLines = userFile
        .split('\n')
        .filter(line => line.length)
        .map(line => line.trim())
        .filter(line => {
            try {
                validateUserLine(line);
                return true;
            } catch (error) {
                console.log(`Invalid user line: ${error}.\nLine: ${line}`);
                return false;
            }
        });

    userLines
        .forEach((line) => {
            const [name, following] = line.split(/\sfollows\s/);

            const userExists = usernameToIndexMap[name] !== undefined && usernameToIndexMap[name] >= 0;

            const user = userExists ? users[usernameToIndexMap[name]] : new User(name);

            following
                    .split(',')
                    .forEach(n => {
                        user.addFollows(n.trim());
                    });

            if (!userExists) {
                usernameToIndexMap[name] = users.length;
                users.push(user);
            }
            else {
                users.splice(usernameToIndexMap[name], 1, user);
            }
        })

    return users;
}

export const validateUserLine = (line: string): boolean => {
    const userRegex = /^\w+\sfollows\s(\w+(,\s)?)+$/;

    if (line.length === 0)
        throw new Error('Line cannot be empty');

    if (!userRegex.test(line))
        throw new Error('Invalid line structure');

    const userAndFollowing = line.split(/\sfollows\s/);

    if (userAndFollowing.length !== 2)
        throw new Error('Invalid line structure');

    return true;
}