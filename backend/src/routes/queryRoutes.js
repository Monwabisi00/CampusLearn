import express from "express";
import queryController from "../controllers/queryController.js";
import auth from "../middleware/auth.js";
const router = express.Router();

// protected route
router.post("/", auth, queryController.createQuery);

router.get("/topic/:topicId", queryController.listQueriesByTopic);
router.get("/:userId", queryController.getQueriesByUserId);

// protected route
router.delete("/:id", auth, queryController.deleteQuery);

export default router;
