const mongoose = require("mongoose");

module.exports = (string) => {
  return mongoose.isObjectIdOrHexString(string);
};
