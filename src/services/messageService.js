// src/services/messageService.js
import { apiFetch } from "./api";

export const getMessages = async (chatId) => apiFetch(`/api/messages/${chatId}`);
export const sendMessage = async ({ chatId, content }) =>
    apiFetch("/api/messages", { method: "POST", body: JSON.stringify({ chatId, content }) });
