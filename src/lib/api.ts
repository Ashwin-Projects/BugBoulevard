export const API_BASE = (import.meta.env.VITE_API_BASE as string) || "http://localhost:4000";

export async function getJson<T>(path: string): Promise<T> {
  const res = await fetch(`${API_BASE}${path}`);
  if (!res.ok) {
    const err = await safeJson(res);
    throw new Error(err?.error || `Request failed with ${res.status}`);
  }
  return res.json();
}

export async function postJson<T>(path: string, body: unknown): Promise<T> {
  const res = await fetch(`${API_BASE}${path}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  if (!res.ok) {
    const err = await safeJson(res);
    throw new Error(err?.error || `Request failed with ${res.status}`);
  }
  return res.json();
}

async function safeJson(res: Response): Promise<any> {
  try {
    return await res.json();
  } catch {
    return null;
  }
}
