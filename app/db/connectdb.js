import mongoose from "mongoose";

const connectDB = async () => {
  if (mongoose.connection.readyState === 0) {
    try {
      console.log("Connecting to MongoDB with URI:", process.env.MONGO_URI);
      await mongoose.connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      console.log("MongoDB Connected");
    } catch (error) {
      console.error("Error connecting to MongoDB:", error);
      throw new Error(`Database connection failed: ${error.message}`);
    }
  }
};

export default connectDB;