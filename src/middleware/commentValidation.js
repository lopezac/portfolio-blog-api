const { query, param } = require("express-validator");

const validationErrors = require("./validationErrors");

exports.createComment = [
  query("post", "Post can't be empty and must be between 3 and 300 chars")
    .trim()
    .isLength({ min: 3, max: 300 })
    .escape(),
  query("text", "Text can't be empty and must be between 2 and 500 chars")
    .trim()
    .isLength({ min: 2, max: 500 })
    .escape(),
  query(
    "username",
    "Username can't be empty and must be between 2 and 125 chars"
  )
    .trim()
    .isLength({ min: 2, max: 125 })
    .escape(),
  query("timestamp").trim().optional(),
  validationErrors,
];

exports.updateComment = [
  query("post", "Post must be between 3 and 300 chars")
    .trim()
    .isLength({ min: 3, max: 300 })
    .escape()
    .optional(),
  query("text", "Text must be between 2 and 500 chars")
    .trim()
    .isLength({ min: 2, max: 500 })
    .escape()
    .optional(),
  query("username", "Username must be between 2 and 125 chars")
    .trim()
    .isLength({ min: 2, max: 125 })
    .escape()
    .optional(),
  query("timestamp").trim().optional(),
  validationErrors,
];

exports.commentId = [
  param("commentId", "Comment id can't be empty, must be a hexadecimal string")
    .trim()
    .isLength({ min: 3, max: 25 })
    .escape(),
  validationErrors,
];
