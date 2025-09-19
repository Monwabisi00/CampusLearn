import express from "express";
const router = express.Router();
import studentController from "../controllers/studentController.js";
import auth from "../middleware/auth.js";

router.post("/register", studentController.register);
router.post("/login", studentController.login);

// protected routes
router.get("/:id", auth, studentController.getProfile);
router.put("/:id", auth, studentController.updateProfile);
router.delete("/:id", auth, studentController.deleteAccount);

export default router;