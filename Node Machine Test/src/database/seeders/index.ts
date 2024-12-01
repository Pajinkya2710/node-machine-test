import mongoose from "mongoose";
import dotenv from "dotenv";
import seedAdmin from "./AdminSeeder";
import { connectDB } from "../database";

dotenv.config();

const runSeeders = async (): Promise<void> => {
  try {
    await connectDB();

    await seedAdmin();
    console.error("Successfully running seeders");
    mongoose.connection.close();
  } catch (error) {
    console.error("Error running seeders:", error);
    mongoose.connection.close();
    process.exit(1); 
  }
};

runSeeders();
