import mongoose, { Schema, model } from "mongoose";

const PaymentSchema = new Schema(
  {
    oid: { type: String, required: true },
    to_user: { type: String, required: true }, // Ensure this matches
    amount: { type: Number, required: true },
    name: { type: String, required: true },
    message: { type: String },
    done: { type: Boolean, default: false },
  },
  {
    timestamps: true, // Automatically adds `createdAt` and `updatedAt` fields
  }
);

export default mongoose.models.Payment || model("Payment", PaymentSchema);