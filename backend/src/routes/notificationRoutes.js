import express from "express";
const router = express.Router();
import notificationController from "../controllers/notificationController.js";
import auth from "../middleware/auth.js";

// protected routes
router.get("/", auth, notificationController.getNotifications);
router.put("/:id/read", auth, notificationController.markAsRead);

export default router;