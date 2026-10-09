import pg from "pg";

const { Pool } = pg;

export const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

export async function initSchema() {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS tests (
      id SERIAL PRIMARY KEY,
      chapter TEXT NOT NULL,
      title TEXT NOT NULL,
      level TEXT NOT NULL,
      topic TEXT,
      tasks JSONB NOT NULL,
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    );
  `);
}

export function rowToTest(row) {
  return {
    id: row.id,
    chapter: row.chapter,
    title: row.title,
    level: row.level,
    topic: row.topic,
    tasks: row.tasks,
    createdAt: row.created_at,
  };
}
