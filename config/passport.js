require("dotenv").config(); // Load environment variables

const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const pool = require("./db");

passport.use(
    new GoogleStrategy(
        {
            clientID: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            callbackURL: process.env.GOOGLE_CALLBACK_URL,
        },
        async (accessToken, refreshToken, profile, done) => {
            try {
                const result = await pool.query("SELECT * FROM userss WHERE google_id = $1", [profile.id]);
                let user;

                if (result.rows.length === 0) {
                    const insertQuery = `
                        INSERT INTO userss (google_id, name, email) 
                        VALUES ($1, $2, $3) RETURNING *`;
                    const values = [profile.id, profile.displayName, profile.emails[0].value];
                    const newUser = await pool.query(insertQuery, values);
                    user = newUser.rows[0];
                } else {
                    user = result.rows[0];
                }
                return done(null, user);
            } catch (err) {
                console.error(err);
                return done(err, null);
            }
        }
    )
);

// Serialize and Deserialize User
passport.serializeUser((user, done) => {
    done(null, user.google_id);
});

passport.deserializeUser(async (google_id, done) => {
    try {
        const result = await pool.query("SELECT * FROM userss WHERE google_id = $1", [google_id]);
        done(null, result.rows[0]);
    } catch (err) {
        done(err, null);
    }
});

module.exports = passport;
