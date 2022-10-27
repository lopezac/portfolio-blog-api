const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const User = require("../models/user.model");

async function hashPassword(password) {
  return await bcrypt.hash(password, 10);
}

async function createToken(user) {
  try {
    const token = await jwt.sign(user.toJSON(), process.env.JWT_KEY);
    return token;
  } catch (err) {
    throw Error("Error creating token");
  }
}

async function createUser(name, username, password) {
  const user = new User({ name, username, password });
  await user.save();
  return user;
}

module.exports = {
  hashPassword,
  createToken,
  createUser,
};
