const express = require("express");
const bodyParser = require("body-parser");
//const env = require("env2")(".env");
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
    let order_id = req.params.order_id;

    console.log("Payment Service Called for Order ID #"+order_id)
    //get Order details
    try{
        let orderDetails =  await Helpers.makeAuthRequest(req.jwt_token,"GET",{},process.env.ORDER_SERVICE_URL+"/get-order/"+order_id)
        console.log("Order Details",orderDetails );

        let total = orderDetails.data.total;



        //get User Details
        let paymentInfo =  await Helpers.makeAuthRequest(req.jwt_token,"GET",{},process.env.ACCOUNT_SERVICE_URL+"/payment/preferred")

        let payemnt_type = paymentInfo.paymentType;
        //we choose the service by env variable
        let Service_URL = process.env[payemnt_type];
        await Helpers.makeAuthRequest(req.jwt_token,"GET",{},Service_URL+"/pay/"+total)
        //make transaction
        return res.send({
            message:"Payment Service Called for Order ID #"+req.params.order_id,
            total:total,
            type:payemnt_type
        });
    }catch (e) {
        console.log(e);
        return res.status(400).send({
           error:"Bad Request"
        });
    }


},[]);



const port = process.env.PORT
app.listen(port, () => {
    console.log(`Payment Service listening at http://localhost:${port}`)
})