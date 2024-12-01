import dotenv from 'dotenv';
dotenv.config();

import { connectDB } from "./src/database/database";
import { startServer } from "./src/server";

const PORT = process.env.PORT ? parseInt(process.env.PORT) : 7300;
const hostname = process.env.HOST ? `${process.env.HOST}` : '';

const startApplication = async () => {
    await connectDB();
    startServer(PORT, hostname);
};

startApplication().catch((err) => console.error('Application failed to start', err));
