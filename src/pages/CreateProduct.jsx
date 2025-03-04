/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import Select from "react-select";
import Wave from "../components/Wave";
import Sidebar from "../components/Navigations/Sidebar";
import Footer from "../components/Navigations/Footer";
import { ref, push } from "firebase/database";
import { db } from "../utils/firebase";
import Swal from "sweetalert2";
import getMethod from "../utils/GetMethod";


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
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [description, setDescription] = useState("");
    const [totalProduk, setTotalProduk] = useState(null)
    const [totalOrders, setTotalOrders] = useState(null)

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!selectedSocialMedia || !selectedService) {
            console.error("Harap pilih jenis sosial media dan layanan sebelum submit.");
            return;
        }
    
        const newProduct = {
            name,
            price,
            description,
            serviesType: selectedService?.value || "Unknown Service",
            brandSosmed: selectedSocialMedia?.value || "Unknown Platform",
        };
    
        try {
            const productRef = ref(db, "products"); // Referensi ke path "products"
            await push(productRef, newProduct); // Push data baru ke Firebase
    
            console.log("✅ Produk berhasil ditambahkan:", newProduct);
            
            Swal.fire({
                title: "Berhasil!",
                text: "Kamu berhasil menambahkan produk",
                icon: "success",
                timer: 2000,
                timerProgressBar: true
            })
    
            // Reset form setelah submit
            setName("");
            setPrice("");
            setDescription("");
            setSelectedSocialMedia(null);
            setSelectedService(null);
            location.reload()
        } catch (error) {
            alert('gagal menambahkan produk')
            alert(error.message)
            console.error("❌ Gagal menambahkan produk:", error.message);
        }
    }    
    
       
    useEffect(() => {
        const fetchUtilsGetProduk = async () => {
            try {
                const data = await getMethod('products');

                // optional condition
                setTotalProduk(data.length);
                console.log(data)
            } catch (error) {
                console.error("Gagal mengambil data:", error.message);
            }
        };
        const fetchUtilsGetOrder = async () => {
            try {
                const data = await getMethod('orders');

                // optional condition
                setTotalOrders(data.length);
            } catch (error) {
                console.error("Gagal mengambil data:", error.message);
            }
        };
        fetchUtilsGetProduk();
        fetchUtilsGetOrder()
    }, []);
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
                <div className="text-black max-w-3xl mx-auto p-8 mt-3 flex gap-10 justify-between">
                    <div className="w-[250px] flex-col h-[100px] bg-teal-50 text-teal-600 flex items-center justify-center rounded-sm">
                        <h1 className="text-xl font-bold">{totalProduk}</h1>
                        <span>Total produk</span>
                    </div>
                    <div className="w-[250px] flex-col h-[100px] bg-teal-50 text-teal-600 flex items-center justify-center rounded-sm">
                        <h1 className="text-xl font-bold">{totalOrders}</h1>
                        <span>Total order</span>
                    </div>
                </div>
                <div className="max-w-3xl mx-auto p-8 mt-6 mb-12">
                    <h1 className="text-xl md:text-3xl text-center my-4 font-semibold">Buat Produk Baru</h1>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block text-gray-700 font-medium mb-2">Nama Layanan <span className="text-red-600">*</span></label>
                            <input
                                type="text"
                                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                                placeholder="Masukkan nama layanan"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                            />
                        </div>
                        
                        <div>
                            <label className="block text-gray-700 font-medium mb-2">Jenis Sosial Media <span className="text-red-600">*</span></label>
                            <Select
                                options={socialMediaOptions}
                                onChange={setSelectedSocialMedia}
                                placeholder="Pilih Sosial Media"
                                required
                                className="text-gray-700"
                            />
                        </div>

                        <div>
                            <label className="block text-gray-700 font-medium mb-2">Jenis Layanan <span className="text-red-600">*</span></label>
                            <Select
                                options={serviceOptions}
                                onChange={setSelectedService}
                                required
                                placeholder="Pilih Layanan"
                                className="text-gray-700"
                            />
                        </div>

                        <div>
                            <label className="block text-gray-700 font-medium mb-2">Harga <span className="text-red-600">*</span></label>
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
