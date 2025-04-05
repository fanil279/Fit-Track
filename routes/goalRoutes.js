const express = require("express");
const router = express.Router();

const goalController = require("../controllers/goalController");

// CRUD Operations Routes
router.post("/dashboard/create-goal", goalController.createGoal);
router.get("/dashboard", goalController.readGoals);
router.put("/dashboard/update-goal/:name", goalController.updateGoal);
router.delete("/dashboard/delete-goal/:name", goalController.deleteGoal);

module.exports = router;