const { createPool } = require("mysql2/promise");
const { DB_URL } = require("../config.js");

const pool = createPool(DB_URL);

module.exports = { pool };
