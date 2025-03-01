import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { LogIn, UserPlus } from "lucide-react";
import Wave from "../Wave";
import HeroCard from "../Cards/HeroCard";

export default function HeroSection() {
    return (
        <section className="relative bg-teal-400 text-white overflow-hidden pt-24">
            <div className="container max-w-7xl mx-auto px-8 lg:px-12 flex flex-col-reverse md:flex-row items-center">
                {/* Kiri: Teks */}
                <div className="md:w-1/2 text-left">
                    <h1 className="text-2xl md:text-4xl font-bold mb-4 md:mb-6">
                        Social Media Marketing Panel Indonesia Terbaik
                    </h1>
                    <p className="text-xs md:text-base mb-6">
                        FenilPedia Smm Panel Indonesia adalah sebuah platform bisnis yang menyediakan berbagai layanan social media marketing yang bergerak terutama di Indonesia. Dengan bergabung bersama kami, Anda dapat menjadi penyedia jasa social media atau reseller social media seperti jasa penambah Followers, Likes,Views, Comment, Subcribe, dll. Saat ini tersedia berbagai layanan untuk social media terpopuler seperti Instagram, Facebook, Twitter, Youtube, Tiktok, Threads, Telegram, dll.
                    </p>
                    <div className="flex">
                        <Link
                            to="/login"
                            className="flex align-middle text-center rounded-full bg-white text-teal-500 px-3 py-1 text-sm md:px-6 md:py-2 font-semibold hover:bg-teal-500 hover:text-white transition-all mr-4"
                        >
                            <LogIn size={18} className="mr-2" />
                            Masuk
                        </Link>
                        <Link
                            to="/login"
                            className="flex align-middle text-center rounded-full bg-teal-500 text-white px-3 py-1 text-sm md:px-6 md:py-2 font-semibold hover:bg-white hover:text-teal-500 transition-all"
                        >
                            <UserPlus size={18} className="mr-2" />
                            Daftar
                        </Link>
                    </div>
                </div>

                {/* Kanan: Gambar Ilustrasi dengan Animasi Naik-Turun */}
                <div className="w-[250px] md:w-1/2 flex justify-end">
                    <motion.img
                        src="/assets/herosection.svg"
                        alt="Ilustrasi"
                        className="max-w-[400px] w-full"
                        animate={{ y: [0, -20, 0] }}
                        transition={{ duration: 3, repeat: Infinity, repeatType: "mirror", ease: "easeInOut" }}
                    />
                </div>
            </div>

            {/* Card & Wave */}
            <div className="relative mt-16 flex justify-center">
                <HeroCard />
                <Wave position={"absolute -bottom-6 left-0 w-full"} />
            </div>
        </section>

    );
}
