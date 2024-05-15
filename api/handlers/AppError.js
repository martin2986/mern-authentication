class AppError extends Error {
  statusCode;
  status;
  isOperational;

  constructor(message, statusCode) {
    super(message);

    this.statusCode = statusCode || 500;
    this.isOperational = true;

    Error.captureStackTrace(this);
  }
}
export default AppError;
