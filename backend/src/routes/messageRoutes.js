import express from "express";
const router = express.Router();
import messageController from "../controllers/messageController.js";
import auth from "../middleware/auth.js";

// protected routes
router.post("/", auth, messageController.sendMessage);
router.get("/", auth, messageController.getMessagesForStudent);
router.get("/with/:otherId", auth, messageController.getConversation);

export default router;