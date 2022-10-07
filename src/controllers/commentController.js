const { getComments } = require("../services/commentService");

exports.comments_get = async (req, res) => {
  try {
    const comments = await getComments();
    return res.json({ comments });
  } catch (err) {
    return res.status(503).json({ error: "Error getting comments", err });
  }
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
