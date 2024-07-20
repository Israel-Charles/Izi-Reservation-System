import { body } from "express-validator";

export const validateReservation = [
	body("comment").notEmpty().withMessage("Comment is required"),
	body("start").notEmpty().withMessage("Start time is required"),
	body("end").notEmpty().withMessage("End time is required"),
	body("size").notEmpty().withMessage("Size is required"),
];
