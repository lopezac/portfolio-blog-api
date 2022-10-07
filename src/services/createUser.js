const User = require("../models/user");

module.exports = async (name, username, password) => {
  const user = new User({ name, username, password });
  await user.save();
  return user;
};
