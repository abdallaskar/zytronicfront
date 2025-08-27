// src/components/Providers.js
"use client";
import React from "react";
import { Provider } from "react-redux";
import { store } from "../store/store";
import { SocketProvider } from "../context/SocketContext";
import AuthListener from "./AuthListener";

export default function Providers({ children }) {
    return (
        <Provider store={store}>
            <SocketProvider>
                <AuthListener />
                {children}
            </SocketProvider>
        </Provider>
    );
}
