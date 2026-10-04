import "dotenv/config";
import cors from "cors";
import express from "express";
import { initSchema, pool, rowToTest } from "./db.js";
import { seedTests } from "./seed.js";
import { validateTestPayload } from "./validate.js";

const app = express();
const port = Number(process.env.PORT || 4000);

app.use(cors());
app.use(express.json({ limit: "1mb" }));

app.get("/api/health", (_req, res) => {
  res.json({ ok: true });
});

app.get("/api/tests", async (_req, res) => {
  try {
    const { rows } = await pool.query(
      "SELECT id, chapter, title, level, topic, jsonb_array_length(tasks) AS task_count, created_at FROM tests ORDER BY id ASC"
    );
    res.json(
      rows.map((row) => ({
        id: row.id,
        chapter: row.chapter,
        title: row.title,
        level: row.level,
        topic: row.topic,
        taskCount: row.task_count,
        createdAt: row.created_at,
      }))
    );
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to load tests" });
  }
});

app.get("/api/tests/:id", async (req, res) => {
  try {
    const { rows } = await pool.query("SELECT * FROM tests WHERE id = $1", [
      req.params.id,
    ]);
    if (!rows[0]) {
      res.status(404).json({ error: "Test not found" });
      return;
    }
    res.json(rowToTest(rows[0]));
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to load test" });
  }
});

app.post("/api/tests", async (req, res) => {
  const error = validateTestPayload(req.body);
  if (error) {
    res.status(400).json({ error });
    return;
  }

  const { chapter, title, level, topic, tasks } = req.body;
  try {
    const { rows } = await pool.query(
      `INSERT INTO tests (chapter, title, level, topic, tasks)
       VALUES ($1, $2, $3, $4, $5::jsonb)
       RETURNING *`,
      [
        chapter.trim(),
        title.trim(),
        level,
        topic && String(topic).trim() ? String(topic).trim() : null,
        JSON.stringify(tasks),
      ]
    );
    res.status(201).json(rowToTest(rows[0]));
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to create test" });
  }
});

app.delete("/api/tests/:id", async (req, res) => {
  try {
    const { rowCount } = await pool.query("DELETE FROM tests WHERE id = $1", [
      req.params.id,
    ]);
    if (!rowCount) {
      res.status(404).json({ error: "Test not found" });
      return;
    }
    res.status(204).end();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to delete test" });
  }
});

async function seedIfEmpty() {
  const { rows } = await pool.query("SELECT COUNT(*)::int AS count FROM tests");
  if (rows[0].count > 0) return;
  for (const test of seedTests) {
    await pool.query(
      `INSERT INTO tests (chapter, title, level, topic, tasks)
       VALUES ($1, $2, $3, $4, $5::jsonb)`,
      [test.chapter, test.title, test.level, test.topic, JSON.stringify(test.tasks)]
    );
  }
}

async function start() {
  await initSchema();
  await seedIfEmpty();
  app.listen(port, () => {
    console.log(`API listening on http://localhost:${port}`);
  });
}

start().catch((error) => {
  console.error("Failed to start server", error);
  process.exit(1);
});
