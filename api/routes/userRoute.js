import express from "express";
import { testController } from "../controllers/userController.js";

const router = express.Router();

router.get("/", testController);

export default router;
