const axios = require('axios');

const getResponse = (statusCode, responseData, extra_data = {}) => {
  let date = new Date();
  let data = { status: statusCode };
  data["send"] = responseData;
  data["timestamp"] = {
    format: "UTC",
    value:
      date.getUTCHours() +
      ":" +
      date.getUTCMinutes() +
      ":" +
      date.getUTCSeconds(),
  };

  return {
    statusCode: statusCode,
    body: JSON.stringify({ ...data, ...extra_data }),
    headers: { "Content-Type": "application/json" },
  };
};
exports.getResponse = getResponse;

const makeAuthRequest = (token,bodyParameters,url)=>{
  return new Promise((resolve, reject) => {

    const config = {
      headers: { Authorization: `Bearer ${token}` }
    };

    axios.post(
        url,
        bodyParameters,
        config
    ).then(
        function (response) {
          console.log("------")
          console.log("------")
          console.log(response.data)
          console.log("------")
          return resolve(response.data);
        }
    ).catch(
        function (error) {
          return reject(error.response);
        }
    );
  });
}
module.exports = makeAuthRequest;
