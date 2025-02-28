/* eslint-disable react/prop-types */
import { useParams } from "react-router-dom";
import { useState } from "react";
import Wave from "../components/Wave";

export default function DetailService({ services }) {
    const { id } = useParams();
    const service = services.find(s => s.id === parseInt(id));
    const [quantity, setQuantity] = useState(1);
    const [username, setUsername] = useState("");

    if (!service) return <div className="text-center py-10 text-red-500">Layanan tidak ditemukan.</div>;

    const handleConfirm = () => {
        const message = `Halo, saya ingin membeli *${service.name}* sebanyak *${quantity}* untuk akun *${username}*.`;
        const waLink = `https://wa.me/6281234567890?text=${encodeURIComponent(message)}`;
        window.open(waLink, "_blank");
    };

    return (
        <div>
            <div className="relative bg-teal-400 text-white overflow-hidden pt-22 pb-22">
                <h1 className="text-xl md:text-4xl font-semibold ml-14">{service.name}</h1>
                {/* Card & Wave */}
                <div className="relative mt-16 flex justify-center">
                    <Wave position={"absolute -bottom-28 left-0 w-full"} />
                </div>
            </div>

            <div className="max-w-2xl mx-auto bg-white text-gray-900 p-6 rounded-lg shadow-lg">
                <h2 className="text-xl font-semibold mb-4">Pesan {service.name}</h2>
                <label className="block mb-2">Username atau Link</label>
                <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full px-4 py-2 border rounded-md mb-4"
                    placeholder="Masukkan username atau link"
                />

                <label className="block mb-2">Jumlah</label>
                <input
                    type="number"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                    className="w-full px-4 py-2 border rounded-md mb-4"
                    min="1"
                />

                <button
                    onClick={handleConfirm}
                    className="w-full bg-teal-500 text-white py-2 rounded-md hover:bg-teal-600 transition"
                >
                    Pesan via WhatsApp
                </button>
            </div>
        </div>
    );
}
