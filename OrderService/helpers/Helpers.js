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

const makeAuthRequest = (token,method,bodyParameters,url)=>{
  return new Promise((resolve, reject) => {

    const config = {
      url:url,
      method:method,
      headers: { Authorization: `Bearer ${token}` },
      data:bodyParameters
    };
    console.log("Making Serivce Request");
    console.log(config);

    axios.request(
        config
    ).then(
        function (response) {
          resolve(response.data);
        }
    ).catch(
        function (error) {
          console.log(error);
          reject(error.response);
        }
    );
  });
}
exports.makeAuthRequest = makeAuthRequest;
