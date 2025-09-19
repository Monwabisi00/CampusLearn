import express from "express";
const router = express.Router();
import moduleController from "../controllers/moduleController.js";

router.get("/", moduleController.listModules);
router.get("/:id", moduleController.getModule);

export default router;