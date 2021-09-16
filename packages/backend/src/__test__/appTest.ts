import request from "supertest";

import { MongoMemoryServer } from "mongodb-memory-server";
import Post from "../models/post";
import { nanoid } from "nanoid";
import User from "../models/user";
import bcrypt from "bcryptjs";
import * as http from "http";

describe("GET /user", function () {
  let server: http.Server;
  jest.setTimeout(30000);
  const rndTitle = nanoid().toString();

  let mongoServer: MongoMemoryServer;

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

    const newUser = new User({
      username: "root",
      password: await bcrypt.hash("root", 10),
      isAdmin: true,
    });
    await newUser.save();
    console.log("saved");
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
      .send({
        username: "root",
        password: "root",
      })
      .expect((da) => {
        console.log(da.error);
        console.log(da.header);
      })
      .end(done);
  });
});
