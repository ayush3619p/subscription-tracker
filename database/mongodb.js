
import mongoose from "mongoose";
import dns from "node:dns";
import {DB_URI, NODE_ENV} from "../config/env.js";


if( !DB_URI ) {
  throw new Error("DB_URI is not defined in the environment variables inside .env [ Production or Development ]");
}

dns.setServers(["1.1.1.1", "8.8.8.8"]);

const connectToDatabase = async () => {
  try {
    await mongoose.connect(DB_URI);
    console.log(`Connected to MongoDB database in ${NODE_ENV} mode`);
  } catch (error) {
    console.error("Error connecting to the database:", error);
    process.exit(1); // Exit the process with an error code
  }
}

export default connectToDatabase;