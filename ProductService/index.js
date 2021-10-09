const express = require("express");
const env = require("env2")(".env");
const knex = require("./helpers/DBConnection").knex;
const bodyParser = require("body-parser");
const Helpers = require("./helpers/Helpers");

const app = express();
const port = process.env.PORT;

app.use(bodyParser.json({ limit: "2mb" }));
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/products/new', (req, res) => {
    knex('products').insert(req.body).then((data) => {
        console.log(data);
    });

    res.sendStatus(200);
});

app.get('/products', (req, res) => {
    knex("products").select().then((data) => {
        res.send(data);
    });  
});

app.post('/product-ordered', (req, res) => {
    knex('products').select('quantity').where({ id: req.body.id }).first().then((data) => {
        return knex('products')
        .where({ id: req.body.id })
        .update({
          quantity: data.quantity - req.body.qnt
        });

        //TODO: Axios to the stock service if quantity belowe thrushold
    });

    res.send('Ok From Order Service')
});

app.get('/', (req, res) => {
  res.send('Ok From Product Service')
});

app.listen(port, () => {
  console.log(`Product Service listening at http://localhost:${port}`)
});
