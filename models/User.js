const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        minLength: [6, "Password should, at least, consist of 6 characters!"],
        required: true,
    },
    goals: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Goal",
    }],
});

const User = mongoose.model("User", userSchema);

module.exports = User;