import { Request, Response } from "express";
import catchAsync from "../utils/catchAsync";
import errorResponse from "../utils/response";
import Role from "../database/models/Role";

import httpStatus from "http-status";
import httpMessages from "../config/httpMessages";
import ApiError from "../utils/ApiError";
import UserRoles from "../database/models/UserRole";
import User from "../database/models/Users";

export default class RoleController {
  constructor() {}
  static index = catchAsync(async (req: Request, res: Response) => {
    try {
      const { query, nopaginate, page = 1, per_page = 10 }: any = req.query;
      let queryConditions: any = {};

      if (query) {
        queryConditions = {
          $or: [{ title: { $regex: query, $options: "i" } }],
        };
      }

      if (nopaginate === "1") {
        const roles = await Role.find(queryConditions).exec();
        if (roles.length === 0) {
          
          return res.status(httpStatus.NOT_FOUND).json({
            success: false,
            message: "No roles found!",
            data: [],
          });
        } else {
          return res.status(httpStatus.OK).json({
            success: true,
            message: "Roles fetched successfully!",
            data: roles,
          });
        }
      } else {
        const total = await Role.countDocuments(queryConditions);
        const roles = await Role.find(queryConditions)
          .skip((page - 1) * per_page)
          .limit(parseInt(per_page))
          .exec();

        const response = {
          roles,
          total,
          last_page: Math.ceil(total / per_page),
        };

        if (roles.length === 0) {
          return res.status(httpStatus.NOT_FOUND).json({
            success: false,
            message: "No roles found!",
            data: [],
          });
        } else {
          return res.status(httpStatus.OK).json({
            success: true,
            message: "Roles fetched successfully!",
            data: response,
          });
        }
      }
    } catch (error) {
      console.error("Error fetching roles:", error);
      return errorResponse(res, error);
    }
  });

  static create = catchAsync(async (req: Request, res: Response) => {
    try {

      const role = new Role(req.body);

      const saveRole = await role.save();

      return res.status(httpStatus.OK).json({
        success: true,
        message: "Role Created Successfully",
        data: saveRole
      });
    } catch (error) {
      console.error("Error creating role:", error);
      return errorResponse(res, error);
    }
  });

  static showById = catchAsync(async (req: Request, res: Response) => {
    try {
      
      const role = await Role.findById(req.params.id);

      if (!role) {
        return res.status(httpStatus.NOT_FOUND).json({
          success: false,
          message: "Role not found",
          data: null
        });
      }

      return res.status(httpStatus.OK).json({
        success: true,
        message: "Role fetched successfully",
        data: role
      });
    } catch (error) {
      console.error("Error fetching role:", error);
      return errorResponse(res, error);
    }
  });

  static update = catchAsync(async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const { body } = req;

      const role: any = await Role.findById(id);

      if (!role) {
        return res.status(httpStatus.NOT_FOUND).json({
          success: false,
          message: "Role not found",
          data: null,
        });
      }

      Object.assign(role, body);

      const updatedRole = await role.save();

      return res.status(httpStatus.OK).json({
        success: true,
        message: "Role updated successfully",
        data: updatedRole,
      });
    } catch (error) {
      console.error("Error updating role:", error);
      return errorResponse(res, error);
    }
  });

  static delete = catchAsync(async (req: Request, res: Response) => {
    try {
      const { id } = req.params;

      const role = await Role.findByIdAndDelete(id);

      if (!role) {
        return res.status(httpStatus.NOT_FOUND).json({
          success: false,
          message: "Role not found",
          data: null,
        });
      }

      return res.status(httpStatus.OK).json({
        success: true,
        message: "Role deleted successfully",
        data: null,
      });
    } catch (error) {
      console.error("Error deleting role:", error);
      return errorResponse(res, error);
    }
  });

  static createAssign = catchAsync(async (req: Request, res: Response) => {
    try {
      const { id } = req.params;  
      const { user_id } = req.body; 
  
      const existingUser = await User.findById(user_id);
  
      if (existingUser && existingUser.role) {
        return res.status(httpStatus.BAD_REQUEST).send({
          success: false,
          message: "User already has a role assigned",
        });
      }
  
      const existingAssignment = await UserRoles.findOne({
        role_id: id,
        user_id: user_id,
      });
  
      if (existingAssignment) {
        return res.status(httpStatus.OK).send({
          success: true,
          message: "User is already assigned to this role",
          data: existingAssignment,
        });
      }
  
      const roleUser = new UserRoles({
        business_id: id,
        user_id: user_id,
      });
      await roleUser.save();
  
      const updatedRole: any = await Role.findOneAndUpdate(
        { _id: id }, 
        { $inc: { user_count: 1 } }, 
        { new: true, upsert: true } 
      );
  
      if (!updatedRole) {
        return res.status(httpStatus.NOT_FOUND).send({
          success: false,
          message: "Role not found",
        });
      }
  
      const updatedUser = await User.findByIdAndUpdate(
        user_id,
        { $set: { role: updatedRole._id } },
        { new: true }
      ).populate("role", "title"); 
  
      updatedUser.role = updatedRole.title;
  
      await updatedUser.save();
  
      return res.status(httpStatus.OK).send({
        success: true,
        message: "Role assigned to user successfully",
        data: {
          roleUser,
          user_count: updatedRole.user_count,
          user: updatedUser, 
        },
      });
    } catch (error) {
      console.error("Error in createAssign:", error); 
      return errorResponse(res, error);
    }
  });
  
}
