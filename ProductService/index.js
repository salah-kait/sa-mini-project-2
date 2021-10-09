const express = require("express");
const env = require("env2")(".env");

const app = express();


const port = process.env.PORT
console.log(port);

app.get('/', (req, res) => {
    res.send('Ok From Product Service')
})

app.listen(port, () => {
    console.log(`Product Service listening at http://localhost:${port}`)
})