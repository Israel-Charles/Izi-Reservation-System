import express from "express";
import {
	addResource,
	getAllResources,
	getResourceById,
	updateResource,
	deleteResource,
} from "../controllers/resources";
import authenticate from "../middleware/authenticate";
import { validateResource } from "../middleware/resource.validation";

const router = express.Router();

router.post("/api/resources", authenticate, validateResource, addResource);
router.get("/api/resources", getAllResources);
router.get("/api/resources/:resourceId", getResourceById);
router.put("/api/resources/:resourceId", updateResource);
router.delete("/api/resources/:resourceId", deleteResource);

export default router;
