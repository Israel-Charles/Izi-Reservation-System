import express from "express";
import authenticate from "../middleware/authenticate";
import { validateResource } from "../middleware/resource.validation";
import { validateUpdateProfile } from "../middleware/user.validation";
import {
	getProfile,
	updateProfile,
	deleteProfile,
	getMyResources,
	addResource,
	editResource,
	deleteResource,
	getMyReservations,
	cancelReservation,
} from "../controllers/users";

const router = express.Router();

router.get("/profile", authenticate, getProfile);
router.put("/profile", authenticate, validateUpdateProfile, updateProfile);
router.delete("/profile", authenticate, deleteProfile);
router.get("/my-resources", authenticate, getMyResources);
router.post("/my-resources", authenticate, validateResource, addResource);
router.put(
	"/my-resources/:resourceId",
	authenticate,
	validateResource,
	editResource
);
router.delete("/my-resources/:resourceId", authenticate, deleteResource);
router.get("/my-reservations", authenticate, getMyReservations);
router.delete(
	"/my-reservations/:reservationId",
	authenticate,
	cancelReservation
);

export default router;
