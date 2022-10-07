const {
  createUser,
  createToken,
  hashPassword,
} = require("../services/authService");

exports.sign_up_post = async (req, res) => {
  try {
    const { name, username, password } = req.query;
    const hashedPassword = await hashPassword(password);
    const user = await createUser(name, username, hashedPassword);
    return res.json(user);
  } catch (err) {
    return res.status(503).json({ error: "Error signing up the user" });
  }
};

exports.sign_out_post = (req, res) => {
  delete req.user;
  return res.json({ message: "Signed out successfully!" });
};

exports.sign_in_post = async (req, res) => {
  try {
    const { user } = req;
    const token = await createToken(user);
    return res.json({ user, token });
  } catch (err) {
    return res.status(503).json({ error: "Error signing in the user" });
  }
};
