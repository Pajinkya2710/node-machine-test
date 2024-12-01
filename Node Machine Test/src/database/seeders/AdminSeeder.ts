import mongoose from "mongoose";
import dotenv from "dotenv";
import bcrypt from "bcryptjs";
import Admin from "../models/Admin";
dotenv.config();

const seedAdmin = async (): Promise<void> => {
  try {
    const adminExists = await Admin.find();

    if (adminExists.length <= 0) {

      const admin = new Admin({
        name: "admin",
        role: "super_admin",
        email: "admin@yopmail.com",
        username: "super_admin",
        password: "123456", 
        mobile_number: "0123456789",
        superman: true,
      });

      await admin.save();
      console.log("Admin seeded successfully");
      process.exit(0);
    }
  } catch (error) {
    console.error("Error seeding admin:", error);
    process.exit(1);
  }
};

export default seedAdmin;
