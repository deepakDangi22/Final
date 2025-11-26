import mongoose from "mongoose";

let isConnected = false;

export async function connectDB() {
  if (isConnected) {
    return;
  }

  try {
    const mongoUri = process.env.MONGODB_URI;
    if (!mongoUri) {
      throw new Error("MONGODB_URI is not defined in environment variables");
    }

    const conn = await mongoose.connect(mongoUri);
    isConnected = true;
    console.log("✅ MongoDB connected successfully");
    return conn;
  } catch (error) {
    console.error("❌ MongoDB connection failed:", error);
    throw error;
  }
}

export async function disconnectDB() {
  try {
    await mongoose.disconnect();
    isConnected = false;
    console.log("✅ MongoDB disconnected");
  } catch (error) {
    console.error("❌ MongoDB disconnection failed:", error);
  }
}
