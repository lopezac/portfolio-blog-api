const mongoose = require("mongoose");

function formatTitle(title) {
  return title.toLowerCase().replaceAll("-", " ");
}

function isObjectId(string) {
  return mongoose.isObjectIdOrHexString(string);
}

module.exports = {
  formatTitle,
  isObjectId,
};
