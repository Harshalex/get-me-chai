"use client";
import React, { useState } from "react";
import Script from "next/script";
import Image from "next/image";
import Background from "../../public/Background.jpg";
import avatar from "../../public/avatar.gif";
import Cat from "../../public/cat.jpg";
import { initiate } from "../actions/useraction";

import { useSession } from "next-auth/react";

function PaymentPage({ username }) {
//   const { data: session } = useSession(); // Get session data
  const [paymentform, setPaymentForm] = useState({
    name: "",
    message: "",
    amount: "",
  });

  // Handle input changes
  const handleChange = (e) => {
    setPaymentForm({ ...paymentform, [e.target.name]: e.target.value });
  };

  // Handle payment
  const pay = async (amount) => {
    try {
      // Call backend to initiate payment
      const response = await initiate(amount,username, paymentform);
      const orderId = response.id;

      // Razorpay options
      const options = {
        key: process.env.KEY_ID, // Use environment variable for Razorpay Key
        amount: amount * 100, // Convert amount to paise
        currency: "INR",
        name: "Acme Corp", // Your business name
        description: "Test Transaction",
        image: "https://example.com/your_logo", // Your logo URL
        order_id: orderId, // Order ID from backend
        callback_url: `${process.env.URL}/api/razorpay`, // Callback URL
        prefill: {
           "name": "Gaurav Kumar", //your customer's name
                "email": "gaurav.kumar@example.com",
                "contact": "9000090000" 
        },
        notes: {
          address: "Razorpay Corporate Office",
        },
        theme: {
          color: "#3399cc",
        },
        handler: function (response) {
          alert(`Payment successful! Payment ID: ${response.razorpay_payment_id}`);
        },
        modal: {
          ondismiss: function () {
            alert("Payment popup closed.");
          },
        },
      };

      const rzp1 = new Razorpay(options);
      rzp1.open();
    } catch (error) {
        console.log(error)
    }
  };

  return (
    <>
      <Script src="https://checkout.razorpay.com/v1/checkout.js"></Script>
      <div className="h-full">
        <div className="h-[42vh] -z-0 w-full relative">
          <Image
            className="w-full h-full object-cover bg-center"
            src={Background}
            alt="background"
          />
          <div className="absolute w-24 h-24 border-2 border-slate-800 -bottom-10.5 rounded-full left-1/2 transform -translate-x-1/2">
            <Image
              src={Cat}
              className="w-full h-full object-cover bg-center rounded-full"
              alt="cat"
            />
          </div>
        </div>

        {/* User Info Section */}
        <div className="flex items-center flex-col gap-2 mt-12">
          <div className="font-bold">
            <span>@</span>
            {username}
          </div>
          <div className="text-slate-600 text-sm">Creating new Coding Playlists</div>
          <div className="text-slate-600 text-sm flex gap-3">
            <span>9719 members .</span>
            <span>82 Posts .</span>
            <span>$15,450 /releases</span>
          </div>
        </div>

        {/* Supporters and Payments Section */}
        <div className="w-[80%] mx-auto flex gap-2.5 py-12">
          <div className="supporters w-1/2 bg-slate-800 text-white px-4 py-6 rounded-lg">
            <h2 className="font-bold text-lg py-2.5">Supporters</h2>
            <ul className="text-sm flex flex-col gap-1.5 px-4">
              <li className="flex items-center gap-2">
                <Image width={30} src={avatar} alt="avatar" />
                <span>
                  Mikey Donated <span className="font-bold text-green-700">30$</span> with a
                  message
                </span>
              </li>
              {/* Add more supporters here */}
            </ul>
          </div>
          <div className="payments w-1/2 bg-slate-800 text-white p-4 rounded-lg">
            <h2 className="font-bold text-lg py-2.5">Make a Payment</h2>
            <div className="flex flex-col gap-2">
              <input
                name="name"
                onChange={handleChange}
                value={paymentform.name}
                placeholder="Enter Name"
                className="rounded-lg text-sm px-4 py-2 bg-slate-900"
              />
              <input
                name="message"
                onChange={handleChange}
                value={paymentform.message}
                placeholder="Enter Message"
                className="rounded-lg text-sm px-4 py-2 bg-slate-900"
              />
              <input
                name="amount"
                onChange={handleChange}
                value={paymentform.amount}
                placeholder="Enter Amount"
                className="rounded-lg text-sm px-4 py-2 bg-slate-900"
              />
            </div>
            <div className="py-2">
              <button
                onClick={() => pay(paymentform.amount)}
                type="button"
                className="w-full text-white bg-gradient-to-br from-black to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
              >
                Pay
              </button>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => pay(1000)}
                type="button"
                className="font-bold text-white bg-gradient-to-r from-green-800 via-green-600 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 shadow-lg dark:shadow-lg dark:shadow-green-800/80 rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
              >
                Pay ₹10
              </button>
              <button
                onClick={() => pay(2000)}
                type="button"
                className="font-bold text-white bg-gradient-to-r from-green-800 via-green-600 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 shadow-lg dark:shadow-lg dark:shadow-green-800/80 rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
              >
                Pay ₹20
              </button>
              <button
                onClick={() => pay(3000)}
                type="button"
                className="font-bold text-white bg-gradient-to-r from-green-800 via-green-600 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 shadow-lg dark:shadow-lg dark:shadow-green-800/80 rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
              >
                Pay ₹30
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default PaymentPage;