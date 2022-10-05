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
    const token = jwt.sign(req.user, process.env.JWT_KEY);
    return res.json({ user: req.user, token });
  },
  // // if (err) {
  // //   return res.status(400).json({ error: "Error authenticating" });
  // // }
  // console.log("user at authenticate", user);
  // return res.json({ user, token: "bearer logged in boy!" });
  // return res.json("dou");
];
// [
// query("username", "Username must be a string between 2 and 100 chars")
//   .trim()
//   .isLength({ min: 2, max: 100 })
//   .escape(),
// query("password", "Password must be a string between 7 and 150 chars")
//   .trim()
//   .isLength({ min: 7, max: 150 })
//   .escape(),
// const errors = validationResult(req);
// if (!errors.isEmpty()) {
//   return res.status(400).json({ error: "Wrong query parameters" });
// }
// ];
