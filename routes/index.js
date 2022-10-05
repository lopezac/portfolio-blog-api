var express = require("express");
var router = express.Router();

const postRouter = require("./post");
const commentRouter = require("./comment");
const userRouter = require("./user");

router.use("/", userRouter);
router.use("/posts", postRouter);
router.use("/comments", commentRouter);

module.exports = router;
