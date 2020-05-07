const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const airports = require('../functions/airports');
const assert = require('assert');
const apiToken = require('../config.json').apiToken;

chai.use(chaiAsPromised);
const { expect } = chai;

describe('testing errors in parameters- airport lookup', () => {
  it('should be rejected with error because API_TOKEN was not supplied', () => {
    return expect(airports({API_TOKEN: '', options: {limit: 1}})).to.be.rejectedWith(Error);
  });
  it('should be rejected with error because API_TOKEN is invalid', () => {
    return expect(airports({API_TOKEN: 'thisisntvalid', options: {limit: 1}})).to.be.rejectedWith(Error);
  });
  it('should be rejected with error because IATA_CODE is > 3 characters', () => {
    return expect(airports({API_TOKEN: apiToken, options: {limit: 1, iata_code: 'SEAXXX'}})).to.be.rejectedWith(Error);
  });
  it('should be rejected with error because ICAO_CODE is > 4 characters', () => {
    return expect(airports({API_TOKEN: apiToken, options: {limit: 1, icao_code: 'SEAXXX'}})).to.be.rejectedWith(Error);
  });
  it('should be rejected with error because LIMIT is >100', () => {
    return expect(airports({API_TOKEN: apiToken, options: {limit: 1000}})).to.be.rejectedWith(Error);
  });
});
describe('testing successful queries', () => {
  it('should return data of SEA-TAC airport without error (lookup by IATA_CODE)', async () => {
    const data = await airports({API_TOKEN: apiToken, options: {limit: 1, iata_code: 'SEA'}});
    expect(data.count).to.be.equals(1);
    expect(data['data']).to.be.length(1);
    expect(data.data[0].airport_name).to.be.equals('Seattle-Tacoma International');
  });
  it('should return data of SEA-TAC airport without error (lookup by ICAO_CODE)', async () => {
    const data = await airports({API_TOKEN: apiToken, options: {limit: 1, icao_code: 'KSEA'}});
    expect(data.count).to.be.equals(1);
    expect(data['data']).to.be.length(1);
    expect(data.data[0].airport_name).to.be.equals('Seattle-Tacoma International');
  });
  it('should return data of SEA-TAC airport without error (lookup by AIRPORT_NAME)', async () => {
    const data = await airports({API_TOKEN: apiToken, options: {limit: 1, airport_name: 'Seattle-Tacoma International'}});
    expect(data.count).to.be.equals(1);
    expect(data['data']).to.be.length(1);
    expect(data.data[0].icao_code).to.be.equals('KSEA');
  });
});
