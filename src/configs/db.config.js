const mongoose = require("mongoose");

const { NODE_ENV, DB_URL_DEVELOPMENT, DB_URL_PRODUCTION } = process.env;
const mongoDB =
  NODE_ENV === "development" ? DB_URL_DEVELOPMENT : DB_URL_PRODUCTION;

mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error"));

module.exports = db;
