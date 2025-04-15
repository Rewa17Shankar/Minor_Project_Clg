// Load environment variables
require("dotenv").config();

// Import required packages
const express = require("express");
const session = require("express-session");
const passport = require("./config/passport"); // Import Passport setup
const authRoutes = require("./routes/authRoutes");
const quizRoutes = require("./routes/quizRoutes");
const flash = require("express-flash");
const app = express();

// Middleware to handle sessions (Place this before routes)
app.use(session({
    secret: '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 ',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false } // Set secure to true if using HTTPS
}));
// Middleware
app.use(express.json()); // For parsing application/json
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.set("view engine", "ejs");

// Session middleware (Should be before passport)
app.use(
    session({
        secret: process.env.SESSION_SECRET || "quiz_secret_key",
        resave: false,
        saveUninitialized: false, // Don't store empty sessions
        cookie: { secure: false }, // Set `true` in production (HTTPS)
    })
);

app.use(passport.initialize());
app.use(passport.session());

app.use(flash());

// Middleware to make flash messages available in views
app.use((req, res, next) => {
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");
    next();
});
// Pass user data to all EJS templates
app.use((req, res, next) => {
    res.locals.user = req.user || null;
    next();
});

// Routes
app.get("/", (req, res) => {
    res.render("index"); // No need to pass user explicitly (handled by res.locals)
});

app.use("/", authRoutes); // Handles authentication (Google login)
app.use("/", quizRoutes); // Handles quiz functionality

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Server running at http://localhost:${PORT}`));
