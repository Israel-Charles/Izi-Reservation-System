import multer from "multer";
import express from "express";
import authenticate from "../middleware/authenticate";
import { validateResource } from "../middleware/resource.validation";
import { validateUpdateProfile } from "../middleware/user.validation";
import {
    getProfile,
    updateProfile,
    deleteProfile,
    getMyResources,
    getMyResourceById,
    addResource,
    updateResource,
    deleteResource,
    getMyReservations,
} from "../controllers/users";

const storage = multer.memoryStorage();
const upload = multer({
    storage,
    limits: { fileSize: 1024 * 1024 * 5 }, // max 5MB
});

const router = express.Router();

router.get("/profile", authenticate, getProfile);
router.put("/profile", authenticate, validateUpdateProfile, updateProfile);
router.delete("/profile", authenticate, deleteProfile);
router.get("/my-resources", authenticate, getMyResources);
router.get("/my-resources/:resourceId", authenticate, getMyResourceById);
router.post(
    "/my-resources",
    authenticate,
    upload.array("imageFiles", 6),
    validateResource,
    addResource
);
router.put(
    "/my-resources/:resourceId",
    authenticate,
    upload.array("imageFiles"),
    validateResource,
    updateResource
);
router.delete("/my-resources/:resourceId", authenticate, deleteResource);
router.get("/my-reservations", authenticate, getMyReservations);

export default router;
