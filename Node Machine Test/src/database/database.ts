import mongoose from 'mongoose';

const DB_URI = process.env.DB_URI;

export const connectDB = async () => {
    try {
        console.log('DB_URI: ', DB_URI);
        // mongoose.set("debug", true);
        await mongoose.connect(DB_URI);
        console.log('Connected to MongoDB');
    } catch (err) {
        console.error('Failed to connect to MongoDB', err);
        process.exit(1);
    }
};
