"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { LETTERS } from "../lib/constants";
import {
  getTestProgress,
  loadResults,
  saveResults,
  setCheckedAnswers,
  setSelectedAnswers,
} from "../lib/storage";
import { HandCircle, HandTick } from "./HandMarks";

export default function TestRunner({ test }) {
  const storage = useMemo(() => loadResults(), [test.id]);
  const stored = storage[String(test.id)] || { selected: {}, checked: {} };
  const [selected, setSelected] = useState(stored.selected || {});
  const [checked, setChecked] = useState(stored.checked || {});
  const [hint, setHint] = useState("");

  const progress = getTestProgress(
    { [String(test.id)]: { checked } },
    test.id,
    test.tasks.length
  );

  function persistSelected(nextSelected) {
    const all = loadResults();
    saveResults(setSelectedAnswers(all, test.id, nextSelected));
  }

  function choose(taskIndex, optionIndex) {
    if (checked[String(taskIndex)]) return;
    const next = { ...selected, [String(taskIndex)]: optionIndex };
    setSelected(next);
    persistSelected(next);
    setHint("");
  }

  function checkAnswers() {
    const updates = {};
    test.tasks.forEach((task, index) => {
      const key = String(index);
      if (checked[key]) return;
      if (!Object.prototype.hasOwnProperty.call(selected, key)) return;
      updates[key] = {
        selected: selected[key],
        correct: task.correct,
        isCorrect: selected[key] === task.correct,
      };
    });
    if (Object.keys(updates).length === 0) {
      setHint("Выберите хотя бы один ответ, чтобы проверить.");
      return;
    }
    const nextChecked = { ...checked, ...updates };
    setChecked(nextChecked);
    const all = loadResults();
    saveResults(setCheckedAnswers(all, test.id, updates));
    setHint("");
  }

  return (
    <>
      <div className="sticky-bar">
        <div className="stats">
          <Link href="/">К списку</Link>
          <span>
            Выполнено: {progress.completed} / {progress.total}
          </span>
          <span>Верных: {progress.percent}%</span>
        </div>
        <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
          {hint ? <span className="error">{hint}</span> : null}
          <button type="button" className="solid-btn" onClick={checkAnswers}>
            Проверить ответы
          </button>
        </div>
      </div>
      <div className="paper-wrap">
        <article className="paper-sheet">
          <header className="paper-heading">
            <p className="chapter">{test.chapter}</p>
            <h1>{test.title}</h1>
            {test.topic ? <p className="topic">{test.topic}</p> : null}
          </header>
          {test.tasks.map((task, taskIndex) => {
            const key = String(taskIndex);
            const result = checked[key];
            const chosen = result ? result.selected : selected[key];
            return (
              <section className="task" key={taskIndex}>
                <p className="task-text">
                  {taskIndex + 1}. {task.task}
                </p>
                <ul className="options">
                  {task.options.map((option, optionIndex) => {
                    const isChosen = chosen === optionIndex;
                    const showGray = isChosen;
                    const showRed = Boolean(result) && !result.isCorrect && optionIndex === result.correct;
                    const showTick = Boolean(result) && result.isCorrect && optionIndex === result.selected;
                    return (
                      <li key={optionIndex}>
                        <button
                          type="button"
                          className="option"
                          disabled={Boolean(result)}
                          onClick={() => choose(taskIndex, optionIndex)}
                        >
                          <span className="letter-wrap">
                            <span className="letter">{LETTERS[optionIndex]}</span>
                            {showGray && !showRed ? <HandCircle color="#3a3a3a" /> : null}
                            {showRed ? <HandCircle color="#c1121f" /> : null}
                          </span>
                          <span className="option-text">{option}</span>
                          <span className="tick-wrap">{showTick ? <HandTick /> : null}</span>
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </section>
            );
          })}
        </article>
      </div>
    </>
  );
}
