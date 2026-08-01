import express from "express";
import upload from "../middlewares/upload.js";
import { submitComplaintForm } from "../controllers/complaintController.js";

const router = express.Router();

router.post("/complaint", upload.single("attachment"), submitComplaintForm);

export default router;
