/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Menu, X, LogIn, LogOut, User, Home, Info, Briefcase, Phone } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";


const menuItems = [
    { label: "Beranda", icon: <Home size={18} className="mr-2" /> },
    { label: "Tentang Kami", icon: <Info size={18} className="mr-2" /> },
    { label: "Layanan", icon: <Briefcase size={18} className="mr-2" /> },
    { label: "Kontak", icon: <Phone size={18} className="mr-2" /> },
];

export default function Header({ dummyUser }) {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [mobileProfileOpen, setMobileProfileOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 50);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const headerBg = isScrolled || isOpen ? "bg-white shadow-md" : "bg-transparent";
    const textColor = isScrolled ? "text-neutral-800 hover:text-teal-300" : "text-white hover:text-teal-300";
    const menuBg = isScrolled || isOpen ? "bg-white" : "bg-transparent";

    return (
        <header className={`fixed top-0 left-0 w-full transition-all duration-300 z-50 ${headerBg}`}>
            <div className="max-w-7xl mx-auto px-6 lg:px-12 flex justify-between items-center h-16 py-8">
                {/* Logo */}
                <Link to="/" className="text-xl font-bold w-1/2">
                    {/* <img src="/assets/logoText.svg" alt="Logo" /> */}
                    <span className={`${isScrolled ? 'text-neutral-800' : 'text-white'}`}>FinelPedia</span>
                </Link>

                {/* Desktop Navigation */}
                <nav className="hidden md:flex space-x-6 items-center">
                    {["Beranda", "Tentang Kami", "Layanan", "Kontak"].map((label, index) => (
                        <a key={index} href={`${label === 'Beranda' ? '#' : `/#${label.toLowerCase().replace(/\s+/g, '-')}`}`} className={`transition-all ${textColor}`}>
                            {label}
                        </a>
                    ))}

                    {/* Profile & Dropdown */}
                    {dummyUser.isLoggedIn ? (
                        <div className="relative">
                            <button onClick={() => setDropdownOpen(!dropdownOpen)}>
                                <img
                                    src={dummyUser.profilePicture}
                                    alt="Profile"
                                    className="w-10 h-10 rounded-full border border-neutral-300"
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
                                        <Link to="/profile" className="flex px-4 py-2 text-neutral-800 hover:bg-neutral-100">
                                            <User size={16} className="mr-2 mt-0.75" />
                                            <h1>Profile</h1>
                                        </Link>
                                        <button className="w-full flex px-4 py-2 text-neutral-800 hover:bg-neutral-100" onClick={() => window.location.href = '/logout'}>
                                            <LogOut size={16} className="mr-2 mt-0.75" />
                                            <h1>Logout</h1>
                                        </button>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    ) : (
                        <Link to="/login" className="px-4 py-2 bg-teal-300 text-white rounded-lg hover:bg-teal-700 transition">
                            <LogIn size={18} className="mr-2" /> Masuk
                        </Link>
                    )}
                </nav>

                {/* Mobile Menu Button */}
                <button className="md:hidden z-50 relative p-1.5 rounded-lg" onClick={() => setIsOpen(!isOpen)}>
                    {isOpen ? <X size={20} className="text-neutral-800" /> : <Menu size={20} className={textColor} />}
                </button>
            </div>

            {/* Mobile Navigation */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3 }}
                        className={`md:hidden fixed top-16 left-0 w-full flex flex-col items-left space-y-4 py-6 ${menuBg}`}
                    >
                        <div className="space-y-2 pl-6">
                            {/* Navigation */}
                            {menuItems.map((item, index) => (
                                <a
                                    key={index}
                                    onClick={() => setIsOpen(false)}
                                    href={`${item.label === 'Beranda' ? '#' : `/#${item.label.toLowerCase().replace(/\s+/g, '-')}`}`}
                                    className="flex items-center text-sm text-neutral-500 hover:text-teal-300"
                                >
                                    {item.icon} {item.label}
                                </a>
                            ))}
                        </div>

                        {/* Profile */}
                        {dummyUser.isLoggedIn ? (
                            <div className="flex flex-row w-full pl-6">
                                <button onClick={() => setMobileProfileOpen(!mobileProfileOpen)}>
                                    <img
                                        src={dummyUser.profilePicture}
                                        alt="Profile"
                                        className="w-14 h-14 rounded-full border border-neutral-300"
                                    />
                                </button>
                                <div className="flex flex-col">
                                    <p className="pl-4 text-lg font-semibold">{dummyUser.name}</p>
                                    <div className="w-full text-center flex justify-center">
                                        <Link to="/profile" className="bg-teal-400 block ml-3 px-3 mr-2 py-1 text-white rounded-full hover:bg-teal-600">
                                            <div className="flex justify-center">
                                                <User size={14} className="mr-1 mt-0.5" />
                                                <h4 className="text-xs">Profile</h4>
                                            </div>
                                        </Link>
                                        <button className="bg-red-400 px-3 py-1 text-white hover:bg-red-600 rounded-full">
                                            <div className="flex justify-center">
                                                <LogOut size={14} className="mr-1 mt-0.5" />
                                                <h4 className="text-xs">Logout</h4>
                                            </div>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ) : null}


                        {/* Tombol Login di Bawah */}
                        {!dummyUser.isLoggedIn && (
                            <Link
                                to="/login"
                                className="flex items-center justify-center mx-4 text-center px-4 py-2 bg-teal-400 text-white rounded-full hover:bg-teal-700 transition mt-4"
                            >
                                <LogIn size={18} className="mr-2" />
                                <h3 className="font-medium">Masuk</h3>
                            </Link>
                        )}
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    );
}
