function hashPassword() {
  // return bcrypt.hashSync(req.query.password, 10);
  bcrypt.hash(req.query.password, 10, function (err, password) {});
}

module.exports = hashPassword;
