const { validationResult, query } = require("express-validator");
const bcrypt = require("bcryptjs");
const passport = require("passport");
const jwt = require("jsonwebtoken");

const User = require("../models/user");

exports.sign_up_post = [
  query("name", "Name must be between 2 and 150 chars")
    .trim()
    .isLength({ min: 2, max: 150 })
    .escape(),
  query("username", "Username must be between 2 and 100 chars")
    .trim()
    .isLength({ min: 2, max: 100 })
    .escape(),
  query("password")
    .trim()
    .isLength({ min: 7, max: 150 })
    .withMessage("Password must be between 7 and 150 chars")
    .matches(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$/)
    .withMessage("Password must one lowercase and uppercase letter, one digit")
    .escape(),
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ error: "Your query parameters are wrong" });
    }
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
  },
];

exports.sign_out_post = (req, res) => {
  res.send("sign out post");
};

exports.sign_in_post = [
  passport.authenticate("local", { session: false }),
  (req, res) => {
    jwt.sign(req.user.toJSON(), process.env.JWT_KEY, (err, token) => {
      if (err) res.status(503).json({ error: err });
      return res.json({ user: req.user, token });
    });
  },
];
