const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    
    username: {
        type: String,
        required: [true, "Name is required!"],
        minLenght: [3, "Username should consist of minimum 3 characters!"],
        unique: true,
    },
    password: {
        type: String,
        minLength: [6, "Password should, at least, consist of 6 characters!"],
        required: [true, "Password is required!"],
    },
    goals: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Goal",
    }],
});

const User = mongoose.model("User", userSchema);

module.exports = User;