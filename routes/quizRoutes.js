const express = require("express");
const axios = require("axios");
const passport = require("passport");
const router = express.Router();
const API_URL = "https://opentdb.com/api.php";
const difficultyLimits = { easy: 10, medium: 25, hard: 50 };
const db = require("../config/db");
const { ensureAuthenticated } = require("../middleware/auth"); 

// 📌 About Us Page


router.get("/about", (req, res) => {
    console.log("About route is being hit!");
    res.render("about", { user: req.user });
});


// 📌 Quiz Setup Page
router.get("/quiz-setup", (req, res) => {
    if (!req.user) {
        return res.redirect("/");
    }
    res.render("quiz-setup", { user: req.user, query: req.query });
});

// 📌 Dashboard Route - Display quiz history
router.get("/dashboard", async (req, res) => {
    try {
        const user_id = req.user.id;
        console.log("Fetching results for user_id:", user_id);

        const results = await db.query(
            "SELECT correct_answers, total_questions, category, difficulty, submitted_at FROM quiz_attempts WHERE user_id = $1 ORDER BY submitted_at DESC",
            [parseInt(user_id)]
        );
        
        console.log("Fetched Results:", results.rows);
        res.render("dashboard", { quizHistory: results.rows, user: req.user });
    } catch (error) {
        console.error("Error fetching dashboard data:", error);
        res.status(500).send("Internal Server Error");
    }
});


// 📌 Fetch Quiz Questions
router.get("/quiz", async (req, res) => {
    if (!req.user) {
        return res.redirect("/");
    }

    const { category, difficulty } = req.query;
    console.log("Category:", category, "Difficulty:", difficulty); // ✅ Debugging
    if (!category || !difficulty) {
        return res.redirect("/quiz-setup?error=1");
    }

    const limit = difficultyLimits[difficulty] || 10;

    try {
        const response = await axios.get(API_URL, {
            params: { amount: limit, category, difficulty, type: "multiple" }
        });

        req.session.correctAnswers = response.data.results.map(q => q.correct_answer);
        res.render("quiz", { 
            questions: response.data.results, 
            user: req.user, 
            category, 
            difficulty 
        });
    } catch (error) {
        console.error("Error fetching quiz data:", error.message);
        res.send("⚠ Error fetching quiz data. Please try again.");
    }
});


// 📌 Quiz Results Page - Render results after quiz submission
// Handle Quiz Submission
router.post("/submit", async(req, res) => {
    if (!req.user) {
        return res.redirect("/");
    }

    const user_id = req.user.id; // ✅ Ensure user_id is defined  
    // ✅ Ensure category and difficulty are set (provide default values if missing)
    const category = req.session.quizSettings?.category || "Unknown";
    const difficulty = req.session.quizSettings?.difficulty || "Unknown"; 
    const userAnswers = req.body;
    const correctAnswers = req.session.correctAnswers;

    if (!correctAnswers) {
        return res.redirect("/quiz-setup?error=sessionExpired");
    }

    let score = 0;
    let total_questions = correctAnswers.length;
    let results = [];

    console.log('User Answers:', userAnswers); // Debug: log user answers
    console.log('Correct Answers:', correctAnswers); // Debug: log correct answers

    correctAnswers.forEach((correctAnswer, index) => {
        let userAnswer = userAnswers[`q${index}`] || "No Answer";
        let isCorrect = userAnswer === correctAnswer;
        if (isCorrect) score++;

        results.push({ question: `Q${index + 1}`, userAnswer, correctAnswer, isCorrect });
    });

    console.log('Final Score:', score); // Debug: log final score


    console.log("Final Score:", score);
    console.log("Category:", category, "Difficulty:", difficulty); // ✅ Debugging

    res.render("result", { // Make sure you're rendering 'result' instead of 'quiz'
        score,
        total: total_questions,
        results
    });

    // ✅ Insert quiz attempt into the database
  try{
    await db.query(
        "INSERT INTO quiz_attempts (user_id,  correct_answers, total_questions, submitted_at, category, difficulty ) VALUES ($1, $2, $3, NOW(), $4, $5)",
        [user_id,  score, total_questions, category, difficulty]
    );
    console.log("Quiz attempt saved for user_id:", user_id);
  } catch (error) {
    console.error("Error saving quiz result:", error);
    res.status(500).send("Internal Server Error");
}

    
});




module.exports = router;