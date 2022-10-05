const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  username: { type: String, required: true, minLength: 2, maxLength: 100 },
  password: { type: String, required: true, minLength: 7 },
  name: { type: String, required: true, minLength: 2, maxLength: 150 },
});

module.exports = mongoose.model("User", UserSchema);
