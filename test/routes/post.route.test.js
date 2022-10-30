const postRouter = require("../../src/routes/post.route");
const initializeMongoServer = require("../configs/db.config");

require("dotenv").config();
const request = require("supertest");
const express = require("express");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/posts", postRouter);

let token;
beforeAll(async () => {
  await initializeMongoServer();
  request(app)
    .post("/sign-in")
    .send({ username: "axel", password: "Pantaleon;,.1" })
    .end((err, res) => {
      token = res.body.token;
      console.log("token res", token, res.body);
    });
});
// afterAll(async () => await db.close());

describe("posts", () => {
  jest.setTimeout(15000);
  test("throws error if not authenticated at auth endpoints", (done) => {
    request(app).post("/posts").expect(401, done);
  });

  // test("create post works", (done) => {
  //   request(app)
  //     .post("/posts")
  //     .set("Authorization", `Bearer ${token}`)
  //     .send({
  //       title: "test title",
  //       keyword: "react",
  //       text: "textcontent test",
  //       imageUrl: "img",
  //     })
  //     .expect(200, done);
  // });
  // .then(() => {
  //   request(app)
  //     .get("/posts")
  //     .expect(200, [{ title: "test title" }]);
  // });
  // test("delete post work", (done) => {
  // request(app).del(`/posts/${mockPost._id}`);
  // });
});
