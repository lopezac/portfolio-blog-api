const userRouter = require("../../../src/routes/user.route");
const commentRouter = require("../../../src/routes/comment.route");
const initializeMongoServer = require("../configs/db.config");
const data = require("../data");
const Post = require("../../../src/models/post.model");
const Comment = require("../../../src/models/comment.model");

require("dotenv").config();
const request = require("supertest");
const express = require("express");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/comments", commentRouter);
app.use("/", userRouter);

let token;
beforeAll(async () => {
  await initializeMongoServer();

  // Sign up then sign in and set token
  const user = await request(app)
    .post("/sign-up")
    .send({ username: "axel", password: "Pantaleon;,.1" });
  const res = await request(app)
    .post("/sign-in")
    .send({ username: "axel", password: "Pantaleon;,.1" });
  token = res.body;

  // Create some posts and comments
  for (let comment of data.comments) {
    await Comment.create({ ...comment, post: "507f191e810c19729de860ea" });
  }
});

describe("comments", () => {
  test("get comment work", async () => {
    const comments = await Comment.find({});
    const comment = comments[0];

    await request(app)
      .get(`/comments/${comment._id}`)
      .then(async (res) => {
        // try to do expect(res.body).toEqual(comment);
        expect(res.statusCode).toBe(200);
        expect(res.body._id).toEqual(comment._id);
        expect(res.body.post).toEqual(comment.post);
        expect(res.body.username).toBe(comment.username);
        expect(res.body.text).toBe(comment.text);
        expect(res.body.timestamp).toBe(comment.timestamp);
      });
  });

  test("get comments works", async () => {
    const comments = await Comment.find({});

    await request(app)
      .get(`/comments`)
      .then(async (res) => {
        expect(res.statusCode).toBe(200);
        // if it not works do the long way each property
        expect(res.body).toEqual(comments);
      });
  });

  test("create comment works", async () => {
    const comment = { text: "some random text", username: "some user" };

    request(app)
      .post("/comments")
      .send(comment)
      .then(async (res) => {
        expect(res.status).toBe(200);
        expect(res.body.username).toBe(comment.username);
        expect(res.body.text).toBe(comment.text);
        expect(res.body._id).toBeTruthy();
        expect(res.body.post).toBeTruthy();
      });
  });

  test("update comment works", async () => {
    const comments = await Comment.find({});
    const comment = comments[0];

    await request(app)
      .post(`/comments/${comment._id}`)
      .send({ username: "Another suouao", text: "more less text" })
      .set("Authorization", `Bearer ${token}`)
      .then(async (res) => {
        expect(res.statusCode).toBe(200);
        expect(res.body.title).not.toBe(comment.title);
        expect(res.body.username).not.toBe(comment.username);
        expect(res.body._id).toBe(comment._id);
        expect(res.body.post).toBe(comment.post);
      });
  });

  test("delete comment works", async () => {
    const comments = await Comment.find({});
    const comment = comments[0];

    await request(app)
      .del(`/comments/${comment._id}`)
      .set("Authorization", `Bearer ${token}`)
      .then(async (res) => {
        expect(res.statusCode).toBe(200);

        const foundComment = await Comment.findById(comment._id);
        expect(foundComment).toBeFalsy();
      });
  });
});
