const config = require('dotenv').config;
config();

const PORT = process.env.PORT || 8080;
const DB_HOST = process.env.DATABASE_HOST;
const DB_USER = process.env.DATABASE_USERNAME;
const DB_PASSWORD = process.env.DATABASE_PASSWORD;
const DB_DATABASE = process.env.DATABASE_NAME;
const DB_URL = process.env.DATABASE_URL;

module.exports = {
  PORT,
  DB_URL,
  DB_HOST,
  DB_USER,
  DB_PASSWORD,
  DB_DATABASE,
};
