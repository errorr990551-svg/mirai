import express from "express";
import upload from "../middlewares/upload.js";
import { submitApplication } from "../controllers/applicationController.js";

const router = express.Router();

router.post("/apply", upload.single("resume"), submitApplication);

export default router;
