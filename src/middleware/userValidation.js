const { body } = require("express-validator");

const validationErrors = require("./validationErrors");

exports.signUp = [
  body("name", "Name must be between 2 and 150 chars")
    .trim()
    .isLength({ min: 2, max: 150 })
    .escape(),
  body("username", "Username must be between 2 and 100 chars")
    .trim()
    .isLength({ min: 2, max: 100 })
    .escape(),
  body("password", "Password must be between 7 and 150 chars")
    .trim()
    .isLength({ min: 7, max: 150 })
    .matches(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$/)
    .withMessage("Password must one lowercase and uppercase letter, one digit")
    .escape(),
  validationErrors,
];

exports.signIn = [
  body("username", "Username must be between 2 and 100 chars")
    .trim()
    .isLength({ min: 2, max: 100 })
    .escape(),
  body("password", "Password must be between 7 and 150 chars").trim().escape(),
  validationErrors,
];
