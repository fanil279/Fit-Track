const express = require("express");
const router = express.Router();

const authController = require("../controllers/authController");

const isAuth = require("../middleware/isAuth");
const isNotAuth = require("../middleware/isNotAuth");

// Root route
router.get("/", (req, res) => {
    res.redirect("/login");
});

// Routes
router.get("/index", isAuth, authController.getDashboard);
router.get("/login", isNotAuth, authController.getLogin);
router.get("/register", isNotAuth, authController.getRegister);
router.get("/logout", authController.logout);

// Form handlers
router.post("/login", authController.login);
router.post("/register", authController.register);

module.exports = router;