const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const flights = require('../functions/flights');
const assert = require('assert');
require('dotenv').config();
const apiToken = process.env.API_TOKEN;

chai.use(chaiAsPromised);
const { expect } = chai;

describe('testing errors in parameters- flight lookup', () => {
  it('should be rejected with error because API_TOKEN was not supplied', () => {
    return expect(flights({API_TOKEN: '', options: {limit: 1}})).to.be.rejectedWith(Error);
  });
  it('should be rejected with error because API_TOKEN is invalid', () => {
    return expect(flights({API_TOKEN: 'thisisntvalid', options: {limit: 1}})).to.be.rejectedWith(Error);
  });
  it('should be rejected with error because IATA_CODE is > 3 characters', () => {
    return expect(flights({API_TOKEN: apiToken, options: {limit: 1, arr_iata: 'SEAXXX'}})).to.be.rejectedWith(Error);
  });
  it('should be rejected with error because ICAO_CODE is > 4 characters', () => {
    return expect(flights({API_TOKEN: apiToken, options: {limit: 1, arr_icao: 'SEAXXX'}})).to.be.rejectedWith(Error);
  });
  it('should be rejected with error because no options are specified', () => {
    return expect(flights({API_TOKEN: apiToken})).to.be.rejectedWith(Error);
  });
  it('should be rejected with error because FLIGHT_DATE is in an incorrect format', () => {
    return expect(flights({API_TOKEN: apiToken, options: {limit: 1, flight_date: '05-25-2020'}})).to.be.rejectedWith(Error);
  });
  it('should be rejected with error because LIMIT is >100', () => {
    return expect(flights({API_TOKEN: apiToken, options: {limit: 1000}})).to.be.rejectedWith(Error);
  });
});
describe('testing successful queries', () => {
  it('should return data of one flight without error', async () => {
    const data = await flights({API_TOKEN: apiToken, options: {limit: 1, flight_number: '2275', arr_icao: 'KLAX'}});
    expect(data.count).to.be.equals(1);
    expect(data['data']).to.be.length(1);
  });
});
