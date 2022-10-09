const passport = require("passport");
var express = require("express");
var router = express.Router();

const postRouter = require("./post.route");
const commentRouter = require("./comment.route");
const userRouter = require("./user.route");

router.use("/", userRouter);
router.use("/posts", postRouter);
router.use("/comments", commentRouter);

module.exports = router;
