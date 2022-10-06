const { validationResult, query } = require("express-validator");

const Post = require("../models/post");

exports.posts_get = (req, res) => {
  Post.find({}).exec((err, posts) => {
    if (err) return res.status(404).json({ error: "No posts were found" });
    return res.json(posts);
  });
};

exports.posts_post = [
  query("title", "Title cant be empty must be between 3 and 300 chars")
    .trim()
    .isLength({ min: 3, max: 300 })
    .escape(),
  query("keyword", "Keyword cant be empty must be between 2 and 80 chars")
    .trim()
    .isLength({ min: 2, max: 80 })
    .escape(),
  query("text", "Text cant be empty must be between 3 and 5000 chars")
    .trim()
    .isLength({ min: 3, max: 5000 })
    .escape(),
  query("timestamp").trim(),
  query("published").escape(),

  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res
        .status(400)
        .json({ error: "There are errors with your request" });
    }

    const post = new Post({
      title: req.query.title,
      keyword: req.query.keyword,
      text: req.query.text,
      published: !!req.query.published,
      user: req.user._id,
    });

    console.log("post", post);

    post.save((err) => {
      if (err)
        return res.status(503).json({ error: "Error saving the post", err });
      return res.json(post);
    });
  },
];

exports.posts_id_get = (req, res) => {
  res.json("posts_id_get");
};

exports.posts_id_put = (req, res) => {
  res.json("posts_id_put");
};

exports.posts_id_delete = (req, res) => {
  res.json("posts_id_delete");
};
