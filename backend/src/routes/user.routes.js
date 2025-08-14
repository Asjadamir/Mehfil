import { Router } from "express";
import { upload } from "../middlewares/multer.js";
import { userControllers } from "../controllers/user.controllers.js";

const router = Router();

router.post("/register-email", userControllers.registerEmail);

router.post("/verify-email", userControllers.verifyUserEmail);
router.get("/verify-registration", userControllers.verifyRegistration);
router.post(
    "/register-profile",
    upload.single("avatar"),
    userControllers.registerProfile
);
router.get("/refresh", userControllers.refresh);

export default router;
