import React, { useState, useContext, createContext, ReactNode } from 'react';

const API_URL = 'http://localhost:4200';

export interface ITweet {
    username: string;
    text: string;
    timestamp: number;
}

interface ITwitterFeedContext {
    users: string[],
    getUsers: () => Promise<void>;
    getTweets: (username: string) => Promise<ITweet[]>;
}

type TwitterFeedContext = ITwitterFeedContext;

const twitterFeedContext = createContext<TwitterFeedContext | undefined>(undefined);

export const ProvideTwitterFeed = ({children}: {children: ReactNode}): JSX.Element => {
    const twitterFeed = useProvideTwitterFeed();
    return <twitterFeedContext.Provider value={twitterFeed}>{children}</twitterFeedContext.Provider>
}

export const useTwitterFeed = (): TwitterFeedContext => {
    return useContext(twitterFeedContext)!;
}

function useProvideTwitterFeed(): ITwitterFeedContext {
    const [users, setUsers] = useState<string[]>([]);

    const getUsers = async (): Promise<void> => {
        try {
            const users = await fetch(`${API_URL}/users`)
                .then(res => {
                    if (res.ok)
                        return res.json();
                    else
                        throw new Error('Error getting users');
                });
            
            setUsers(users);
        } catch (error) {
            console.log(`${error}`);
        }
    }

    const getTweets = async (username: string): Promise<ITweet[]> => {
        const tweets = await fetch(`${API_URL}/tweets/${username}`)
            .then(res => {
                if (res.ok)
                    return res.json();
                else
                    throw new Error('Error getting tweets');
            });

        return tweets;
    }

    return {
        users,
        getUsers,
        getTweets
    }
}