import { User } from "../models/user.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { sendVerificationEmail } from "../utils/verificationEmail.js";
import { userDTO } from "../dto/userdto.js";

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

const generateVerifyToken = async (userId) => {
    let verifyToken;
    try {
        const user = await User.findById(userId);
        verifyToken = await user.generateVerifyToken();
    } catch (error) {
        console.error("There is an error in generating verify token");
    }
};

const cookieOptions = {
    httpOnly: true,
    secure: true,
};

export const userControllers = {
    registerEmail: asyncHandler(async (req, res) => {
        let { email, password } = req.body;
        console.log(req.body);
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

        await user.save();

        let info = await sendVerificationEmail(user.email, user._id);
        console.log("Verification email sent:", info.response);

        let storedUser = new userDTO(user);

        return res.status(200).json(
            new ApiResponse(200, "User registered successfully", {
                user: storedUser,
            })
        );
    }),

    registerUser: asyncHandler(async (req, res) => {
        let { name, username, id } = req.body;

        // Check for the Username
        const usernameInUse = await User.findOne({ username });
        if (usernameInUse) {
            throw new ApiError(401, "Username already exists");
        }

        let avatarPath;

        if (req.file.fieldname === "avatar") {
            avatarPath = req.file.path;
        }

        let avatar = await uploadOnCloudinary(avatarPath);

        const user = new User({
            name,
            username,
            email,
            password,
            avatar: avatar?.url || "",
        });
        await user.save();

        let { accessToken, refreshToken } = await generateAccessAndRefreshToken(
            user._id
        );
    }),

    verifyUser: asyncHandler(async (req, res) => {}),

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
