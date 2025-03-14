/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import Select from "react-select";
import DatePicker from "react-datepicker";
import DataTable from "react-data-table-component";
import "react-datepicker/dist/react-datepicker.css";
import Wave from "../components/Wave";
import Sidebar from "../components/Navigations/Sidebar";
import Footer from "../components/Navigations/Footer";
import getMethod from "../utils/GetMethod";
import { ref, remove } from "firebase/database";
import { db } from "../utils/firebase";
import getMethod2 from "../utils/GetMethod2";

const initialproduk = [
    { id: 1, name: "Paket Instagram Likes", customer: "Budi", status: "Pending", date: new Date("2024-02-01") },
    { id: 2, name: "Paket YouTube Views", customer: "Siti", status: "Completed", date: new Date("2024-02-05") },
    { id: 3, name: "Paket TikTok Followers", customer: "Andi", status: "Pending", date: new Date("2024-02-10") },
];

const serviceOptions = [
    { value: "Instagram", label: "Instagram" },
    { value: "YouTube", label: "YouTube" },
    { value: "TikTok", label: "TikTok" },
    { value: "Facebook", label: "Facebook" },
];

export default function ListKategori({ dummyUser }) {
    const [tipe, setTipe] = useState([]);
    const [brand, setBrand] = useState([]);
    const [produk, setProduk] = useState([]);
    const [selectedService, setSelectedService] = useState(null);
    const [searchTipe, setSearchTipe] = useState("");
    const [searchBrand, setSearchBrand] = useState("");
    const [selectedDate, setSelectedDate] = useState(null);
    const [totalProduk, setTotalProduk] = useState(null)
    const [totalOrders, setTotalOrders] = useState(null)

    // tipe layanan
    const deleteTipe = async (id) => {
        try {
            const productRef = ref(db, `tipe/${id}`); // Path ke produk berdasarkan ID
            await remove(productRef);
    
            // Update state setelah penghapusan berhasil
            setTipe(tipe.filter(item => item.id !== id));
            console.log(`✅ Tipe dengan ID ${id} berhasil dihapus`);
        } catch (error) {
            console.error("❌ Gagal menghapus produk:", error.message);
        }
    };
    

    const filteredTipe = tipe.filter(order => {
        return (
            (!searchTipe || order.name.toLowerCase().includes(searchTipe.toLowerCase()))
        );
    });

    const columnsTipe = [
        { name: "ID", selector: (row, index) => index + 1, sortable: true, width: "80px" },
        { name: "Nama Tipe Layanan", selector: row => row.name, sortable: true },
        { name: "Dibuat pada", selector: row => row.created_at, sortable: true },
        {
            name: "Aksi",
            cell: row => (
                    <button
                        onClick={() => deleteTipe(row.id)}
                        className="bg-red-500 text-white px-4 py-2 rounded-full hover:bg-red-700 transition-all"
                    >
                        Delete
                    </button>
            ),
            ignoreRowClick: true,
            allowOverflow: true,
        }
    ];

    // brand sosmed layanan
    const deleteBrand = async (id) => {
        try {
            const productRef = ref(db, `brand/${id}`); // Path ke produk berdasarkan ID
            await remove(productRef);
    
            // Update state setelah penghapusan berhasil
            setBrand(brand.filter(item => item.id !== id));
            console.log(`✅ Brand dengan ID ${id} berhasil dihapus`);
        } catch (error) {
            console.error("❌ Gagal menghapus produk:", error.message);
        }
    };
    

    const filteredBrand = brand.filter(order => {
        return (
            (!searchBrand || order.name.toLowerCase().includes(searchBrand.toLowerCase()))
        );
    });

    const columnsBrand = [
        { name: "ID", selector: (row, index) => index + 1, sortable: true, width: "80px" },
        { name: "Nama Brand Sosmed", selector: row => row.name, sortable: true },
        { name: "Url background", cell: row => (<img src={row.image} className="w-10" />) ?? '-', sortable: true },
        { name: "Dibuat pada", selector: row => row.created_at, sortable: true },
        {
            name: "Aksi",
            cell: row => (
                    <button
                        onClick={() => deleteBrand(row.id)}
                        className="bg-red-500 text-white px-4 py-2 rounded-full hover:bg-red-700 transition-all"
                    >
                        Delete
                    </button>
            ),
            ignoreRowClick: true,
            allowOverflow: true,
        }
    ];

    
    useEffect(() => {
        const fetchUtilsGetTipe = async () => {
            try {
                const data = await getMethod2('tipe');

                // optional condition
                const mappedTipe = Object.entries(data).map(([key, item]) => ({
                    id: key, // Gunakan key Firebase sebagai ID
                    ...item
                }));
                setTipe(mappedTipe)
            } catch (error) {
                console.error("Gagal mengambil data:", error.message);
            }
        };
        const fetchUtilsGetBrand = async () => {
            try {
                const data = await getMethod2('brand');

                // optional condition
                const mappedBrand = Object.entries(data).map(([key, item]) => ({
                    id: key, // Gunakan key Firebase sebagai ID
                    ...item
                }));
                setBrand(mappedBrand)
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
        fetchUtilsGetTipe();
        fetchUtilsGetBrand();
        // fetchUtilsGetOrder()
    }, []);

    return (
        <div className="flex flex-col md:flex-row min-h-screen">
            <Sidebar dummyUser={dummyUser} />

            {/* Content */}
            <div className="flex-1 md:p-0 md:pl-64">
                <div className="relative bg-teal-500 text-white py-16">
                    <h1 className="text-center text-2xl md:text-4xl font-semibold">Admin Panel</h1>
                    <div className="relative mt-6 flex justify-center">
                        <Wave position="absolute -bottom-22 left-0 w-full" />
                    </div>
                </div>

                <div className="max-w-5xl mx-auto p-6 bg-white shadow-md rounded-lg">
                    <h1 className="text-2xl md:text-4xl text-center my-4 font-semibold">List Tipe Layanan</h1>
                    <div className="flex flex-col md:flex-row gap-4 mb-4">
                        {/* <Select
                            options={serviceOptions}
                            onChange={setSelectedService}
                            placeholder="Layanan"
                            className="w-full md:w-1/3"
                        /> */}
                        <input
                            type="text"
                            placeholder="Cari berdasarkan nama"
                            className="w-full p-2 border border-gray-300 rounded"
                            value={searchTipe}
                            onChange={(e) => setSearchTipe(e.target.value)}
                        />
                        {/* <DatePicker
                            selected={selectedDate}
                            onChange={setSelectedDate}
                            placeholderText="Tanggal"
                            className="w-full md:w-3/3 p-2 border border-gray-300 rounded"
                        /> */}
                    </div>

                    <div className="overflow-x-auto">
                        <DataTable
                            columns={columnsTipe}
                            data={filteredTipe}
                            pagination
                            highlightOnHover
                            responsive
                            className="shadow-md rounded-lg"
                        />
                    </div>
                </div>
                <div className="max-w-5xl mt-10 mx-auto p-6 bg-white shadow-md rounded-lg">
                    <h1 className="text-2xl md:text-4xl text-center my-4 font-semibold">List Brand Sosmed</h1>
                    <div className="flex flex-col md:flex-row gap-4 mb-4">
                        {/* <Select
                            options={serviceOptions}
                            onChange={setSelectedService}
                            placeholder="Layanan"
                            className="w-full md:w-1/3"
                        /> */}
                        <input
                            type="text"
                            placeholder="Cari berdasarkan nama"
                            className="w-full p-2 border border-gray-300 rounded"
                            value={searchBrand}
                            onChange={(e) => setSearchBrand(e.target.value)}
                        />
                        {/* <DatePicker
                            selected={selectedDate}
                            onChange={setSelectedDate}
                            placeholderText="Tanggal"
                            className="w-full md:w-3/3 p-2 border border-gray-300 rounded"
                        /> */}
                    </div>

                    <div className="overflow-x-auto">
                        <DataTable
                            columns={columnsBrand}
                            data={filteredBrand}
                            pagination
                            highlightOnHover
                            responsive
                            className="shadow-md rounded-lg"
                        />
                    </div>
                </div>
                <Footer />
            </div>
        </div>
    );
}
