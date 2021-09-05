import express, { NextFunction, Request, Response } from "express";
import Post from "../models/post";
import { Logger } from "tslog";
import { UserInterface } from "../Interfaces/UserInterface";

const logger: Logger = new Logger({ name: "posts-logger" });

const postsRouter = express.Router();

function authChecker(req: Request, res: Response, next: NextFunction) {
  console.log("sss");

  if (req.user || req.path === "/auth") {
    next();
  } else {
    res.status(404).send({ message: "Not auth" });
  }
}

postsRouter.post("/new", authChecker, async (req, res) => {
  const { title, contacts, body } = req?.body;

  const user = req.user as UserInterface;

  await Post.insertMany({ title, contacts, body, userName: user.username });

  logger.debug("new new new user", title, contacts, req.user);
  res.send("success");
});

postsRouter.post("/edit", authChecker, async (req, res) => {
  const { title, contacts, body, id } = req?.body;

  await Post.findByIdAndUpdate(
    { _id: id },
    {
      title,
      contacts,
      body,
    }
  );

  logger.debug("new new new user", title, contacts, req.user);
  res.send("success");
});

postsRouter.get("/list", async (req, res) => {
  const data = await Post.find();

  logger.debug("data ", data);
  res.send(data);
});

postsRouter.get("/ad", async (req, res) => {
  console.log("~~", req.params);
  console.log("~~", req.query.id);
  const data = await Post.findOne({ _id: req.query.id });
  //  logger.debug("data ", data);
  res.send(data);
});

export default postsRouter;
