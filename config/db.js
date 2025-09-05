// const { Pool } = require("pg");

// const isProduction = process.env.NODE_ENV === "production";

// const pool = new Pool({
//     connectionString: process.env.DATABASE_URL,
//     ssl: isProduction ? { rejectUnauthorized: false } : false,
//     connectionTimeoutMillis: 10000,
// });

// module.exports = pool;



















// require("dotenv").config();
// const { Pool } = require("pg");

// const isProduction = process.env.NODE_ENV === "production";

// const pool = new Pool({
//   connectionString: process.env.DATABASE_URL,
//   ssl: {
//     rejectUnauthorized: false, // ✅ Needed for Supabase
//   },
// });

// module.exports = pool;



// require("dotenv").config();
// const { Pool } = require("pg");

// const isProduction = process.env.NODE_ENV === "production";

// const pool = new Pool({
//   connectionString: process.env.DATABASE_URL,
//   ssl: isProduction
//     ? { rejectUnauthorized: false } // ✅ Supabase / production
//     : false                         // ✅ Local Postgres
// });

// module.exports = pool;


require("dotenv").config();
const { createClient } = require("@supabase/supabase-js");

// ✅ Supabase client
const supabase = createClient(process.env.SUPABASE_URL, process.env.ANON_KEY);

module.exports = supabase;

