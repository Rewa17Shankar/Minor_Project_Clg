const express = require("express");
const passport = require("passport");
const db = require("../config/db"); // Ensure the correct DB path
const router = express.Router();
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcryptjs");
const flash = require("connect-flash"); // Ensure flash is used
const session = require("express-session");

// Use session and flash messages
router.use(session({ secret: "secret", resave: false, saveUninitialized: true }));
router.use(passport.initialize());
router.use(passport.session());
router.use(flash());

// Google OAuth login route
router.get("/auth/google", passport.authenticate("google", { scope: ["profile", "email"] }));

// Render Signup Page
router.get("/signup", (req, res) => {
    res.render("signup", { error: req.flash("error") });
});

// Handle Signup Form Submission
router.post("/signup", async (req, res) => {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
        req.flash("error", "All fields are required!");
        return res.redirect("/signup");
    }

    try {
        // Check if user already exists
        const userExists = await db.query("SELECT * FROM users WHERE email = $1", [email]);

        if (userExists.rows.length > 0) {
            req.flash("error", "Email already in use!");
            return res.redirect("/signup");
        }

        // Hash Password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Insert into Database
        await db.query("INSERT INTO users (username, email, password) VALUES ($1, $2, $3)", 
            [username, email, hashedPassword]);

        req.flash("success", "Signup successful! Please log in.");
        res.redirect("/login");
    } catch (error) {
        console.error(error);
        req.flash("error", "Something went wrong!");
        res.redirect("/signup");
    }
});

// ✅ ✅ ✅ ADDED LOGIN ROUTE ✅ ✅ ✅
router.get("/login", (req, res) => {
    res.render("login", { error: req.flash("error") });
});

// Handle Login Form Submission
router.post("/login", passport.authenticate("local", {
    successRedirect: "/", // Redirect to home page after login
    failureRedirect: "/login", // Redirect back to login on failure
    failureFlash: true // Show error messages
}));

// Google OAuth callback route
router.get(
    "/auth/google/callback",
    passport.authenticate("google", {
        failureRedirect: "/login", // Redirect to login page on failure
    }),
    (req, res) => {
        res.redirect("/"); // Redirect to index.ejs after successful login
    }
);

// Logout route
router.get("/logout", (req, res) => {
    req.logout(() => {
        res.redirect("/"); // Redirect to index after logout
    });
});

// ✅ PASSPORT STRATEGY CONFIGURATION ✅
passport.use(new LocalStrategy({ usernameField: "email" }, async (email, password, done) => {
    try {
        const result = await db.query("SELECT * FROM users WHERE email = $1", [email]);
        if (result.rows.length === 0) {
            return done(null, false, { message: "User not found" });
        }

        const user = result.rows[0];

        // Compare password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return done(null, false, { message: "Incorrect password" });
        }

        return done(null, user);
    } catch (err) {
        return done(err);
    }
}));

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    try {
        const result = await db.query("SELECT * FROM users WHERE id = $1", [id]);
        done(null, result.rows[0]);
    } catch (err) {
        done(err);
    }
});

module.exports = router;
