import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export default function NotFound() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen px-6">
            <motion.img
                src="/assets/404.svg"
                alt="404 Illustration"
                className="w-80 sm:w-128 mb-6"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            />
            <motion.h1
                className="text-3xl sm:text-4xl text-center font-semibold text-gray-800 mb-3"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.5 }}
            >
                Oops! Halaman Tidak Ditemukan
            </motion.h1>
            <motion.p
                className="text-gray-600 text-center max-w-md mb-6"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.5 }}
            >
                Sepertinya halaman yang Anda cari tidak tersedia.
            </motion.p>
            <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.6, duration: 0.5 }}
            >
                <Link
                    to="/"
                    className="px-6 py-3 bg-teal-400 text-white font-semibold rounded-full shadow-md hover:bg-teal-600 transition"
                >
                    Kembali ke Beranda
                </Link>
            </motion.div>
        </div>
    );
}
