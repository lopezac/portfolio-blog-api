const jwt = require("jsonwebtoken");

module.exports = async (user) => {
  const token = await jwt.sign(user.toJSON(), process.env.JWT_KEY);
  return token;
};
