const express = require("express");
const router = express.Router();

const postController = require("../controllers/postController");

router.get("/", postController.posts_get);

router.post("/", postController.posts_post);

router.get("/:postId", postController.posts_id_get);

router.put("/:postId", postController.posts_id_put);

router.delete("/:postId", postController.posts_id_delete);

module.exports = router;
