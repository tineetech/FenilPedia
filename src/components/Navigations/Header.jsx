import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Menu, X, LogIn, LogOut, User } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const dummyUser = {
    name: "John Doe",
    profilePicture: "https://avatar.iran.liara.run/public/50",
    isLoggedIn: true,
};

export default function Header() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [activeSection, setActiveSection] = useState("");
    const [dropdownOpen, setDropdownOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
            const sections = document.querySelectorAll("section");
            let currentSection = "";

            sections.forEach((section) => {
                const sectionTop = section.offsetTop - 60;
                const sectionHeight = section.clientHeight;
                if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                    currentSection = section.getAttribute("id");
                }
            });
            setActiveSection(currentSection);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const headerBg = isScrolled || isOpen ? "bg-white shadow-md" : "bg-transparent";
    const textColor = isScrolled ? "text-neutral-800 hover:text-teal-300" : "text-white hover:text-teal-300";
    const menuBg = isScrolled || isOpen ? "bg-white" : "bg-transparent";
    const loginBtnBg = isScrolled || isOpen ? "bg-teal-300 text-white" : "bg-white text-neutral-800";

    return (
        <header className={`fixed top-0 left-0 w-full transition-all duration-300 z-50 ${headerBg}`}>
            <div className="max-w-7xl mx-auto px-6 lg:px-12 flex justify-between items-center h-16 py-8">
                {/* Logo */}
                <Link to="/" className="text-xl font-bold w-1/2">
                    <img src="/assets/logoText.svg" alt="Logo" />
                </Link>

                {/* Navigation (Desktop) */}
                <nav className="hidden md:flex space-x-6 items-center">
                    {[{ id: "hero", label: "Beranda" },
                    { id: "tentang", label: "Tentang Kami" },
                    { id: "layanan", label: "Layanan" },
                    { id: "kontak", label: "Kontak" },
                    ].map((item) => (
                        <a
                            key={item.id}
                            href={`/#${item.id}`}
                            className={`transition-all ${activeSection === item.id ? "text-teal-300" : textColor}`}
                        >
                            {item.label}
                        </a>
                    ))}

                    {dummyUser.isLoggedIn ? (
                        <div className="relative">
                            <button
                                onClick={() => setDropdownOpen(!dropdownOpen)}
                                className="flex items-center space-x-2"
                            >
                                <img
                                    src={dummyUser.profilePicture}
                                    alt="Profile"
                                    className="w-10 h-10 rounded-full border border-gray-300"
                                />
                            </button>

                            <AnimatePresence>
                                {dropdownOpen && (
                                    <motion.div
                                        initial={{ opacity: 0, y: -10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -10 }}
                                        transition={{ duration: 0.2 }}
                                        className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-lg py-2"
                                    >
                                        <Link to="/profile" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">
                                            <div className="flex">
                                                <User size={18} className="mr-2 mt-0.75" />
                                                <h4>Profile</h4>
                                            </div>
                                        </Link>
                                        <button className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100">
                                            <div className="flex">
                                                <LogOut size={18} className="mr-2 mt-0.75" />
                                                <h4>Logout</h4>
                                            </div>
                                        </button>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    ) : (
                        <Link
                            to="/login"
                            className={`flex items-center px-4 py-2 rounded-lg hover:bg-teal-700 hover:text-white transition ${loginBtnBg}`}
                        >
                            <LogIn size={18} className="mr-2" />
                            Masuk
                        </Link>
                    )}
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
                        {[{ id: "hero", label: "Beranda" },
                        { id: "tentang", label: "Tentang Kami" },
                        { id: "layanan", label: "Layanan" },
                        { id: "kontak", label: "Kontak" },
                        ].map((item) => (
                            <a
                                key={item.id}
                                href={`/#${item.id}`}
                                onClick={() => setIsOpen(false)}
                                className="text-lg text-gray-500 hover:text-teal-300"
                            >
                                {item.label}
                            </a>
                        ))}
                        <Link
                            to="/login"
                            className="flex items-center px-4 py-2 bg-teal-300 text-white rounded-lg hover:bg-teal-700 hover:text-white transition"
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
