var knex = require('knex')({
  client: 'mysql2',
  connection: {
    host : process.env.DB_HOST,
    user : process.env.DB_USER,
    password : process.env.DB_PASS,
    database : process.env.DB_NAME,
    port: process.env.DB_PORT,
  },
   log: {
    error(message) {
    }
  }
});
exports.knex =knex;
