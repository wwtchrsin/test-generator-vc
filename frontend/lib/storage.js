export const STORAGE_KEY = "egt-results";

export function emptyResults() {
  return {};
}

export function loadResults() {
  if (typeof window === "undefined") return emptyResults();
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return emptyResults();
    const parsed = JSON.parse(raw);
    return parsed && typeof parsed === "object" ? parsed : emptyResults();
  } catch {
    return emptyResults();
  }
}

export function saveResults(results) {
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(results));
}

export function getTestProgress(results, testId, taskCount) {
  const checked = results?.[String(testId)]?.checked || {};
  const completed = Object.keys(checked).length;
  let correct = 0;
  for (const [index, entry] of Object.entries(checked)) {
    if (entry && entry.selected === entry.correct) correct += 1;
    else if (entry && typeof entry.isCorrect === "boolean" && entry.isCorrect) {
      correct += 1;
    }
    void index;
  }
  const percent = completed > 0 ? Math.round((correct / completed) * 100) : 0;
  return { completed, total: taskCount, correct, percent };
}

export function setCheckedAnswers(results, testId, updates) {
  const key = String(testId);
  const current = results[key] || { checked: {}, selected: {} };
  return {
    ...results,
    [key]: {
      selected: { ...(current.selected || {}) },
      checked: { ...(current.checked || {}), ...updates },
    },
  };
}

export function setSelectedAnswers(results, testId, selected) {
  const key = String(testId);
  const current = results[key] || { checked: {}, selected: {} };
  return {
    ...results,
    [key]: {
      checked: { ...(current.checked || {}) },
      selected,
    },
  };
}
