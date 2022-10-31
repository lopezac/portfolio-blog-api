const postRouter = require("../../../src/routes/post.route");
const userRouter = require("../../../src/routes/user.route");
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
app.use("/posts", postRouter);
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
  for (let i = 0; i < data.posts.length; i++) {
    const postData = data.posts[i];
    const post = await Post.create({ ...postData, user: user.body._id });
    await Comment.create({ ...data.comments[i], post: post._id });
  }
});

describe("posts", () => {
  // jest.setTimeout(15000);
  test("throws error if not authenticated at auth endpoints", (done) => {
    request(app).post("/posts").expect(401, done);
  });

  test("create post works", (done) => {
    const post = {
      title: "Hooeuoeuw to use let syntax",
      text: "Since youoeuoe are starting useful for you to use",
      keyword: "JavaScriptoeuoe",
      imageUrl: "someimageo",
    };
    request(app)
      .post("/posts")
      .set("Authorization", `Bearer ${token}`)
      .send(post)
      .then((res) => {
        expect(res.statusCode).toBe(200);
        expect(res.body._id).toBeTruthy();
        expect(res.body.timestamp).toBeTruthy();
        expect(res.body.published).toBeFalsy();
        expect(res.body.title).toBe(post.title);
        expect(res.body.keyword).toBe(post.keyword);
        expect(res.body.text).toBe(post.text);
        expect(res.body.imageUrl).toBe(post.imageUrl);
        done();
      });
  });

  test("delete post works", async () => {
    const posts = await Post.find({});
    const post = posts[0];

    await request(app)
      .del(`/posts/${post._id}`)
      .set("Authorization", `Bearer ${token}`)
      .then(async (res) => {
        expect(res.statusCode).toBe(200);

        const foundPost = await Post.findById(post._id);
        const comments = await Comment.find({ post: post._id });
        expect(foundPost).toBeFalsy();
        expect(comments).toEqual([]);
      });
  });

  test("get post works", async () => {
    const posts = await Post.find({});
    const post = posts[0];

    await request(app)
      .get(`/posts/${post._id}`)
      .then(async (res) => {
        expect(res.statusCode).toBe(200);
        expect(res.body._id).toEqual(post._id);
        expect(res.body.title).toBe(post.title);
        expect(res.body.published).toBeFalsy();
        expect(res.body.keyword).toBe(post.keyword);
        expect(res.body.text).toBe(post.text);
        expect(res.body.imageUrl).toBe(post.imageUrl);
      });
  });
});
