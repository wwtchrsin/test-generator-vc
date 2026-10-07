"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
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
  const [selected, setSelected] = useState({});
  const [checked, setChecked] = useState({});
  const [hint, setHint] = useState("");

  useEffect(() => {
    let storage = loadResults();
    let testResult = storage[String(test.id)] || { selected: {}, checked: {} };
    setSelected(testResult.selected)
    setChecked(testResult.checked)
  }, [test.id])

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
        <div className="sticky-bar-main">
          <Link href="/">
            <button type="button" className="solid-btn">
              К списку
            </button>
          </Link>
          <span className="stats-entry">
            Выполнено: <span className="value">{progress.completed} / {progress.total}</span>
          </span>
          <span className="stats-entry stats-entry-correct">
            Верных: <span className="value">{progress.percent}%</span>
          </span>
          <span className="stats-entry-compact">
            <span className="value">{progress.completed} / {progress.total}</span>
          </span>
          <span className="stats-entry-compact stats-entry-correct">
            <span className="value">{progress.percent}%</span>
          </span>
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
            <div className="title-bar">
              <div className="test-level">{test.level}</div>
              <div className="test-title">{test.title}</div>
            </div>
            <div className="title-bar-compact">
              <div className="test-level">{test.level}</div>
              <div className="test-title">{test.title}</div>
            </div>
            {test.topic && (
              <div className="test-topic">{test.topic}</div>
            )}
          </header>
          {test.tasks.map((task, taskIndex) => {
            const key = String(taskIndex);
            const result = checked[key];
            const chosen = result ? result.selected : selected[key];
            return (
              <section className="task" key={taskIndex}>
                <div className="task-number">{taskIndex + 1}.</div>
                <div className="task-body">
                  <div className="task-text">{task.task}</div>
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
                </div>
              </section>
            );
          })}
        </article>
      </div>
    </>
  );
}
