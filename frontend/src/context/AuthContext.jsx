import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(localStorage.getItem('token'));
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (token) {
            // In a real app, verify token with backend
            // For now, we decode or just assume valid if present
            // We can store user info in localStorage too
            const storedUser = localStorage.getItem('user');
            if (storedUser) {
                setUser(JSON.parse(storedUser));
            }
        }
        setLoading(false);
    }, [token]);

    const login = async (email, password) => {
        try {
            const response = await axios.post(`${import.meta.env.VITE_API_URL}/auth/login`,
                new URLSearchParams({ username: email, password: password }),
                { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }
            );

            const { access_token, user } = response.data;
            localStorage.setItem('token', access_token);
            localStorage.setItem('user', JSON.stringify(user));
            setToken(access_token);
            setUser(user);
            return { success: true };
        } catch (error) {
            console.error("Login failed", error);
            return { success: false, error: error.response?.data?.detail || "Login failed" };
        }
    };

    const register = async (userData) => {
        try {
            await axios.post(`${import.meta.env.VITE_API_URL}/auth/register`, {
                ...userData,
                password: userData.password // Ensure password is sent
            });

            // Auto login after register
            return login(userData.email, userData.password);
        } catch (error) {
            console.error("Registration failed", error);
            return { success: false, error: error.response?.data?.detail || "Registration failed" };
        }
    };

    const logout = () => {
        setUser(null);
        setToken(null);
        localStorage.removeItem('token');
        localStorage.removeItem('user');
    };

    return (
        <AuthContext.Provider value={{ user, token, login, logout, register, loading }}>
            {!loading && children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
