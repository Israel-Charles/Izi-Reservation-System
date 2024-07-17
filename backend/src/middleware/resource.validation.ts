import { body } from "express-validator";

const validateDescription = [
	body("name")
		.notEmpty()
		.withMessage("Name is required")
		.isLength({ max: 50 })
		.withMessage("Name can be at most 50 characters long"),
	body("location")
		.notEmpty()
		.withMessage("Location is required")
		.isLength({ max: 75 })
		.withMessage("Location can be at most 75 characters long"),
	body("description")
		.notEmpty()
		.withMessage("Description is required")
		.isLength({ max: 2000 })
		.withMessage("Description can be at most 2000 characters long"),
];

const validateType = [
	body("maxResLen")
		.notEmpty()
		.withMessage("Max reservation length is required")
		.isInt({ min: 30, max: 300 })
		.withMessage("Max reservation length must be between 30 and 300 minutes")
		.custom(
			(value) =>
				value % 15 === 0 ||
				"Max reservation length must be an increment of 15 minutes"
		),
	body("maxResSize")
		.notEmpty()
		.withMessage("Max reservation group size is required")
		.isInt({ min: 1, max: 50 })
		.withMessage("Max reservation group size must be between 1 and 50"),
	body("type")
		.notEmpty()
		.withMessage("Type is required")
		.isIn(["Restaurant", "Bar", "Cafe", "Pub"])
		.withMessage("Type must be one of the give options"),
];

const validateHours = [
	body("open").notEmpty().withMessage("Open time is required"),
	body("close")
		.notEmpty()
		.withMessage("Close time is required")
		.custom(
			(close, { req }) =>
				close > req.body.open || "Close time must be after open time"
		),
	body("days")
		.notEmpty()
		.withMessage("At least one day of operation are required"),
];

const validateImages = [
	body("imageUrls").notEmpty().withMessage("At least one image is required"),
];

export const validateResource = [
	...validateDescription,
	...validateType,
	...validateHours,
	...validateImages,
];
