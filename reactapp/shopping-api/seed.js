const fs = require("fs");
const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "../.env") });

const db = require("./db");

const sqlFiles = [
  "schema.sql",
  "seed_users.sql",
  "seed_customers.sql",
  "seed.sql",
].map((file) => path.join(__dirname, "sql", file));

async function seed() {
  try {
    for (const file of sqlFiles) {
      console.log(`Running ${path.basename(file)}...`);
      await db.pool.query(fs.readFileSync(file, "utf8"));
    }

    console.log("Database seed completed.");
  } catch (error) {
    console.error("Database seed failed:", error.message);
    process.exitCode = 1;
  } finally {
    await db.pool.end();
  }
}

seed();
