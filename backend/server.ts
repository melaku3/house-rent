import app from "./app";
import dotenv from "dotenv";
import connectDB from "./config/db";
import mongoose from "mongoose";

// Load environment variables
dotenv.config();

// Set the port
const PORT = process.env.PORT || 3000;

// Connect to MongoDB and start the server
connectDB();
mongoose.connection.on("connected", () => { app.listen(PORT, () => console.log(`Server is running on http://localhost:${PORT}`)) });
mongoose.connection.on("error", (error) => {
  console.error("Error: Unable to connect to MongoDB");
  console.error(error);
  process.exit(1);
});
