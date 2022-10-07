const postFind = require("../services/postFind");
const createPost = require("../services/createPost");

exports.posts_get = async (req, res) => {
  try {
    const posts = await postFind.getPosts();
    return res.json(posts);
  } catch {
    return res.status(404).json({ error: "Error getting posts" });
  }
};

exports.posts_post = async (req, res) => {
  try {
    const { title, keyword, text, published } = req.query;
    const userId = req.user._id;
    const post = await createPost(title, text, keyword, published, userId);
    return res.json(post);
  } catch (err) {
    return res.status(503).json({ error: "Error saving the post", err });
  }
};

exports.posts_id_get = async (req, res) => {
  try {
    const { postId } = req.params;
    const post = postFind.getPost(postId);
    return res.json(post);
  } catch (err) {
    return res.status(503).json({ error: "Error finding the post", err });
  }
};

exports.posts_id_put = (req, res) => {
  res.json("posts_id_put");
};

exports.posts_id_delete = (req, res) => {
  res.json("posts_id_delete");
};
