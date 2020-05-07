const moment = require('moment');

const VISIT = 'Visit https://aviationstack.com/documentation for more information';
const DATE_ERROR = 'must be in the valid format YYYY-MM-DD.';

function validDate(date) {
  return moment(date, 'YYYY-MM-DD', true).isValid();
}

function checkCorrectOptions(options) {
  const {
    limit, flight_status, flight_date, dep_iata, arr_iata, dep_icao, arr_icao, airline_name, flight_number, flight_iata, flight_icao
  } = options;
  if (flight_date !== undefined && !validDate(date_from)) {
    throw new Error(`flight_date ${DATE_ERROR} ${VISIT}`);
  }
  if (flight_status !== undefined && ['scheduled', 'active', 'landed', 'cancelled', 'incident', 'diverted'].indexOf(sort_by) === -1) {
    throw new Error(`flight_status does not have a valid option. ${VISIT}`);
  }
  if (limit !== undefined && (Number(limit) < 1 || Number(limit) > 100)) {
    throw new Error(`limit value should be between 1-100 ${VISIT}`);
  }
  if (dep_icao !== undefined && (dep_icao.length > 4)) {
    throw new Error(`dep_icao code should be 4 digits long. ${VISIT}`);
  }
  if (arr_icao !== undefined && (arr_icao.length > 4)) {
    throw new Error(`arr_icao code should be 4 digits long. ${VISIT}`);
  }
}

function formatOptions(options) {
  let query = '&';
  if (options === undefined) {
    throw new Error(`Please specify options for the query. ${VISIT}`)
  }
  try {
    checkCorrectOptions(options);
  } catch (error) {
    throw error;
  }
  const {
    limit, flight_status, flight_date, dep_iata, arr_iata, dep_icao, arr_icao, airline_name, flight_number, flight_iata, flight_icao
  } = options;
  query += limit !== undefined ? `limit=${limit}&` : '';
  query += flight_status !== undefined ? `flight_status=${flight_status}&` : '';
  query += flight_date !== undefined ? `flight_date=${flight_date}&` : '';
  query += dep_iata !== undefined ? `dep_iata=${dep_iata}&` : '';
  query += arr_iata !== undefined ? `arr_iata=${arr_iata}&` : '';
  query += dep_icao !== undefined ? `dep_icao=${dep_icao}&` : '';
  query += arr_icao !== undefined ? `arr_icao=${arr_icao}&` : '';
  query += airline_name !== undefined ? `airline_name=${airline_name}&` : '';
  query += flight_number !== undefined ? `flight_number=${flight_number}&` : '';
  query += flight_iata !== undefined ? `flight_iata=${flight_iata}&` : '';
  query += flight_icao !== undefined ? `flight_icao=${flight_icao}&` : '';
  return query;
}

module.exports = formatOptions;
