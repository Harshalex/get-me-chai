// app/actions/useraction.js
"use server";
import Razorpay from "razorpay";
import Payment from "../models/Payment";
import connectDB from "../db/connectdb";
import User from "../models/User";

export const initiate = async (amount, to_username, paymentform) => {
  await connectDB(); // Ensure DB connection first

  try {
    // Validate amount
    const parsedAmount = Number.parseInt(amount);
    if (isNaN(parsedAmount) || parsedAmount <= 0) {
      throw new Error("Invalid amount provided.");
    }

    // Fetch the user who is receiving the payment to ensure they exist (optional but good practice)
    const receivingUser = await User.findOne({ username: to_username });
    if (!receivingUser) {
      // console.warn(`Recipient user '${to_username}' not found, but proceeding anyway.`);
      // Depending on requirements, you might throw an error here instead:
      // throw new Error(`Recipient user '${to_username}' not found.`);
    }

    // --- Authorization Section ---
    // Read Razorpay API keys from environment variables
    const key_id = process.env.KEY_ID;
    const key_secret = process.env.KEY_SECRET;

    // **ISSUE CHECK 1: Are the environment variables loaded?**
    if (!key_id || !key_secret) {
      console.error("Razorpay Error: KEY_ID or KEY_SECRET environment variable is missing.");
      throw new Error("Razorpay API keys are not configured in environment variables.");
    }
    // --- End of Authorization Section ---

    // Initialize Razorpay instance
    const instance = new Razorpay({ key_id: key_id, key_secret: key_secret });

    // Prepare order options
    const options = {
      amount: parsedAmount, // Amount in smallest currency unit (e.g., paise)
      currency: "INR",
      // receipt: `receipt_order_${new Date().getTime()}`, // Optional: Add a unique receipt ID
    };

    // Create Razorpay order
    console.log("Creating Razorpay order with options:", options);
    const order = await instance.orders.create(options);
    console.log("Razorpay order created:", order);


    // Create a payment record in your database
    await Payment.create({
      oid: order.id,
      amount: parsedAmount / 100, // Store amount in base currency unit (e.g., rupees)
      to_user: to_username,
      name: paymentform.name || "Anonymous",
      message: paymentform.message || "",
      // status: "Pending", // Optional: Add status if your model supports it
    });

    return order; // Return the order details to the frontend

  } catch (error) {
    console.error("Error initiating payment:", error);
    // Check if it's a Razorpay API error
    if (error.statusCode === 401) { // 401 Unauthorized is typical for key issues
       console.error("Razorpay Authorization Failed: Check API Keys (KEY_ID, KEY_SECRET) in .env.local and ensure they are correct and match the mode (Test/Live).");
    }
    // Re-throw or return an error structure
    throw new Error(`Failed to initiate payment: ${error.message}`);
    // Or return { error: true, message: `Failed to initiate payment: ${error.message}` };
  }
};
