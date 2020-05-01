const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const byNumber = require('../functions/byNumber');
const assert = require('assert');

chai.use(chaiAsPromised);
const { expect } = chai;

describe('testing lookup by flight number', () => {
  it('should be rejected with error because API_TOKEN is invalid', () => {
    return expect(byNumber('1234567890','6514')).to.be.eventually.rejectedWith(Error);
  });
  it('should return 9', () => {
    assert.equal(3 * 3, 9);
  });
});
