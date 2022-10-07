const {
  createPost,
  getPosts,
  getPost,
  getPostComments,
  deletePost,
} = require("../services/postService");
const { deleteComments } = require("../services/commentService");

exports.posts_get = async (req, res) => {
  try {
    const posts = await getPosts();
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
    const postId = req.params.postId;
    const post = await getPost(postId);
    return res.json(post);
  } catch (err) {
    return res.status(503).json({ error: "Error finding the post", err });
  }
};

exports.posts_comments_get = async (req, res) => {
  try {
    const { postId } = req.params;
    const comments = getPostComments(postId);
    return res.json(comments);
  } catch (err) {
    return res.status(503).json({ error: "Error finding post comments" });
  }
};

exports.posts_id_put = (req, res) => {
  res.json("posts_id_put");
};

exports.posts_id_delete = async (req, res) => {
  try {
    const postId = req.params.postId;
    const post = await getPost(postId);
    const comments = await getPostComments(postId);
    await deleteComments(comments);
    await deletePost(post);
    return res.json({ message: "Succesfully deleted post and it's comments" });
  } catch (err) {
    return res.status(503).json({ error: "Error deleting the port ", err });
  }
};
