const express = require("express");
const router = express.Router();

const commentController = require("../controllers/commentController");

router.get("/", commentController.comments_get);

router.post("/", commentController.comments_post);

router.get("/:commentId", commentController.comments_id_get);

router.put("/:commentId", commentController.comments_id_put);

router.delete("/:commentId", commentController.comments_id_delete);

module.exports = router;
