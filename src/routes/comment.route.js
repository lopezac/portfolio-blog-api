const express = require("express");
const router = express.Router();

const commentController = require("../controllers/comment.controller");
const commentValidation = require("../middleware/commentValidation");

router.get("/", commentController.comments_get);

router.post(
  "/",
  commentValidation.createComment,
  commentController.comments_post
);

router.get(
  "/:commentId",
  commentValidation.commentId,
  commentController.comments_id_get
);

router.put(
  "/:commentId",
  commentValidation.updateComment,
  commentController.comments_id_put
);

router.delete(
  "/:commentId",
  commentValidation.commentId,
  commentController.comments_id_delete
);

module.exports = router;
