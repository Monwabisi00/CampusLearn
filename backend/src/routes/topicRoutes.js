import express from "express";
const router = express.Router();
import topicController from "../controllers/topicController.js";
import auth from "../middleware/auth.js";

router.post("/", auth, topicController.createTopic);
router.get("/", topicController.listTopics);
router.get("/:id", topicController.getTopic);

// protected routes
router.put("/:id", auth, topicController.updateTopic);
router.delete("/:id", auth, topicController.deleteTopic)

export default router;