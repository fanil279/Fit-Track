const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { validationResult } = require("express-validator");
const User = require("../models/User");

const getLogin = (req, res) => {
    res.render("login");
}

const getRegister = (req, res) => {
    res.render("register", { errors: [] });
}

const getDashboard = (req, res) => {
    res.render("dashboard", {user: req.user});
}

const logout = (req, res) => {
    res.clearCookie("token");
    res.redirect("login");
}

const login = async (req, res) => {
    try {
        let { username, password} = req.body;

        username = username.trim();
        password = password.trim();

        let user = await User.findOne({ username });

        if (!user) {
            return res.status(400).render("400");
        }

        let passwordMatches = await bcrypt.compare(password, user.password);

        if (!passwordMatches) {
            return res.status(400).send('Invalid credentials. <a href="/login">Try again</a>');
        }

        const token = jwt.sign({ username }, process.env.JWT_SECRET, { expiresIn: "1h" });
        res.cookie("token", token, { httpOnly: true, sameSite: "strict", maxAge: 3600000});

        return res.redirect("/dashboard");
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "An error occurred. Please try again later" });
    }
}

const register = async (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.render("register", {
            errors: errors.array(),
        });
    }

    try {
        let { username, password} = req.body;

        username = username.trim();
        password = password.trim();

        let usernameExists = await User.findOne({ username });

        if (usernameExists) {
            return res.status(400).send('Username already exists. <a href="/register">Try again</a>');
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ username, password: hashedPassword });
        await newUser.save();

        const token = jwt.sign({ username }, process.env.JWT_SECRET, { expiresIn: "1h" });
        res.cookie("token", token, {httpOnly: true });

        return res.redirect("/dashboard");
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "An error occurred. Please try again later" });
    }
}

module.exports = { getLogin, getRegister, getDashboard, logout, login, register };