const express = require("express");
const bodyParser = require("body-parser");
const env = require("env2")(".env");
const knex = require("./helpers/DBConnection").knex;
const Helpers = require("./helpers/Helpers");
const isAuthenticated = require("./helpers/authMidleware");

const app = express();

//middlewares
app.use(bodyParser.json({ limit: "2mb" }));
app.use(bodyParser.urlencoded({ extended: true }));


//health check
app.get('/',async  (req, res) => {
    res.send('Ok From Credit Cartd Service')
},[]);

//place order
app.get('/pay/:total',[isAuthenticated],async (req, res) => {
    console.log('Paid Succesfuly form Credit Card with Amount:'+req.params.total+"$");
    return res.send('Paid Succesfuly form Credit Card with Amount:'+req.params.total+"$");
},[]);



const port = process.env.PORT
app.listen(port, () => {
    console.log(`Credit Card Service listening at http://localhost:${port}`)
})