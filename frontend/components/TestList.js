"use client";

import { useState, useEffect } from "react";
import FiltersBar from "./FiltersBar";
import TestCard from "./TestCard";
import { loadResults, emptyResults } from "../lib/storage";

export default function TestList({ tests }) {
  const [initialized, setInitialized] = useState(false);
  const [chapter, setChapter] = useState("");
  const [level, setLevel] = useState("");
  const [results, setResults] = useState(emptyResults());

  const filtered = tests.filter((test) => {
    if (chapter && test.chapter !== chapter) return false;
    if (level && test.level !== level) return false;
    return true;
  });

  useEffect(() => {
    setResults(loadResults());
    setInitialized(true);
  }, [])

  return (
    <>
      <FiltersBar
        tests={tests}
        chapter={chapter}
        level={level}
        onChapter={setChapter}
        onLevel={setLevel}
        onImported={() => setResults(loadResults())}
      />
      {filtered.length === 0 ? (
        <p className="empty">Тесты не найдены.</p>
      ) : (
        <ul className="test-list">
          {filtered.map((test) => (
            <li key={test.id}>
              <TestCard 
                test={test}
                results={results}
                initialized={initialized}
              />
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
