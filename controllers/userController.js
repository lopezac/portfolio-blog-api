const { validationResult, query } = require("express-validator");

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

    const user = new User({
      name: req.query.name,
      username: req.query.username,
      password: req.query.password,
    });
    user.save((err) => {
      if (err) return res.status(503).json({ error: "Error saving the user" });
      return res.json(user);
    });
  },
];

exports.sign_out_post = (req, res) => {
  res.send("sign out post");
};

exports.sign_in_post = [
  query("username", "Username must be a string between 2 and 100 chars")
    .trim()
    .isLength({ min: 2, max: 100 })
    .escape(),
  query("password", "Password must be a string between 7 and 150 chars")
    .trim()
    .isLength({ min: 7, max: 150 })
    .escape(),
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ error: "Your query parameters are wrong" });
    }

    User.findOne({ username: req.query.username }).exec((err, user) => {
      if (err) {
        return res.status(503).json({ error: "Error searching the user" });
      }
      if (!user) {
        return res.status(400).json({ error: "The user was not found" });
      }
      if (user.password !== req.query.password) {
        return res.status(400).json({ error: "Password is incorrect" });
      }
      return res.json({ user, token: "bearer succesfully signed in" });
    });
  },
];
