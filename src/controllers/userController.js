const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../models/user");

exports.sign_up_post = (req, res) => {
  bcrypt.hash(req.query.password, 10, function (err, password) {
    if (err) {
      return res.status(400).json({ error: "Error hashing the password" });
    }
    const user = new User({
      name: req.query.name,
      username: req.query.username,
      password: password,
    });

    user.save((err) => {
      if (err) {
        return res.status(503).json({ error: "Error saving the user" });
      }
      return res.json(user);
    });
  });
};

exports.sign_out_post = (req, res) => {
  res.send("sign out post");
};

exports.sign_in_post = (req, res) => {
  jwt.sign(req.user.toJSON(), process.env.JWT_KEY, (err, token) => {
    if (err) res.status(503).json({ error: err });
    return res.json({ user: req.user, token });
  });
};
