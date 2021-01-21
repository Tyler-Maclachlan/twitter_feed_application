import React, { useState } from 'react';
import './App.css';

import UserTabs from './components/UserTabs';
import UserTweets from './components/UserTweets';

function App() {
  const [user, setUser] = useState<string | null>(null);

  return (
    <div className="App">
        <UserTabs selectUser={setUser} user={user}></UserTabs>
        <div className="tweet-container">
          { user ? <UserTweets user={user}></UserTweets> : <></>}
        </div>
    </div>
  );
}

export default App;
