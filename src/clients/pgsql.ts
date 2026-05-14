import { Pool } from "pg";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

pool.on("connect", () => {
  console.log("[INFO]: Database connected successfully");
});

pool.on("error", (err) => {
  console.error("[ERROR]: Unexpected database error", err);
});

export default pool;
