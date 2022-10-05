const passport = require("passport");
const LocalStrategy = require("passport-local");
const bcrypt = require("bcryptjs");

const User = require("./models/user");

passport.use(
  new LocalStrategy(function (username, password, done) {
    console.log("username, password at localStrategy", username, password);
    User.findOne({ username: username }).exec((err, user) => {
      if (err) return done(err);
      if (!user) {
        return done(null, false, { message: "The user was not found" });
      }

      bcrypt.compare(password, user.password, function (err, result) {
        if (err) return done(err);
        if (!result) {
          return done(null, false, { message: "Password is incorrect" });
        }
        return done(null, user);
      });
    });
  })
);
