import express, { Request, Response } from "express";
import {
	register,
	verifyEmail,
	login,
	logout,
	forgotPassword,
	resetPassword,
} from "../controllers/auth";
import {
	validateLogin,
	validateRegister,
	validateResetPassword,
} from "../middleware/user.validation";
import authenticate from "../middleware/authenticate";

const router = express.Router();

router.get("/", authenticate, (req: Request, res: Response) => {
	res.status(200).json({ message: "Authenticated", userId: req.userId });
});
router.post("/register", validateRegister, register);
router.get("/verify-email/:verificationToken", verifyEmail);
router.post("/login", validateLogin, login);
router.get("/logout", logout);
router.post("/forgot-password", forgotPassword);
router.put("/reset-password/:resetToken", validateResetPassword, resetPassword);

export default router;
