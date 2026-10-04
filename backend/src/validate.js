import { LEVELS } from "./db.js";

export function validateTasks(tasks) {
  if (!Array.isArray(tasks) || tasks.length === 0) {
    return "tasks must be a non-empty array";
  }

  for (let i = 0; i < tasks.length; i += 1) {
    const item = tasks[i];
    if (!item || typeof item !== "object") {
      return `task ${i} must be an object`;
    }
    if (typeof item.task !== "string" || !item.task.trim()) {
      return `task ${i}: task text is required`;
    }
    if (!Array.isArray(item.options)) {
      return `task ${i}: options must be an array`;
    }
    const n = item.options.length;
    if (n !== 4 && n !== 6) {
      return `task ${i}: options must contain 4 or 6 items`;
    }
    if (item.options.some((opt) => typeof opt !== "string" || !opt.trim())) {
      return `task ${i}: each option must be a non-empty string`;
    }
    if (!Number.isInteger(item.correct) || item.correct < 0 || item.correct >= n) {
      return `task ${i}: correct must be a valid option index`;
    }
  }

  return null;
}

export function validateTestPayload(body) {
  if (!body || typeof body !== "object") {
    return "JSON body is required";
  }
  if (typeof body.chapter !== "string" || !body.chapter.trim()) {
    return "chapter is required";
  }
  if (typeof body.title !== "string" || !body.title.trim()) {
    return "title is required";
  }
  if (!LEVELS.includes(body.level)) {
    return `level must be one of: ${LEVELS.join(", ")}`;
  }
  if (body.topic != null && typeof body.topic !== "string") {
    return "topic must be a string";
  }
  return validateTasks(body.tasks);
}
