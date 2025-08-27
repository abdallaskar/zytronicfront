// src/components/AuthListener.js
"use client";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setUser, clearUser } from "../store/authslice";

export default function AuthListener() {
    const dispatch = useDispatch();

    useEffect(() => {
        const sync = () => {
            const s = localStorage.getItem("user");
            if (s) {
                try {
                    dispatch(setUser(JSON.parse(s)));
                } catch {
                    dispatch(clearUser());
                }
            } else {
                dispatch(clearUser());
            }
        };

        sync(); // initial
        window.addEventListener("storage", sync); // other tabs
        window.addEventListener("authChange", sync); // same tab custom event
        return () => {
            window.removeEventListener("storage", sync);
            window.removeEventListener("authChange", sync);
        };
    }, [dispatch]);

    return null;
}
