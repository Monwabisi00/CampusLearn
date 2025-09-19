import express from "express";
const router = express.Router();
import studentController from "../controllers/studentController.js";
import auth from "../middleware/auth.js";

// create tutor record (only owner or admin should normally do this; keep protected)
router.post("/", auth, tutorController.createTutor);
router.get("/", tutorController.listTutors);
router.get("/:id", tutorController.getTutor);
router.put("/:id", auth, tutorController.updateTutor);
router.delete("/:id", auth, tutorController.deleteTutor);

export default router;