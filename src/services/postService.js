const Post = require("../models/post");
const Comment = require("../models/comment");
const { formatTitle } = require("../utils/helper.util");
const isObjectId = require("./isObjectId");

async function createPost(title, text, keyword, published, userId) {
  try {
    const post = new Post({
      title,
      text,
      keyword,
      published: !!published,
      user: userId,
    });
    post.save();
    return post;
  } catch (err) {
    throw Error("Error creating the post: ", err);
  }
}

async function getPosts() {
  const posts = await Post.find({});
  return posts;
}

async function getPost(postId) {
  if (isObjectId(postId)) {
    return await getPostById(postId);
  } else {
    return await getPostByTitle(postId);
  }
}

async function getPostComments(postId) {
  try {
    const comments = await Comment.find({ post: postId });
    return comments;
  } catch (err) {
    throw Error("Error while getting post comments", err);
  }
}

async function deletePost(postId) {
  try {
    const post = await getPost(postId);
    await Post.findByIdAndDelete(post._id);
  } catch (err) {
    throw Error("Error while deleting post");
  }
}

async function getPostById(postId) {
  try {
    const post = await Post.findById(postId);
    return post;
  } catch (err) {
    throw Error("Error finding the post by id: ", postId);
  }
}

async function getPostByTitle(postId) {
  try {
    const title = formatTitle(postId);
    const post = await Post.findOne({
      title: { $regex: title, $options: "i" },
    });
    return post;
  } catch (err) {
    throw Error("Error finding the post by title: ", postId);
  }
}

module.exports = {
  createPost,
  getPost,
  getPosts,
  getPostComments,
  deletePost,
};
