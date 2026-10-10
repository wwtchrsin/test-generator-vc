"use client";

import { useState } from "react";
import { LEVELS } from "../../shared";
import { createTest, deleteTest } from "../lib/api";
import { txtRes, lang } from "../lib/text-resources";

const EXAMPLE = `[
  {
    "task": "She usually _____ to work by bus.",
    "options": ["go", "goes", "is going", "going"],
    "correct": 1
  }
]`;

export default function AdminPanel({ initialTests }) {
  const [adminToken, setAdminToken] = useState("");
  const [tests, setTests] = useState(initialTests);
  const [chapter, setChapter] = useState("");
  const [title, setTitle] = useState("");
  const [level, setLevel] = useState("elementary");
  const [topic, setTopic] = useState("");
  const [tasksJson, setTasksJson] = useState(EXAMPLE);
  const [error, setError] = useState("");
  const [ok, setOk] = useState("");

  async function onSubmit(event) {
    event.preventDefault();
    setError("");
    setOk("");
    let tasks;
    try {
      tasks = JSON.parse(tasksJson);
    } catch {
      setError(txtRes.InvalidTasksJSON[lang]);
      return;
    }
    try {
      const created = await createTest(adminToken, {
        chapter,
        title,
        level,
        topic: topic.trim() || null,
        tasks,
      });
      setTests((list) => [...list, { ...created, taskCount: created.tasks.length }]);
      setChapter("");
      setTitle("");
      setTopic("");
      setTasksJson(EXAMPLE);
      setOk(txtRes.TestAdded[lang]);
    } catch (err) {
      setError(err.message);
    }
  }

  async function onDelete(id) {
    setError("");
    setOk("");
    try {
      await deleteTest(adminToken, id);
      setTests((list) => list.filter((item) => item.id !== id));
      setOk(txtRes.TestDeleted[lang]);
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <div className="admin-layout">
      <div className="admin-header">
        <div className="field">
          <label htmlFor="admin-token">{ txtRes.AdminToken[lang] }:</label>
          <input id="admin-token" value={adminToken} onChange={(e) => setAdminToken(e.target.value)} />
        </div>
        <p className="result">
          {error ? <span className="error">{ txtRes.Result[lang] }: {error}</span> : null}
          {ok && !error ? <span className="ok">{ txtRes.Result[lang] }: {ok}</span> : null}
          {!ok && !error ? <span>{ txtRes.Result[lang] }:</span> : null}
        </p>
      </div>
      <form className="admin-form" onSubmit={onSubmit}>
        <h2>{ txtRes.AddTest[lang] }</h2>
        <div className="field">
          <label htmlFor="chapter">{ txtRes.Chapter[lang] }</label>
          <input id="chapter" value={chapter} onChange={(e) => setChapter(e.target.value)} required />
        </div>
        <div className="field">
          <label htmlFor="title">{ txtRes.Name[lang] }</label>
          <input id="title" value={title} onChange={(e) => setTitle(e.target.value)} required />
        </div>
        <div className="field">
          <label htmlFor="level">{ txtRes.Level[lang] }</label>
          <select id="level" value={level} onChange={(e) => setLevel(e.target.value)}>
            {LEVELS.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </div>
        <div className="field test-topic">
          <label htmlFor="topic">{ txtRes.Topic[lang] } ({ txtRes.optional[lang] })</label>
          <textarea id="topic" value={topic} onChange={(e) => setTopic(e.target.value)} />
        </div>
        <div className="field tasks-json">
          <label htmlFor="tasks">{ txtRes.Tasks[lang] } (JSON)</label>
          <textarea id="tasks" value={tasksJson} onChange={(e) => setTasksJson(e.target.value)} />
        </div>
        <button type="submit" className="solid-btn">
          { txtRes.SaveTest[lang] }
        </button>
      </form>
      <section>
        <h2>{ txtRes.ExistingTests[lang] }</h2>
        {tests.length === 0 ? (
          <p className="empty">{ txtRes.NoTestsYet[lang] }.</p>
        ) : (
          tests.map((test) => (
            <div className="admin-item" key={test.id}>
              <div>
                <strong>{test.title}</strong>
                <div className="meta">
                  {test.chapter} · {test.level}
                  {test.topic && (
                    " · \"" + test.topic.slice(0, 36) +
                    (test.topic.length > 36 ? "..." : "") + "\""
                  )}
                </div>
              </div>
              <button type="button" className="ghost-btn" onClick={() => onDelete(test.id)}>
                { txtRes.Delete[lang] }
              </button>
            </div>
          ))
        )}
      </section>
    </div>
  );
}
