const express = require("express");
const router = express.Router();

const authController = require("../controllers/authController");

// const { isAuth, isNotAuth } = require("../middleware/authMiddleware");

// Routes
router.get("/", authController.getLogin);
router.get("/register", authController.getRegister);
router.get("/dashboard", authController.getDashboard);
router.get("/logout", authController.logout);

// Form handlers
router.post("/login", authController.login);
router.post("/register", authController.register);

module.exports = router;