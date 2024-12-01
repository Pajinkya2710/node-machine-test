
import { Request, Response } from "express";
import catchAsync from "../utils/catchAsync";
import errorResponse from "../utils/response";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import httpStatus from "http-status";
import httpMessages from "../config/httpMessages";
import ApiError from "../utils/ApiError";
import User from "../database/models/Users";
import Admin from "../database/models/Admin";

export default class RoleController {
  constructor() {}
  static index = catchAsync(async (req: Request, res: Response) => {
    try {
      const { query, nopaginate, page = 1, per_page = 10 }: any = req.query;
      let queryConditions: any = {};
  
      if (query) {
        queryConditions = {
          $or: [
            { first_name: { $regex: query, $options: "i" } },
            { last_name: { $regex: query, $options: "i" } },
            { email: { $regex: query, $options: "i" } },
            { role: { $regex: query, $options: "i" } },
          ],
        };
      }
  
      if (nopaginate === "1") {
        const users = await User.find(queryConditions).exec();
        if (users.length === 0) {
          return res.status(httpStatus.NOT_FOUND).json({
            success: false,
            message: "No users found!",
            data: [],
          });
        } else {
          return res.status(httpStatus.OK).json({
            success: true,
            message: "Users fetched successfully!",
            data: users,
          });
        }
      } else {
        const total = await User.countDocuments(queryConditions);
        const users = await User.find(queryConditions)
          .skip((page - 1) * per_page)
          .limit(parseInt(per_page))
          .exec();
  
        const response = {
          users,
          total,
          last_page: Math.ceil(total / per_page),
        };
  
        if (users.length === 0) {
          return res.status(httpStatus.NOT_FOUND).json({
            success: false,
            message: "No users found!",
            data: [],
          });
        } else {
          return res.status(httpStatus.OK).json({
            success: true,
            message: "Users fetched successfully!",
            data: response,
          });
        }
      }
    } catch (error) {
      console.error("Error fetching users:", error);
      return errorResponse(res, error);
    }
  });
  

  static create = catchAsync(async (req: Request, res: Response) => {
    try {
      const { first_name, last_name, email, phone } = req.body;
  
      if (!first_name || !last_name || !email || !phone) {
        return res.status(httpStatus.BAD_REQUEST).json({
          success: false,
          message: "All fields are required",
          data: null,
        });
      }
  
      const user = new User({
        first_name,
        last_name,
        email,
        phone,
      });
  
      const savedUser = await user.save();
  
      return res.status(httpStatus.OK).json({
        success: true,
        message: "User created successfully",
        data: savedUser,
      });
    } catch (error) {
      console.error("Error creating user:", error);
      return errorResponse(res, error);
    }
  });
  

  static showById = catchAsync(async (req: Request, res: Response) => {
    try {
      const user = await User.findById(req.params.id);
  
      if (!user) {
        return res.status(httpStatus.NOT_FOUND).json({
          success: false,
          message: "User not found",
          data: null,
        });
      }
  
      return res.status(httpStatus.OK).json({
        success: true,
        message: "User fetched successfully",
        data: user,
      });
    } catch (error) {
      console.error("Error fetching user:", error);
      return errorResponse(res, error);
    }
  });
  
  static update = catchAsync(async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const { body } = req;
  
      const user: any = await User.findById(id);
  
      if (!user) {
        return res.status(httpStatus.NOT_FOUND).json({
          success: false,
          message: "User not found",
          data: null,
        });
      }
  
      Object.assign(user, body);
  
      const updatedUser = await user.save();
  
      return res.status(httpStatus.OK).json({
        success: true,
        message: "User updated successfully",
        data: updatedUser,
      });
    } catch (error) {
      console.error("Error updating user:", error);
      return errorResponse(res, error);
    }
  });
  

  static delete = catchAsync(async (req: Request, res: Response) => {
    try {

      const user = await User.findByIdAndDelete(req.params.id);
      if (!user) {
        return res.status(httpStatus.NOT_FOUND).json({
          success: false,
          message: "User not found",
          data: null,
          code: httpStatus.NOT_FOUND,
        });
      }

      return res.status(httpStatus.OK).json({
        success: false,
        message: "User deleted successfully",
        data: null,
        code: httpStatus.OK,
      });
    } catch (error) {
      return errorResponse(res, error);
    }
  });

  static enable = catchAsync(async (req: Request, res: Response) => {
    try {
      const { id } = req.params;

     

      const user = await User.findByIdAndUpdate(
        id,
        { disabled: false },
        { new: true } 
      );

      if (!user) {
        return res.status(httpStatus.NOT_FOUND).json({
          success: false,
          message: "User not found",
          data: null,
          code: httpStatus.NOT_FOUND,
        });
      }

      await user.save();
      return res.status(httpStatus.OK).json({
        success: true,
        message: "User enabled successfully",
        data: user,
        code: httpStatus.OK,
      });
    } catch (error) {
      return errorResponse(res, error);
    }
  });

  static disable = catchAsync(async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
 

      const user = await User.findByIdAndUpdate(
        id,
        { disabled: true },
        { new: true } 
      );

      if (!user) {
        return res.status(httpStatus.NOT_FOUND).json({
          success: false,
          message: "User not found",
          data: null,
          code: httpStatus.NOT_FOUND,
        });
      }


      await user.save();
      return res.status(httpStatus.OK).json({
        success: true,
        message: "User disabled successfully",
        data: null,
        code: httpStatus.OK,
      });
    } catch (error) {
      return errorResponse(res, error);
    }
  });

}
