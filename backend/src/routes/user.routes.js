import { Router } from "express";
import { upload } from "../middlewares/multer.js";
import { userControllers } from "../controllers/user.controllers.js";

const router = Router();

router.post("/registerEmail", userControllers.registerEmail);
router.post(
    "/registerUser",
    upload.single("avatar"),
    userControllers.registerUser
);

export default router;
