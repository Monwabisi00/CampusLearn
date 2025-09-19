import express from "express";
const router = express.Router();
import messageController from "../controllers/messageController.js";
import auth from "../middleware/auth.js";
import authController from "../controllers/authController.js";

router.post("/login", auth, authController.login);
router.post("/register", auth, authController.register);

export default router;
