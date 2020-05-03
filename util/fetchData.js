const axios = require('axios').default;

module.exports = async (URL, API_TOKEN, options) => axios.get(`${URL}?access_key=${API_TOKEN}${options}`)
  .then(response => response.data)
  .catch((error) => {
    throw new Error(error);
  });
