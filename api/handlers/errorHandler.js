import AppError from "./AppError.js";

//DEVELOPEMENT ERROR
const developmentErrors = (error, req, res, next) => {
  error.stack = error.stack || "";
  const errorDetails = {
    message: error.message,
    status: error.status,
    stackHighlighted: error.stack.replace(
      /[a-z_-\d]+.js:\d+:\d+/gi,
      "<mark>$&</mark>"
    ),
  };
  return new AppError(error.message, 400);
};
const handleValidationError = (err) => {
  const message = `Required fields are not supplied`;
  return new AppError(message, 400);
};
const handleCastError = (err) => {
  const message = `Invalid ${err.path}: ${err.value}`;
  return new AppError(message, 400);
};

const handleDuplicateError = (err) => {
  const value = err.errmsg.match(/(["'])(\\?.)*?\1/)[0];
  const message = `Duplicate field value: ${value}. Name already exist.`;

  return new AppError(message, 400);
};
export const errorHandler = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";

  if (process.env.NODE_ENV === "development") {
    developmentErrors(err, req, res, next);
  } else {
    res.status(err.statusCode).json({
      success: false,
      status: "error",
      message: "something went wong",
    });
  }

  if (err.name === "CastError") err = handleCastError(err);
  if (err.name == "ValidationError") err = handleValidationError(err);
  if (err.code == 11000) err = handleDuplicateError(err);
  res.status(err.statusCode).json({
    success: false,
    status: err.status,
    message: err.message,
  });
};
