/* eslint-disable jest/prefer-expect-assertions */
// redisClient.test.js
const chai = require('chai');
const chaiHttp = require('chai-http');
const redisClient = require('../utils/redis');

chai.use(chaiHttp);
const { expect } = chai;

describe('redis Client', () => {
  it('should set and get a value from Redis', async () => {
    // Test your redisClient methods here
    // Example:
    await redisClient.set('testKey', 'testValue');
    const result = await redisClient.get('testKey');
    // eslint-disable-next-line jest/valid-expect
    expect(result).to.equal('testValue');
  });

  // Add more tests as needed for other redisClient methods
});
