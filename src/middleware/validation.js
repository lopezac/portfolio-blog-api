const { validationResult, query } = require("express-validator");

const throwErrors = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ error: "Your query parameters are wrong" });
  }
};

exports.signUp = [
  query("name", "Name must be between 2 and 150 chars")
    .trim()
    .isLength({ min: 2, max: 150 })
    .escape(),
  query("username", "Username must be between 2 and 100 chars")
    .trim()
    .isLength({ min: 2, max: 100 })
    .escape(),
  query("password", "Password must be between 7 and 150 chars")
    .trim()
    .isLength({ min: 7, max: 150 })
    .matches(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$/)
    .withMessage("Password must one lowercase and uppercase letter, one digit")
    .escape(),
  throwErrors(),
];

exports.signIn = [
  query("username", "Username must be between 2 and 100 chars")
    .trim()
    .isLength({ min: 2, max: 100 })
    .escape(),
  query("password", "Password must be between 7 and 150 chars").trim().escape(),
  throwErrors(),
];
