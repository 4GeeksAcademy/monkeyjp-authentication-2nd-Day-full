// src/services/authService.js

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export const login = async (email, password) => {
    const response = await fetch(`${BACKEND_URL}/api/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            email,
            password
        })
    });

    const data = await response.json();

    return {
        ok: response.ok,
        data
    };
};

export const signup = async (email, password) => {
    const response = await fetch(`${BACKEND_URL}/api/signup`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            email,
            password
        })
    });

    const data = await response.json();

    return {
        ok: response.ok,
        data
    };
};