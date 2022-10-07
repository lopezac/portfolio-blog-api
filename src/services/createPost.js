const Post = require("../models/post");

module.exports = async (title, text, keyword, published, userId) => {
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
    throw Error("Error creating the post");
  }
};
