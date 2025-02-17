import mongoose from "mongoose";

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI!)
            .then(() => console.log("Connected to MongoDB"))
    } catch (error) {
        let errorMessage = "Error: Unable to connect to MongoDB";
        if (error instanceof Error) errorMessage = error.message;
        console.error(errorMessage);
        process.exit(1);
    }
}

export default connectDB;
