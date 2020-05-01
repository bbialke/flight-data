const axios = require('axios').default;
let err;

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
    //console.log(response); Do not log full response
    const apiResponse = response.data;
    //Log just the data section of the response
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
      let err = error.response.status;
      console.log(`${err} error occured.`);
    }
  })
  .finally(function () {
    // always executed
    console.log(`Done.`)
  });
  //Reject async promise if an error occured
  if(err){
    return Promise.reject(new Error(err))
  }
}

module.exports = byNumber;
