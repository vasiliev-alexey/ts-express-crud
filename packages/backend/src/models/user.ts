import mongoose from "mongoose";

const user = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
  },
  password: String,
  isAdmin: Boolean,
});

export default mongoose.model("User", user);
