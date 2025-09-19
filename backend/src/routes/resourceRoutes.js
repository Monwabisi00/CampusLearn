import express from "express";
const router = express.Router();
import resourceController from "../controllers/resourceController.js";
import auth from "../middleware/auth.js";
import upload from "../config/multer.js";

// protected route
router.post("/", auth, upload.single("file"), resourceController.createResource);

router.get("/topic/:topicId", resourceController.getResourcesByTopic);

// protected route
router.delete("/:id", auth, resourceController.deleteResource);

export default router;