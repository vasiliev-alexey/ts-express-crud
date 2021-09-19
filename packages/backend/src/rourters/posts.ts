import express, { NextFunction, Request, Response } from "express";
import Post from "../models/post";

import { UserInterface } from "../models/UserInterface";
import { Logger } from "tslog";

const logger: Logger = new Logger({ name: "posts-logger" });

const postsRouter = express.Router();

function authChecker(req: Request, res: Response, next: NextFunction) {
  logger.debug("checker", req.path);
  if (req.user || req.path === "/auth") {
    logger.debug("checker ->");
    next();
  } else {
    logger.debug("checker !!!");
    res.status(404).send({ message: "Not auth" });
  }
}

postsRouter.post("/new", authChecker, async (req, res) => {
  logger.debug("post", "/new", req?.body);
  logger.info("post", "/new", req?.body);

  const { title, contacts, body } = req?.body;

  const user = req.user as UserInterface;

  await Post.create(
    { title, contacts, body, userName: user.username },
    (err, doc) => {
      if (err) {
        logger.error(err);
        res.status(404).send({ message: err.message });
      }

      logger.debug("new post saved");
      res.status(201).send({ id: doc.id });
    }
  );
});

postsRouter.post("/edit", authChecker, async (req, res) => {
  logger.debug("post", "/edit", req?.body.data);
  const { title, contacts, body, id } = req?.body.data;

  await Post.findByIdAndUpdate(
    { _id: id },
    {
      title,
      contacts,
      body,
    }
  );
  res.send("success");
});

postsRouter.post("/addComment", authChecker, async (req, res) => {
  logger.debug("post", "/addComment", req?.body);
  const { postId, commentText } = req?.body;
  const user = req.user as UserInterface;
  const data = await Post.findOne({ _id: postId });

  const newComment = data.comments.create({
    body: commentText,
    userName: user.username,
  });

  data.comments.push(newComment);
  data.save();

  res.send("success");
});

postsRouter.get("/listInfo", async (req, res) => {
  logger.debug("post", "/listInfo");
  const dataCnt = await Post.count();
  logger.debug("data ", dataCnt);
  res.status(200).send({ total: dataCnt });
});

postsRouter.get("/list", async (req, res) => {
  logger.debug("post", "/list", req.query);

  const limitData = Number(req.query.limit);
  const start = Number(req.query.start);

  const data = await Post.find().skip(start).limit(limitData);
  logger.debug("data ", data);
  res.status(200).send(data);
});

postsRouter.get("/ad", async (req, res) => {
  logger.debug("post", "/ad", req.query.id);
  const data = await Post.findOne({ _id: req.query.id });
  res.status(200).send(data);
});

export default postsRouter;
