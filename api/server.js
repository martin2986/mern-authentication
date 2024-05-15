import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config({ path: ".env" });

const app = express();
const connectDB = async () => {
  await mongoose.connect(process.env.URI);
  console.log("DB Connected");
};

try {
  connectDB();
} catch (err) {
  console.log(err);
}

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
