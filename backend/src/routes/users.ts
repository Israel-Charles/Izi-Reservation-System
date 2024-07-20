import express from "express";
import {
	getProfile,
	updateProfile,
	deleteUser,
	getMyResources,
	addResource,
	editResource,
	deleteResource,
} from "../controllers/users";
import authenticate from "../middleware/authenticate";
import { validateUpdateProfile } from "../middleware/user.validation";
import { validateResource } from "../middleware/resource.validation";

const router = express.Router();

router.get("/profile", authenticate, getProfile);
router.put(
	"/profile/update",
	authenticate,
	validateUpdateProfile,
	updateProfile
);
router.delete("/delete", authenticate, deleteUser);
router.get("/my-resources", authenticate, getMyResources);
router.post("/my-resources/add", authenticate, validateResource, addResource);
router.put(
	"/my-resources/edit/:resourceId",
	authenticate,
	validateResource,
	editResource
);
router.delete("/my-resources/delete/:resourceId", authenticate, deleteResource);

export default router;
