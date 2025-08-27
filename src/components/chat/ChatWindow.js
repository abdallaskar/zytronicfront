"use client";
import React, { useEffect, useRef, useState } from "react";
import MessageBubble from "./MessageBubble";

export default function ChatWindow({ selectedChat, messages, onSend, input, setInput, sending, socket }) {
    const endRef = useRef(null);
    const [isTyping, setIsTyping] = useState(false);
    const [otherOnline, setOtherOnline] = useState(false);

    useEffect(() => endRef.current?.scrollIntoView({ behavior: "smooth" }), [messages]);

    if (!selectedChat) {
        return <div className="flex-1 flex items-center justify-center text-gray-500">
            Select a conversation
        </div>;
    }

    const currentUser = JSON.parse(localStorage.getItem("user") || "null");
    const otherUser = selectedChat.users?.find(u => u._id !== currentUser?.id);

    // ✅ Listen for typing and online events
    useEffect(() => {
        if (!socket) return;

        socket.on("typing", (chatId) => {
            if (chatId === selectedChat._id) setIsTyping(true);
        });

        socket.on("stop typing", (chatId) => {
            if (chatId === selectedChat._id) setIsTyping(false);
        });

        socket.on("user online", (userId) => {
            if (userId === otherUser?._id) setOtherOnline(true);
        });

        socket.on("user offline", (userId) => {
            if (userId === otherUser?._id) setOtherOnline(false);
        });

        return () => {
            socket.off("typing");
            socket.off("stop typing");
            socket.off("user online");
            socket.off("user offline");
        };
    }, [socket, selectedChat, otherUser]);

    // ✅ typing emit
    const handleTyping = (e) => {
        setInput(e.target.value);
        if (!socket) return;
        if (e.target.value.length > 0) {
            socket.emit("typing", selectedChat._id);
        } else {
            socket.emit("stop typing", selectedChat._id);
        }
    };

    return (
        <div className="flex-1 flex flex-col">
            <div className="p-4 border-b bg-white flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-blue-500 text-white flex items-center justify-center font-bold">
                    {otherUser?.name?.charAt(0).toUpperCase() || "?"}
                </div>
                <div>
                    <div className="font-semibold text-black">{otherUser?.name || "Unknown"}</div>

                </div>
            </div>

            <div className="flex-1 p-4 overflow-y-auto bg-gray-50">
                {messages.map((m) => (
                    <MessageBubble key={m._id || m.tempId} message={m} />
                ))}
                {isTyping && (
                    <div className="text-sm italic text-gray-500">typing...</div>
                )}
                <div ref={endRef} />
            </div>

            <div className="p-4 border-t bg-white text-black flex gap-3 items-center">
                <input
                    value={input}
                    onChange={handleTyping}
                    className="flex-1 rounded-full border px-4 py-2"
                    placeholder="Type a message..."
                />
                <input
                    type="file"
                    id="fileUpload"
                    className="hidden"
                    onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                            // emit image send
                            const reader = new FileReader();
                            reader.onload = () => {
                                socket.emit("new message", {
                                    chat: selectedChat,
                                    sender: currentUser,
                                    imageUrl: reader.result,
                                    createdAt: new Date(),
                                    readBy: [currentUser._id]
                                });
                            };
                            reader.readAsDataURL(file);
                        }
                    }}
                />
                <button
                    onClick={() => document.getElementById("fileUpload").click()}
                    className="bg-gray-200 text-black px-3 py-2 rounded-full"
                >
                    📎
                </button>
                <button
                    onClick={onSend}
                    disabled={sending}
                    className="bg-blue-600 text-white px-4 py-2 rounded-full"
                >
                    {sending ? "..." : "Send"}
                </button>
            </div>
        </div>
    );
}
