import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import {
    REFRESH_TOKEN_SECRET,
    ACCESS_TOKEN_SECRET,
    VERIFY_TOKEN_SECRET,
    FORGOT_PASSWORD_TOKEN_SECRET,
} from "../config/env.js";
import jwt from "jsonwebtoken";

let UserSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            minlength: 3,
            maxlength: 30,
        },

        username: {
            type: String,
            unique: true,
            lowercase: true,
            minlength: 4,
            maxlength: 30,
            validate: {
                validator: (username) => /^[a-z0-9_]+$/.test(username),
                message:
                    "Username can only contain lowercase letters, numbers, and underscores.",
            },
        },

        description: {
            type: String,
            default: "",
            maxlength: 120,
            validate: {
                validator: (description) => description.length <= 120,
                message: "Description cannot exceed 120 characters.",
            },
        },

        email: {
            type: String,
            required: true,
            unique: true,
            validate: {
                validator: (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email),
                message: "Please enter a valid email address.",
            },
        },

        password: {
            type: String,
            required: true,
            minlength: 8,
        },

        avatar: {
            type: String,
        },

        isVerified: {
            type: Boolean,
            default: false,
        },

        lastSeens: [
            {
                chatID: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "Chat",
                },
                lastseen: {
                    type: Date,
                    default: Date.now,
                },
            },
        ],

        refreshToken: String,
        verifyToken: String,
        forgetToken: String,

        friends: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User",
            },
        ],
    },
    {
        timestamps: true,
    }
);

UserSchema.pre("save", async function (next) {
    if (this.isModified("password")) {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
    }
    next();
});

UserSchema.methods.isValidPassword = async function (password) {
    return await bcrypt.compare(password, this.password);
};

UserSchema.methods.generateRefreshToken = async function () {
    try {
        const token = jwt.sign(
            {
                userId: this._id,
            },
            REFRESH_TOKEN_SECRET,
            { expiresIn: "7d" }
        );
        this.refreshToken = token;
        await this.save();
        return token;
    } catch (error) {
        console.log(error);
    }
};

UserSchema.methods.generateVerifyToken = async function () {
    try {
        const token = jwt.sign(
            {
                userId: this._id,
            },
            VERIFY_TOKEN_SECRET,
            { expiresIn: "1h" }
        );
        this.verifyToken = token;
        await this.save();
        return token;
    } catch (error) {
        console.log(error);
    }
};

UserSchema.methods.generateForgetToken = async function () {
    try {
        const token = jwt.sign(
            {
                userId: this._id,
            },
            FORGOT_PASSWORD_TOKEN_SECRET,
            { expiresIn: "1h" }
        );
        this.forgetToken = token;
        await this.save();
        return token;
    } catch (error) {
        console.log(error);
    }
};

UserSchema.methods.generateAccessToken = async function () {
    try {
        const token = jwt.sign(
            {
                userId: this._id,
                email: this.email,
                username: this.username,
                name: this.name,
            },
            ACCESS_TOKEN_SECRET,
            { expiresIn: "1h" }
        );
        return token;
    } catch (error) {
        console.log(error);
    }
};

export const User = mongoose.model("User", UserSchema);
