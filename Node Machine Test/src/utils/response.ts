import { Response } from "express";

const errorResponse = (response: Response, error: any) => {
  const statusCode = error.statusCode || 500;
  const message = error.message || "Internal server error!";
  return response.status(statusCode).json({
    success: false,
    message
  });
};

export default errorResponse;
