const express = require("express");
const bodyParser = require("body-parser");
//const env = require("env2")(".env");
const isAuthenticated = require("./helpers/authMidleware");

const app = express();

//middlewares
app.use(bodyParser.json({ limit: "2mb" }));
app.use(bodyParser.urlencoded({ extended: true }));


//health check
app.get('/',async  (req, res) => {
    res.send('Ok From Shipping Service')
},[]);

//place order
app.get('/ship/:product_id',[isAuthenticated],async (req, res) => {
    console.log("Product #"+req.params.product_id+" Shipped  Succesfuly to user:"+req.user.id);
    return res.send("Product #"+req.params.product_id+" Shipped  Succesfuly to user:"+req.user.id);
},[]);



const port = process.env.PORT
app.listen(port, () => {
    console.log(`Shipping  Service listening at http://localhost:${port}`)
})