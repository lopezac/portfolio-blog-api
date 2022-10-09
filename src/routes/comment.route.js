const express = require("express");
const router = express.Router();

const commentController = require("../controllers/comment.controller");
const commentValidation = require("../middleware/commentValidation");
const auth = require("../middleware/auth");

router.get("/", commentController.comments_get);

router.post(
  "/",
  auth.JWTAuth(),
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
  auth.JWTAuth(),
  commentValidation.updateComment,
  commentController.comments_id_put
);

router.delete(
  "/:commentId",
  auth.JWTAuth(),
  commentValidation.commentId,
  commentController.comments_id_delete
);

module.exports = router;
