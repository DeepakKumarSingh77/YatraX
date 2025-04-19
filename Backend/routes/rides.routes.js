const express = require('express');
const router = express.Router();
const ridesController = require('../controller/rides.controller');

router.get("/getfare", ridesController.getfare);

module.exports = router;