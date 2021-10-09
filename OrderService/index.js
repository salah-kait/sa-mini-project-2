const express = require("express");
const env = require("env2")(".env");
const knex = require("./helpers/DBConnection").knex;
const Helpers = require("./helpers/Helpers");
const isAuthenticated = require("./helpers/authMidleware");

const app = express();



app.get('/',[isAuthenticated],async  (req, res) => {
    let queryBuilder = knex("order");
    let data = await queryBuilder.where("id", 1).first();
    console.log("========")
    console.log(data.id)
    console.log("========")
    res.send('Ok From Order Service')
},[]);



const port = process.env.PORT
app.listen(port, () => {
    console.log(`Order Service listening at http://localhost:${port}`)
})