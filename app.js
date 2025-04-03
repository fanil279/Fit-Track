const express = require("express");
const mongoose = require("mongoose");
const i18n = require("i18n");
const cookieParser = require("cookie-parser");
const path = require("path");
require("dotenv").config();

const authRoutes = require("./routes/authRoutes");
const goalRoutes = require("./routes/goalRoutes");

const errorHandler = require("./middleware/errorHandler");

const app = express();
const port = process.env.PORT || 3000;

// Middleware provided by express
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// Dynamic localization
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

// Embedded JavaScript templeting engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// MongoDB (Atlas) connection
mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log("Connected to database!"))
    .catch(err => console.error(err));

mongoose.connection.on("error", (err) => {
    console.error("Failed to connect to database", err);
});

// Routes for user authentication and goal creation
app.use("/", authRoutes);
app.use("/", goalRoutes);

// Custom middleware
app.use(errorHandler);

app.listen(port, () => console.log(`Application is running on http:localhost:${port}`));