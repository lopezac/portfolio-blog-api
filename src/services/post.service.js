const Post = require("../models/post.model");
const Comment = require("../models/comment.model");
const { formatTitle, isObjectId } = require("../utils/helper.util");

async function createPost(title, text, keyword, user, imageUrl) {
  try {
    const post = new Post({
      title,
      text,
      keyword,
      user,
      imageUrl,
    });
    await post.save();
    return post;
  } catch (err) {
    throw Error("Error creating the post: ", err);
  }
}

async function getPosts(filterOptions, sortOptions, pageOptions) {
  try {
    const posts = await Post.find(filterOptions)
      .sort(sortOptions)
      .limit(10)
      .skip(pageOptions);
    return posts;
  } catch (err) {
    throw Error("Error getting posts", filterOptions, sortOptions, pageOptions);
  }
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
    const doc = await Post.findById(postId);
    for (let param in newPost) {
      doc[param] = newPost[param];
    }
    return await doc.save();
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
      title: { $regex: `^${title}$`, $options: "i" },
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
