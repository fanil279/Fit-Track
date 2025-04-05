const Goal = require("../models/Goal");
const User = require("../models/User");

const createGoal = async (req, res) => {
    try {
        const { goalName, description } = req.body;

        const newGoal = await new Goal({ goalName, description, userId: req.user._id });
        await newGoal.save();

        // Add goal reference to user's goals array
        await User.findByIdAndUpdate(req.user._id,
                                    { $push: { goals: newGoal._id }},
                                    { new: true }
        );

        res.status(201).json(newGoal);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to craete a new goal" });
    }
}

const readGoals = async (req, res) => {
    try {
        const goals = await Goal.find({ userId: req.user._id }).sort({ createdAt: -1 });
        res.status(200).json(goals);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to fetch goals" });
    }
}

const updateGoal = async (req, res) => {
    try {
        const { name } = req.params;
        const { updateGoalName, descriptionUpdate } = req.body;

        const updatedGoal = await Goal.findOneAndUpdate(
            { goalName: name, userId: req.user._id },
            { goalName: updateGoalName, description: descriptionUpdate },
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
        const { name } = req.params;

        const deletedGoal = await Goal.findOneAndDelete({ 
            goalName: name,
            userId: req.user._id
        });

        res.status(200).json(deletedGoal);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to delete the goal" });
    }
}

module.exports = { createGoal, readGoals, updateGoal, deleteGoal };