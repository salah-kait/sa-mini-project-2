const express = require("express");
//const env = require("env2")(".env");
const isAuthenticated = require("./helpers/authMidleware");

const app = express();
const port = process.env.PORT;


app.get('/stock-up', (req, res) => {
  console.log("stock up requested");
  res.sendStatus(200);
});

app.get('/', (req, res) => {
  res.status(200).send('Ok From Stock Service')
});

app.listen(port, () => {
  console.log(`Stock Service listening at http://localhost:${port}`)
});
