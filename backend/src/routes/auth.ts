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
	validateEmail,
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
router.get("/email/verify/:verificationToken", verifyEmail);
router.post("/login", validateLogin, login);
router.get("/logout", logout);
router.post("/password/forgot", validateEmail, forgotPassword);
router.put("/password/reset/:resetToken", validateResetPassword, resetPassword);

export default router;
