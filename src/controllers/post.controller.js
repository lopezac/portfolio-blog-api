const {
  createPost,
  getPosts,
  getPost,
  getPostComments,
  deletePost,
  updatePost,
} = require("../services/post.service");
const { deleteComments } = require("../services/comment.service");
const { getFilterQuery, getSortQuery } = require("../utils/helper.util");

exports.posts_get = async (req, res) => {
  try {
    const filterQuery = getFilterQuery(req.query);
    const sortQuery = getSortQuery(req.query["sort"]);
    const posts = await getPosts(filterQuery, sortQuery);
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

exports.posts_id_put = async (req, res) => {
  try {
    const { postId } = req.params;
    const newPost = { _id: postId };

    for (const param in req.query) {
      newPost[param] = req.query[param];
    }
    await updatePost(postId, newPost);

    return res.json({ message: "Succesfully updated the post ", postId });
  } catch (err) {
    return res.status(503).json({ error: "Error updating the post", err });
  }
};

exports.posts_id_delete = async (req, res) => {
  try {
    const { postId } = req.params;
    const comments = await getPostComments(postId);

    await deleteComments(comments);
    await deletePost(postId);

    return res.json({ message: "Succesfully deleted post and it's comments" });
  } catch (err) {
    return res.status(503).json({ error: "Error deleting the port ", err });
  }
};
