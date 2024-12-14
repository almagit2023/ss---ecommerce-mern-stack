import express from "express";
import { isAdmin, isAuthenticated } from "../middlewares/isAuthanticated.js";
import {
  addOrRemoveFromCart,
  createProduct,
  deleteProduct,
  fetchCartFunction,
  fetchForChildrensOnly,
  fetchForMensOnly,
  fetchForWomensOnly,
  getAllProducts,
  getSpecificProduct,
} from "../controllers/product.controller.js";
const router = express.Router();
import { body } from "express-validator";
import { fetchAllPurchases } from "../controllers/purchase.controller.js";

router.get("/all", getAllProducts);

router.post("/create", [
    body("title").notEmpty().withMessage("Title Field is Required"),
    body("description").notEmpty().withMessage("Description Field is Required").isLength({min:12}).withMessage("Description cannot be less than 12 characters"),
    body("price").notEmpty().withMessage("Price is Required").isNumeric().withMessage("Price must be a number"),
    body("stock").notEmpty().withMessage("Stock is Required").isInt({min:0}).withMessage("Stock must be a non-negative integer"),
    body('category').notEmpty().withMessage("Category is Required"),
    body("supplier").notEmpty().withMessage("Supplier is Required"),
    body("targetedAudience").isIn(["Male","Female","Children","Others"]).withMessage("Targeted Audience Allowed Male , Female , Children , Others Only"),
    body("warranty").optional().isString().withMessage("Warranty must be a string"),
    body("returnPolicy").isString().withMessage("Return Policy must be a string"),
] ,isAuthenticated, createProduct);

router.delete("/delete", isAuthenticated, deleteProduct);
router.post("/getSingle", getSpecificProduct);
router.get("/mens-product",fetchForMensOnly)
router.get("/womens-product",fetchForWomensOnly)
router.get("/childrens-product",fetchForChildrensOnly)
router.get("/cart",fetchCartFunction)
router.post("/add-remove",isAuthenticated,addOrRemoveFromCart)



router.get("/all/purchases",isAuthenticated,isAdmin,fetchAllPurchases)




export default router;
