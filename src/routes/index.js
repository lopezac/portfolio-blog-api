const passport = require("passport");
var express = require("express");
var router = express.Router();

const postRouter = require("./post.route");
const commentRouter = require("./comment.route");
const userRouter = require("./user.route");

router.use("/", userRouter);
router.use(
  "/posts",
  passport.authenticate("jwt", { session: false }),
  postRouter
);
router.use(
  "/comments",
  passport.authenticate("jwt", { session: false }),
  commentRouter
);

module.exports = router;
