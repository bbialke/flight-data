const VISIT = 'Visit https://aviationstack.com/documentation for more information';

function checkCorrectOptions(options) {
  const {
    limit, iata_code, city_iata_code, icao_code, airport_name, country_name
  } = options;
  if (limit !== undefined && (Number(limit) < 1 || Number(limit) > 100)) {
    throw new Error(`limit value should be between 1-100 ${VISIT}`);
  }
  if (iata_code !== undefined && (iata_code.length > 3)) {
    throw new Error(`iata_code code should be 4 digits long. ${VISIT}`);
  }
  if (city_iata_code !== undefined && (city_iata_code.length > 3)) {
    throw new Error(`city_iata_code code should be 4 digits long. ${VISIT}`);
  }
  if (icao_code !== undefined && (icao_code.length > 4)) {
    throw new Error(`icao_code code should be 4 digits long. ${VISIT}`);
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
    limit, iata_code, city_iata_code, icao_code, airport_name, country_name
  } = options;
  query += limit !== undefined ? `limit=${limit}&` : '';
  query += iata_code !== undefined ? `iata_code=${iata_code}&` : '';
  query += city_iata_code !== undefined ? `city_iata_code=${city_iata_code}&` : '';
  query += icao_code !== undefined ? `icao_code=${icao_code}&` : '';
  query += airport_name !== undefined ? `airport_name=${airport_name}&` : '';
  query += country_name !== undefined ? `country_name=${country_name}&` : '';
  return query;
}

module.exports = formatOptions;
