const mongoose = require("mongoose");

const goalSchema = new mongoose.Schema({
    goalName: {
        type: String,
        minLength: [5, "Goal should, at least, consist of 5 characters!"],
        required: [true, "Goal name is required!"],
        unique: true,
    },
    description: {
        type: String,
        minLength: [10, "Description should, at least, consist of 10 characters!"],
        required: [true, "Description is required!"],
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
});

const Goal = mongoose.model("Goal", goalSchema);

module.exports = Goal;