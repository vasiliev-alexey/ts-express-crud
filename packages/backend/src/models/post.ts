import mongoose from "mongoose";

const post = new mongoose.Schema({
  title: {
    type: String,
  },
  body: String,
  contacts: String,
  userName: String,
});

export default mongoose.model("Post", post);
