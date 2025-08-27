// src/services/chatService.js
import { apiFetch } from "./api";

export const getMyChats = async () => apiFetch("/api/chats");
export const createOrAccessChat = async (userId) =>
    apiFetch("/api/chats", { method: "POST", body: JSON.stringify({ userId }) });
