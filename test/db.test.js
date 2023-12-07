/* eslint-disable jest/prefer-expect-assertions */
// dbClient.test.js
const chai = require('chai');
const chaiHttp = require('chai-http');
const dbClient = require('../utils/db');

chai.use(chaiHttp);
const { expect } = chai;

describe('dB Client', () => {
  // eslint-disable-next-line no-undef
  before(async () => {
    // Connect to the database before running tests
    await dbClient.connect();
  });

  it('should get the number of users', async () => {
    const userCount = await dbClient.nbUsers();
    // eslint-disable-next-line jest/valid-expect
    expect(userCount).to.be.a('number');
  });

  it('should get the number of files', async () => {
    const fileCount = await dbClient.nbFiles();
    // eslint-disable-next-line jest/valid-expect
    expect(fileCount).to.be.a('number');
  });

  // Add more tests as needed for other dbClient methods
});
