require('./setup');
import { expect } from 'chai';

import { User } from '../src/user';

describe('Class for users', function() {
    it('Should create user with name "Bob"', function() {
        const user = new User('Bob');
        return expect(user.name, 'This should be Bob').to.equal('Bob');
    });

    it('Should not have duplicate followings', function() {
        const user = new User('Bob');

        user.addFollows('Steve');
        user.addFollows('Steve');

        return expect(user.following, 'This should only have "Steve" once').to.have.lengthOf(1);
    });

    describe('User is following', function() {
        it('Should return true if following the user provided', function() {
            const user = new User('Bob');

            user.addFollows('Steve');

            return expect(user.isFollowing('Steve'), 'Bob should be following Steve').to.be.true;
        });

        it('Should return false if not following the user provided', function() {
            const user = new User('Bob');

            return expect(user.isFollowing('Steve'), 'Bob should not be following Steve').to.be.false;
        });
    });
})