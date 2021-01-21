import { ingestTweetFile, Tweet } from "../tweet";
import { ingestUserFile, User } from "../user";
import { checkFileExists } from "../utils";

export class TwitterService {
    private _userFilePath: string;
    private _tweetFilePath: string;

    private _userFileExists = false;
    private _tweetFileExists = false;

    private _users: User[] = [];
    private _tweets: Tweet[] = [];

    public constructor(userFilePath: string, tweetFilePath: string) {
        this._userFilePath = userFilePath;
        this._tweetFilePath = tweetFilePath;
    }

    public printToConsole(): void {
        if (!this._userFileExists || !this._tweetFileExists) {
            console.log('One or both of the files do not exist.');
            return;
        }

        if (!this.users.length) {
            console.log('No users for which to display tweets.');
            return;
        }

        const consoleOutput: string[] = [];

            this._users
                .forEach(user => {
                    consoleOutput.push(user.name);

                    const userTweets = this._tweets
                        .filter(tweet => user.isFollowing(tweet.username) || tweet.username === user.name)
                        .sort((a, b) => a.timestamp - b.timestamp);

                    if (!userTweets.length)
                        consoleOutput.push('\tNo tweets.');
                    else
                        userTweets
                            .forEach(tweet => {
                                consoleOutput.push(`\t@${tweet.username}: ${tweet.text}`);
                            });
                    
                    consoleOutput.push('');
                });
            
            console.log(consoleOutput.join('\n'));
    }

    public async readFiles(): Promise<void> {
        await this.checkFilesExist();

        if (!this._userFileExists || !this._tweetFileExists)
            throw new Error('One or both of the input files do not exist');

        this._users = await ingestUserFile(this._userFilePath);
        this._tweets = await ingestTweetFile(this._tweetFilePath);
    }

    public get users(): string[] {
        return this._users.map(user => user.name);
    }

    public get isValid(): boolean {
        return this._userFileExists && this._tweetFileExists && this.users.length > 0;
    }

    public getUserTweets(username: string): Tweet[] {
        const userExists = this.users.includes(username);

        if (!userExists)
            throw new Error('User does not exist');

        const user = this.getUser(username);

        return this._tweets
            .filter(tweet => user.isFollowing(tweet.username) || user.name === tweet.username)
            .sort((a, b) => a.timestamp - b.timestamp);
        
    }

    public getUserFollowing(username: string): string[] {
        const userExists = this.users.includes(username);

        if (!userExists)
            throw new Error('User does not exist');

        const user = this.getUser(username);

        return user.following;
    }

    private getUser(username: string): User {
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        return this._users.find(user => user.name === username)!;
    }

    private async checkFilesExist(): Promise<void> {
        this._userFileExists = await checkFileExists(this._userFilePath);
        this._tweetFileExists = await checkFileExists(this._tweetFilePath);
    }
}