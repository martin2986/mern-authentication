import { catchErrors } from "../handlers/catchError.js";
import User from "../models/userModel.js";
import bcryptjs from "bcryptjs";
import AppError from "../handlers/AppError.js";
import jwt from "jsonwebtoken";
export const signup = catchErrors(async (req, res) => {
  const { username, email, password } = req.body;
  const hashedPassword = bcryptjs.hashSync(password, 10);
  const newUser = new User({ username, email, password: hashedPassword });
  await newUser.save();
  res.status(201).json({ message: "User Created Successfully" });
});

export const signIn = catchErrors(async (req, res, next) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) return next(new AppError("User not found", 404));
  const isMatch = bcryptjs.compareSync(password, user.password);
  if (!isMatch) {
    return next(new AppError("Invalid credentials", 401));
  }
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
  const { password: hashedPassword, ...rest } = user._doc;
  const expiryDate = new Date(Date.now() + 3600000);
  res
    .cookie("access_token", token, { httpOnly: true, expires: expiryDate })
    .status(200)
    .json({ message: "User logged in successfully", data: rest });
});
