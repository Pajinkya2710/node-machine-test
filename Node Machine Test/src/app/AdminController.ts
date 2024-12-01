
import { Request, Response } from "express";
import catchAsync from "../utils/catchAsync";
import errorResponse from "../utils/response";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import httpStatus from "http-status";
import httpMessages from "../config/httpMessages";
import Admin from "../database/models/Admin";

export default class AdminController {
  constructor() {}


  static login = catchAsync(async (req: Request, res: Response) => {
    try {
      const { username, password } = req.body;

      const adminData = await Admin.findOne({ username });

      if (!adminData) {
        return res.status(httpStatus.NOT_FOUND).send({
          success: false,
          message: "User not found",
        });
      }

      const isMatch = await bcrypt.compare(password, adminData.password);
      if (!isMatch) {
        return res.status(httpStatus.NOT_FOUND).send({
          success: false,
          message: "Invalid credentials",
        });
      }


      let expiresIn = "20d";
      const token = jwt.sign(
        { id: adminData._id, role: adminData.role },
        process.env.JWT_KEY,
        { expiresIn }
      );

      return res.status(httpStatus.OK).send({
        success: true,
        data: { token: token, admin: adminData },
        message: httpMessages.LOGIN.SUCCESS,
      });
    } catch (error) {
      return errorResponse(res, error);
    }
  });
}
