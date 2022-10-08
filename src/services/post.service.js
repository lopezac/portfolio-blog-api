const Post = require("../models/post.model");
const Comment = require("../models/comment.model");
const { formatTitle, isObjectId } = require("../utils/helper.util");

async function createPost(title, text, keyword, published, user) {
  try {
    const post = new Post({
      title,
      text,
      keyword,
      published: !!published,
      user,
    });
    await post.save();
    return post;
  } catch (err) {
    throw Error("Error creating the post: ", err);
  }
}

async function getPosts(filterOptions = {}, sortOptions = "timestamp") {
  const posts = await Post.find(filterOptions).sort(sortOptions);
  return posts;
}

async function getPost(postId) {
  let post;
  if (isObjectId(postId)) {
    post = await getPostById(postId);
  } else {
    post = await getPostByTitle(postId);
  }
  return post;
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

async function updatePost(postId, newPost) {
  try {
    await Post.findByIdAndUpdate(postId, newPost);
  } catch (err) {
    throw Error("Error while updating post");
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
  updatePost,
};
