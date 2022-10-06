const passport = require("passport");
var express = require("express");
var router = express.Router();

const postRouter = require("./post");
const commentRouter = require("./comment");
const userRouter = require("./user");

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
