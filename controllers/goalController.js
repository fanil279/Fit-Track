const Goal = require("../models/Goal");
const User = require("../models/User");

const createGoal = async (req, res) => {
    try {
        const { goalName, description } = req.body;
        const username = req.user.username;  // Extract username from decoded JWT

        goalName = goalName.trim();
        description = description.trim();

        const user = await User.findOne({ username });
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        const userId = user._id;  // Extract id from user object

        if (!goalName || !description) {
            return res.status(400).json({ error: "Missing required fields" });
        }

        const newGoal = new Goal({ goalName, description, userId });
        await newGoal.save();

        // Add goal reference to user's goals array
        await User.findByIdAndUpdate(userId,
            { $push: { goals: newGoal._id }},
            { new: true }
        );

        res.status(201).json(newGoal);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to create a new goal" });
    }
}

const readGoals = async (req, res) => {
    try {
        const username = req.user.username;
        const user = await User.findOne({ username });
        const userId = user._id;

        const goals = await Goal.find({ userId }).sort({ createdAt: -1 });
        res.status(200).json(goals);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to fetch goals" });
    }
}

const updateGoal = async (req, res) => {
    try {
        const username = req.user.username;
        const user = await User.findOne({ username });
        const userId = user._id;

        const { updateGoalByName, updatedGoalName, descriptionUpdate } = req.body;

        updatedGoalName = updatedGoalName.trim();
        descriptionUpdate = descriptionUpdate.trim();

        if (!updatedGoalName || !descriptionUpdate) {
            return res.status(400).json({ error: "Missing required fields" });
        }

        const updatedGoal = await Goal.findOneAndUpdate(
            { goalName: updateGoalByName, userId },
            { goalName: updatedGoalName, description: descriptionUpdate },
            { new: true }
        );

        if (!updatedGoal) {
            return res.status(404).json({ error: "Goal not found" });
        }

        res.status(200).json(updatedGoal);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to update the goal" });
    }
}

const deleteGoal = async (req, res) => {
    try {
        const username = req.user.username;
        const user = await User.findOne({ username });
        const userId = user._id;

        const { deleteGoalByName } = req.body;

        const deletedGoal = await Goal.findOneAndDelete({ goalName: deleteGoalByName, userId });

        if (!deletedGoal) {
            return res.status(404).json({ error: "Goal not found" });
        }

        // Delete goal reference to user's goals array
        await User.findByIdAndDelete(userId, {
            $pull: { goals: deletedGoal._id }
        });

        res.status(200).json(deletedGoal);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to delete the goal" });
    }
}

module.exports = { createGoal, readGoals, updateGoal, deleteGoal };