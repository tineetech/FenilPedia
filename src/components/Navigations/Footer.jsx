import { motion } from "framer-motion";
import { Facebook, Instagram, Twitter, Youtube, Mail, Phone } from "lucide-react";

export default function Footer() {
    return (
        <footer className="bg-gray-900 text-white py-10">
            <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8">

                {/* Logo */}
                <div className="flex flex-col space-y-4">
                    <img src="/assets/logoText.svg" alt="Logo" className="w-36" />
                    <p className="text-gray-400 text-sm">
                        Layanan terbaik untuk meningkatkan engagement sosial media Anda dengan hasil optimal dan terpercaya.
                    </p>
                </div>

                {/* Navigasi */}
                <div className="flex flex-col space-y-3">
                    <h3 className="text-lg font-semibold">Navigasi</h3>
                    <ul className="space-y-2">
                        {[
                            { label: "Beranda", href: "#hero" },
                            { label: "Layanan", href: "#layanan" },
                            { label: "Tentang Kami", href: "#tentang kami" },
                            { label: "Kontak", href: "#kontak" }
                        ].map((item, index) => (
                            <motion.li
                                key={index}
                                whileHover={{ x: 5 }}
                                className="text-gray-400 hover:text-white cursor-pointer transition"
                            >
                                <a href={item.href} className="block w-full">
                                    {item.label}
                                </a>
                            </motion.li>
                        ))}
                    </ul>
                </div>

                {/* Kontak & Sosial Media */}
                <div className="flex flex-col space-y-4">
                    <h3 className="text-lg font-semibold">Hubungi Kami</h3>
                    <p className="flex items-center gap-2 text-gray-400">
                        <Mail size={18} /> support@website.com
                    </p>
                    <p className="flex items-center gap-2 text-gray-400">
                        <Phone size={18} /> +62 812 3456 7890
                    </p>

                    <h3 className="text-lg font-semibold mt-4">Ikuti Kami</h3>
                    <div className="flex space-x-4">
                        {[Facebook, Instagram, Twitter, Youtube].map((Icon, index) => (
                            <motion.a
                                key={index}
                                whileHover={{ scale: 1.2 }}
                                className="bg-gray-700 p-2 rounded-full hover:bg-blue-500 transition"
                                href="#"
                            >
                                <Icon size={20} />
                            </motion.a>
                        ))}
                    </div>
                </div>
            </div>

            {/* Copyright */}
            <div className="border-t border-gray-700 mt-10 pt-6 text-center text-gray-500 text-sm">
                © {new Date().getFullYear()} Your Brand. All rights reserved.
            </div>
        </footer>
    );
}
