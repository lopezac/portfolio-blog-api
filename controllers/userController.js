const User = require("../models/user");

exports.sign_in_get = (req, res, next) => {
  res.send("sign in get");
};

exports.sign_in_post = (req, res, next) => {
  res.send("sign in post");
};

exports.sign_out_post = (req, res, next) => {
  res.send("sign out post");
};

exports.sign_up_get = (req, res, next) => {
  res.send("sign_up_get get");
};

exports.sign_up_post = (req, res, next) => {
  res.send("sign_up_post");
};
