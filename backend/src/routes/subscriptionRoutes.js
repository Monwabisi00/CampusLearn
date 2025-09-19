import express from "express";
const router = express.Router();
import subscriptionController from "../controllers/subscriptionController.js";
import auth from "../middleware/auth.js";

// protected routes
router.post("/", auth, subscriptionController.subscribe);
router.delete("/topic/:topicId", auth, subscriptionController.unsubscribe);
router.get("/student/:studentId", auth, subscriptionController.listForStudent);

router.get("/topic/:topicId/subscribers", subscriptionController.listSubscribersForTopic);

export default router;