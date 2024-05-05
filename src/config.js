const config = require("dotenv").config;
config();

const PORT = process.env.PORT || 8080;
const DB_URL = process.env.DATABASE_URL;

module.exports = {
  PORT,
  DB_URL,
};
