import { Link, useLocation } from "react-router-dom";
import { Button } from "./ui/button";
import { GraduationCap } from "lucide-react";

const Navbar = () => {
    const location = useLocation();
    return (
        <header className={`${location.pathname === '/auth' ? "hidden":""} px-5 sticky top-0 z-50 w-full border-b bg-gradient-to-r from-[rgba(0,150,255,0.5)] to-[rgba(0,168,232,0.5)] backdrop-blur supports-[backdrop-filter]:bg-opacity-70`}>
            <div className="container flex h-16 items-center justify-between">
                <div className="flex items-center gap-2 text-white">
                    <GraduationCap className="h-6 w-6" />
                    <span className="text-xl font-bold">CertChain</span>
                </div>
                <nav className="hidden md:flex gap-6">
                    <Link to="#features" className="text-sm font-medium transition-colors text-white hover:text-[#E0F7FA]">
                        Features
                    </Link>
                    <Link to="#how-it-works" className="text-sm font-medium transition-colors text-white hover:text-[#E0F7FA]">
                        How It Works
                    </Link>
                    <Link to="#benefits" className="text-sm font-medium transition-colors text-white hover:text-[#E0F7FA]">
                        Benefits
                    </Link>
                    <Link to="#faq" className="text-sm font-medium transition-colors text-white hover:text-[#E0F7FA]">
                        FAQ
                    </Link>
                </nav>
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
            </div>
        </header>
    );
};

export default Navbar;