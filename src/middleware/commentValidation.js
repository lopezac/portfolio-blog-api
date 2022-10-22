const { body, param } = require("express-validator");

const validationErrors = require("./validationErrors");

exports.createComment = [
  body("post", "Post can't be empty and must be between 3 and 300 chars")
    .trim()
    .isLength({ min: 3, max: 300 })
    .escape(),
  body("text", "Text can't be empty and must be between 2 and 500 chars")
    .trim()
    .isLength({ min: 2, max: 500 })
    .escape(),
  body("username", "Username must be empty or max 125 chars")
    .trim()
    .isLength({ min: 2, max: 125 })
    .escape(),
  body("timestamp").trim().optional(),
  validationErrors,
];

exports.updateComment = [
  body("post", "Post must be between 3 and 300 chars")
    .trim()
    .isLength({ min: 3, max: 300 })
    .escape()
    .optional(),
  body("text", "Text must be between 2 and 500 chars")
    .trim()
    .isLength({ min: 2, max: 500 })
    .escape()
    .optional(),
  body("username", "Username must be between 2 and 125 chars")
    .trim()
    .isLength({ min: 2, max: 125 })
    .escape()
    .optional(),
  body("timestamp").trim().optional(),
  validationErrors,
];

exports.commentId = [
  param("commentId", "Comment id can't be empty, must be a hexadecimal string")
    .trim()
    .isLength({ min: 3, max: 25 })
    .escape(),
  validationErrors,
];
