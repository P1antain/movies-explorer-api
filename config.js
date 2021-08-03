require('dotenv').config();

const {
  DB_URL = 'mongodb://localhost:27017/moviesdb', PORT = 3000,
} = process.env;

module.exports = {
  DB_URL,
  PORT,
};
