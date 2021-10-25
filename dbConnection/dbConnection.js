import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const dbConnection = async (cb) => {
  try {
    const URI = process.env.MONGO_URI;

    const mongoConnect = () => {
      mongoose.connect(URI);
    };

    await cb(mongoConnect());
  } catch (err) {
    console.log(err);
  }
};

export default dbConnection;
