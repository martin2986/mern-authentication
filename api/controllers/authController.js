import { catchErrors } from "../handlers/catchError.js";
import User from "../models/userModel.js";
import bcryptjs from "bcryptjs";

export const signup = catchErrors(async (req, res) => {
  const { username, email, password } = req.body;
  const hashedPassword = bcryptjs.hashSync(password, 10);
  const newUser = new User({ username, email, password: hashedPassword });
  await newUser.save();
  res.status(201).json({ message: "User Created Successfully" });
});
