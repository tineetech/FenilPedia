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
import { ref, remove, set, update } from "firebase/database";
import { db } from "../utils/firebase";
import Swal from "sweetalert2";
import getMethod2 from "../utils/GetMethod2";


const serviceOptions = [
    { value: "Instagram", label: "Instagram" },
    { value: "YouTube", label: "YouTube" },
    { value: "TikTok", label: "TikTok" },
    { value: "Facebook", label: "Facebook" },
];

export default function AdminPanel({ dummyUser }) {
    const [orders, setOrders] = useState([]);
    const [selectedService, setSelectedService] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedDate, setSelectedDate] = useState(null);

    
    const fetchOrders = async () => {
        try {
            const data = await getMethod2("orders");
    
            if (!data) {
                console.error("Gagal mengambil data orders");
                return;
            }
    
            // Mapping data dari Firebase ke format yang sesuai
            const formattedOrders = Object.entries(data).map(([key, value]) => ({
                id: key, // Menggunakan key Firebase sebagai id unik
                name: value.layanan || "Unknown Service",
                customer: value.orderName || "Anonymous",
                target: value.target || "-",
                createdAt: value?.createdAt?.slice(0,10) || "-",
                status: value.status || "Pending", // Default ke "Pending" jika tidak ada
                date: value.createdAt ? new Date(value.createdAt) : '-' // Konversi ke Date object
            }));
    
            setOrders(formattedOrders);
            console.log("Orders berhasil disetel:", formattedOrders);
        } catch (error) {
            console.error("Gagal mengambil orders:", error);
        }
    };
    
    useEffect(() => {
        fetchOrders();
    }, []);    

    const updateStatus = async (id) => {
        try {
            const orderRef = ref(db, `orders/${id}`); // Referensi ke order yang ingin diubah
    
            await update(orderRef, { status: "SUCCESS" }); // Update status di Firebase
    
            // Perbarui state agar tampilan juga berubah
            setOrders(orders.map(order =>
                order.id === id ? { ...order, status: "SUCCESS" } : order
            ));
    
            Swal.fire({
                title: "Berhasil!",
                text: "Kamu berhasil menyetel order ke status sukses",
                icon: "success",
                timer: 2500,
                timerProgressBar: true
            })
        } catch (error) {
            console.error("Gagal memperbarui status:", error);
            alert("Terjadi kesalahan, coba lagi.");
        }
    };
    
    const deleteOrder = async (id) => {
        const confirmDelete = window.confirm("Apakah Anda yakin ingin menghapus order ini?");
        if (!confirmDelete) return;
    
        try {
            const orderRef = ref(db, `orders/${id}`); // Referensi order di Firebase
    
            await remove(orderRef); // Hapus dari Firebase
    
            // Perbarui state agar UI langsung berubah
            setOrders(orders.filter(order => order.id !== id));
    
            alert("Order berhasil dihapus!");
        } catch (error) {
            console.error("Gagal menghapus order:", error);
            alert("Terjadi kesalahan, coba lagi.");
        }
    };
    
    const filteredOrders = orders.filter(order => {
        return (
            (!selectedService || order.name.includes(selectedService.value)) &&
            (!searchTerm || order.customer.toLowerCase().includes(searchTerm.toLowerCase())) &&
            (!selectedDate || order.createdAt.toDateString() === selectedDate.toDateString())
        );
    });

    const columns = [
        { name: "ID", selector: (row, index) => index + 1, sortable: true, width: "80px" },
        { name: "Nama Layanan", selector: row => row.name, sortable: true },
        { name: "Pelanggan", selector: row => row.customer, sortable: true },
        { name: "Target", selector: row => row.target, sortable: true },
        { name: "Tanggal", selector: row => row.createdAt ?? '-', sortable: true },
        {
            name: "Status",
            selector: row => row.status,
            sortable: true,
            cell: row => <span className={row.status === "PENDING" ? "text-red-500" : "text-green-500"}>{row.status}</span>
        },
        {
            name: "Aksi",
            cell: row => (
                <>
                    {
                        row.status === "PENDING" && (
                            <button
                                onClick={() => updateStatus(row.id)}
                                className="bg-green-500 mr-3 text-white px-4 py-2 rounded-full text-nowrap hover:bg-green-700 transition-all"
                            >
                                Finish
                            </button>
                        ) 
                    }
                        <button
                            onClick={() => deleteOrder(row.id)}
                            className="bg-red-500 text-white px-4 py-2 rounded-full text-nowrap hover:bg-red-700 transition-all"
                        >
                            Delete
                        </button>
                </>
            ),
            ignoreRowClick: true,
            allowOverflow: true,
        }
    ];

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
                    <h1 className="text-2xl md:text-4xl text-center my-4 font-semibold">List Order</h1>
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
                        {/* <DatePicker
                            selected={selectedDate}
                            onChange={setSelectedDate}
                            placeholderText="Tanggal"
                            className="w-full md:w-3/3 p-2 border border-gray-300 rounded"
                        /> */}
                    </div>

                    <div className="overflow-x-auto">
                        <DataTable
                            columns={columns}
                            data={filteredOrders}
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
