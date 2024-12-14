import express from "express";
import { allUsers, changeProfilePicture, checkAdminOrNot, getProfile, login, register, updateProfileDetails } from "../controllers/user.controllers.js";
import { isAuthenticated } from "../middlewares/isAuthanticated.js";
import { body } from "express-validator";
const router = express.Router();

router.post(
  "/register",
  [
    body("email")
      .isEmail()
      .withMessage("Enter Valid Email")
      .notEmpty()
      .withMessage("Email Field is Required"),
    body("firstName").notEmpty().withMessage("First Name is Required"),
    body("lastName").notEmpty().withMessage("Last Name is Required"),
    body("password")
      .notEmpty()
      .withMessage("Password is Required")
      .isLength({ min: 6, max: 24 })
      .withMessage("Password must be between 6 and 24 characters"),
    body("state").notEmpty().withMessage("State Field is Required"),
    body("city").notEmpty().withMessage("City Field is Required"),
    body("fullAddress").notEmpty().withMessage("Address Field is Required"),
  ],
  register
);
router.post(
  "/login",
  [
    body("email").isEmail().withMessage("Provide Valid Email").notEmpty().withMessage("Email Field is Required"),
    body("password").notEmpty().withMessage("Password is Required"),
  ],
  login
);

router.get("/all",allUsers)
router.get("/me",isAuthenticated,getProfile)

router.get("/check-admin",isAuthenticated,checkAdminOrNot)
router.post("/change-profile-pic",isAuthenticated,changeProfilePicture)
router.put("/update-profile",[
  body("firstName").notEmpty().withMessage("First Name is Required"),
  body("lastName").notEmpty().withMessage("Last Name is Required"),
  body("email").isEmail().withMessage("Must be a valid email").notEmpty().withMessage("Email is Required"),
  body("fullAddress").notEmpty().withMessage("Full Address is Required"),
  body("city").notEmpty().withMessage("City is Required"),
  body("state").notEmpty().withMessage("State is Required")

],isAuthenticated,updateProfileDetails)



export default router;
