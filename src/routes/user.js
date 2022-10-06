const express = require("express");
const router = express.Router();

const userController = require("../controllers/userController");
const validation = require("../middleware/validation");
const auth = require("../middleware/auth");

router.post(
  "/sign-in",
  validation.signIn(),
  auth.LocalAuth(),
  userController.sign_in_post
);

router.post("/sign-up", validation.signUp(), userController.sign_up_post);

router.post("/sign-out", userController.sign_out_post);

module.exports = router;
