const axios = require('axios').default;

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
    console.log(response);
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
    if (error.response) {
      // The request was made and the server responded with a
      // status code that falls out of the range of 2xx
      console.log(error.response.status);
      // return Promise.reject(new Error(error.response.status))
    }
  })
  .finally(function () {
    // always executed
    console.log(`Done.`)
  });
    return Promise.reject(new Error('Error'))
}

module.exports = byNumber;
