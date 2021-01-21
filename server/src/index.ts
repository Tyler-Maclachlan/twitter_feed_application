import { getArgs, validateArgs } from './utils';
import { TwitterService } from './services/TwitterService';
import express, { Request, Response, NextFunction} from 'express';
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
});

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
        console.log(`${error}`);
    }

    app.use('/users', async (_, res, next) => {
        if (twitterService.isValid) {
            res.json(twitterService.users);
            next();
        }
        else {
            next(new Error('Error getting users'));
        }
    });

    app.use('/tweets/:username', async (req, res, next) => {
        if (!twitterService.isValid)
            next('Error getting tweets');
        else {
            const username = req.params.username;

            try {
                const tweets = twitterService.getUserTweets(username);
                res.json(tweets);
                next();
            } catch (error) {
                next(error);
            }
        }
    });

    app.use('/following/:username', async (req, res, next) => {
        const username = req.params.username;

        try {
            const following = twitterService.getUserFollowing(username);
            res.json(following);
        } catch (error) {
            next(error);
        }
    });

    app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
        if (res.headersSent) {
            next(err);
        }
        if (process.env.NODE_ENV !== 'production') {
            console.log(err);
        }
        res.status(500).send(err.message);
    });
}

app.listen(port, async () => {
    await startTwitterFeedService();
});