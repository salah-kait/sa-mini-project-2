const express = require("express");
const env = require("env2")(".env");

const app = express();


const port = process.env.PORT
console.log(port);

app.get('/', (req, res) => {
    res.send('Ok From Order Service')
})

app.listen(port, () => {
    console.log(`Order Service listening at http://localhost:${port}`)
})