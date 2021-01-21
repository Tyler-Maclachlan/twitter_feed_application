require('./setup');
import { expect } from 'chai';

import { validateArgs } from '../src/utils';

describe('Program arguments utility', function() {
    it('Returns true for valid arguments', function() {
        return expect(validateArgs(['./test-users.txt', './test-tweets.txt'])).to.be.true;
    });

    it('Throws an error for invalid file types', function() {
        return expect(validateArgs.bind(validateArgs, ['invalid', 'invalid'])).to.throw('The input files should be text files');
    });

    it('Throws an error for invalid arguments amount', function() {
        return expect(validateArgs.bind(validateArgs, ['one'])).to.throw('There should be two input files')
    })
})