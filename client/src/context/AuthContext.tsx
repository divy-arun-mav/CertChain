/* eslint-disable react-refresh/only-export-components */
import { createContext, useState, useEffect, useContext, ReactNode } from "react";

interface AuthContextType {
    isAuthenticated: boolean;
    login: (email: string, password: string, address: string | null) => Promise<void>;
    register: (fullName: string, email: string, password: string, address: string | null) => Promise<void>;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            setIsAuthenticated(true);
        }
    }, []);

    const login = async (email: string, password: string, address: string | null) => {
        try {
            const response = await fetch("http://localhost:5000/api/auth/login", {
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

    const register = async (fullName: string, email: string, password: string, address: string | null) => {
        try {
            const response = await fetch("http://localhost:5000/api/auth/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ fullName, email, password, walletAddress: address }),
            });

            const data = await response.json();
            if (response.ok) {
                localStorage.setItem("token", data.token);
                setIsAuthenticated(true);
            } else {
                throw new Error(data.message || "Registration failed");
            }
        } catch (error) {
            console.error("Registration Error:", error);
        }
    };

    const logout = () => {
        localStorage.removeItem("token");
        setIsAuthenticated(false);
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, login, register, logout }}>
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