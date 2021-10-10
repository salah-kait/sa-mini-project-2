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
    res.send('Ok From Order Service')
},[]);

//place order
app.post('/place-order',[isAuthenticated],async (req, res) => {
    //create order
    knex('order')
        .insert({
            "user_id":req.user.id
        })
        .then(
            function (id){
                console.log("inserted ID is:"+id);

                let products = req.body.products
                for(let product of products){
                    product[ "order_id"]=id;
                }
                knex('order_products').insert(products).then(()=>{

                    //call shipping
                    //call products
                }) ;

                res.send('order placed, your order id is #'+id);
            }
        )
    //update products api
    //call payment
},[]);

//get order
app.get('/get-order/:order_id',[isAuthenticated],async (req, res) => {
    let order_id = req.params.order_id;
    knex('order_products')
        .where("order_id",order_id)
        .then(
            function (result){
                if(result.length == 0){
                    return res.status(401).send({
                       message:"No Resource"
                    });
                }
                let sum =0;
                for (let p of result){
                    sum+= p.qnt*10;
                }
                res.send({
                    data:{
                        order_id:order_id,
                        total:sum
                    }
                });
            }
        )
    //update products api
    //call payment
},[]);



const port = process.env.PORT
app.listen(port, () => {
    console.log(`Order Service listening at http://localhost:${port}`)
})