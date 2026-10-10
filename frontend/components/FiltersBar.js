"use client";

import { useMemo, useRef, useState } from "react";
import { LEVELS } from "../../shared";
import { loadResults, saveResults } from "../lib/storage";
import { txtRes, lang } from "../lib/text-resources";

export default function FiltersBar({ tests, chapter, level, onChapter, onLevel, onImported }) {
  const fileRef = useRef(null);
  const [message, setMessage] = useState("");

  const chapters = useMemo(() => {
    return [...new Set(tests.map((t) => t.chapter))].sort((a, b) => a.localeCompare(b));
  }, [tests]);

  function exportResults() {
    const blob = new Blob([JSON.stringify(loadResults(), null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "testgen-results.json";
    a.click();
    URL.revokeObjectURL(url);
  }

  function importResults(file) {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      try {
        const parsed = JSON.parse(String(reader.result));
        if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) {
          throw new Error("invalid");
        }
        const current = loadResults();
        saveResults({ ...current, ...parsed });
        setMessage(txtRes.ResultsImported[lang]);
        onImported?.();
      } catch {
        setMessage(txtRes.ResultsNotImported[lang]);
      }
    };
    reader.readAsText(file);
  }

  return (
    <div className="toolbar">
      <div className="field">
        <label htmlFor="chapter">{ txtRes.Chapter[lang] }</label>
        <select id="chapter" value={chapter} onChange={(e) => onChapter(e.target.value)}>
          <option value="">{ txtRes.AllChapters[lang] }</option>
          {chapters.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>
      </div>
      <div className="field">
        <label htmlFor="level">{ txtRes.Level[lang] }</label>
        <select id="level" value={level} onChange={(e) => onLevel(e.target.value)}>
          <option value="">{ txtRes.AllLevels[lang] }</option>
          {LEVELS.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>
      </div>
      <button type="button" className="ghost-btn" onClick={exportResults}>
        { txtRes.ExportResults[lang] }
      </button>
      <button type="button" className="ghost-btn" onClick={() => fileRef.current?.click()}>
        { txtRes.ImportResults[lang] }
      </button>
      <input
        ref={fileRef}
        type="file"
        accept="application/json,.json"
        hidden
        onChange={(e) => {
          importResults(e.target.files?.[0]);
          e.target.value = "";
        }}
      />
      {message ? <span className="ok">{message}</span> : null}
    </div>
  );
}
