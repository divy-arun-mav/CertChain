import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/context/AuthContext";
import { useWeb3 } from "@/context/Web3";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function Auth() {
    const [isRegister, setIsRegister] = useState(false);
    const { connectWallet, address } = useWeb3();
    const { login, register, isAuthenticated } = useAuth();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        fullName: "",
        email: "",
        password: "",
        confirmPassword: "",
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (isRegister && formData.password !== formData.confirmPassword) {
            toast.error("Passwords do not match!");
            return;
        }

        try {
            if (isRegister) {
                await register(formData.fullName, formData.email, formData.password, address);
                setIsRegister(false);
                toast.success("Account created successfully!");
            } else {
                await login(formData.email, formData.password, address);
                navigate(`/enrolled/${address}`);
                toast.success("Logged in successfully!");
            }
        } catch (error) {
            console.error(error);
            toast.error("Authentication failed");
        }
    };

    return (
        <div className="auth-container relative flex w-screen h-screen items-center justify-center p-6">
            <div className="wrap">
                <div className="top-plane"></div>
                <div className="bottom-plane"></div>
            </div>
            <Card className="relative w-full max-w-md bg-[rgba(255,255,255,0.3)] backdrop-blur-sm shadow-lg z-10">
                <CardHeader>
                    <CardTitle className="text-center text-2xl font-bold text-blue-700">
                        {isAuthenticated ? "You're logged in!" : isRegister ? "Create an Account" : "Welcome Back"}
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    {!isAuthenticated ? (
                        <form className="space-y-4" onSubmit={handleSubmit}>
                            {isRegister && (
                                <Input
                                    name="fullName"
                                    placeholder="Full Name"
                                    type="text"
                                    value={formData.fullName}
                                    onChange={handleChange}
                                    className="border-blue-500"
                                    required
                                />
                            )}
                            <Input
                                name="email"
                                placeholder="Email"
                                type="email"
                                value={formData.email}
                                onChange={handleChange}
                                className="border-blue-500"
                                required
                            />
                            <Input
                                name="password"
                                placeholder="Password"
                                type="password"
                                value={formData.password}
                                onChange={handleChange}
                                className="border-blue-500"
                                required
                            />
                            {isRegister && (
                                <Input
                                    name="confirmPassword"
                                    placeholder="Confirm Password"
                                    type="password"
                                    value={formData.confirmPassword}
                                    onChange={handleChange}
                                    className="border-blue-500"
                                    required
                                />
                            )}
                            <div className="mt-4">
                                <Button onClick={!address ? connectWallet : async () => {
                                    if (!address) return;
                                    try {
                                        await navigator.clipboard.writeText(address);
                                        toast.success("Address copied to clipboard!");
                                    } catch (err) {
                                        console.error("Failed to copy address:", err);
                                        toast.error("Failed to copy address. Please try manually.");
                                    }
                                }} className="mt-2 w-full bg-green-600 text-white hover:bg-green-700">
                                    {address ? `${address.slice(0, 15)}...${address.slice(-4)}` : 'Connect Wallet'}
                                </Button>
                            </div>
                            <Button type="submit" className="w-full bg-gradient-to-r from-blue-600 to-indigo-700 text-white hover:opacity-90">
                                {isRegister ? "Sign Up" : "Login"}
                            </Button>
                        </form>
                    ) : (
                        <Button onClick={() => { localStorage.removeItem('token'); window.location.reload(); }} className="w-full bg-red-600 text-white hover:bg-red-700">
                            Logout
                        </Button>
                    )}

                    <p className="mt-4 text-center text-sm text-gray-600">
                        {isRegister ? "Already have an account?" : "Don't have an account?"}{" "}
                        <button onClick={() => setIsRegister(!isRegister)} className="text-blue-600 hover:underline outline-none border-none">
                            {isRegister ? "Login" : "Sign Up"}
                        </button>
                    </p>
                </CardContent>
            </Card>
        </div>
    );
}