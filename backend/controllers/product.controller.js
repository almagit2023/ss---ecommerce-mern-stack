import { uploadFileToCloudinary } from "../lib/uploadFileToCloudinary.js";
import Product from "../models/product.model.js";
import { validationResult } from "express-validator";
import User from "../models/user.model.js";
import Cart from "../models/cart.model.js";
import mongoose from "mongoose";

export const createProduct = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      errors: errors.array(),
    });
  }

  try {
    const {
      title,
      description,
      price,
      stock,
      category,
      supplier,
      warranty,
      returnPolicy,
      targetedAudience,
    } = req.body;
    console.log(req.files);
    const { image, imageTwo, imageThree, imageFour } = req.files;
    // console.log("Image",imageFour)

    if (!image) {
      return res.status(400).json({
        success: false,
        message: "Image Field is Required",
      });
    }
    // console.log("Image", image.tempFilePath);
    const imageOneResponse = await uploadFileToCloudinary(
      image,
      process.env.CLOUDINARY_FOLDER_NAME
    );
    // console.log("ImageOne Response", imageOneResponse);
    let imageTwoResponse;
    if (imageTwo) {
      imageTwoResponse = await uploadFileToCloudinary(
        imageTwo,
        process.env.CLOUDINARY_FOLDER_NAME
      );
    }
    let imageThreeResponse;
    if (imageThree) {
      imageThreeResponse = await uploadFileToCloudinary(
        imageThree,
        process.env.CLOUDINARY_FOLDER_NAME
      );
    }
    let imageFourResponse;
    if (imageFour) {
      imageFourResponse = await uploadFileToCloudinary(
        imageFour,
        process.env.CLOUDINARY_FOLDER_NAME
      );
    }
    const createdProduct = await Product.create({
      title,
      description,
      image: imageOneResponse.secure_url,
      imageTwo: imageTwo ? imageTwoResponse.secure_url : "",
      imageThree: imageThree ? imageThreeResponse.secure_url : "",
      imageFour: imageFour ? imageFourResponse.secure_url : "",
      price,
      stock,
      category,
      isAvailable: stock > 0 ? true : false,
      supplier,
      warranty,
      returnPolicy,
      targetedAudience,
    });
    return res.status(201).json({
      success: true,
      message: "Product Created Successfully",
      createdProduct,
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({
      success: false,
      message: "Something Went Wrong While Creating Product",
    });
  }
};

export const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find({});
    return res.status(200).json({
      success: true,
      message: "Products Fetched Successfully",
      products,
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({
      success: false,
      message: "Something Went Wrong While Fetching Products",
    });
  }
};

export const getSpecificProduct = async (req, res) => {
  try {
    const { productId } = req.body;
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product Not Found",
      });
    }
    return res.status(200).json({
      success: true,
      message: "Product Fetched",
      product,
    });
  } catch (error) {
    return res.status(500).json({
      success: true,
      message: "Something Went Wrong While Fetching Product",
    });
  }
};
export const deleteProduct = async (req, res) => {
  try {
    const { productId } = req.body;
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product Not Found",
      });
    }
    await product.deleteOne();

    const updatedProducts = await Product.find({});

    return res.status(200).json({
      success: true,
      message: "Product Deleted Successfully",
      updatedProducts,
    });
  } catch (error) {
    return res.status(500).json({
      success: true,
      message: "Something Went Wrong While Deleting Product",
    });
  }
};

export const fetchForMensOnly = async (req, res) => {
  try {
    const products = await Product.find({ targetedAudience: "Male" });
    return res.status(200).json({
      success: true,
      products,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: "Something Went Wrong While Fetching Mens Product",
    });
  }
};

export const fetchForWomensOnly = async (req, res) => {
  try {
    const products = await Product.find({ targetedAudience: "Female" });
    return res.status(200).json({
      success: true,
      products,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: "Something Went Wrong While Fetching Mens Product",
    });
  }
};

export const fetchForChildrensOnly = async (req, res) => {
  try {
    const products = await Product.find({ targetedAudience: "Children" });
    return res.status(200).json({
      success: true,
      products,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: "Something Went Wrong While Fetching Mens Product",
    });
  }
};

export const fetchCartFunction = async (req, res) => {
  try {
    const userId = req.userId;
    const carts = await Cart.find({ userId: userId }).populate("product");
    return res.status(200).json({
      success: true,
      message: "Carts Fetched",
      carts,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: "Failed to Fetch Cart",
    });
  }
};

export const addOrRemoveFromCart = async (req, res) => {
  try {
    const userId = req.userId;
    const { productId, quantity = 1 } = req.body;

    const user = await User.findById(userId).populate("cartItem");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    if (!user.cartItem) {
      return res.status(400).json({
        success: false,
        message: "No cart items found for the user.",
      });
    }

    const Carts = await Cart.find({ userId: userId }).populate("product");

    const existingCartItem = Carts.find(
      (c) => c.product._id.toString() === productId
    );
    console.log("Existing Cart Item:", existingCartItem);

    if (existingCartItem) {
      await Cart.findByIdAndDelete(existingCartItem._id);
      user.cartItem = user.cartItem.filter(
        (item) => !item._id.equals(existingCartItem._id)
      );
      await user.save();
      const cartItems = await Cart.find({userId : userId}).populate("product");

      return res.status(200).json({
        success: true,
        remove: true,
        cartItems,
        message: "Product removed from the cart",
      });
    } else {
      const product = await Product.findById(productId);
      if (!product) {
        return res.status(404).json({
          success: false,
          message: "Product not found",
        });
      }

      const newCartItem = await Cart.create({
        userId,
        product: productId,
        quantity,
      });

      user.cartItem.push(newCartItem._id);
      await user.save();

      const cartItems = await Cart.find({userId : userId}).populate("product");

      return res.status(200).json({
        success: true,
        add: true,
        cartItems,
        message: "Product added to the cart",
      });
    }
  } catch (error) {
    console.error("Error in addOrRemoveFromCart:", error.message);
    return res.status(500).json({
      success: false,
      message:
        "Something went wrong while adding or removing the product from the cart",
    });
  }
};
