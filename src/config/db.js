const { Pool } = require("pg");
const dotenv = require("dotenv");

dotenv.config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});

// pool
//   .connect()
//   .then((client) => {
//     const now = new Date().toLocaleString();
//     console.log(
//       `Connected to PostgreSQL DB "${client.database}" at host "${client.host}" on ${now}`
//     );
//   })
//   .catch((err) => console.error("Connection error", err.stack));

module.exports = pool;
