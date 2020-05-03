const fetchData = require('../util/fetchData');
const formatOptions = require('../util/formatOptions');

function mergeData(fetchedData) {
  const mergedData = { count: 0, data: [] };
  fetchedData.forEach((dataObject) => {
    mergedData.count += dataObject.pagination['count'];
    mergedData.data = mergedData.data.concat(dataObject.data);
  });
  return mergedData;
}

async function flights({
  API_TOKEN, options
}) {
  const URL = 'http://api.aviationstack.com/v1/flights';
  if (API_TOKEN === undefined) {
    throw new Error('No API_TOKEN provided, add your API_TOKEN from http://aviationstack.com/ as an argument');
  }
  const optionQuery = formatOptions(options);
  try {
    const data = [];
    data.push(fetchData(URL, API_TOKEN, optionQuery));
    const fetchedData = await Promise.all(data);
    return mergeData(fetchedData);
  } catch (error) {
    throw error;
  }
}


module.exports = flights;
