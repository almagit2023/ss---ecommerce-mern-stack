import express from "express";

import { body } from "express-validator";
import { isAuthenticated } from "../middlewares/isAuthanticated.js";
import { createRatings } from "../controllers/rating.controller.js";
const router = express.Router();



router.post("/create",[
    body("productId").notEmpty().withMessage("Product Id is required"),
    body("rating").notEmpty().withMessage("Rating is Required"),
    body("review").notEmpty().withMessage("Review is Required")
],isAuthenticated,createRatings)

export default router ;
