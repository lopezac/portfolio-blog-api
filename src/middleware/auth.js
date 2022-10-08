const passport = require("passport");
const LocalStrategy = require("passport-local");
const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const bcrypt = require("bcryptjs");

const User = require("../models/user.model");

// Local strategy
passport.use(
  new LocalStrategy(function (username, password, done) {
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

// JWT(JSON Web Token) strategy
const opts = {
  secretOrKey: process.env.JWT_KEY,
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
};
passport.use(
  new JwtStrategy(opts, function (jwt_payload, done) {
    console.log("jwt_payload", jwt_payload);
    User.findById(jwt_payload._id).exec((err, user) => {
      if (err) return done(err);
      if (!user) return done(null, false, { message: "No user found" });
      return done(null, user);
    });
  })
);

// Passport Authentication methods
exports.JWTAuth = passport.authenticate("jwt", { session: false });

exports.LocalAuth = passport.authenticate("local", { session: false });
