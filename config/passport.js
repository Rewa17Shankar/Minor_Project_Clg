// require("dotenv").config(); // Load environment variables

// const passport = require("passport");
// const GoogleStrategy = require("passport-google-oauth20").Strategy;
// const pool = require("./db");

// passport.use(
//     new GoogleStrategy(
//         {
//             clientID: process.env.GOOGLE_CLIENT_ID,
//             clientSecret: process.env.GOOGLE_CLIENT_SECRET,
//             callbackURL: process.env.GOOGLE_CALLBACK_URL,
//         },
//         async (accessToken, refreshToken, profile, done) => {
//             try {
//                 const result = await pool.query("SELECT * FROM userss WHERE google_id = $1", [profile.id]);
//                 let user;

//                 if (result.rows.length === 0) {
//                     const insertQuery = `
//                         INSERT INTO userss (google_id, name, email) 
//                         VALUES ($1, $2, $3) RETURNING *`;
//                     const values = [profile.id, profile.displayName, profile.emails[0].value];
//                     const newUser = await pool.query(insertQuery, values);
//                     user = newUser.rows[0];
//                 } else {
//                     user = result.rows[0];
//                 }
//                 return done(null, user);
//             } catch (err) {
//                 console.error(err);
//                 return done(err, null);
//             }
//         }
//     )
// );

// // Serialize and Deserialize User
// passport.serializeUser((user, done) => {
//     done(null, user.google_id);
// });

// passport.deserializeUser(async (google_id, done) => {
//     try {
//         const result = await pool.query("SELECT * FROM userss WHERE google_id = $1", [google_id]);
//         done(null, result.rows[0]);
//     } catch (err) {
//         done(err, null);
//     }
// });

// module.exports = passport;


require("dotenv").config();
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcryptjs");
const supabase = require("./db");

// ✅ Google OAuth Strategy
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK_URL,
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        // Check if user exists
        const { data: existingUser } = await supabase
          .from("users")
          .select("*")
          .eq("google_id", profile.id)
          .single();

        let user = existingUser;

        if (!user) {
          // Insert new user
          const { data: newUser, error } = await supabase
            .from("users")
            .insert([
              {
                google_id: profile.id,
                username: profile.displayName,
                email: profile.emails[0].value,
              },
            ])
            .select()
            .single();

          if (error) throw error;
          user = newUser;
        }

        return done(null, user);
      } catch (err) {
        console.error("GoogleStrategy error:", err);
        return done(err, null);
      }
    }
  )
);

// ✅ Local Strategy
passport.use(
  new LocalStrategy({ usernameField: "email" }, async (email, password, done) => {
    try {
      const { data: user, error } = await supabase
        .from("users")
        .select("*")
        .eq("email", email)
        .single();

      if (error || !user) {
        return done(null, false, { message: "User not found" });
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return done(null, false, { message: "Incorrect password" });
      }

      return done(null, user);
    } catch (err) {
      return done(err);
    }
  })
);

// ✅ Serialize / Deserialize
passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const { data: user, error } = await supabase
      .from("users")
      .select("*")
      .eq("id", id)
      .single();

    if (error) return done(error, null);
    done(null, user);
  } catch (err) {
    done(err, null);
  }
});

module.exports = passport;
