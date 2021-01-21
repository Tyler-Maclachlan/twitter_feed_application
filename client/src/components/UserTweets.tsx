import React, { useState, useEffect } from 'react';
import './UserTweets.css';

import { useTwitterFeed, ITweet } from '../lib';
import TweetCard from './TweetCard';

interface UserTweetsProps {
    user: string;
}

export default function UserTweets({ user }: UserTweetsProps) {
    const { getTweets } = useTwitterFeed();
    const [tweets, setTweets] = useState<ITweet[]>([])
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        getTweets(user)
            .then(_tweets => {
                setError(null);
                setTweets(_tweets)
            })
            .catch(err => {
                setError(err);
                setTweets([]);
            });

    }, [user, getTweets]);

    const getUserTweetElement = () => {
        if (error)
            return (<p className="info-paragraph">{error.message}</p>);
        else if (tweets.length)
            return tweets.map(tweet => (<TweetCard key={tweet.timestamp} tweet={tweet}></TweetCard>));
        else
            return (<p className="info-paragraph">No Tweets</p>);
    }

    return (
        <>
            {
               getUserTweetElement()
            }
        </>
    )
}