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
