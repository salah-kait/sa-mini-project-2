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
    res.send('Ok From Payment Service')
},[]);

//place order
app.get('/pay/:order_id',[isAuthenticated],async (req, res) => {
    console.log("Payment Service Called for Order ID #"+req.params.order_id)
    //get Order details
    //get User Details
    //make transaction
    res.send("Payment Service Called for Order ID #"+req.params.order_id)
},[]);



const port = process.env.PORT
app.listen(port, () => {
    console.log(`Payment Service listening at http://localhost:${port}`)
})