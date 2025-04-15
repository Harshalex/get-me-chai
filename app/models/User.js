import mongoose, { model, Schema } from "mongoose";

const UserSchema = new Schema(
  {
    email: { type: String, required: true }, // Fixed typo
    name: { type: String },
    username: { type: String, required: true }, // Fixed typo
    profilepic: { type: String },
    coverpic: { type: String },
  },
  {
    timestamps: true, // Automatically adds `createdAt` and `updatedAt` fields
  }
);

export default mongoose.models.User || model("User", UserSchema);