import { Link } from "react-router-dom";
import { Phone } from "lucide-react";

export default function AboutSection() {
    return (
        <div className="flex flex-col md:flex-row items-center justify-between max-w-7xl mx-auto px-6 py-12 gap-8 md:gap-16 mt-4" id="tentang kami" >
            {/* Logo */}
            <div className="flex-shrink-0 md:w-1/3 flex justify-center">
                <img src="/assets/logo.svg" alt="Logo" className="w-28 md:w-36" />
            </div>

            {/* Text Content */}
            <div className="md:w-2/3 text-center md:text-left">
                <h1 className="text-3xl md:text-4xl font-bold text-gray-900">Fenil Pedia</h1>
                <h3 className="text-lg md:text-2xl font-semibold text-gray-700 mt-4">Fenil Pedia</h3>
                <p className="text-gray-700 text-base md:text-xl mt-2 leading-relaxed">
                    SMM Panel Indonesia adalah sebuah website penyedia layanan sosial media terlengkap, termurah, dan berkualitas.
                </p>

                {/* Button */}
                <Link
                    to="#kontak"
                    className="inline-flex items-center mt-6 px-5 py-2.5 rounded-full bg-teal-400 text-white text-sm md:text-base font-semibold shadow-md hover:bg-teal-600 transition-all"
                >
                    <Phone size={20} className="mr-2" />
                    Kontak Kami
                </Link>
            </div>
        </div>
    );
}