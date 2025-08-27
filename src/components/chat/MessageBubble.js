"use client";
import React from "react";

export default function MessageBubble({ message }) {
    const currentUser =
        typeof window !== "undefined"
            ? JSON.parse(localStorage.getItem("user") || "null")
            : null;

    const isMine =
        message.sender &&
        currentUser &&
        (message.sender._id === currentUser._id || message.sender._id === currentUser.id);

    // ✅ read receipts
    const isRead = message.readBy && message.readBy.length > 1; // means other user saw it

    return (
        <div className={`mb-3 flex ${isMine ? "justify-end" : "justify-start"}`}>
            <div
                className={`max-w-xs px-4 py-2 rounded-2xl shadow-md ${isMine
                    ? "bg-green-500 text-white rounded-br-none"
                    : "bg-gray-200 text-black rounded-bl-none"
                    }`}
            >
                {/* Support text or image */}
                {message.imageUrl ? (
                    <img src={message.imageUrl} alt="sent" className="rounded-lg max-w-[200px]" />
                ) : (
                    <div className="text-sm">{message.content}</div>
                )}

                <div className="text-xs opacity-70 mt-1 text-right flex items-center gap-1">
                    {new Date(message.createdAt).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                    })}
                </div>
            </div>
        </div>
    );
}
