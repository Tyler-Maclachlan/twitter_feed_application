import React, { useEffect } from 'react';
import './UserTabs.css';

import { useTwitterFeed } from '../lib';

interface UserTabsProps {
    selectUser: (username: string) => void;
    user: string | null;
}

export default function UserTabs({ selectUser, user } : UserTabsProps) {
    const {users, getUsers} = useTwitterFeed();

    useEffect(() => {
        if (!users.length)
            getUsers()
        else
            selectUser(users[0])
    }, [users.length, getUsers, selectUser, users]);

    return (
        <div className="user-tabs">
            {
                users.length ?
                users.map(u => {
                    const classes = `user-tab ${u === user ? 'selected-tab' : ''}`;

                    return (
                        <div onClick={() => selectUser(u)} className={classes} key={u}>{u}</div>
                    )
                }) : (<div className="user-tab no-users">No Users</div>)
            }
        </div>
    )
}