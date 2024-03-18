import httpStatus from "http-status";

const errorHandler = (err, req, res, next) => {
  let statusCode = err.status || httpStatus.INTERNAL_SERVER_ERROR;
  let message = err.message || "Internal server error";
  if (process.env.NODE_ENV === "production" && !err.isOperational) {
    message = "Something went wrong";
  }
  if (err.name === "ValidationError") {
    statusCode = httpStatus.BAD_REQUEST;
    message = err.message;
  }
  res.status(statusCode).json({
    status: statusCode,
    message: message,
    error: err.isOperational ? undefined : err.stack,
  });
};

export default errorHandler;
