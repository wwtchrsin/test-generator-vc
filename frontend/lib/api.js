export const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";

export async function fetchTests() {
  const res = await fetch(`${API_URL}/api/tests`, { cache: "no-store" });
  if (!res.ok) {
    throw new Error("Не удалось загрузить список тестов");
  }
  return res.json();
}

export async function fetchTest(id) {
  const res = await fetch(`${API_URL}/api/tests/${id}`, { cache: "no-store" });
  if (res.status === 404) return null;
  if (!res.ok) {
    throw new Error("Не удалось загрузить тест");
  }
  return res.json();
}

export async function createTest(payload) {
  const res = await fetch(`${API_URL}/api/tests`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new Error(data.error || "Не удалось создать тест");
  }
  return data;
}

export async function deleteTest(id) {
  const res = await fetch(`${API_URL}/api/tests/${id}`, { method: "DELETE" });
  if (!res.ok && res.status !== 204) {
    const data = await res.json().catch(() => ({}));
    throw new Error(data.error || "Не удалось удалить тест");
  }
}
