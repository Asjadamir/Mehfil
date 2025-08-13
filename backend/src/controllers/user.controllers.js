import { User } from "../models/user.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { sendVerificationEmail } from "../utils/verificationEmail.js";
import { userDTO } from "../dto/userdto.js";
import jwt from "jsonwebtoken";
import { REGISTER_TOKEN_SECRET, VERIFY_TOKEN_SECRET } from "../config/env.js";

const generateAccessAndRefreshToken = async (userId) => {
    let accessToken, refreshToken;
    try {
        const user = await User.findById(userId);

        accessToken = await user.generateAccessToken();
        refreshToken = await user.generateRefreshToken();

        return { accessToken, refreshToken };
    } catch (error) {
        console.error("There is an error in generating tokens");
    }
};

const cookieOptions = {
    httpOnly: true,
    secure: false,
    sameSite: "lax",
};

export const userControllers = {
    registerEmail: asyncHandler(async (req, res) => {
        let { email, password } = req.body;
        if ([email, password].some((field) => field.trim() === ""))
            throw new ApiError(400, "All fields are required");

        // Check if the email is already registered
        let emailInUse = await User.findOne({ email, isVerified: true });
        if (emailInUse) throw new ApiError(401, "Email already registered");

        // Check if the user is already registered but not verified
        let user = await User.findOne({ email, isVerified: false });

        // If user exists, update the password
        user
            ? (user.password = password)
            : (user = new User({ email, password }));
        await user.generateVerifyToken();
        await user.save();

        let info = await sendVerificationEmail(user.email, user.verifyToken);
        console.log("Verification email sent:", info.response);

        return res.status(200).json(
            new ApiResponse(200, "User registered successfully", {
                user: new userDTO(user),
            })
        );
    }),

    registerProfile: asyncHandler(async (req, res) => {
        let { name, username, description } = req.body;

        // Check for the Username
        const usernameInUse = await User.findOne({ username });
        if (usernameInUse) {
            throw new ApiError(401, "Username already exists");
        }

        let avatarPath;
        let avatar = "";

        if (req.file.fieldname === "avatar") {
            avatarPath = req.file.path;
        }
        if (avatarPath) {
            avatar = await uploadOnCloudinary(avatarPath);
        }

        let user = await User.findOneAndUpdate(
            { registerToken: req.cookies.registerToken },
            {
                name,
                username,
                description,
                avatar: avatar?.url || "",
                $unset: {
                    registerToken: 1,
                },
            }
        );

        await user.save();

        let { accessToken, refreshToken } = await generateAccessAndRefreshToken(
            user._id
        );

        return res
            .status(200)
            .cookie("accessToken", accessToken, cookieOptions)
            .cookie("refreshToken", refreshToken, cookieOptions)
            .clearCookie("registerToken", cookieOptions)
            .json(
                new ApiResponse(200, "User registered successfully", {
                    user: new userDTO(user),
                })
            );
    }),

    verifyUserEmail: asyncHandler(async (req, res) => {
        const { token } = req.body;
        if (!token) throw new ApiError(400, "Token is missing");

        let tokenData = jwt.verify(token, VERIFY_TOKEN_SECRET);
        if (!tokenData)
            throw new ApiError(400, "Invalid token or token expired.");

        let user = await User.findOne({
            verifyToken: token,
            _id: tokenData.userId,
        });
        if (!user)
            throw new ApiError(400, "Invalid token or user already verified.");

        user.isVerified = true;
        user.verifyToken = undefined;
        const registerToken = await user.generateRegisterToken();
        user = await user.save();
        return res
            .cookie("registerToken", registerToken, {
                httpOnly: true,
                secure: false,
                sameSite: "lax",
            })
            .status(200)
            .json(
                new ApiResponse(200, "User verified successfully", {
                    user: new userDTO(user),
                })
            );
    }),

    verifyUserName: asyncHandler(async (req, res) => {
        const { username } = req.body;
        if (!username) throw new ApiError(400, "Username is required");

        const user = await User.findOne({ username });
        if (user) throw new ApiError(404, username + " already exists");

        return res.status(200).json(
            new ApiResponse(200, "Username is available", {
                user: new userDTO(user),
            })
        );
    }),

    verifyRegistration: asyncHandler(async (req, res) => {
        const registerToken = req.cookies.registerToken;
        if (!registerToken) throw new ApiError(400, "Token is required");

        const tokenData = jwt.verify(
            registerToken,
            REGISTER_TOKEN_SECRET,
            (err, decoded) => {
                if (err) {
                    throw new ApiError(401, "Invalid or expired token");
                }
                return decoded;
            }
        );
        if (!tokenData) throw new ApiError(401, "No token data");

        const user = await User.findById(tokenData.userId);
        if (!user) throw new ApiError(404, "User not found");

        return res.status(200).json(
            new ApiResponse(200, "User verified successfully", {
                user: new userDTO(user),
            })
        );
    }),

    login: asyncHandler(async (req, res) => {
        let { identifier, password } = req.body;

        if (!identifier)
            throw new ApiError(401, "Username or email is required");

        const user = await User.findOne({
            $or: [{ email: identifier }, { username: identifier }],
        });
        if (!user) throw new ApiError(401, "User not found");

        const isMatch = await user.isValidPassword(password);
        if (!isMatch) throw new ApiError(403, "Invalid password");

        const { accessToken, refreshToken } =
            await generateAccessAndRefreshToken(user._id);
        const storedUser = await User.findById(user._id).select(
            "-password -refreshToken"
        );

        return res
            .status(200)
            .cookie("accessToken", accessToken, cookieOptions)
            .cookie("refreshToken", refreshToken, cookieOptions)
            .json(
                new ApiResponse(200, "User logged in successfully", {
                    user: storedUser,
                    accessToken: accessToken,
                    refreshToken: refreshToken,
                })
            );
    }),

    updateProfilePic: asyncHandler(async (req, res) => {
        const localPath = req.file?.avatar[0]?.path;

        const user = await User.findByIdAndUpdate(
            req.body._id,
            {
                avatarUrl: req.body,
            },
            { new: true }
        ).select("-password -refreshToken");
    }),

    logout: asyncHandler(async (req, res) => {
        await User.findByIdAndUpdate(req.body._id, {
            $unset: {
                refreshToken: 1,
            },
        });

        res.clearCookie("accessToken", cookieOptions);
        res.clearCookie("refreshToken", cookieOptions);
        return res.status(200).json(new ApiResponse(200, "User logged out"));
    }),
};
