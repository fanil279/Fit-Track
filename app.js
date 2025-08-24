require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const i18n = require("i18n");
const cookieParser = require("cookie-parser");
const path = require("path");

const authRoutes = require("./routes/authRoutes");
const goalRoutes = require("./routes/goalRoutes");
const localesRouter = require("./routes/localesRoutes");

const i18nHandler = require("./middleware/i18n");
const errorHandler = require("./middleware/errorHandler");

const app = express();
const port = process.env.PORT || 5000;

// Built-in Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// i18n Configuration
i18n.configure({
    locales: ["en", "ru"],
    directory: path.join(__dirname, "locales"),
    defaultLocale: "en",
    queryParameter: "lang",
    cookie: "locale",
    autoReload: true,
    syncFiles: true,
    objectNotation: true,
});

app.use(i18n.init); // Initialization i18n Middleware
app.use(i18nHandler); // Custom Middleware. i18n Handling

// View Engine Setup
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Database Connection
mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log("Connected to database!"))
    .catch(err => console.error("Database connection error:", err));

mongoose.connection.on("error", (err) => {
    console.error("Database connection error:", err);
});

// Routes
app.use("/", localesRouter);
app.use("/", authRoutes);
app.use("/", goalRoutes);

// Not Found Page
app.use((req, res) => {
    res.status(404).render("404");
});

app.use(errorHandler); // Custom Middleware. Global Error Handling

app.listen(port, () => {console.log(`Server is running at ${process.env.BASE_URL}`)});