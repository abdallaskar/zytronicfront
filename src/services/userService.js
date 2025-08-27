// src/services/userService.js
import { apiFetch } from "./api";

export const getAllUsers = async () => {
    return apiFetch("/api/user/all");
};
