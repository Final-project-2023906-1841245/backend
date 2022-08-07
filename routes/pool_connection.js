const { Pool } = require("pg");
const config = require("./config.js");
const pool = new Pool(config);

function query(text, values) {
  return pool.query(text, values);
}

module.exports = query;
