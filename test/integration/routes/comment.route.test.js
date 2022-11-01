const userRouter = require("../../../src/routes/user.route");
const commentRouter = require("../../../src/routes/comment.route");
const {
  initializeMongoServer,
  clearMongoServer,
  closeMongoServer,
} = require("../configs/db.config");
const data = require("../data");
const Comment = require("../../../src/models/comment.model");
const Post = require("../../../src/models/post.model");

require("dotenv").config();
const request = require("supertest");
const express = require("express");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/comments", commentRouter);
app.use("/", userRouter);

let token;
beforeAll(async () => await initializeMongoServer());
beforeEach(async () => {
  // Sign up then sign in and set token
  const user = await request(app)
    .post("/sign-up")
    .send({ username: "axel", password: "Pantaleon;,.1" });
  const res = await request(app)
    .post("/sign-in")
    .send({ username: "axel", password: "Pantaleon;,.1" });
  token = res.body;

  // Create some posts and comments
  for (let i = 0; i < data.posts.length; i++) {
    const postData = data.posts[i];
    const post = await Post.create({ ...postData, user: user.body._id });
    await Comment.create({ ...data.comments[i], post: post._id });
  }
});
afterEach(async () => await clearMongoServer());
afterAll(async () => await closeMongoServer());

describe("comments", () => {
  test("create comment works", async () => {
    const posts = await Post.find({});
    const post = posts[0];
    const comment = {
      text: "some random text",
      username: "some user",
      post: post._id,
    };

    await request(app)
      .post("/comments")
      .send(comment)
      .then(async (res) => {
        expect(res.statusCode).toBe(200);
        expect(res.body.username).toBe(comment.username);
        expect(res.body.text).toBe(comment.text);
        expect(res.body._id).toBeTruthy();
        expect(res.body.post).toBeTruthy();
      });
  });

  test("get comment work", async () => {
    const comments = await Comment.find({});
    const comment = comments[0];

    await request(app)
      .get(`/comments/${comment._id}`)
      .then(async (res) => {
        // try to do expect(res.body).toEqual(comment);
        expect(res.statusCode).toBe(200);
        expect(res.body._id).toBeTruthy();
        expect(res.body.post).toBeTruthy();
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
        for (let i = 0; i < comments.length; i++) {
          expect(comments[i].text).toBe(res.body[i].text);
          expect(comments[i].timestamp).toBe(res.body[i].timestamp);
          expect(comments[i].username).toBe(res.body[i].username);
          expect(comments[i]._id).toBeTruthy();
          expect(comments[i].post).toBeTruthy();
        }
      });
  });

  test("update comment works", async () => {
    const comments = await Comment.find({});
    const comment = comments[0];

    await request(app)
      .put(`/comments/${comment._id}`)
      .send({ username: "Another suouao", text: "more less text" })
      .set("Authorization", `Bearer ${token}`)
      .then(async (res) => {
        expect(res.statusCode).toBe(200);
        expect(res.body.text).not.toBe(comment.text);
        expect(res.body.username).not.toBe(comment.username);
        expect(res.body._id).toBeTruthy();
        expect(res.body.post).toBeTruthy();
        expect(res.body.timestamp).toBe(comment.timestamp);
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
