import React from 'react';
import './TweetCard.css';

import { ITweet } from '../lib';

interface TweetCardProps {
    tweet: ITweet;
}

export default function TweetCard({tweet}: TweetCardProps) {
    const dateFormatter = new Intl.DateTimeFormat('en-GB', {
        hour: 'numeric', minute: 'numeric',
        day: 'numeric', month: 'numeric', year: 'numeric',
        hour12: false
    });

    return (
        <div className="tweet-card">
            <div className="tweet-user">
                <div className="tweet-user-name">{tweet.username}</div>
                <div className="tweet-timestamp">{dateFormatter.format(tweet.timestamp)}</div>
            </div>
            <div className="tweet-text">{tweet.text}</div>
        </div>
    )
}