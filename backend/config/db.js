import mongoose from "mongoose";

const connectDb = async () => {
  try {
    mongoose
      .connect(process.env.MONGODB_URL)
      .then(() => console.log("DB Connected"))
      .catch((err) => console.error("MongoDB Error:", err));
    console.log("db connected");
  } catch (e) {
    console.log("error ocuured", e.message);
  }
};

export default connectDb;
