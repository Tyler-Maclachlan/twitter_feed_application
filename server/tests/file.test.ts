require('./setup');
import { expect } from 'chai';

import { checkFileExists, readFile } from '../src/utils';

const validUserFilePath = './test-users.txt';
const invalidPath = './invalid.txt';

describe('File IO utility', function() {
    describe('Check files exist', function() {
        it('Should return true if file exists', function() {
            return expect(checkFileExists(validUserFilePath)).to.eventually.be.true;
        });
    
        it('Should return false if the file does not exist', function() {
            return expect(checkFileExists(invalidPath)).to.eventually.be.false;
        });
    });

    describe('Reading file', function() {
        it('Should return a string of the file contents from correct file path', function() {
            return expect(readFile(validUserFilePath), 'This should be a valid file path').to.eventually.be.a('string', 'This should be a string of the file contents');
        });

        it('Should throw an error for an invalid file path', function() {
            return expect(readFile(invalidPath)).to.be.rejectedWith('does not exist');
        })
    })
})