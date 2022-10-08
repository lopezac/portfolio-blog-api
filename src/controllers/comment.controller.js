const {
  createComment,
  getComments,
  getComment,
  updateComment,
  deleteComment,
} = require("../services/comment.service");

exports.comments_post = async (req, res) => {
  try {
    const { text, username, post } = req.query;
    const comment = await createComment(text, username, post);
    return res.json(comment);
  } catch (err) {
    return res.status(400).json({ error: "Error while creating a comment" });
  }
};

exports.comments_get = async (req, res) => {
  try {
    const comments = await getComments();
    return res.json(comments);
  } catch (err) {
    return res.status(503).json({ error: "Error getting comments", err });
  }
};

exports.comments_id_get = async (req, res) => {
  try {
    const { commentId } = req.params;
    const comment = await getComment(commentId);
    return res.json(comment);
  } catch (err) {
    return res.status(503).json({ error: "Error getting a comment" });
  }
};

exports.comments_id_put = async (req, res) => {
  try {
    const { commentId } = req.params;
    const newComment = { _id: commentId };

    for (const param in req.query) {
      newComment[param] = req.query[param];
    }
    await updateComment(commentId, newComment);

    return res.json({ message: "Succesfully updated the comment", commentId });
  } catch (err) {
    return res.status(503).json({ error: "Error updating a comment" });
  }
};

exports.comments_id_delete = async (req, res) => {
  try {
    const { commentId } = req.params;
    await deleteComment(commentId);
    return res.json({ message: `Successfully deleted comment ${commentId}` });
  } catch (err) {
    return res.status(503).json({ error: "Error deleting a comment" });
  }
};
