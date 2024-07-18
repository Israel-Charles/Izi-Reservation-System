import { body } from "express-validator";

const validateNames = [
	body("firstName")
		.notEmpty()
		.withMessage("First name is required")
		.isLength({ max: 50 })
		.withMessage("First name can be at most 50 characters long"),
	body("lastName")
		.notEmpty()
		.withMessage("Last name is required")
		.isLength({ max: 50 })
		.withMessage("Last name can be at most 50 characters long"),
	body("userName")
		.notEmpty()
		.withMessage("Username is required")
		.isLength({ min: 5 })
		.withMessage("Username must be atleast 5 characters long")
		.isLength({ max: 50 })
		.withMessage("Username can be at most 50 characters long"),
];

export const validateEmail = [
	body("email")
		.notEmpty()
		.withMessage("Email is required")
		.matches(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i)
		.withMessage("Email is not valid"),
];

const validatePasswords = [
	body("password")
		.notEmpty()
		.withMessage("Password is required")
		.isLength({ min: 8 })
		.withMessage("Password must be at least 8 characters long")
		.isLength({ max: 50 })
		.withMessage("Password can be at most 50 characters long")
		.matches(/(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,50}/)
		.withMessage("Password must contain at least one letter and one number"),
	body("confirmPassword")
		.notEmpty()
		.withMessage("Confirm password is required")
		.custom((confirmPassword, { req }) => confirmPassword === req.body.password)
		.withMessage("Passwords do not match"),
];

export const validateRegister = [
	...validateNames,
	body("email")
		.notEmpty()
		.withMessage("Email is required")
		.isEmail()
		.withMessage("Email is not valid"),
	...validatePasswords,
];

export const validateLogin = [
	body("identifier").notEmpty().withMessage("Identifier is required"),
	body("password").notEmpty().withMessage("Password is required"),
];

export const validateResetPassword = [...validatePasswords];

export const validateUpdateProfile = [...validateNames];
