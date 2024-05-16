import express from "express";
import { updateUser } from "../controllers/userController.js";
import { verifyToken } from "../controllers/verifyUser.js";

const router = express.Router();

router.patch("/update/:id", verifyToken, updateUser);

export default router;
