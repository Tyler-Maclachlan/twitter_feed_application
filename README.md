# Twitter Feed Application

## Install Dependencies
**Server:**

    cd server && npm install
**Client:**

    cd client && npm install

## Running the application
**Server:**
To run the server in development mode:

    cd server && npm run dev

This will load the default test files. To change which files this loads edit the file paths in the `exec` item in `nodemon.json`

To run the server in production mode:

    cd server && npm run start

To change which files this loads change the file paths in the `start` script in `package.json`. 
You can also run :

    npm run build && node ./dist/src/index.js /path/from/current/dir/to/users.txt /path/from/current/dir/to/tweets.txt


**Client:**

    cd client && npm run start
 
 ## Tests
 **Server:**
 
To run tests:

    cd server && npm run test
