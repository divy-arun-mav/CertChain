import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function Auth() {
    const [isRegister, setIsRegister] = useState(false);

    return (
        <div className="auth-container relative flex w-screen h-screen items-center justify-center p-6">
            <div className="wrap">
                <div className="top-plane"></div>
                <div className="bottom-plane"></div>
            </div>
            <Card className="relative w-full max-w-md bg-[rgba(255,255,255,0.3)] backdrop-blur-sm shadow-lg z-10">
                <CardHeader>
                    <CardTitle className="text-center text-2xl font-bold text-blue-700">
                        {isRegister ? "Create an Account" : "Welcome Back"}
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <form className="space-y-4">
                        {isRegister && <Input placeholder="Full Name" type="text" className="border-blue-500" />}
                        <Input placeholder="Email" type="email" className="border-blue-500" />
                        <Input placeholder="Password" type="password" className="border-blue-500" />
                        {isRegister && <Input placeholder="Confirm Password" type="password" className="border-blue-500" />}
                        <Button className="w-full bg-gradient-to-r from-blue-600 to-indigo-700 text-white hover:opacity-90">
                            {isRegister ? "Sign Up" : "Login"}
                        </Button>
                    </form>
                    <p className="mt-4 text-center text-sm text-gray-600">
                        {isRegister ? "Already have an account?" : "Don't have an account?"}{" "}
                        <button onClick={() => setIsRegister(!isRegister)} className="text-blue-600 hover:underline outline-none border-none">
                            {isRegister ? "Login" : "Sign Up"}
                        </button>
                    </p>
                </CardContent>
            </Card>
            <style>{`html{overflow:hidden;}`}</style>
        </div>
    );
}