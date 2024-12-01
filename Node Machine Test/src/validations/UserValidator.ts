import Joi from "joi";
import User from "../database/models/Users";

const customRequiredMessage = (field: string) => `${field} is required`;

export const userCreateSchema = {
  body: Joi.object()
    .keys({
      first_name: Joi.string()
        .required()
        .trim()
        .messages({
          "string.empty": customRequiredMessage("First name"),
          "any.required": customRequiredMessage("First name"),
        }),
      last_name: Joi.string()
        .required()
        .trim()
        .messages({
          "string.empty": customRequiredMessage("Last name"),
          "any.required": customRequiredMessage("Last name"),
        }),
      email: Joi.string()
        .email()
        .required()
        .messages({
          "string.empty": customRequiredMessage("Email"),
          "any.required": customRequiredMessage("Email"),
          "string.email": "Invalid email format",
        })
        .external(async (value, helpers) => {
          const existingUser = await User.findOne({ email: value });
          if (existingUser) {
            throw new Error("Email already in use");
          }
          return value;
        }),
      phone: Joi.string()
        .required()
        .trim()
        .pattern(/^\d{10,15}$/)
        .messages({
          "string.empty": customRequiredMessage("Phone number"),
          "any.required": customRequiredMessage("Phone number"),
          "string.pattern.base": "Phone number must be between 10 to 15 digits",
        }),
    })
    .unknown(true),
};
export const userUpdateSchema = {
  body: Joi.object()
    .keys({
      first_name: Joi.string()
        .optional()
        .trim()
        .messages({
          "string.empty": customRequiredMessage("First name"),
        }),
      last_name: Joi.string()
        .optional()
        .trim()
        .messages({
          "string.empty": customRequiredMessage("Last name"),
        }),
      email: Joi.string()
        .email()
        .optional()
        .messages({
          "string.empty": customRequiredMessage("Email"),
          "string.email": "Invalid email format",
        })
        .external(async (value, helpers) => {
          if (value) {
            const existingUser = await User.findOne({ email: value });
            if (existingUser) {
              throw new Error("Email already in use");
            }
          }
          return value;
        }),
      phone: Joi.string()
        .optional()
        .trim()
        .pattern(/^\d{10,15}$/)
        .messages({
          "string.empty": customRequiredMessage("Phone number"),
          "string.pattern.base": "Phone number must be between 10 to 15 digits",
        }),
    })
    .unknown(true),
};