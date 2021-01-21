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

    return (
        <div>
            {
               error ? 
                (<p className="info-paragraph">{error.message}</p>) : 
                (tweets.length ? 
                    tweets.map(tweet => (<TweetCard key={tweet.timestamp} tweet={tweet}></TweetCard>)) : 
                    (<p className="info-paragraph">No Tweets</p>))
            }
        </div>
    )
}