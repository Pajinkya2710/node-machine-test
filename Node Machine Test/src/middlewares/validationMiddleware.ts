import { Request, Response, NextFunction, RequestHandler } from "express";
import Joi from "joi";
import httpStatus from "http-status";
import errorResponse from "../utils/response";
import ApiError from "../utils/ApiError";
import { pick } from "../utils/pick";

export const validate =
  (schema: any): RequestHandler =>
  async (request: Request, response: Response, next: NextFunction): Promise<void> => {
    try {
      const validSchema = pick(schema, ["params", "query", "body"]);
      const object = pick(request, Object.keys(validSchema));

      const { value, error } = await Joi.compile(validSchema)
        .prefs({ errors: { label: "key" }, abortEarly: false })
        .validateAsync(object);

      if (error) {
        const errorMessage = error.details.map((details: any) => details.message);
         errorResponse(
          response,
          new ApiError(httpStatus.BAD_REQUEST, errorMessage)
        );
      }
      Object.assign(request, value);
      next();
    } catch (error) {
      if (error.isJoi) {
        const errorMessage = error.details.map((details: any) => details.message);
        errorResponse(
          response,
          new ApiError(httpStatus.BAD_REQUEST, errorMessage)
        );
      } else {
        errorResponse(response, error);
      }
    }
  };

export const parseJsonFields = (fields: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    for (const field of fields) {
      if (req.body[field]) {
        try {
          req.body[field] = JSON.parse(req.body[field]);
        } catch (error) {
          res.status(httpStatus.BAD_REQUEST).json({
            success: false,
            message: `${field} must be a valid JSON string`,
            code: httpStatus.BAD_REQUEST,
          });
        }
      }
    }
    next();
  };
};
