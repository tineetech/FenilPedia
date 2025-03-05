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

export default function ListProduk({ dummyUser }) {
    const [produk, setProduk] = useState([]);
    const [selectedService, setSelectedService] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedDate, setSelectedDate] = useState(null);
    const [totalProduk, setTotalProduk] = useState(null)
    const [totalOrders, setTotalOrders] = useState(null)

    const updateStatus = (id) => {
        setProduk(produk.map(order =>
            order.id === id && order.status === "Pending" ? { ...order, status: "Completed" } : order
        ));
    };

    const deleteProduk = async (id) => {
        try {
            const productRef = ref(db, `products/${id}`); // Path ke produk berdasarkan ID
            await remove(productRef);
    
            // Update state setelah penghapusan berhasil
            setProduk(produk.filter(item => item.id !== id));
            console.log(`✅ Produk dengan ID ${id} berhasil dihapus`);
        } catch (error) {
            console.error("❌ Gagal menghapus produk:", error.message);
        }
    };
    

    const filteredProduk = produk.filter(order => {
        return (
            (!selectedService || order.name.includes(selectedService.value)) &&
            (!searchTerm || order.customer.toLowerCase().includes(searchTerm.toLowerCase())) &&
            (!selectedDate || order.date.toDateString() === selectedDate.toDateString())
        );
    });

    const columns = [
        { name: "ID", selector: (row, index) => index + 1, sortable: true, width: "80px" },
        { name: "Nama Layanan", selector: row => row.name, sortable: true },
        { name: "Tipe", selector: row => row.serviesType, sortable: true },
        { name: "Brand target", selector: row => row.brandSosmed, sortable: true },
        { name: "Harga", selector: row => row.price, sortable: true },
        {
            name: "Aksi",
            cell: row => (
                    <button
                        onClick={() => deleteProduk(row.id)}
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
        const fetchUtilsGetProduk = async () => {
            try {
                const data = await getMethod2('products');

                // optional condition
                const mappedProduk = Object.entries(data).map(([key, item]) => ({
                    id: key, // Gunakan key Firebase sebagai ID
                    ...item
                }));
                setTotalProduk(data.length);
                console.log(data)
                setProduk(mappedProduk)
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

            {/* Content */}
            <div className="flex-1 md:p-0 md:pl-64">
                <div className="relative bg-teal-500 text-white py-16">
                    <h1 className="text-center text-2xl md:text-4xl font-semibold">Admin Panel</h1>
                    <div className="relative mt-6 flex justify-center">
                        <Wave position="absolute -bottom-22 left-0 w-full" />
                    </div>
                </div>

                <div className="max-w-5xl mx-auto p-6 bg-white shadow-md rounded-lg">
                    <h1 className="text-2xl md:text-4xl text-center my-4 font-semibold">List Produk</h1>
                    <div className="flex flex-col md:flex-row gap-4 mb-4">
                        <Select
                            options={serviceOptions}
                            onChange={setSelectedService}
                            placeholder="Layanan"
                            className="w-full md:w-1/3"
                        />
                        <input
                            type="text"
                            placeholder="Cari berdasarkan nama"
                            className="w-full md:w-2/3 p-2 border border-gray-300 rounded"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        <DatePicker
                            selected={selectedDate}
                            onChange={setSelectedDate}
                            placeholderText="Tanggal"
                            className="w-full md:w-3/3 p-2 border border-gray-300 rounded"
                        />
                    </div>

                    <div className="overflow-x-auto">
                        <DataTable
                            columns={columns}
                            data={filteredProduk}
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
