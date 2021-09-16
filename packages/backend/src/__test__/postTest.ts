import request, { SuperAgentTest } from "supertest";

import { MongoMemoryServer } from "mongodb-memory-server";
import Post from "../models/post";
import { nanoid } from "nanoid";
import User from "../models/user";
import bcrypt from "bcryptjs";
import * as http from "http";
import { Logger } from "tslog";

const logger: Logger = new Logger({ name: "test-posts-logger" });

describe("test post routes", function () {
  let server: http.Server;
  jest.setTimeout(10_000);
  const rndTitle = nanoid().toString();

  let mongoServer: MongoMemoryServer;

  let postId = "";

  const authData = {
    username: "root",
    password: "root",
  };

  beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();

    const rndDbName = nanoid();

    process.env.MONGO_URL = `${mongoServer.getUri()}${rndDbName}?authSource=admin`;

    const mod = await import("../index");
    server = mod.default;

    Post.deleteMany({});
    User.deleteMany({});

    const post = new Post({ title: rndTitle });
    await post.save();
    postId = post._id;
    const newUser = new User({
      username: "root",
      password: await bcrypt.hash("root", 10),
      isAdmin: true,
    });
    await newUser.save();
    logger.debug("saved");
  });

  afterAll(async () => {
    if (mongoServer) {
      await mongoServer.stop();
    }
    if (server) {
      server.close();
    }
  });

  it("test  get list   with json", (done) => {
    request(server)
      .get("/post/list")
      .expect("Content-Type", /application\/json/)
      .expect(function (response) {
        expect(response.body[0].title).toBe(rndTitle);
      })
      .end(done);
  });

  it("test  post with json", (done) => {
    const agent = request.agent(server);

    agent
      .post("/auth/login")
      .send(authData)
      .expect((da) => {
        expect(da.error).toBeFalsy();
      })
      .end(() => {
        agent
          .post("/post/new")
          .send({
            title: "root",
            body: "root",
          })
          .expect((da) => {
            expect(da.error).toBeFalsy();
          })
          .end(done);
      });
  });

  it("test  post edit with json", (done) => {
    const agent = request.agent(server);

    agent
      .post("/auth/login")
      .send(authData)
      .expect((da) => {
        expect(da.error).toBeFalsy();
      })
      .end(() => {
        agent
          .post("/post/edit")
          .send({
            data: {
              id: postId,
              title: "root",
              body: "root",
            },
          })
          .expect((da) => {
            expect(da.error).toBeFalsy();
          })
          .end(done);
      });
  });

  it("test  post add comment with json", (done) => {
    const agent = request.agent(server);

    agent
      .post("/auth/login")
      .send(authData)
      .expect((da) => {
        expect(da.error).toBeFalsy();
      })
      .end(() => {
        agent
          .post("/post/addComment")
          .send({
            postId: postId,
            addComment: "root",
          })
          .expect((da) => {
            expect(da.error).toBeFalsy();
          })
          .end(done);
      });
  });
});
