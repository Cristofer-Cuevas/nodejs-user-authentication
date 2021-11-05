import mongoose from "mongoose";

const { Schema } = mongoose;

const userSchema = new Schema({
  username: String,
  password: {},
});

export default mongoose.model("User", userSchema);
