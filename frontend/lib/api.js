import { txtRes, lang } from "./text-resources";

export const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";

export async function fetchTests() {
  const res = await fetch(`${API_URL}/api/tests`, { cache: "no-store" });
  if (!res.ok) {
    throw new Error(txtRes.TestListLoadFailed[lang]);
  }
  return res.json();
}

export async function fetchTest(id) {
  const res = await fetch(`${API_URL}/api/tests/${id}`, { cache: "no-store" });
  if (res.status === 404) return null;
  if (!res.ok) {
    throw new Error(txtRes.TestLoadFailed[lang]);
  }
  return res.json();
}

export async function createTest(adminToken, payload) {
  const res = await fetch(`${API_URL}/api/tests`, {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${adminToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new Error(data.error || txtRes.CreateTestFailed[lang]);
  }
  return data;
}

export async function deleteTest(adminToken, id) {
  const res = await fetch(`${API_URL}/api/tests/${id}`, { 
    method: "DELETE",
    headers: {
      "Authorization": `Bearer ${adminToken}`,
    },
  });
  if (!res.ok && res.status !== 204) {
    const data = await res.json().catch(() => ({}));
    throw new Error(data.error || txtRes.DeleteTestFailed[lang]);
  }
}
