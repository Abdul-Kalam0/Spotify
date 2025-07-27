const authMiddleware = require("../middleware/authMiddleware");
const express = require("express");
const router = express.Router();

//Song API
router.post("/create", authMiddleware, createSong);

module.exports = router;
