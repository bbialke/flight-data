const axios = require('axios').default;
let err = 'none';

async function byNumber(API_TOKEN, FLIGHT_NUMBER, LIMIT) {
  //Parameters for the axios request
  const params = {
    access_key: API_TOKEN,
    flight_number: FLIGHT_NUMBER,
    limit: LIMIT
  }
  //Make the request
  console.log("Making request...");
  await axios.get('http://api.aviationstack.com/v1/flights', {params})
  .then(response => {
    // handle success
    //Get the data array from the response, and the number of results returned.
    const apiResponse = response.data['data'];
    const responseCount = response.data['pagination'].count;
    //Log the response and response count
    console.log(apiResponse);
    console.log(`Recieved ${responseCount} responses.`);
    //Return the response data array
    return apiResponse;
  })
  .catch(error => {
    if (error.response) {
      // The request was made and the server responded with a
      // status code that falls out of the range of 2xx
      err = error.response.status;
      console.log(`${err} error occured.`);
    }
  })
  .finally(function () {
    // always executed
    console.log(`Done.`)
  });
  //Reject async promise if an error occured
  if(err !== 'none'){
    return Promise.reject(new Error(err));
  }
}

module.exports = byNumber;
