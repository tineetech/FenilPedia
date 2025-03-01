/* eslint-disable react/prop-types */
import { useState } from "react";
import Select from "react-select";
import Wave from "../components/Wave";
import Header from "../components/Navigations/Header";
import Footer from "../components/Navigations/Footer";

const socialMediaOptions = [
    { value: "Instagram", label: "Instagram" },
    { value: "YouTube", label: "YouTube" },
    { value: "TikTok", label: "TikTok" },
    { value: "Facebook", label: "Facebook" },
];

const serviceOptions = [
    { value: "likes", label: "Likes" },
    { value: "subscribers", label: "Subscribers" },
    { value: "views", label: "Views" },
    { value: "followers", label: "Followers" },
];

export default function Order({ dummyUser }) {
    const [selectedSocialMedia, setSelectedSocialMedia] = useState(null);
    const [selectedService, setSelectedService] = useState(null);
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [quantity, setQuantity] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!selectedSocialMedia || !selectedService || !username || !email || !quantity) {
            alert("Harap lengkapi semua data!");
            return;
        }

        const message = `
            *Order Baru!*
            📌 *Jenis Sosmed:* ${selectedSocialMedia.label}
            📌 *Jenis Layanan:* ${selectedService.label}
            👤 *Username:* ${username}
            ✉️ *Email:* ${email}
            🔢 *Jumlah:* ${quantity}
            
            Mohon segera diproses! ✅
        `.trim();

        const phoneNumber = "628123456789"; // Ganti dengan nomor WhatsApp tujuan
        const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

        window.open(whatsappURL, "_blank");
    };


    return (
        <div className="flex flex-col md:flex-row min-h-screen">
            <Header dummyUser={dummyUser} />
            <div className="flex-1">
                <div className="relative bg-teal-500 text-white py-16">
                    <h1 className="text-center text-2xl md:text-5xl font-semibold">Pesan Layanan</h1>
                    <div className="relative mt-6 flex justify-center">
                        <Wave position="absolute -bottom-22 left-0 w-full" />
                    </div>
                </div>

                <div className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-6 mb-12">
                    <h1 className="text-xl md:text-3xl text-center my-4 font-semibold">Detail Pesanan</h1>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block text-gray-700 font-medium mb-2">Jenis Sosial Media</label>
                            <Select
                                options={socialMediaOptions}
                                onChange={setSelectedSocialMedia}
                                placeholder="Pilih Sosial Media"
                                className="text-gray-700"
                            />
                        </div>

                        <div>
                            <label className="block text-gray-700 font-medium mb-2">Jenis Layanan</label>
                            <Select
                                options={serviceOptions}
                                onChange={setSelectedService}
                                placeholder="Pilih Layanan"
                                className="text-gray-700"
                            />
                        </div>

                        <div>
                            <label className="block text-gray-700 font-medium mb-2">Username Akun</label>
                            <input
                                type="text"
                                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                                placeholder="Masukkan username akun"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-gray-700 font-medium mb-2">Email Pembeli</label>
                            <input
                                type="email"
                                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                                placeholder="Masukkan email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-gray-700 font-medium mb-2">Jumlah Pembelian</label>
                            <input
                                type="number"
                                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                                placeholder="Masukkan jumlah pembelian"
                                value={quantity}
                                onChange={(e) => setQuantity(e.target.value)}
                                required
                            />
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-teal-500 text-white py-3 rounded-lg font-semibold hover:bg-teal-700 transition-all"
                        >
                            Pesan Sekarang
                        </button>
                    </form>
                </div>
                <Footer />
            </div>
        </div>
    );
}
