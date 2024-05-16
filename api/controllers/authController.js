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

export const google = catchErrors(async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
      const { password: hashedPassword, ...rest } = user._doc;
      const expiryDate = new Date(Date.now() + 3600000);
      res
        .cookie("access_token", token, { httpOnly: true, expires: expiryDate })
        .status(200)
        .json({ message: "User logged in successfully", data: rest });
    } else {
      const generatePassword =
        Math.random().toString(36).slice(-8) +
        Math.random().toString(36).slice(-8);
      const hashedPassword = bcryptjs.hashSync(generatePassword, 10);
      const newUser = new User({
        username:
          req.body.name.split(" ").join("").toLowerCase() +
          Math.random().toString(36).slice(-8),
        email: req.body.email,
        password: hashedPassword,
        profilePhoto: req.body.photo,
      });
      await newUser.save();
      const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET);
      const { password: hashedPassword2, ...rest } = newUser._doc;
      const expiryDate = new Date(Date.now() + 3600000);
      res
        .cookie("access_token", token, {
          httpOnly: true,
          expires: expiryDate,
        })
        .status(200)
        .json(rest);
    }
  } catch (err) {
    next(err);
  }
});

export const signout = catchErrors(async (req, res) => {
  res.clearCookie("access_token").status(200).json("Signout success");
});
