const express = require("express");
const router = express.Router();

const isAuth = require("../middleware/isAuth");
const goalController = require("../controllers/goalController");

router.use(isAuth);

// CRUD Operations Routes
router.post("/dashboard/create-goal", goalController.createGoal);
router.get("/dashboard/read-goals", goalController.readGoals);
router.put("/dashboard/update-goal", goalController.updateGoal);
router.delete("/dashboard/delete-goal", goalController.deleteGoal);

module.exports = router;