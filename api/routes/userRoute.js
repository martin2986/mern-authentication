import express from "express";
import { deleteUser, updateUser } from "../controllers/userController.js";
import { verifyToken } from "../controllers/verifyUser.js";

const router = express.Router();

router.patch("/update/:id", verifyToken, updateUser);
router.delete("/delete/:id", verifyToken, deleteUser);

export default router;
