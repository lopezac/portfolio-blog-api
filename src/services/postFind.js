const Post = require("../models/post");
const formatTitle = require("./formatTitle");
const isObjectId = require("./isObjectId");

exports.getPosts = async () => {
  const posts = await Post.find({});
  return posts;
};

exports.getPost = async (postId) => {
  if (isObjectId(postId)) {
    return await getPostById(postId);
  } else {
    return await getPostByTitle(postId);
  }
};

const getPostById = async (postId) => {
  try {
    const post = await Post.findById(postId);
    return post;
  } catch (err) {
    throw Error("Error finding the post by id: ", postId);
  }
};

const getPostByTitle = async (postId) => {
  try {
    const title = formatTitle(postId);
    const post = await Post.findOne({
      title: { $regex: title, $options: "i" },
    });
    return post;
  } catch (err) {
    throw Error("Error finding the post by title: ", postId);
  }
};
