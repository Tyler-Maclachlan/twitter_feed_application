import React, { useState, useEffect } from 'react';
import { useTwitterFeed, ITweet } from '../lib';

import TweetCard from './TweetCard';

interface UserTweetsProps {
    user: string;
}

export default function UserTweets({ user }: UserTweetsProps) {
    const { getTweets } = useTwitterFeed();
    const [tweets, setTweets] = useState<ITweet[]>([])

    useEffect(() => {
        getTweets(user)
            .then(_tweets => setTweets(_tweets))
            .catch(err => {
                console.log(`${err}`)
                setTweets([]);
            });

    }, [user, getTweets]); 

    return (
        <div>
            {
                tweets.length ? 
                    tweets.map(tweet => (<TweetCard key={tweet.timestamp} tweet={tweet}></TweetCard>)) : 
                    (<p style={{padding: '5px 10px'}}>No Tweets</p>)
            }
        </div>
    )
}