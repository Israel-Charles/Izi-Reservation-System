import express from "express";
import { getProfile, updateProfile } from "../controllers/users";
import authenticate from "../middleware/authenticate";
import { validateUpdateProfile } from "../middleware/user.validation";

const router = express.Router();

router.get("/profile", authenticate, getProfile);
router.put("/profile", authenticate, validateUpdateProfile, updateProfile);

export default router;
