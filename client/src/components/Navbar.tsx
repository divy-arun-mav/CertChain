import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import { CircleUserRound, GraduationCap } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { useWeb3 } from "@/context/Web3";
import toast from "react-hot-toast";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger
} from "./ui/dropdown-menu";

const Navbar = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { user, isAuthenticated, logout } = useAuth();
    const { address, connectWallet } = useWeb3();

    const handleWalletAction = async () => {
        if (!address) {
            connectWallet();
        } else {
            try {
                await navigator.clipboard.writeText(address);
                toast.success("Address copied to clipboard!");
            } catch (err) {
                console.error("Failed to copy address:", err);
                toast.error("Failed to copy address. Please try manually.");
            }
        }
    };

    const hideNavbar = location.pathname.includes('/auth');

    return (
        <header
            className={`${hideNavbar ? "hidden" : ""} px-5 sticky top-0 z-50 w-full border-b bg-gradient-to-r from-[rgba(0,150,255,0.5)] to-[rgba(0,168,232,0.5)] backdrop-blur supports-[backdrop-filter]:bg-opacity-70`}
        >
            <div className="container flex h-16 items-center justify-between">
                <div className="flex items-center gap-2 text-white">
                    <GraduationCap className="h-6 w-6" />
                    <span className="text-xl font-bold">CertChain</span>
                </div>
                <nav>
                    {isAuthenticated ? (
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
                            <Link to="/achievements" className="text-sm font-medium transition-colors text-white hover:border-b hover:border-b-white">
                                Achievements
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
                    )}
                </nav>
                {isAuthenticated ? (
                    <div className="w-max flex items-center gap-4">
                        {user?.points && user?.points > 0 && (
                            <Link to="/leaderboard" className="text-white mr-8 w-max">
                                {user.points}🏆
                            </Link>
                        )}
                        <DropdownMenu>
                            <DropdownMenuTrigger className="text-white">
                                <CircleUserRound size={40} strokeWidth={1.25} />
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className="flex justify-center items-end flex-col">
                                <DropdownMenuItem className="mr-4 mt-2" onClick={() => navigate(`/user/${address}`)}>
                                    Profile
                                </DropdownMenuItem>
                                <DropdownMenuItem className="mr-4 mt-2" onClick={handleWalletAction}>
                                    {address ? `${address.slice(0, 15)}...${address.slice(-4)}` : 'Connect Wallet'}
                                </DropdownMenuItem>
                                <DropdownMenuItem className="mr-4 mt-2">
                                    <Button variant="destructive" onClick={logout}>
                                        Logout
                                    </Button>
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
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
                )}
            </div>
        </header>
    );
};

export default Navbar;