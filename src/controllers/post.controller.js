const {
  createPost,
  getPosts,
  getPost,
  getPostComments,
  deletePost,
  updatePost,
} = require("../services/post.service");
const { deleteComments } = require("../services/comment.service");
const { getQueryOptions } = require("../utils/helper.util");

exports.posts_get = async (req, res) => {
  try {
    const { filter, sort, page } = await getQueryOptions(req.query);
    const posts = await getPosts(filter, sort, page);

    return res.json(posts);
  } catch {
    return res.status(404).json({ error: "Error getting posts" });
  }
};

exports.posts_post = async (req, res) => {
  try {
    const { title, keyword, text, imageUrl } = req.body;
    const userId = req.user._id;

    const post = await createPost(title, text, keyword, userId, imageUrl);

    return res.json(post);
  } catch (err) {
    return res.status(503).json({ error: "Error saving the post", err });
  }
};

exports.posts_id_get = async (req, res) => {
  try {
    const { postId } = req.params;

    const post = await getPost(postId);

    return res.json(post);
  } catch (err) {
    return res.status(503).json({ error: "Error finding the post", err });
  }
};

exports.posts_comments_get = async (req, res) => {
  try {
    const post = await getPost(req.params.postId);
    const postId = post._id;

    const comments = await getPostComments(postId);

    return res.json(comments);
  } catch (err) {
    return res.status(503).json({ error: "Error finding post comments" });
  }
};

exports.posts_id_put = async (req, res) => {
  try {
    const post = await getPost(req.params.postId);
    const postId = post._id;
    const newPost = { _id: postId };

    for (const param in req.body) {
      newPost[param] = req.body[param];
    }
    const updatedPost = await updatePost(postId, newPost);

    return res.json(updatedPost);
  } catch (err) {
    return res.status(503).json({ error: "Error updating the post", err });
  }
};

exports.posts_id_delete = async (req, res) => {
  try {
    const post = await getPost(req.params.postId);
    const postId = post._id;
    const comments = await getPostComments(postId);

    await deleteComments(comments);
    await deletePost(postId);

    return res.json(postId);
  } catch (err) {
    return res.status(503).json({ error: "Error deleting the port ", err });
  }
};
