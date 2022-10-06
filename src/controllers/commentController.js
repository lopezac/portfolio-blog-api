const Comment = require("../models/comment");

exports.comments_get = (req, res) => {
  res.send("comments_get");
};

exports.comments_post = (req, res) => {
  res.send("comments_post");
};

exports.comments_id_get = (req, res) => {
  res.send("comments_id_get");
};

exports.comments_id_put = (req, res) => {
  res.send("comments_id_put");
};

exports.comments_id_delete = (req, res) => {
  res.send("comments_id_delete");
};
