import bcryptjs from "bcryptjs";
import { catchErrors } from "../handlers/catchError.js";
import User from "../models/userModel.js";
import AppError from "../handlers/AppError.js";

export const updateUser = catchErrors(async (req, res, next) => {
  if (req.user.id !== req.params.id)
    return next(new AppError(401, "You can only update your account"));
  if (req.body.password) {
    req.body.password = bcryptjs.hashSync(req.body.password, 12);
  }
  const user = await User.findByIdAndUpdate(
    req.params.id,
    {
      $set: {
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
        profilePhoto: req.body.profilePhoto,
      },
    },
    { new: true }
  );
  const { password, ...rest } = user._doc;
  res.status(200).json({ message: "User updated successfully", data: rest });
});

export const deleteUser = catchErrors(async (req, res, next) => {
  if (req.user.id !== req.params.id)
    return next(new AppError(401, "You can only delete your account"));
  await User.findByIdAndDelete(req.params.id);
  res.status(200).json({ message: "User deleted successfully" });
});
