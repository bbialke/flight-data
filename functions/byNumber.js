const axios = require('axios');

async function byNumber(API_TOKEN, FLIGHT_NUMBER) {
  //Parameters for the axios request
  const params = {
    access_key: API_TOKEN,
    flight_number: FLIGHT_NUMBER
  }
  //Make the request
  console.log("Making request...");
  axios.get('http://api.aviationstack.com/v1/flights', {params})
  .then(response => {
    // handle success
    const apiResponse = response.data;
    console.log(apiResponse);
    apiResponse['data'].forEach(flight => {
      if (flight['flight_status'] == 'active') {
        console.log(`${flight['airline']['name']} flight ${flight['flight']['iata']}`,
        `from ${flight['departure']['airport']} (${flight['departure']['iata']})`,
        `to ${flight['arrival']['airport']} (${flight['arrival']['iata']}) is in the air.`);
      }
    });
  })
  .catch(error => {
    // handle error
    console.log(error);
    throw error;
  })
  .finally(function () {
    // always executed
    console.log(`Done.`)
  });
}
module.exports = byNumber;
