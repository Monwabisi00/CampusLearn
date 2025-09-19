import express from "express";
const router = express.Router();
import queryController from "../controllers/queryController.js";
import auth from "../middleware/auth.js";

// protected route
router.post("/", auth, queryController.createQuery);

router.get("/topic/:topicId", queryController.listQueriesByTopic);

// protected route
router.delete("/:id", auth, queryController.deleteQuery);

export default router;