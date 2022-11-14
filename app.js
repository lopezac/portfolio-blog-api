var createError = require("http-errors");
var express = require("express");

var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const cors = require("cors");
const helmet = require("helmet");
require("dotenv").config();

require("./src/middleware/auth");
require("./src/configs/db.config");
var indexRouter = require("./src/routes/index");

var app = express();

const whitelist = [
  "https://lopezaxel.netlify.app",
  "https://lopezaxel-blog-cms.netlify.app",
  "http://localhost:3001",
  "http://localhost:3000",
];
const corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Origin not allowed by CORS"));
    }
  },
};

app.use(cors(corsOptions));
app.use(helmet());
app.use(logger("dev"));
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use("/", indexRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  console.log("err", err);
  res.status(err.status || 500);
  res.json({ err: err });
});

module.exports = app;
