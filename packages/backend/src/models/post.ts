import mongoose from "mongoose";

export const comment = new mongoose.Schema({
  body: String,
  userName: String,
});

const post = new mongoose.Schema({
  title: {
    type: String,
  },
  body: String,
  contacts: String,
  userName: String,
  comments: [comment],
});

export default mongoose.model("Post", post);
