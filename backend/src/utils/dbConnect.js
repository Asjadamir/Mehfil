import mongoose from "mongoose";
import { MONGODB_URI } from "../config/env.js";

let dbConnect = async () => {
    try {
        let dbconnection = await mongoose.connect(MONGODB_URI);
        if (mongoose.connection.readyState) {
            console.log(
                "Connected to MongoDB at " + dbconnection.connection.host
            );
        }
    } catch (e) {
        console.error("Error connecting to MongoDB: ", e);
        process.exit(1);
    }
};

export default dbConnect;
