import express from "express";
import userRoute from "./routes/userRoute.js";
const app = express();

app.use("/api/user", userRoute);

export default app;
