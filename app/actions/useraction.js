"use server"
import Razorpay from "razorpay"
import Payment from "../models/Payment"
import connectDB from "../db/connectdb"
import User from "../models/User"


export const initiate = async (amount, to_user, paymentform) => {
    await connectDB()
    console.log(process.env.KEY_ID,process.env.KEY_SECRET,"swagsadgasdgsadgasdgasdgsadgsdgasgdas")
    // fetch the secret of the user who is getting the payment 
    let user = await User.findOne({username: to_user})
    console.log(user)
    const secret = process.env.KEY_SECRET

    var instance = new Razorpay({ key_id: process.env.KEY_ID, key_secret: secret })
    let options = {
        amount: Number.parseInt(amount),
        currency: "INR",
    }

    let x = await instance.orders.create(options)

    // create a payment object which shows a pending payment in the database
    await Payment.create({ oid: x.id, amount: amount/100, to_user: to_user, name: paymentform.name, message: paymentform.message })

    return x

}

