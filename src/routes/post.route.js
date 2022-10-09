const express = require("express");
const router = express.Router();

const postController = require("../controllers/post.controller");
const postValidation = require("../middleware/postValidation");
const auth = require("../middleware/auth");

router.get("/", postController.posts_get);

router.post(
  "/",
  auth.JWTAuth(),
  postValidation.createPost,
  postController.posts_post
);

router.get("/:postId", postValidation.postId, postController.posts_id_get);

router.put(
  "/:postId",
  auth.JWTAuth(),
  postValidation.updatePost,
  postController.posts_id_put
);

router.get(
  "/:postId/comments",
  postValidation.postId,
  postController.posts_comments_get
);

router.delete(
  "/:postId",
  auth.JWTAuth(),
  postValidation.postId,
  postController.posts_id_delete
);

module.exports = router;
