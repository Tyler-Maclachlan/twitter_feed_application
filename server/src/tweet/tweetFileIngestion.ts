import { Tweet } from './Tweet';
import { readFile } from '../utils'

export const ingestTweetFile = async (filepath: string): Promise<Tweet[]> => {
    const tweetFile = await readFile(filepath);

    const tweetLines = tweetFile
        .split('\n')
        .filter(line => line.length)
        .map(line => line.trim())
        .filter(line => {
            try {
                validateTweetLine(line);

                return true;
            } catch (error) {
                console.log(`Invalid tweet line: ${error}.\nLine: ${line}`);

                return false;
            }
        });

    const tweets: Tweet[] = tweetLines.map((line, index) => {
        const [username, ...texts] = line.split('>');

        return {
            username,
            text: texts.join('>').trim(), // rejoin with '>' incase text contained a '>'
            timestamp: Date.now() + (index * 1000 * 60) // pretend each tweet comes a minute after the other
        }
    })

    return tweets;
}

export const validateTweetLine = (line: string): boolean => {
    const tweetRegex = /^\w+>\s.+$/;

    if (line.length === 0)
        throw new Error('Line cannot be empty');

    if (!tweetRegex.test(line))
        throw new Error('Invalid line structure');

    if (line.replace(/^\w+>\s(.+)/, '$1').trim().length > 280)
        throw new Error('Text cannot be more than 280 characters');

    return true;
}