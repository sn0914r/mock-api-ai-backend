import type { ErrorRequestHandler } from "express";
import { ZodError } from "zod";
import AppError from "../errors/AppError";

const errorHandler: ErrorRequestHandler = (err, req, res, next): any => {
  console.error("[ERROR]", err);
  const isProd = process.env.NODE_ENV === "production";

  // INFO: Handles validation Errors
  if (err instanceof ZodError) {
    return res.status(400).json({
      success: false,
      message: "Validation Failed",
      errorCode: "VALIDATION_ERROR",
      errors: err.issues.map((issue) => ({
        field: issue.path.join("."),
        message: issue.message,
      })),
    });
  }

  // INFO: Handles App Errors
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      success: false,
      message: err.message,
      errorCode: err.errorCode,
      errors: err.errors,
      stack: isProd ? undefined : err.stack,
    });
  }

  // INFO: Fallback for Generic Errors
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";

  return res.status(statusCode).json({
    success: false,
    message,
    errorCode: err.errorCode || "INTERNAL_SERVER_ERROR",
    stack: isProd ? undefined : err.stack,
  });
};

export default errorHandler;
