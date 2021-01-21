require('./setup');
import { expect } from 'chai';
import { ingestTweetFile, validateTweetLine } from '../src/tweet';

describe('Ingestion for "tweet" files', function() {
    const tweetFilePath = './test-tweets.txt';
    const validTweetLine = `Michael> If your linter tortures you, its complexity and we're building?`;
    const invalidTweetLength = `Vitalik> Things like tornado cash and uniswap, kyber and the like are successful in part because they are just tools that people can put into their existing workflows, and not ecosystems. We need more tools that are content with being tools and fewer attempts at ecosystems. We need more tools that are content with being tools and fewer attempts at ecosystems. We need more tools that are content with being tools and fewer attempts at ecosystems. We need more tools that are content with being tools and fewer attempts at ecosystems`
    const invalidTweetStructure = `Bob this is invalid.`;

    describe('Tweet file ingestor', function() {
        it('Returns an array of tweets from a correct filepath', function() {
            return expect(ingestTweetFile(tweetFilePath), 'It should be able to read this file').to.eventually.have.length.gt(0, 'There should be at least one user');
        });
    
        it('Throws an error for incorrect filepath', function() {
            return expect(ingestTweetFile('./random.txt'), 'It should not be able to read this file').to.be.rejected;
        });
    });

    describe('Tweet line validation', function() {
        it('Returns true for a valid tweet line', function() {
            return expect(validateTweetLine(validTweetLine), 'This should be a valid tweet line').to.be.true;
        });

        it('Throws error for invalid tweet line structure', function() {
            return expect(validateTweetLine.bind(validateTweetLine, invalidTweetStructure), 'This should be an invalid user line').to.throw('Invalid line structure', 'This should throw an invalid line structure error');
        });

        it('Throws an error for invalid tweet text length', function() {
            return expect(validateTweetLine.bind(validateTweetLine, invalidTweetLength), 'This should be an invalid user line').to.throw('Text cannot be more than 280 characters', 'This should throw a line length error');
        })
    })
});