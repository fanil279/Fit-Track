const express = require("express");
const router = express.Router();

const authController = require("../controllers/authController");

// Authenticatiuon validation middleware
const isAuth = require("../middleware/isAuth");
const isNotAuth = require("../middleware/isNotAuth");

// Regsiter Validation
const { registerValidation } = require("../utils/validation");

// Root Route
router.get("/", (req, res) => {
    res.redirect("/login");
});

// Routes
router.get("/dashboard", isAuth, authController.getDashboard);
router.get("/login", isNotAuth, authController.getLogin);
router.get("/register", isNotAuth, authController.getRegister);
router.get("/logout", authController.logout);

// Form Handlers
router.post("/login", authController.login);
router.post("/register", registerValidation(), authController.register);

module.exports = router;