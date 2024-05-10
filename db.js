/** Database config for database. */

const { Client } = require("pg");
const { database } = require("./config");

let db = new Client({
  user: "postgres",
  password: "postgres",
  database: database,
});

db.connect();

module.exports = db;
