import bcrypt from "bcryptjs";
import User from "../models/user.model.js";
import { validationResult } from "express-validator";
import jwt from "jsonwebtoken";
import Address from "../models/address.model.js";
import { uploadFileToCloudinary } from "../lib/uploadFileToCloudinary.js";
import { populate } from "dotenv";

export const register = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      errors: errors.array(),
    });
  }

  try {
    const { firstName, lastName, email, password, state, city, fullAddress } =
      req.body;
    const existingUser = await User.findOne({ email: email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User Already Registered with this Email",
      });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    let newUser = await User.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
    });
    const address = await Address.create({
      userId: newUser._id,
      city,
      state,
      fullAddress,
    });
    console.log(address);
    newUser.address = address._id;
    await newUser.save();
    console.log(newUser);
    return res.status(200).json({
      success: true,
      message: "User Created Successfully",
    });
  } catch (error) {
    console.log(error.message);
    return res.status(400).json({
      success: false,
      message: "Something Went Wrong While Creating User",
    });
  }
};

export const login = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(401).json({
      success: false,
      errors: errors.array(),
    });
  }
  try {
    const { email, password } = req.body;
    console.log(email, password);
    const user = await User.findOne({ email: email })
      .populate("address")
      .populate("purchases")
      .populate({
        path: "cartItem",
        populate: {
          path: "product"
        },
      })
      .exec();
    console.log("USER FROM BE", user);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User Not Found",
      });
    }
    console.log(user.password, password);
    const passwordMatch = await bcrypt.compare(password, user.password);
    console.log(passwordMatch);
    if (passwordMatch) {
      const payload = {
        _id: user._id,
      };
      const token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: "1h",
      });
      return res
        .cookie("token", token, {
          httpOnly: true,
          sameSite: "strict",
          maxAge: 60 * 60 * 1000,
        })
        .status(200)
        .json({
          success: true,
          message: "Logged In Successfully",
          token,
          user,
        });
    } else {
      return res.status(400).json({
        success: false,
        message: "Password Does Not Match",
      });
    }
  } catch (error) {
    console.log(error.message);
    return res.status(400).json({
      success: false,
      message: "Something Went Wrong While Logging In",
    });
  }
};

export const getUserProfile = async (req, res) => {
  const user = await User.findById(req.userId)
    .populate("address")
    .populate("purchases");
  return res.status(200).json({
    success: true,
    user,
  });
};

export const allUsers = async (req, res) => {
  try {
    const users = await User.find({});
    return res.status(200).json({
      success: true,
      users,
    });
  } catch (error) {
    console.log(error.message);
    return res.status(400).json({
      success: false,
      message: "Something Went Wrong While Fetching Users",
    });
  }
};

export const checkAdminOrNot = async (req, res) => {
  try {
    const userId = req.userId;
    console.log("here");
    const user = await User.findById(userId);
    console.log("first", user);
    if (user.email === process.env.ADMIN_MAIL_ID) {
      console.log("Contrl here");
      return res.status(200).json({
        success: true,
        admin: true,
        user,
      });
    } else {
      console.log("FALSE CASE");
      return res.status(200).json({
        success: true,
        admin: false,
      });
    }
  } catch (error) {
    console.log(error.message);
    return res.status(400).json({
      success: false,
      message: "Error While Fetching User/Admin",
    });
  }
};

export const getProfile = async (req, res) => {
  try {
    console.log("here");
    const userId = req.userId;
    console.log(userId);
    const user = await User.findById(userId)
      .populate("address")
      .populate("purchases")
      .exec();
    console.log(user);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User Not Found",
      });
    }
    return res.status(200).json({
      success: true,
      message: "Profile Fetched",
      user,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: "Something Went Wrong While Fetching Profile",
    });
  }
};

export const changeProfilePicture = async (req, res) => {
  try {
    const userId = req.userId;
    const { image } = req.files;
    if (!image) {
      return res.status(400).json({
        success: true,
        message: "Image Is Required",
      });
    }
    const cloudinaryResponse = await uploadFileToCloudinary(
      image,
      process.env.CLOUDINARY_FOLDER_NAME
    );

    const user = await User.findByIdAndUpdate(
      userId,
      {
        image: cloudinaryResponse.secure_url,
      },
      { new: true }
    );
    return res.status(200).json({
      success: true,
      message: "Profile Pic Changed",
      user,
    });
  } catch (error) {
    console.log(error.message);
    return res.status(400).json({
      success: false,
      message: "Something Went Wrong Changing Profile Pic",
    });
  }
};

export const updateProfileDetails = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      errors: errors.array(),
    });
  }
  try {
    const userId = req.userId;
    const { firstName, lastName, email, fullAddress, city, state } = req.body;
    console.log(firstName, lastName, email, fullAddress, city, state);
    const newAddress = await Address.findOne({ userId: userId });
    newAddress.fullAddress = fullAddress;
    newAddress.state = state;
    newAddress.city = city;
    await newAddress.save();
    const user = await User.findByIdAndUpdate(userId, {
      firstName,
      lastName,
      email,
      address: newAddress._id,
    });
    return res.status(200).json({
      success: true,
      message: "Profile Updated Successfully",
      user,
    });
  } catch (error) {
    console.log(error.message);
    return res.status(400).json({
      success: false,
      message: "Something Went Wrong While Updating Profile",
    });
  }
};
