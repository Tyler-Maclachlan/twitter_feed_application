import { getArgs, validateArgs } from './utils';
import { TwitterService } from './services/TwitterService';
import express from 'express';
import cors from 'cors';

const app = express();
const port = 4200;

app.use(cors());
app.use((_, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, OPTIONS"
    );
    res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization, Access-Control-Allow-Credentials"
    );
    res.header("Access-Control-Allow-Credentials", "true");
    next();
})

const startTwitterFeedService = async () => {
    const args = getArgs();

    try {
        validateArgs(args)
    } catch (error) {
        console.log(`Invalid arguments: ${error}`);
    }
    const [userFile, tweetFile] = args;
    const twitterService = new TwitterService(userFile, tweetFile);

    try {
        await twitterService.readFiles();
        twitterService.printToConsole();
    } catch (error) {
        console.log(`Error reading files: ${error}`);
    }

    app.use('/users', async (_, res, next) => {
        if (twitterService.isValid)
            res.json(twitterService.users);
        else
            res.status(500).json('Error getting users');
        next();
    });

    app.use('/tweets/:username', async (req, res, next) => {
        if (!twitterService.isValid)
            res.status(500).json('Error getting tweets');
        else {
            const username = req.params.username;

            try {
                const tweets = twitterService.getUserTweets(username);
                res.json(tweets);
            } catch (error) {
                res.status(404).json('User does not exist');
            }
        }

        next();
    });

    app.use('/following/:username', async (req, res, next) => {
        const username = req.params.username;

        try {
            const following = twitterService.getUserFollowing(username);
            res.json(following);
        } catch (error) {
            res.status(404).json('User does not exist');
        } finally {
            next();
        }
    });
}

app.listen(port, async () => {
    await startTwitterFeedService();
});