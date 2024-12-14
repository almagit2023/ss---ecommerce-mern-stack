import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

export const isAuthenticated = (req, res, next) => {
  try {
    const token =
      req.cookies.token || req.header("Authorization").replace("Bearer ", "");
    if (!token) {
      return res.status(404).json({
        success: false,
        message: "Token Not Found",
      });
    }
    const decode = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decode._id;
    next();
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({
      success: false,
      message: "Something Went Wrong While Authorization",
    });
  }
};

export const isAdmin = async (req, res, next) => {
  try {
    const userId = req.userId;
    const admin = await User.findById(userId);
    if (admin.email === process.env.ADMIN_MAIL_ID) {
      next();
    }
  } catch (error) {
    console.log(error);
  }
};
