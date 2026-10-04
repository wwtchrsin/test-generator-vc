"use client";

import { useMemo, useState } from "react";
import FiltersBar from "./FiltersBar";
import TestCard from "./TestCard";
import { loadResults } from "../lib/storage";

export default function TestList({ tests }) {
  const [chapter, setChapter] = useState("");
  const [level, setLevel] = useState("");
  const [tick, setTick] = useState(0);
  const results = useMemo(() => loadResults(), [tick]);

  const filtered = tests.filter((test) => {
    if (chapter && test.chapter !== chapter) return false;
    if (level && test.level !== level) return false;
    return true;
  });

  return (
    <>
      <FiltersBar
        tests={tests}
        chapter={chapter}
        level={level}
        onChapter={setChapter}
        onLevel={setLevel}
        onImported={() => setTick((n) => n + 1)}
      />
      {filtered.length === 0 ? (
        <p className="empty">Тесты не найдены.</p>
      ) : (
        <ul className="test-list">
          {filtered.map((test) => (
            <li key={test.id}>
              <TestCard test={test} results={results} />
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
