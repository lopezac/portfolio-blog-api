require("dotenv").config();
const request = require("supertest");
const express = require("express");
const userRouter = require("../../../src/routes/user.route");
const initializeMongoServer = require("../configs/db.config");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/", userRouter);

beforeAll(async () => {
  await initializeMongoServer();
});
// afterAll(async () => await db.close());

describe("auth", () => {
  jest.setTimeout(15000);
  test("sign in works", (done) => {
    request(app)
      .post("/sign-in")
      .send({ username: "axel", password: "Password.,1" })
      .expect("Content-Type", /json/)
      .expect(200, done());
  });

  test("sign up works", (done) => {
    request(app)
      .post("/sign-up")
      .send({ username: "axel", password: "Password.,1" })
      .expect("Content-Type", /json/)
      .expect((res) => res.body["username"] === "axel")
      .expect(200, done);
  });

  test("sign out works", (done) => {
    request(app)
      .post("/sign-in")
      .send({ username: "axel", password: "Password.,1" })
      .expect(200, done);
  });
});
