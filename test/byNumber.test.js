const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const byNumber = require('../functions/byNumber');
const assert = require('assert');
const apiToken = require('../config.json').apiToken;

chai.use(chaiAsPromised);
const { expect } = chai;

describe('testing lookup by flight number', () => {
  it('should be rejected with error because API_TOKEN was not supplied', () => {
    return expect(byNumber('','6514')).to.be.eventually.rejectedWith(Error);
  });
  it('should be rejected with error because API_TOKEN is invalid', () => {
    return expect(byNumber('1234567890','6514')).to.be.eventually.rejectedWith(Error);
  });
  it('should be rejected with error because FLIGHT_NUMBER is invalid', () => {
    return expect(byNumber(apiToken,'qqqq')).to.be.eventually.rejectedWith(Error);
  });
});
