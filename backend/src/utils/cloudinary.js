import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
import {
    CLOUD_API_KEY,
    CLOUD_API_KEY_SECRET,
    CLOUD_NAME,
} from "../config/env.js";

cloudinary.config({
    cloud_name: CLOUD_NAME,
    api_key: CLOUD_API_KEY,
    api_secret: CLOUD_API_KEY_SECRET,
});

export const uploadOnCloudinary = async (localpath) => {
    try {
        if (!localpath) return null;

        const uploadResult = await cloudinary.uploader.upload(localpath, {
            resource_type: "auto",
        });

        fs.unlinkSync(localpath, (err) => {
            if (err) throw err;
            console.log("file was deleted");
        });

        return uploadResult;
    } catch (error) {
        fs.unlinkSync(localpath, (err) => {
            if (err) throw err;
            console.log("file was deleted");
        });

        throw new Error("Failed to upload image to Cloudinary");
    }
};
