import mongoose from "mongoose";

const { Schema } = mongoose;

const userSchema = new Schema({
  username: {},
  hash: {},
  salt: {},
});

export default mongoose.model("User", userSchema);
