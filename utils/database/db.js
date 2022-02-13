import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

export const connectDB = async () => {
    try {
        let connection = await mongoose.connect(process.env.DB_URL);
        console.log(
            `Database successfully connected: ${connection.connections[0].host}`
        );
    } catch (err) {
        console.error(`Database connection error: ${err}`);
    }
};
