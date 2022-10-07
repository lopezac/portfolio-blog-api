const express = require("express");
const router = express.Router();

const postController = require("../controllers/postController");
const postValidation = require("../middleware/postValidation");

router.get("/", postController.posts_get);

router.post("/", postValidation.createPost, postController.posts_post);

router.get("/:postId", postValidation.postId, postController.posts_id_get);

router.put("/:postId", postValidation.postId, postController.posts_id_put);

router.delete(
  "/:postId",
  postValidation.postId,
  postController.posts_id_delete
);

module.exports = router;
