import { Link, useLocation } from "react-router-dom";
import { Button } from "./ui/button";
import { GraduationCap } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { useWeb3 } from "@/context/Web3";
import toast from "react-hot-toast";

const Navbar = () => {
    const location = useLocation();
    const { user, isAuthenticated } = useAuth();
    const { address, connectWallet } = useWeb3();
    return (
        <header className={`${location.pathname === '/auth' ? "hidden" : ""} px-5 sticky top-0 z-50 w-full border-b bg-gradient-to-r from-[rgba(0,150,255,0.5)] to-[rgba(0,168,232,0.5)] backdrop-blur supports-[backdrop-filter]:bg-opacity-70`}>
            <div className="container flex h-16 items-center justify-between">
                <div className="flex items-center gap-2 text-white">
                    <GraduationCap className="h-6 w-6" />
                    <span className="text-xl font-bold">CertChain</span>
                </div>
                <nav>
                    {
                        isAuthenticated ? (
                            <div className="hidden md:flex gap-6">
                                <Link to="/courses" className="text-sm font-medium transition-colors text-white hover:border-b hover:border-b-white">
                                    Courses
                                </Link>
                                <Link to={`/enrolled/${address}`} className="text-sm font-medium transition-colors text-white hover:border-b hover:border-b-white">
                                    Enrolled courses
                                </Link>
                                <Link to="/courses/completed" className="text-sm font-medium transition-colors text-white hover:border-b hover:border-b-white">
                                    Completed Courses
                                </Link>
                                <Link to="/certificates" className="text-sm font-medium transition-colors text-white hover:border-b hover:border-b-white">
                                    Certificates
                                </Link>
                                <Link to="/achievments" className="text-sm font-medium transition-colors text-white hover:border-b hover:border-b-white">
                                    Acheivements
                                </Link>
                                <Link to="/hackathon" className="text-sm font-medium transition-colors text-white hover:border-b hover:border-b-white">
                                    Build
                                </Link>
                            </div>
                        ) : (
                            <div className="hidden md:flex gap-6">
                                <Link to="#features" className="text-sm font-medium transition-colors text-white hover:border-b hover:border-b-white">
                                    Features
                                </Link>
                                <Link to="#how-it-works" className="text-sm font-medium transition-colors text-white hover:border-b hover:border-b-white">
                                    How It Works
                                </Link>
                                <Link to="#benefits" className="text-sm font-medium transition-colors text-white hover:border-b hover:border-b-white">
                                    Benefits
                                </Link>
                                <Link to="#faq" className="text-sm font-medium transition-colors text-white hover:border-b hover:border-b-white">
                                    FAQ
                                </Link>
                            </div>
                        )
                    }
                </nav>
                {
                    isAuthenticated ? (
                        <div className="w-max flex justify-center items-center">
                            {user?.points && user.points > 0 ? (<Link to="/leaderboard" className="text-white mr-8 w-max">{user.points}🏆</Link>) : null}
                            <Button onClick={!address ? connectWallet : async () => {
                                if (!address) return;
                                try {
                                    await navigator.clipboard.writeText(address);
                                    toast.success("Address copied to clipboard!");
                                } catch (err) {
                                    console.error("Failed to copy address:", err);
                                    toast.error("Failed to copy address. Please try manually.");
                                }
                            }} className="mt-2 w-max bg-blue-700 text-white hover:bg-blue-900">
                                {address ? `${address.slice(0, 15)}...${address.slice(-4)}` : 'Connect Wallet'}
                            </Button>
                        </div>
                    ) : (
                        <div className="flex items-center gap-4">
                            <Button
                                variant="outline"
                                size="sm"
                                className="border-[#E0F7FA] text-white hover:bg-[#00A8E8] hover:text-white"
                                asChild
                            >
                                <Link to="/auth">Log In</Link>
                            </Button>
                            <Button
                                size="sm"
                                className="bg-[#0096FF] text-white hover:bg-[#00A8E8]"
                                asChild
                            >
                                <Link to="/auth">Get Started</Link>
                            </Button>
                        </div>
                    )
                }
            </div>
        </header>
    );
};

export default Navbar;