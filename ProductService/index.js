const express = require("express");
//const env = require("env2")(".env");
const knex = require("./helpers/DBConnection").knex;
const bodyParser = require("body-parser");
const axios = require("axios");
const isAuthenticated = require("./helpers/authMidleware");

const app = express();
const port = process.env.PORT;
const stockURL = process.env.STOCK_SERVICE_URL;
const productMinQuantity = process.env.PRODUCT_LIMIT;

app.use(bodyParser.json({ limit: "2mb" }));
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/products/new',[isAuthenticated], (req, res) => {
  knex('products').insert(req.body).then((data) => {
    console.log(data);
  });

  res.sendStatus(200);
});

app.get('/products', [isAuthenticated], (req, res) => {
  knex("products").select().then((data) => {
    res.send(data);
  });
});

app.post('/product-ordered', [isAuthenticated], (req, res) => {
  let storedQuantity;
  knex('products').select('quantity').where({ id: req.body.id }).first().then((data) => {
    storedQuantity = data.quantity;
      knex('products')
      .where({ id: req.body.id })
      .update({
        quantity: storedQuantity - req.body.qnt
      }).then(() => {
        console.log(storedQuantity)
        if (storedQuantity < productMinQuantity) {
          axios.get(stockURL + '/stock-up').then((res) => {
            console.log(res.data)
          });
        }
      });
  });

  res.send('Ok From Product Service')
});

app.get('/', (req, res) => {
  console.log('Ok From Product Service');
  res.status(200).send('Ok From Product Service')
});

app.listen(port, () => {
  console.log(`Product Service listening at http://localhost:${port}`)
});
