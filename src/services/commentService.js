const Comment = require("../models/comment");

async function getComments() {
  try {
    const comments = Comment.find({});
    return comments;
  } catch (err) {
    throw Error("Error while getting comments from database");
  }
}

async function deleteComments() {
  try {
  } catch (err) {
    throw Error("Error deleting comments");
  }
}

module.exports = {
  getComments,
  deleteComments,
};
