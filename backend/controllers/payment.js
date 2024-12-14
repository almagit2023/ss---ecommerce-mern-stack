import { razorpayInstance } from "../config/razorpay.js";
import User from "../models/user.model.js";
import Product from "../models/product.model.js";
import Purchase from "../models/purchase.model.js";
import { v4 as uuidv4 } from "uuid";
import crypto from 'crypto';

export const capturePayment = async (req, res) => {
  try {
    console.log("here");
    const userId = req.userId;
    const { products } = req.body;

    if (products.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Product Not Found",
      });
    }

    console.log("here2");

    let totalAmount = 0;
    for (let product_id of products) {
      try {
        const product = await Product.findById(product_id);
        if (product) {
          totalAmount += product.price;
        }
      } catch (error) {
        console.log(error.message);
      }
    }
    console.log("here3", totalAmount);

    if (totalAmount === 0) {
      return res.status(400).json({
        success: false,
        message: "No valid products found to calculate the amount.",
      });
    }

    const options = {
      amount: totalAmount * 100,
      currency: "INR",
      receipt: uuidv4(),
      notes: {
        userId: userId,
        products: products,
      },
    };
    console.log("here4");

    const paymentResponse = await razorpayInstance.orders.create(options);
    console.log(paymentResponse)
    console.log("here5")
    return res.status(200).json({
      success: true,
      message: "Payment order created successfully.",
      paymentResponse,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      success: false,
      message: "Internal Server Error.",
      error: error.message,
    });
  }
};

export const verifySignature = async (req, res) => {
  try {
    console.log(req.body);
    const { razorpay_order_id, razorpay_signature, razorpay_payment_id, products  } = req.body;
    const userId = req.userId ;
    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature || !products) {
      return res.status(400).json({
        success: false,
        message: "Payment Failed",
      });
    }
    console.log("here2");

    const body = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_SECRET)
      .update(body.toString())
      .digest("hex");

    if (expectedSignature === razorpay_signature) {
      console.log("here3");

      const paymentStatusResponse = await razorpayInstance.payments.fetch(razorpay_payment_id);
      if (paymentStatusResponse.status !== 'captured') {
        return res.status(400).json({
          success: false,
          message: "Payment Failed or Not Captured",
        });
      }
      console.log("RES<<<<<<<<<<<<<<<<<<",res)
      await purchaseProduct(products, userId, res);
    } else {
      return res.status(400).json({
        success: false,
        message: "Invalid signature",
      });
    }
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const purchaseProduct = async (products, userId, res) => {
  try {
    console.log("inside purchase")
    if (!products || !userId) {
      return res.status(404).json({
        success: false,
        message: "Courses And User Id is required",
      });
    }
    console.log("inside purchase -2")
    for (let product_id of products) {
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({
          success: false,
          message: "User Not Found",
        });
      }
    console.log("inside purchase -3")

      const newPurchase = await Purchase.create({
        userId: userId,
        product: product_id,
      });
      user.purchases.push(product_id);
      await user.save();
    }
    console.log("inside purchase -4")

    return res.status(200).json({
      success: true,
      message: "Purchased Successfully",
      products,
    });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({
      success: false,
      message: "Something Went Wrong While Purchasing",
      error: error.message,
    });
  }
};
