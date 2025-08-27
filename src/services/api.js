// src/services/api.js
const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

export const getToken = () => localStorage.getItem("token");

export async function apiFetch(path, options = {}) {
    const headers = { "Content-Type": "application/json", ...(options.headers || {}) };
    const token = getToken();
    if (token) headers["Authorization"] = `Bearer ${token}`;

    const res = await fetch(`${API_URL}${path}`, { ...options, headers });
    const text = await res.text();
    try {
        return JSON.parse(text);
    } catch {
        // if non-json returned:
        throw new Error(text || "API error");
    }
}
