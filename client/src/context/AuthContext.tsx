/* eslint-disable react-refresh/only-export-components */
import { createContext, useState, useEffect, useContext, ReactNode, useCallback } from "react";
import { useWeb3 } from "./Web3";

interface User {
    _id: string;
    name: string;
    email: string;
    walletAddress?: string;
    points: number;
}

interface AuthContextType {
    isAuthenticated: boolean;
    login: (email: string, password: string, address: string | null) => Promise<void>;
    register: (fullName: string, email: string, password: string, address: string | null) => Promise<void>;
    logout: () => void;
    user: User | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    const [user, setUser] = useState<User | null>(null);
    const { address } = useWeb3();

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            setIsAuthenticated(true);
        }
    }, []);

    const login = async (email: string, password: string, address: string | null) => {
        try {
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URI}/api/auth/login`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password, walletAddress: address }),
            });

            const data = await response.json();
            if (response.ok) {
                localStorage.setItem("token", data.token);
                setIsAuthenticated(true);
            } else {
                throw new Error(data.message || "Login failed");
            }
        } catch (error) {
            console.error("Login Error:", error);
        }
    };

    const register = async (name: string, email: string, password: string, address: string | null) => {
        try {
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URI}/api/auth/register`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name, email, password, walletAddress: address }),
            });

            const data = await response.json();
            if (!response.ok) {
                throw new Error(data.message || "Registration failed");
            }
        } catch (error) {
            console.error("Registration Error:", error);
        }
    };

    const logout = () => {
        localStorage.removeItem("token");
        setIsAuthenticated(false);
        setUser(null);
    };

    const fetchStudent = useCallback(async () => {
        try {
            const res = await fetch(`${import.meta.env.VITE_BACKEND_URI}/api/auth/user/${address}`);
            const data = await res.json();
            if (data.user && data.user.name) {
                setUser(data.user);
            }
        } catch (error) {
            console.error("Error fetching student details:", error);
        }
    }, [address]);

    useEffect(() => {
        if (address) {
            fetchStudent();
        }
    }, [fetchStudent, address]);

    return (
        <AuthContext.Provider value={{ isAuthenticated, login, register, logout, user }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};