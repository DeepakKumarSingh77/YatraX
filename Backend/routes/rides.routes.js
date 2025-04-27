const express = require('express');
const router = express.Router();
const ridesController = require('../controller/rides.controller');

router.get("/getfare", ridesController.getfare);
router.post("/bookride", ridesController.createride);
router.get("/:id", ridesController.getRideById); // Get ride by ID

module.exports = router;