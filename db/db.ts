import mongoose from "mongoose";

const connectMongo = async (): Promise<void> => {
  const uri = process.env.MONGO_URI;
  console.log("Using Mongo URI:", uri);

  if (!uri) {
    console.error("❌ MONGO_URI is not defined in environment");
    process.exit(1);
  }

  try {
    const conn = await mongoose.connect(uri);
    console.log("✅ Mongo connected:", conn.connection.host);
  } catch (err: unknown) {
    console.error("❌ Error connecting to MongoDB:", err);
    process.exit(1);
  }
};

export default connectMongo;
