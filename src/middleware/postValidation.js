const { query, param } = require("express-validator");

const validationErrors = require("./validationErrors");

exports.createPost = [
  query("title", "Title can't be empty must be between 3 and 300 chars")
    .trim()
    .isLength({ min: 3, max: 300 })
    .escape(),
  query("keyword", "Keyword can't be empty must be between 2 and 80 chars")
    .trim()
    .isLength({ min: 2, max: 80 })
    .escape(),
  query("text", "Text can't be empty must be between 3 and 5000 chars")
    .trim()
    .isLength({ min: 3, max: 5000 })
    .escape(),
  query("timestamp").trim(),
  query("published").escape(),
  validationErrors,
];

exports.postId = [
  param("postId", "Post id must be a title as kebal-case or an ObjectId")
    .trim()
    .isLength({ min: 2, max: 300 })
    .escape(),
  validationErrors,
];
