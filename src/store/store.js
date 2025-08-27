// src/store/store.js
"use client";
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authslice";

export const store = configureStore({
    reducer: { auth: authReducer }
});
