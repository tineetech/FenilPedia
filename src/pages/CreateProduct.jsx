/* eslint-disable react/prop-types */
import { useState } from "react";
import Select from "react-select";
import Wave from "../components/Wave";
import Sidebar from "../components/Navigations/Sidebar";
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

export default function CreateProduct({ dummyUser }) {
    const [selectedSocialMedia, setSelectedSocialMedia] = useState(null);
    const [selectedService, setSelectedService] = useState(null);
    const [price, setPrice] = useState("");
    const [description, setDescription] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log({ selectedSocialMedia, selectedService, price, description });
    };

    return (
        <div className="flex flex-col md:flex-row min-h-screen">
            <Sidebar dummyUser={dummyUser} />

            <div className="flex-1 md:pl-64 md:p-0">
                <div className="relative bg-teal-500 text-white py-16">
                    <h1 className="text-center text-2xl md:text-5xl font-semibold">Admin Panel</h1>
                    <div className="relative mt-6 flex justify-center">
                        <Wave position="absolute -bottom-22 left-0 w-full" />
                    </div>
                </div>

                <div className="max-w-3xl mx-auto p-8 mt-6 mb-12">
                    <h1 className="text-xl md:text-3xl text-center my-4 font-semibold">Buat Produk Baru</h1>
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
                            <label className="block text-gray-700 font-medium mb-2">Harga</label>
                            <input
                                type="number"
                                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                                placeholder="Masukkan harga"
                                value={price}
                                onChange={(e) => setPrice(e.target.value)}
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-gray-700 font-medium mb-2">Keterangan Layanan</label>
                            <textarea
                                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                                placeholder="Masukkan keterangan layanan"
                                rows="4"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                required
                            ></textarea>
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-teal-500 text-white py-3 rounded-lg font-semibold hover:bg-teal-700 transition-all"
                        >
                            Tambah Produk
                        </button>
                    </form>
                </div>
                <Footer />
            </div>
        </div>
    );
}
