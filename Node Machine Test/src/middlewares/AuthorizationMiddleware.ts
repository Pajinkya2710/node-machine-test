import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import ApiError from "../utils/ApiError";
import errorResponse from "../utils/response";
import httpMessages from "../config/httpMessages";
import Admin from "../database/models/Admin";
import User from "../database/models/Users";
import httpStatus from "http-status";
import Role from "../database/models/Role";

interface DecodedToken extends JwtPayload {
  id: string;
  role?: string;
}

export const authenticateAndAuthorize = (
  requiredRoles: string[] = []
) => {
  return async (request: Request, response: Response, next: NextFunction) => {
    return new Promise<void>((resolve, reject) => {
      (async () => {
        try {
          const authorization: string | undefined = request.headers.authorization;

          if (!authorization) {
            return reject(
              errorResponse(
                response,
                new ApiError(httpStatus.UNAUTHORIZED, httpMessages.USER.AUTH.UNAUTHORIZED)
              )
            );
          }

          const token: string = authorization.split(" ")[1] || "";
          const decoded: DecodedToken = jwt.verify(token, process.env.JWT_KEY) as DecodedToken;

          const user = await Admin.findById(decoded.id);

          if (!user) {
            return reject(
              errorResponse(
                response,
                new ApiError(httpStatus.UNAUTHORIZED, httpMessages.USER.AUTH.UNAUTHORIZED)
              )
            );
          }

          if (user.role !== 'super_admin') {
            return reject(
              errorResponse(
                response,
                new ApiError(httpStatus.FORBIDDEN, httpMessages.USER.AUTH.FORBIDDEN)
              )
            );
          }

          request['user'] = user;

          if (
            requiredRoles.length && !requiredRoles.includes(user.role)
          ) {
            return reject(
              errorResponse(
                response,
                new ApiError(httpStatus.FORBIDDEN, httpMessages.USER.AUTH.FORBIDDEN)
              )
            );
          }

          resolve();
        } catch (e) {
          return reject(
            errorResponse(
              response,
              new ApiError(httpStatus.UNAUTHORIZED, httpMessages.USER.AUTH.UNAUTHORIZED)
            )
          );
        }
      })();
    })
      .then(() => next())
      .catch((err) => next(err));
  };
};

