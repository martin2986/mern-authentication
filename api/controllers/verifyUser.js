import jwt from "jsonwebtoken";
import AppError from "../handlers/AppError.js";

export const verifyToken = (req, res, next) => {
  const token = req.cookies.access_token;

  if (!token) return next(new AppError(401, "You are not authenticated"));

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return next(new AppError(403, "Token not valid"));
    req.user = user;
    next();
  });
};
