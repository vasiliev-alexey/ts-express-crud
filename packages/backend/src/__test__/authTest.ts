import request from "supertest";

import { MongoMemoryServer } from "mongodb-memory-server";

import { nanoid } from "nanoid";
import User from "../models/user";
import bcrypt from "bcryptjs";
import * as http from "http";
import { Logger } from "tslog";
import mongoose from "mongoose";

const logger: Logger = new Logger({ name: "test-posts-logger" });

describe("test auth routes", function () {
  let server: http.Server;
  jest.setTimeout(10_000);

  let mongoServer: MongoMemoryServer;

  const authData = {
    username: "root",
    password: "root",
  };

  beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();

    const rndDbName = nanoid();

    process.env.MONGO_URL = `${mongoServer.getUri()}${rndDbName}?authSource=admin`;
    process.env.PORT = "4001";
    const mod = await import("../index");
    server = mod.default;
    User.deleteMany({});

    const newUser = new User({
      username: "root",
      password: await bcrypt.hash("root", 10),
      isAdmin: true,
    });
    await newUser.save();
    logger.debug("saved");
  });

  afterAll(async () => {
    await mongoose.connection.close();

    if (mongoServer) {
      await mongoServer.stop();
    }
    if (server) {
      server.close();
    }
  });

  it("test  auth register with json", (done) => {
    const agent = request.agent(server);

    agent
      .post("/auth/register")
      .send({
        username: "roo1t",
        password: "root",
      })
      .expect((da) => {
        expect(da.error).toBeFalsy();
      })

      .end(done);
  });

  it("test  auth logout with json", (done) => {
    const agent = request.agent(server);

    agent
      .post("/auth/login")
      .send(authData)
      .expect((da) => {
        expect(da.error).toBeFalsy();
      })

      .end(() => {
        agent
          .get("/auth/logout")
          .expect((da) => {
            expect(da.error).toBeFalsy();
          })
          .end(done);
      });
  });

  it("test  auth logout with Error", (done) => {
    const agent = request.agent(server);

    agent
      .post("/auth/login")
      .send({
        username: "root",
        password: "negative",
      })
      .expect((da) => {
        console.log(da.status);
        expect(da.status).toBe(401);
      })

      .end(done);
  });

  it("test  auth logout with Error", (done) => {
    const agent = request.agent(server);

    agent
      .post("/auth/login")
      .send({
        username: "root",
        password: "negative",
      })
      .expect((da) => {
        console.log(da.status);
        expect(da.status).toBe(401);
      })

      .end(done);
  });
});
