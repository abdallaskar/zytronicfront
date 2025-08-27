"use client";
import React from "react";

export default function Sidebar({ users, selectedChat, onSelect }) {
    return (
        <aside className="w-80 bg-white border-r text-black">
            <div className="p-4 font-bold border-b">Chats</div>
            <div className="overflow-y-auto h-[calc(100vh-64px)]">
                {users.map((u) => {
                    const isSelected = selectedChat && (selectedChat._id === u._id || (selectedChat.users || []).some(s => s._id === u._id));
                    return (
                        <div key={u._id} onClick={() => onSelect(u)} className={`p-3 cursor-pointer flex items-center gap-3 border-b ${isSelected ? "bg-blue-50" : "hover:bg-gray-50"}`}>
                            <div className="w-12 h-12 rounded-full bg-blue-500 text-black flex items-center justify-center font-bold">
                                {u.name?.charAt(0).toUpperCase()}
                            </div>
                            <div className="flex-1 min-w-0">
                                <div className="font-medium truncate">{u.name}</div>
                                <div className="text-sm text-gray-500 truncate">{u.email}</div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </aside>
    );
}
