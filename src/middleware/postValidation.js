const { body, param } = require("express-validator");

const Post = require("../models/post.model");
const validationErrors = require("./validationErrors");

exports.createPost = [
  body("title", "Title can't be empty must be between 3 and 300 chars")
    .trim()
    .isLength({ min: 3, max: 300 })
    .custom(async (value) => {
      const post = await Post.findOne({ title: value });
      if (post !== null) {
        return Promise.reject();
      }
    })
    .withMessage("There is a post with that name, pick another."),
  body("keyword", "Keyword can't be empty must be between 2 and 80 chars")
    .trim()
    .isLength({ min: 2, max: 80 })
    .escape(),
  body("text", "Text can't be empty must be between 3 and 5000 chars")
    .trim()
    .isLength({ min: 3, max: 5000 }),
  validationErrors,
];

exports.updatePost = [
  body("title", "Title must be between 3 and 300 chars")
    .trim()
    .isLength({ min: 3, max: 300 })
    .optional(),
  body("keyword", "Keyword must be between 2 and 80 chars")
    .trim()
    .isLength({ min: 2, max: 80 })
    .optional(),
  body("text", "Text must be between 3 and 5000 chars")
    .trim()
    .isLength({ min: 3, max: 5000 })
    .optional(),
  body("timestamp").trim().optional(),
  body("published").escape().optional(),
  validationErrors,
];

exports.postId = [
  param("postId", "Post id must be a title as kebal-case or an ObjectId")
    .trim()
    .isLength({ min: 2, max: 300 })
    .escape(),
  validationErrors,
];
