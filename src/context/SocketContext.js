// src/context/SocketContext.js
"use client";
import React, { createContext, useContext, useEffect, useRef } from "react";
import { io } from "socket.io-client";

const SocketContext = createContext(null);

export const SocketProvider = ({ children }) => {
  const socketRef = useRef(null);

  useEffect(() => {
    const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
    socketRef.current = io(process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000", {
      auth: { token },
      transports: ["websocket"]
    });

    return () => {
      socketRef.current?.disconnect();
    };
  }, []);

  return <SocketContext.Provider value={socketRef.current}>{children}</SocketContext.Provider>;
};

export const useSocket = () => useContext(SocketContext);
