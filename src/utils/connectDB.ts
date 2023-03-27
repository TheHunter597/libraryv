import mongoose from "mongoose";

export async function connectDB() {
  try {
    await mongoose.connect(process.env["MONGODB_URL"] as string);
  } catch (err) {
    console.log(err);
  }
}
