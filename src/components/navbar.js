"use client";
import React, { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [user, setUser] = useState(null);
    const router = useRouter();
    const dropdownRef = useRef(null);

    const loadUser = () => {
        const token = localStorage.getItem("token");
        const storedUser = localStorage.getItem("user");
        if (token && storedUser) {
            setUser(JSON.parse(storedUser));
        } else {
            setUser(null);
        }
    };

    useEffect(() => {
        loadUser();

        // ✅ Listen for both storage (other tabs) and custom authChange (same tab)
        window.addEventListener("storage", loadUser);
        window.addEventListener("authChange", loadUser);

        return () => {
            window.removeEventListener("storage", loadUser);
            window.removeEventListener("authChange", loadUser);
        };
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        setUser(null);

        // ✅ Fire event so Navbar updates instantly
        window.dispatchEvent(new Event("authChange"));

        router.push("/login");
    };

    return (
        <header className="bg-white shadow-md sticky top-0 z-10">
            <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
                <div className="flex items-center">
                    <img
                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSeGQVLUB2xI9EXfi6ln71dZUjKRnUHLBGhvQ&s"
                        alt="Zytronic Logo"
                        className="h-12 w-13"
                    />
                    <Link href="/">
                        <h1 className="text-2xl font-bold text-gray-900 ml-2">Zytronic</h1>
                    </Link>
                </div>

                <div className="hidden md:flex items-center space-x-6">
                    <Link
                        className="text-gray-900 hover:text-blue-600 transition-colors"
                        href="/chat"
                    >
                        <h1 className="text-2xl font-bold">Chat</h1>
                    </Link>

                    {user ? (
                        <div className="relative" ref={dropdownRef}>
                            <button
                                onClick={() => setDropdownOpen(!dropdownOpen)}
                                className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold hover:bg-blue-700 transition-colors"
                            >
                                {user.name?.charAt(0).toUpperCase() || "U"}
                            </button>

                            {dropdownOpen && (
                                <div className="absolute right-0 mt-2 w-48 bg-white border rounded-lg shadow-lg p-3">
                                    <p className="text-gray-700 font-medium">{user.email}</p>
                                    <button
                                        onClick={handleLogout}
                                        className="mt-3 w-full text-left bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors"
                                    >
                                        Sign Out
                                    </button>
                                </div>
                            )}
                        </div>
                    ) : (
                        <Link
                            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                            href="/login"
                        >
                            Login
                        </Link>
                    )}
                </div>
            </nav>
        </header>
    );
}
