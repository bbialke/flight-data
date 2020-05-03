const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const flights = require('../functions/flights');
const assert = require('assert');
const apiToken = require('../config.json').apiToken;

chai.use(chaiAsPromised);
const { expect } = chai;

describe('testing errors in parameters', () => {
  it('should be rejected with error because API_TOKEN was not supplied', () => {
    return expect(flights({API_TOKEN: '', options: {limit: 1}})).to.be.rejectedWith(Error);
  });
  it('should be rejected with error because API_TOKEN is invalid', () => {
    return expect(flights({API_TOKEN: 'thisisntvalid', options: {limit: 1}})).to.be.rejectedWith(Error);
  });
  it('should be rejected with error because LIMIT is >100', () => {
    return expect(flights({API_TOKEN: apiToken, options: {limit: 1000}})).to.be.rejectedWith(Error);
  });
  it('should return data of one flight without error', async () => {
      const data = await flights({API_TOKEN: apiToken, options: {limit: 1, flight_number: '9333', arr_icao: 'ZSFZ'}});
      expect(data).to.be.length(1);
    });
});
