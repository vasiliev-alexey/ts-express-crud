import express from "express";
import User from "../User";
import {
  DatabaseUserInterface,
  UserInterface,
} from "../Interfaces/UserInterface";
import bcrypt from "bcryptjs";
import passport from "passport";
import { Logger } from "tslog";

const logger: Logger = new Logger({ name: "authLogger" });

const authRouter = express.Router();

authRouter.post("/register", async (req, res) => {
  console.log("s00000000000");

  const { username, password } = req?.body;
  if (
    !username ||
    !password ||
    typeof username !== "string" ||
    typeof password !== "string"
  ) {
    res.send("Improper Values");
    return;
  }
  User.findOne({ username }, async (err: Error, doc: DatabaseUserInterface) => {
    if (err) throw err;
    if (doc) res.send("User Already Exists");
    if (!doc) {
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = new User({
        username,
        password: hashedPassword,
        isAdmin: true,
      });
      await newUser.save();
      res.send("success");
    }
  });
});

authRouter.post("/login", passport.authenticate("local"), (req, res) => {
  logger.debug("login login login", req.user);

  if (req.user) {
    const dbUser = req.user as UserInterface;
    res.send({ userId: dbUser.id, userName: dbUser.username });
  } else {
    res.send({});
  }
});

// authRouter.get("/user", (req, res) => {
//   console.log("sssssssssssssssssssssssssssss");
//   res.send(req.user);
//   //res.send({ success: true });
// });

authRouter.get("/logout", (req, res) => {
  req.logout();
  logger.debug("logout logout logout", req.user);
  res.send("success");
});

export default authRouter;
