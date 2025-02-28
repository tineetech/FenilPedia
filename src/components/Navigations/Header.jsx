import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, LogIn } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Header() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const location = useLocation();

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    useEffect(() => {
        if (location.hash) {
            const targetElement = document.getElementById(location.hash.substring(1));
            if (targetElement) {
                setTimeout(() => {
                    targetElement.scrollIntoView({ behavior: "smooth" });
                }, 100);
            }
        }
    }, [location]);

    const headerBg = isScrolled || isOpen ? "bg-white shadow-md" : "bg-transparent";
    const textColor = isScrolled || isOpen ? "text-neutral-800" : "text-white";
    const menuBg = isScrolled || isOpen ? "bg-white" : "bg-transparent";
    const loginBtnBg = isScrolled || isOpen ? "bg-teal-300 text-white" : "bg-white text-neutral-800";

    const isActive = (path) => location.pathname === path;

    return (
        <header className={`fixed top-0 left-0 w-full transition-all duration-300 z-50 ${headerBg}`}>
            <div className="max-w-7xl mx-auto px-6 lg:px-12 flex justify-between items-center h-16 py-8">
                {/* Logo */}
                <Link to="/" className={`text-xl font-bold w-1/2`}>
                    <img src="/assets/logoText.svg" alt="Logo" />
                </Link>

                {/* Navigation (Desktop) */}
                <nav className="hidden md:flex space-x-6 items-center">
                    <Link
                        to="/"
                        className={`transition-all ${isActive("/") ? "font-semibold" : "hover:text-gray-700"} ${textColor}`}
                    >
                        Beranda
                    </Link>
                    <Link
                        to="/#layanan"
                        className={`transition-all hover:text-gray-700 ${textColor}`}
                    >
                        Layanan
                    </Link>
                    <Link
                        to="/contact"
                        className={`transition-all ${isActive("/contact") ? "font-semibold" : "hover:text-gray-700"} ${textColor}`}
                    >
                        Kontak
                    </Link>
                    <Link
                        to="/login"
                        className={`flex items-center px-4 py-2 rounded-lg hover:bg-teal-700 hover:text-white transition ${loginBtnBg}`}
                    >
                        <LogIn size={18} className="mr-2" />
                        Masuk
                    </Link>
                </nav>

                {/* Menu Button (Mobile) */}
                <button className="md:hidden z-50 relative" onClick={() => setIsOpen(!isOpen)}>
                    {isOpen ? <X size={24} className={textColor} /> : <Menu size={24} className={textColor} />}
                </button>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3 }}
                        className={`md:hidden fixed top-16 left-0 w-full flex flex-col items-center space-y-4 py-6 ${menuBg}`}
                    >
                        <Link
                            to="/"
                            onClick={() => setIsOpen(false)}
                            className="text-lg text-gray-500 hover:text-gray-700"
                        >
                            Beranda
                        </Link>
                        <Link
                            to="/#layanan"
                            onClick={() => setIsOpen(false)}
                            className="text-lg text-gray-500 hover:text-gray-700"
                        >
                            Layanan
                        </Link>
                        <Link
                            to="/contact"
                            onClick={() => setIsOpen(false)}
                            className="text-lg text-gray-500 hover:text-gray-700"
                        >
                            Kontak
                        </Link>
                        <Link
                            to="/login"
                            className="flex items-center px-4 py-2 bg-teal-300 text-white rounded-lg hover:bg-blue-700 hover:text-white transition"
                            onClick={() => setIsOpen(false)}
                        >
                            <LogIn size={18} className="mr-2" />
                            Masuk
                        </Link>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    );
}
