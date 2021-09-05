import express from "express";

const testRouter = express.Router();

testRouter.get("/list", (req, res) => {
  console.log("sss");
  res.send({ sss: 111 });
});

export default testRouter;
