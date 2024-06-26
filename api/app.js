import express from "express";
import cookieParser from "cookie-parser";
import userRoute from "./routes/userRoute.js";
import authRoute from "./routes/authRoute.js";
import { errorHandler } from "./handlers/errorHandler.js";
const app = express();
app.use(express.json());
app.use(cookieParser());
app.use("/api/user", userRoute);
app.use("/api/auth", authRoute);

app.use(errorHandler);
export default app;
