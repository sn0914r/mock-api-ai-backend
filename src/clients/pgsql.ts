import { Pool } from "pg";

const isLocal = process.env.DATABASE_URL?.includes("localhost");

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: isLocal ? false : { rejectUnauthorized: false },
});

pool.on("connect", () => {
  console.log("[INFO]: Database connected successfully");
});

pool.on("error", (err) => {
  console.error("[ERROR]: Unexpected database error", err);
});

export default pool;
