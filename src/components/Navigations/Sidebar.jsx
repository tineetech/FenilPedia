/* eslint-disable react/prop-types */
import { useState } from "react";
import { Link } from "react-router-dom";
import { FaList, FaUser, FaUserCircle, FaHome, FaPlus, FaBars } from "react-icons/fa";
import { LogOut } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Sidebar({ dummyUser }) {
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    return (
        <>
            {/* Toggle Button */}
            <button
                className="md:hidden p-3 bg-teal-500 rounded-full text-white fixed bottom-8 right-5 z-50"
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            >
                <FaBars size={24} />
            </button>

            {/* Sidebar */}
            <div className={`h-screen w-64 bg-gray-900 text-white flex flex-col justify-between fixed left-0 top-0 shadow-lg transform ${isSidebarOpen ? "translate-x-0" : "-translate-x-64"} md:translate-x-0 transition-transform duration-300 z-40`}>
                {/* Menu */}
                <div className="p-4">
                    <h1 className="text-xl font-bold text-center mb-6">Admin Panel</h1>
                    <ul>
                        {dummyUser.isAdmin ? (
                            <>
                                <li>
                                    <Link to="/admin" className="flex items-center gap-3 p-3 hover:bg-gray-700 rounded-md">
                                        <FaList /> List Order
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/admin/create-product" className="flex items-center gap-3 p-3 hover:bg-gray-700 rounded-md">
                                        <FaPlus /> Buat Produk Baru
                                    </Link>
                                </li>
                            </>
                        ) : (
                            <li>
                                <Link to="/#layanan" className="flex items-center gap-3 p-3 hover:bg-gray-700 rounded-md">
                                    <FaList /> Order
                                </Link>
                            </li>
                        )}
                        <li>
                            <Link to="/" className="flex items-center gap-3 p-3 hover:bg-gray-700 rounded-md">
                                <FaHome /> Beranda
                            </Link>
                        </li>
                    </ul>
                </div>

                {/* Profile */}
                <div className="relative p-4">
                    <button
                        className="flex items-center justify-between w-full p-3 bg-gray-800 rounded-md"
                        onClick={() => setIsProfileOpen(!isProfileOpen)}
                    >
                        <span className="flex items-center gap-3">
                            <FaUserCircle size={20} /> Profile
                        </span>
                        <motion.span animate={{ rotate: isProfileOpen ? 180 : 0 }}>
                            ▼
                        </motion.span>
                    </button>

                    <AnimatePresence>
                        {isProfileOpen && (
                            <motion.div
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                transition={{ duration: 0.3 }}
                                className="absolute bottom-14 w-full bg-gray-800 rounded-md shadow-md overflow-hidden"
                            >
                                <Link to="/profile" className="flex items-center gap-3 p-3 hover:bg-gray-700">
                                    <FaUser /> Profile
                                </Link>
                                <button className="flex items-center gap-3 p-3 w-full text-left hover:bg-gray-700">
                                    <LogOut /> Logout
                                </button>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>

            {/* Overlay untuk layar kecil */}
            {isSidebarOpen && (
                <div
                    className="fixed inset-0 bg-black/20 bg-opacity-50 z-30 md:hidden"
                    onClick={() => setIsSidebarOpen(false)}
                />
            )}
        </>
    );
}
