const { expect } = require('chai');
const flightdata = require('../index');
describe('testing objects created by index.js', () => {
  it('should have flight lookup function', () => {
    expect(flightdata.flights).to.be.a('function');
  });
  it('should have airport lookup function', () => {
    expect(flightdata.airports).to.be.a('function');
  });
});
