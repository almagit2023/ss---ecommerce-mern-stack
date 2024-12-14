import express from "express";
import { capturePayment, verifySignature } from "../controllers/payment.js";
import { isAuthenticated } from "../middlewares/isAuthanticated.js";
const router = express.Router();

router.post("/capture-payment", isAuthenticated, capturePayment);
router.post("/verify-signature", isAuthenticated, verifySignature);

export default router;
