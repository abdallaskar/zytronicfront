'use client';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function Home() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Check localStorage for user session
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  return (
    <main className="flex min-h-screen flex-col bg-gradient-to-br from-blue-50 to-gray-100">
      <div className="flex-grow flex items-center justify-center px-6 sm:px-8">
        <div className="text-center max-w-3xl mx-auto bg-white shadow-lg rounded-2xl p-10">
          <h1 className="text-5xl font-extrabold text-blue-700 mb-6">
            Welcome to Zytronic Task
          </h1>

          <p className="text-lg text-gray-700 leading-relaxed mb-8">
            In this project, I will be creating a{" "}
            <span className="font-semibold text-blue-600">real-time chat system</span>
            from scratch. My goal is to design and build a smooth and modern messaging
            experience where users can connect instantly, just like WhatsApp.
          </p>

          <p className="text-lg text-gray-700 leading-relaxed mb-8">
            The system will include features such as{" "}
            <span className="font-medium">secure authentication</span>,{" "}
            <span className="font-medium">one-to-one messaging</span>,{" "}
            <span className="font-medium">instant delivery with socket.io</span>,
            and even <span className="font-medium">image sharing</span>.
            Every conversation will be stored in a structured database, making
            sure no message is ever lost.
          </p>



          <div className="flex gap-4 justify-center flex-col sm:flex-row">
            {!user ? (
              <Link
                href="/login"
                className="bg-white text-gray-800 border border-gray-300 rounded-lg px-6 py-3 font-semibold hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-300 transition-colors shadow-sm"
              >
                Login
              </Link>
            ) : (
              <Link
                href="/chat"
                className="bg-blue-600 text-white rounded-lg px-6 py-3 font-semibold hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors shadow-md"
              >
                Go to Chat
              </Link>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
