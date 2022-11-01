const Comment = require("../models/comment.model");
const { getPost } = require("./post.service");

async function createComment(text, username, postIdentifier) {
  try {
    const post = await getPost(postIdentifier);
    const postId = post._id;

    const comment = new Comment({ text, username, post: postId });
    await comment.save();
    return comment;
  } catch (err) {
    throw Error("Error while creating comment", err);
  }
}

async function getComments() {
  try {
    const comments = await Comment.find({});
    return comments;
  } catch (err) {
    throw Error("Error while getting comments from database");
  }
}

async function getComment(commentId) {
  try {
    const comment = await Comment.findById(commentId);
    return comment;
  } catch (err) {
    throw Error("Error getting comment ", commentId);
  }
}

async function deleteComments(comments) {
  try {
    for (const comment of comments) {
      await deleteComment(comment._id);
    }
  } catch (err) {
    throw Error("Error deleting comments");
  }
}

async function updateComment(commentId, newComment) {
  try {
    const doc = await Comment.findById(commentId);
    for (let param in newComment) {
      doc[param] = newComment[param];
    }
    return await doc.save();
  } catch (err) {
    throw Error("Error updating a comment", commentId, newComment);
  }
}

async function deleteComment(commentId) {
  try {
    await Comment.findByIdAndDelete(commentId);
  } catch (err) {
    throw Error("Error deleting comment ", commentId);
  }
}

module.exports = {
  createComment,
  getComments,
  getComment,
  updateComment,
  deleteComment,
  deleteComments,
};
