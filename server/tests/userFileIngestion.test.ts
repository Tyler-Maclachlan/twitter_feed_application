require('./setup');
import { expect } from 'chai';

import { ingestUserFile, validateUserLine } from '../src/user';

describe('Ingestion for "user" files', function() {
    const userFilepath = './test-users.txt';
    const validUserLine = 'Veronica follows Michael, Vitalik';

    describe('User file ingestor', function() {
        it('Returns an array of users from a correct filepath', function() {
            return expect(ingestUserFile(userFilepath), 'It should be able to read this file').to.eventually.have.length.gt(0, 'There should be at least one user');
        });
    
        it('Throws an error for incorrect filepath', function() {
            return expect(ingestUserFile('./random.txt'), 'It should not be able to read this file').to.be.rejected;
        });
    });

    describe('User line validation', function() {
        it('Returns true for a valid user line', function() {
            return expect(validateUserLine(validUserLine), 'This should be a valid user line').to.be.true;
        });

        it('Throws error for invalid user line structure', function() {
            return expect(validateUserLine.bind(validateUserLine, 'Tim is following bob'), 'This should be an invalid user line').to.throw('Invalid line structure', 'This should throw an invalid line structure error');
        });
    })
});