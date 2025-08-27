"use client";
import { useEffect, useState, useCallback } from "react";
import AuthGuard from "../../components/AuthGuard";
import Sidebar from "../../components/chat/Sidebar";
import ChatWindow from "../../components/chat/ChatWindow";
import { getAllUsers } from "../../services/userService";
import { getMyChats, createOrAccessChat } from "../../services/chatService";
import { getMessages, sendMessage } from "../../services/messageService";
import { useSocket } from "../../context/SocketContext";

export default function Page() {
  const socket = useSocket();
  const [users, setUsers] = useState([]);
  const [chats, setChats] = useState([]);
  const [selectedChat, setSelectedChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [sending, setSending] = useState(false);

  const loadAll = useCallback(async () => {
    try {
      const u = await getAllUsers();
      setUsers(u.data || []);
      const c = await getMyChats();
      setChats(c.data || c || []);
    } catch (e) {
      console.error(e);
    }
  }, []);

  useEffect(() => { loadAll(); }, [loadAll]);

  // ✅ handle socket events
  useEffect(() => {
    if (!socket) return;

    const handler = (m) => {
      const currentUser = JSON.parse(localStorage.getItem("user") || "null");
      if (m.sender._id === currentUser?._id || m.sender._id === currentUser?.id) return;

      if (selectedChat && m.chat && m.chat._id === selectedChat._id) {
        setMessages(prev => [...prev, m]);
        // mark as read
        socket.emit("mark read", { chatId: selectedChat._id, messageId: m._id });
      } else {
        loadAll();
      }
    };

    socket.on("message received", handler);

    return () => {
      socket.off("message received", handler);
    };
  }, [socket, selectedChat, loadAll]);

  async function onSelectUser(user) {
    const chatResp = await createOrAccessChat(user._id);
    const chat = chatResp.data || chatResp;

    setSelectedChat(chat);
    socket.emit("join chat", chat._id);

    const msgsResp = await getMessages(chat._id);
    setMessages(msgsResp.data || msgsResp || []);
    loadAll();
  }

  async function handleSend() {
    if (!input.trim() || !selectedChat) return;
    setSending(true);
    try {
      const res = await sendMessage({ chatId: selectedChat._id, content: input });
      const newMsg = res.data || res;

      socket.emit("new message", newMsg);
      setMessages(prev => [...prev, newMsg]);

      setInput("");
      loadAll();
    } catch (e) { console.error(e); }
    finally { setSending(false); }
  }

  return (
    <AuthGuard>
      <div className="flex h-screen">
        <Sidebar users={users} selectedChat={selectedChat} onSelect={onSelectUser} />
        <ChatWindow
          selectedChat={selectedChat}
          messages={messages}
          onSend={handleSend}
          input={input}
          setInput={setInput}
          sending={sending}
          socket={socket}
        />
      </div>
    </AuthGuard>
  );
}
