"use client";
import React, { useState } from "react";
import Script from "next/script";
import Image from "next/image";
import Background from "../../public/Background.jpg";
// import avatar from "../../public/avatar.gif"; // Assuming unused if no loop for supporters
import Cat from "../../public/cat.jpg";
import { initiate } from "../actions/useraction"; // Ensure correct path to server action

// import { useSession } from "next-auth/react"; // Currently unused

function PaymentPage({ username }) {
  // const { data: session } = useSession();
  const [paymentform, setPaymentForm] = useState({
    name: "",
    message: "",
    amount: "", // Store amount input as string
  });
  const [loading, setLoading] = useState(false); // Add loading state for feedback

  // Handle input changes
  const handleChange = (e) => {
    setPaymentForm({ ...paymentform, [e.target.name]: e.target.value });
  };

  // --- CORRECTED Handle Payment ---
  const handlePaymentAttempt = async ({ isCustomAmount = false, fixedAmount = 0 }) => {
    setLoading(true);
    let amountInRupees;

    if (isCustomAmount) {
      // --- Frontend Validation ---
      amountInRupees = parseFloat(paymentform.amount);
      if (
        !paymentform.amount || // Check if empty
        isNaN(amountInRupees) || // Check if not a valid number
        amountInRupees <= 0      // Check if zero or negative
      ) {
        alert("Please enter a valid positive amount.");
        setLoading(false);
        return;
      }
    } else {
      // For fixed buttons, the amount passed is already in paise
      // Convert it back to Rupees just for consistency in variable naming here
      amountInRupees = fixedAmount / 100;
    }

    // Convert amount to smallest unit (paise)
    const amountInPaise = Math.round(amountInRupees * 100);

    // Ensure it's treated as a number by Razorpay if needed, though string usually works
    const razorpayAmount = Number(amountInPaise);

    try {
      // Call backend to initiate payment (Pass amount in paise)
      console.log(`Calling initiate with amount (paise): ${razorpayAmount}, username: ${username}`);
      const orderDetails = await initiate(razorpayAmount.toString(), username, paymentform); // Pass paise amount as string or number

      if (!orderDetails || !orderDetails.id) {
         throw new Error("Failed to get order details from server.");
      }

      const orderId = orderDetails.id;
      console.log("Received Order ID:", orderId);

      // Check if Razorpay Key ID is available
      const razorpayKeyId = process.env.NEXT_PUBLIC_KEY_ID;
      const callbackUrl = process.env.NEXT_PUBLIC_URL // Base URL for callback
      if (!razorpayKeyId) {
        console.error("Razorpay Key ID (NEXT_PUBLIC_KEY_ID) is not defined in environment variables.");
        alert("Payment gateway is not configured correctly. Please contact support.");
        setLoading(false);
        return;
      }
       if (!callbackUrl) {
        console.error("NEXT_PUBLIC_URL is not defined in environment variables for callback.");
        alert("Application URL is not configured correctly. Please contact support.");
        setLoading(false);
        return;
      }

      // Razorpay options
      const options = {
        key: razorpayKeyId, // Use NEXT_PUBLIC_ prefixed environment variable
        amount: razorpayAmount, // Amount MUST be in paise (integer)
        currency: "INR",
        name: "Get Me Chai", // Your business name
        description: `Payment to ${username}`,
        image: "/tea.gif", // Your logo URL (can be relative path in public)
        order_id: orderId, // Order ID from backend
        callback_url: `${callbackUrl}/api/razorpay`, // Construct callback URL using NEXT_PUBLIC_URL
        prefill: {
          // Optional: Prefill user details if available, e.g., from session
          // name: session?.user?.name || "",
          // email: session?.user?.email || "",
          // contact: "" // Add contact if you have it
        },
        notes: {
          // Optional notes
          "project_name": "Get Me Chai",
          "paying_to_username": username,
          "from_name": paymentform.name,
          "message": paymentform.message
        },
        theme: {
          color: "#3399cc",
        },
        handler: function (response) {
          // Handle successful payment on client-side
          console.log("Razorpay Success Response:", response);
          alert(`Payment successful! Payment ID: ${response.razorpay_payment_id}`);
          // You might want to clear the form or redirect here
          setPaymentForm({ name: "", message: "", amount: "" });
        },
        modal: {
          ondismiss: function () {
            console.log("Payment modal dismissed.");
            // alert("Payment process was cancelled."); // Optional: Inform user
          },
        },
      };

      // Initialize and open Razorpay checkout
      const rzp1 = new window.Razorpay(options); // Use window.Razorpay

       // Handle Razorpay payment errors
       rzp1.on('payment.failed', function (response){
         console.error("Razorpay Payment Failed:", response.error);
          alert(`Payment Failed: ${response.error.description || response.error.reason || 'Unknown Error'}\nCode: ${response.error.code}`);
          // Optionally log more details: response.error.metadata
       });


      rzp1.open();

    } catch (error) {
      // Catch errors from 'initiate' or other issues before Razorpay opens
      console.error("Error during payment process:", error);
      alert(`Error: ${error.message || "Could not initiate payment."}`);
    } finally {
        setLoading(false); // Ensure loading state is reset
    }
  };

  return (
    <>
      {/* Ensure Razorpay script is loaded */}
      <Script src="https://checkout.razorpay.com/v1/checkout.js" />

      {/* Your existing JSX structure */}
      <div className="h-full">
        {/* Background and Profile Image */}
        <div className="h-[42vh] -z-0 w-full relative">
           <Image priority className="w-full h-full object-cover bg-center" src={Background} alt="background" width={1500} height={600} /> {/* Add dimensions for better performance */}
          <div className="absolute w-24 h-24 border-2 border-white shadow-md -bottom-12 rounded-full left-1/2 transform -translate-x-1/2 overflow-hidden"> {/* Improved styling */}
             <Image src={Cat} className="w-full h-full object-cover bg-center" alt="User Avatar" width={96} height={96} /> {/* Add dimensions */}
          </div>
        </div>

        {/* User Info Section */}
         <div className="text-center pt-16 pb-12"> {/* Increased top padding */}
           <h1 className="font-bold text-2xl"> {/* Use h1 for main username */}
             <span>@</span>{username}
           </h1>
          {/* Example details - fetch dynamically if needed */}
          <p className="text-slate-600 text-sm mt-1">Helping creators earn online.</p>
          <div className="text-slate-500 text-xs flex gap-3 justify-center mt-2">
            <span>9,719 members</span>
            <span>&bull;</span> {/* Use bullet for separator */}
            <span>82 Posts</span>
            <span>&bull;</span>
            <span>$15,450 / release</span>
          </div>
        </div>

        {/* Supporters and Payments Section */}
        <div className="max-w-4xl mx-auto flex flex-col md:flex-row gap-4 px-4 pb-12"> {/* Responsive layout */}

          {/* Supporters Section (Example structure) */}
           <div className="supporters md:w-1/2 bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white px-4 py-6 rounded-lg shadow">
             <h2 className="font-bold text-xl py-2.5 mb-2">Recent Supporters</h2>
             <ul className="text-sm space-y-3 px-2"> {/* Use space-y for spacing */}
               {/* Example supporter - loop through actual data here */}
               <li className="flex items-center gap-3">
                 <Image width={32} height={32} className="rounded-full" src={Cat} alt="avatar" /> {/* Use Cat as placeholder */}
                 <div>
                   <span className="font-semibold">Mikey</span> Donated <span className="font-bold text-green-600">₹30</span>
                   <p className="text-xs text-slate-500 dark:text-slate-400 italic">"Keep up the great work!"</p> {/* Example message */}
                 </div>
               </li>
                <li className="flex items-center gap-3">
                 <Image width={32} height={32} className="rounded-full" src={Cat} alt="avatar" />
                 <div>
                   <span className="font-semibold">Sarah</span> Donated <span className="font-bold text-green-600">₹10</span>
                 </div>
               </li>
               {/* Add more supporters... */}
             </ul>
           </div>

          {/* Payments Section */}
           <div className="payments md:w-1/2 bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white p-4 rounded-lg shadow">
             <h2 className="font-bold text-xl py-2.5 mb-2">Make a Payment</h2>
             <div className="flex flex-col gap-3"> {/* Increased gap */}
              <input
                name="name"
                onChange={handleChange}
                value={paymentform.name}
                type="text" // Specify type
                placeholder="Your Name (Optional)"
                className="rounded-lg text-sm px-4 py-2 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                name="message"
                onChange={handleChange}
                value={paymentform.message}
                type="text" // Specify type
                placeholder="Say Something (Optional)"
                className="rounded-lg text-sm px-4 py-2 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                name="amount"
                onChange={handleChange}
                value={paymentform.amount}
                type="number" // Use type="number" for better UX on mobile
                placeholder="Enter Amount (e.g., 10 for ₹10)"
                className="rounded-lg text-sm px-4 py-2 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                min="1" // Prevent negative numbers via browser
              />
            </div>
            <div className="py-4"> {/* Increased padding */}
               <button
                 onClick={() => handlePaymentAttempt({ isCustomAmount: true })} // Use wrapper function
                 disabled={loading} // Disable button when loading
                 type="button"
                 className={`w-full text-white bg-gradient-to-br from-blue-600 to-purple-600 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 disabled:opacity-50 disabled:cursor-not-allowed`} // Added disabled styles
              >
                 {loading ? 'Processing...' : 'Pay Custom Amount'} {/* Show loading text */}
              </button>
            </div>
             <p className="text-center text-xs text-slate-500 dark:text-slate-400 mb-3">Or choose a preset amount:</p> {/* Added helper text */}
            <div className="flex flex-wrap justify-center gap-2"> {/* Allow wrapping */}
              {[10, 20, 30].map((rupeeAmount) => ( // Example preset amounts
                <button
                   key={rupeeAmount}
                   onClick={() => handlePaymentAttempt({ fixedAmount: rupeeAmount * 100 })} // Pass paise amount
                   disabled={loading} // Disable button when loading
                   type="button"
                   className="font-bold text-white bg-gradient-to-r from-green-700 via-green-600 to-green-500 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 shadow-lg dark:shadow-lg dark:shadow-green-800/80 rounded-lg text-sm px-5 py-2.5 text-center disabled:opacity-50 disabled:cursor-not-allowed" // Added disabled styles
                >
                   {loading ? '...' : `Pay ₹${rupeeAmount}`} {/* Show loading dots or amount */}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default PaymentPage;
