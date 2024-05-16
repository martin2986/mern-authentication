import express from "express";
import {
  google,
  signIn,
  signup,
  signout,
} from "../controllers/authController.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/signin", signIn);
router.post("/google", google);
router.get("/signout", signout);
export default router;
