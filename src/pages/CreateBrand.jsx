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
    { value: "TikTok", label: "TikTok" },
    { value: "YouTube", label: "YouTube" },
    { value: "Whatsapp", label: "Whatsapp" },
    { value: "Shoppe", label: "Shoppe" },
    { value: "Thread", label: "Thread" },
    { value: "X", label: "X" },
    { value: "Spotify", label: "Spotify" },
];

const serviceOptions = [
    { value: "likes", label: "Likes" },
    { value: "subscribers", label: "Subscribers" },
    { value: "views", label: "Views" },
    { value: "followers", label: "Followers" },
    { value: "whatsapp_channel_member", label: "Whatssap Channel Member" },
    { value: "live_stream", label: "Live Stream" },
    { value: "free_plays", label: "Free plays (PREMIUM ACC)" },
    { value: "lainnya", label: "Lainnya" },
];

const trueFalseOption = [
    { value: true, label: 'YA' },
    { value: false, label: 'TIDAK' },
]

export default function CreateBrand({ dummyUser }) {
    const [name, setName] = useState("");
    const [image, setImage] = useState("");
    const [brand, setBrand] = useState(null)
    const [totalBrand, setTotalBrand] = useState(null)
    const [totalOrders, setTotalOrders] = useState(null)

    const handleSubmit = async (e) => {
        e.preventDefault();

        const duplicateEntry = brand.find((item) => item.name.toLowerCase() === name.toLowerCase())

        if (duplicateEntry) {
            Swal.fire({
                title: "Gagal!",
                text: "Nama Brand Sudah ada.",
                icon: "error",
                timer: 2000,
                timerProgressBar: true
            })
            setName("");
            return
        }

        const newBrand = {
            name,
            image,
            created_at: new Date().toDateString()
        };
    
        try {
            const BrandRef = ref(db, "brand");
            await push(BrandRef, newBrand); // Push data baru ke Firebase
    
            console.log("✅ Brand berhasil ditambahkan:", newBrand);
            
            Swal.fire({
                title: "Berhasil!",
                text: "Kamu berhasil menambahkan Brand",
                icon: "success",
                timer: 2000,
                timerProgressBar: true
            })
    
            // Reset form setelah submit
            setName("");
            location.reload()
        } catch (error) {
            alert('gagal menambahkan Brand')
            alert(error.message)
            console.error("❌ Gagal menambahkan Brand:", error.message);
        }
    }    
       
    useEffect(() => {
        const fetchUtilsGetBrand = async () => {
            try {
                const data = await getMethod('brand');

                // optional condition
                setBrand(data)
                setTotalBrand(data.length);
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
        fetchUtilsGetBrand();
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
                        <h1 className="text-xl font-bold">{totalBrand}</h1>
                        <span>Total Brand</span>
                    </div>
                    <div className="w-[250px] flex-col h-[100px] bg-teal-50 text-teal-600 flex items-center justify-center rounded-sm">
                        <h1 className="text-xl font-bold">{totalOrders}</h1>
                        <span>Total order</span>
                    </div>
                </div>
                <div className="max-w-3xl mx-auto p-8 mt-6 mb-12">
                    <h1 className="text-xl md:text-3xl text-center my-4 font-semibold">Buat Brand Sosmed Layanan</h1>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block text-gray-700 font-medium mb-2">Nama Brand sosmed <span className="text-red-600">*</span></label>
                            <input
                                type="text"
                                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                                placeholder="Masukkan nama brand sosmed "
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                            />
                        </div>
                        
                        <div>
                            <label className="block text-gray-700 font-medium mb-2">Url Background Brand (16:9) <span className="text-red-600">*</span></label>
                            <input
                                type="text"
                                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                                placeholder="Pastikan akhiran url berisi .jpg/.png/.jpeg dsb"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                            />
                        </div>
                        

                        <button
                            type="submit"
                            className="w-full bg-teal-500 text-white py-3 rounded-lg font-semibold hover:bg-teal-700 transition-all"
                        >
                            Tambah Brand
                        </button>
                    </form>
                </div>
                <Footer />
            </div>
        </div>
    );
}
