const express = require("express");
const router = express.Router();
const {
  registration,
  login,
  logout,
} = require("../controllers/authControllers");
const authMiddleware = require("../middleware/authMiddleware");

router.post("/register", authMiddleware, registration);
router.post("/login", authMiddleware, login);
router.post("/logout", authMiddleware, logout);

module.exports = router;
