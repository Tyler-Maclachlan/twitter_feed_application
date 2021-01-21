require('./setup');
import { expect } from 'chai';
import { TwitterService } from '../src/services/TwitterService';

const ts = new TwitterService('./test-users.txt', './test-tweets.txt');
const invalidTs = new TwitterService('./random.txt', './random.txt');

describe('Service for twitter feed', function() {
    describe('Reading files into the service', function() {
        it('Should read the files from correct file paths', function() {
            return expect(ts.readFiles()).to.eventually.be.fulfilled;
        });
    
        it('Should throw an error for invalid file paths', function() {
            return expect(invalidTs.readFiles()).to.be.rejectedWith('One or both of the input files do not exist');
        });
    });

    describe('Service user functions', function() {
        it('Should have the users: [Michael, Kent, Veronica, Vitalik]', async function() {
            await ts.readFiles();
            return expect(ts.users).to.include.members(['Michael', 'Kent', 'Veronica', 'Vitalik']).and.lengthOf(4);
        });

        it('Should return an array of tweets for the user "Michael"', async function() {
            await ts.readFiles();
            return expect(ts.getUserTweets('Michael')).to.have.length.greaterThan(0);
        });

        it('Michael should be following Kent, Veronica and Vitalik', async function() {
            await ts.readFiles();

            return expect(ts.getUserFollowing('Michael')).to.include.members(['Kent', 'Veronica', 'Vitalik']);
        })

        it('Should throw an error finding tweets for a user that does not exist', async function() {
            await ts.readFiles();
            return expect(ts.getUserTweets.bind(ts, 'Bob')).to.throw();
        })
    });
})