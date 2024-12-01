import { Request, Response, NextFunction } from "express";

const catchAsync =
  (fn: any) => (request: Request, response: Response, next: NextFunction) => {
    Promise.resolve(fn(request, response, next)).catch((err) => next(err));
  };

export default catchAsync;
