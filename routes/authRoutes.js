// const express = require("express");
// const passport = require("passport");
// const db = require("../config/db"); // Ensure the correct DB path
// const router = express.Router();
// const LocalStrategy = require("passport-local").Strategy;
// const bcrypt = require("bcryptjs");
// const flash = require("connect-flash"); // Ensure flash is used
// const session = require("express-session");

// // Use session and flash messages
// router.use(session({ secret: "secret", resave: false, saveUninitialized: true }));
// router.use(passport.initialize());
// router.use(passport.session());
// router.use(flash());

// // Google OAuth login route
// router.get("/auth/google", 
//     passport.authenticate("google", { scope: ["profile", "email"] })
// );

// // Render Signup Page
// router.get("/signup", (req, res) => {
//     res.render("signup", { error: req.flash("error") });
// });

// // Handle Signup Form Submission
// router.post("/signup", async (req, res) => {
//     const { username, email, password } = req.body;

//     if (!username || !email || !password) {
//         req.flash("error", "All fields are required!");
//         return res.redirect("/signup");
//     }

//     try {
//         // Check if user already exists
//         const userExists = await db.query("SELECT * FROM users WHERE email = $1", [email]);

//         if (userExists.rows.length > 0) {
//             req.flash("error", "Email already in use!");
//             return res.redirect("/signup");
//         }

//         // Hash Password
//         const hashedPassword = await bcrypt.hash(password, 10);

//         // Insert into Database
//         await db.query("INSERT INTO users (username, email, password) VALUES ($1, $2, $3)", 
//             [username, email, hashedPassword]);

//         req.flash("success", "Signup successful! Please log in.");
//         res.redirect("/login");
//     } catch (error) {
//         console.error(error);
//         req.flash("error", "Something went wrong!");
//         res.redirect("/signup");
//     }
// });

// // ✅ ✅ ✅ ADDED LOGIN ROUTE ✅ ✅ ✅
// router.get("/login", (req, res) => {
//     res.render("login", { error: req.flash("error") });
// });

// // Handle Login Form Submission
// router.post("/login", passport.authenticate("local", {
//     successRedirect: "/", // Redirect to home page after login
//     failureRedirect: "/login", // Redirect back to login on failure
//     failureFlash: true // Show error messages
// }));

// // Google OAuth callback route
// router.get(
//     "/auth/google/callback",
//     passport.authenticate("google", {
//         failureRedirect: "/login", // Redirect to login page on failure
//     }),
//     (req, res) => {
//         res.redirect("/"); // Redirect to index.ejs after successful login
//     }
// );

// // Logout route
// router.get("/logout", (req, res) => {
//     req.logout(() => {
//         res.redirect("/"); // Redirect to index after logout
//     });
// });

// // ✅ PASSPORT STRATEGY CONFIGURATION ✅
// passport.use(new LocalStrategy({ usernameField: "email" }, async (email, password, done) => {
//     try {
//         const result = await db.query("SELECT * FROM users WHERE email = $1", [email]);
//         if (result.rows.length === 0) {
//             return done(null, false, { message: "User not found" });
//         }

//         const user = result.rows[0];

//         // Compare password
//         const isMatch = await bcrypt.compare(password, user.password);
//         if (!isMatch) {
//             return done(null, false, { message: "Incorrect password" });
//         }

//         return done(null, user);
//     } catch (err) {
//         return done(err);
//     }
// }));

// passport.serializeUser((user, done) => {
//     done(null, user.id);
// });

// passport.deserializeUser(async (id, done) => {
//     try {
//         const result = await db.query("SELECT * FROM users WHERE id = $1", [id]);
//         done(null, result.rows[0]);
//     } catch (err) {
//         done(err);
//     }
// });

// module.exports = router;




const express = require("express");
const passport = require("passport");
const db = require("../config/db");
const bcrypt = require("bcryptjs");
const { ensureAuthenticated } = require("../middleware/auth");

const router = express.Router();

// ----------------------
// ✅ GOOGLE AUTH ROUTES
// ----------------------

// Start Google OAuth login
router.get("/auth/google", 
    passport.authenticate("google", { scope: ["profile", "email"] })
);

// Google OAuth callback
router.get("/auth/google/callback",
    passport.authenticate("google", {
        failureRedirect: "/login",
        failureFlash: true
    }),
    (req, res) => {
        res.redirect("/dashboard"); // redirect after success
    }
);

// ----------------------
// ✅ SIGNUP ROUTES
// ----------------------

router.get("/signup", (req, res) => {
    res.render("signup", { error: req.flash("error") });
});

router.post("/signup", async (req, res) => {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
        req.flash("error", "All fields are required!");
        return res.redirect("/signup");
    }

    try {
        const userExists = await db.query("SELECT * FROM users WHERE email = $1", [email]);
        if (userExists.rows.length > 0) {
            req.flash("error", "Email already in use!");
            return res.redirect("/signup");
        }

        const hashedPassword = await bcrypt.hash(password, 10);
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

// ----------------------
// ✅ LOGIN ROUTES
// ----------------------

router.get("/login", (req, res) => {
    res.render("login", { error: req.flash("error") });
});

router.post("/login", passport.authenticate("local", {
    successRedirect: "/dashboard",
    failureRedirect: "/login",
    failureFlash: true
}));

// ----------------------
// ✅ LOGOUT ROUTE
// ----------------------

router.get("/logout", (req, res) => {
    req.logout(() => {
        req.flash("success", "Logged out successfully.");
        res.redirect("/");
    });
});

// // ----------------------
// // ✅ PROTECTED DASHBOARD
// // ----------------------

// router.get("/dashboard", ensureAuthenticated, async (req, res) => {
//     try {
//         const userId = req.user.id;

//         // Fetch quiz history for the logged-in user
//         const result = await db.query(
//             "SELECT correct_answers, total_questions, submitted_at FROM quiz_results WHERE user_id = $1 ORDER BY submitted_at DESC",
//             [userId]
//         );

//         const quizHistory = result.rows;

//         res.render("dashboard", {
//             user: req.user,
//             quizHistory: quizHistory
//         });
//     } catch (error) {
//         console.error("Error loading dashboard:", error);
//         res.status(500).send("Server error");
//     }
// });


module.exports = router;
