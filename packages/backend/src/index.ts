import mongoose from "mongoose";
import cors from "cors";
import passport from "passport";
import passportLocal from "passport-local";
import cookieParser from "cookie-parser";
import session from "express-session";
import bcrypt from "bcryptjs";
import User from "./models/user";
import dotenv from "dotenv";
import { UserInterface, DatabaseUserInterface } from "./models/UserInterface";
import authRouter from "./rourters/auth";
import postsRouter from "./rourters/posts";
import express from "express";
import * as path from "path";
import { Logger } from "tslog";

const LocalStrategy = passportLocal.Strategy;
const logger: Logger = new Logger({ name: "server" });

dotenv.config();

mongoose.connect(
  process.env.MONGO_URL ||
    `mongodb://mongouser:mongopass@localhost:27017/ads?authSource=admin`,
  {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  (err) => {
    if (err) throw err;
    logger.info("Connected To Mongo");
  }
);

// Middleware
const app = express();
app.use(express.json());

app.use(
  cors({
    methods: "GET,POST,PATCH,DELETE,OPTIONS",
    optionsSuccessStatus: 200,
    origin: "http://localhost",
  })
);

app.use(
  session({
    secret: "secretcode",
    resave: true,
    saveUninitialized: true,
  })
);
app.use(cookieParser());
app.use(passport.initialize());
app.use(passport.session());
// Passport
passport.use(
  new LocalStrategy((username: string, password: string, done) => {
    User.findOne(
      { username: username },
      (err: Error, user: DatabaseUserInterface) => {
        if (err) throw err;
        if (!user) return done(null, false);
        bcrypt.compare(password, user.password, (err, result: boolean) => {
          if (err) throw err;
          if (result === true) {
            return done(null, user);
          } else {
            return done(null, false);
          }
        });
      }
    );
  })
);

passport.serializeUser((user: DatabaseUserInterface, cb) => {
  cb(null, user._id);
});

passport.deserializeUser((id: string, cb) => {
  User.findOne({ _id: id }, (err: Error, user: DatabaseUserInterface) => {
    const userInformation: UserInterface = {
      username: user.username,
      isAdmin: user.isAdmin,
      id: user._id,
    };
    cb(err, userInformation);
  });
});

// Routes
app.use("/auth", authRouter);
app.use("/post", postsRouter);

let basePath = "../../dist/client/dist";
if (process.env.NODE_ENV === "development") {
  basePath = "../../..//dist/client/dist/";
}
app.use(express.static(path.resolve(__dirname, basePath)));

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, basePath, "index.html"));
});

app.listen(process.env.PORT || 4000, () => {
  logger.info("Server Started");
});
