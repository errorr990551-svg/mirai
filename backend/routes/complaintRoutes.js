const express = require("express");
const router = express.Router();
const upload = require("../middlewares/upload");
const { submitComplaintForm } = require("../controllers/complaintController");

router.post("/complaint", upload.single("image"), submitComplaintForm);

module.exports = router;
