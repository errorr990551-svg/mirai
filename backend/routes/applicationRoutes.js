const express = require("express");
const router = express.Router();
const upload = require("../middlewares/upload");
const { submitApplication } = require("../controllers/applicationController");

router.post("/apply", upload.single("resume"), submitApplication);

module.exports = router;
