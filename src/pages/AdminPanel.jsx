import { useState } from "react";
import Select from "react-select";
import DatePicker from "react-datepicker";
import DataTable from "react-data-table-component";
import "react-datepicker/dist/react-datepicker.css";
import Wave from "../components/Wave";
import Sidebar from "../components/Navigations/Sidebar";
import Footer from "../components/Navigations/Footer"

const initialOrders = [
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

export default function AdminPanel() {
    const [orders, setOrders] = useState(initialOrders);
    const [selectedService, setSelectedService] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedDate, setSelectedDate] = useState(null);

    const updateStatus = (id) => {
        setOrders(orders.map(order =>
            order.id === id && order.status === "Pending" ? { ...order, status: "Completed" } : order
        ));
    };

    const filteredOrders = orders.filter(order => {
        return (
            (!selectedService || order.name.includes(selectedService.value)) &&
            (!searchTerm || order.customer.toLowerCase().includes(searchTerm.toLowerCase())) &&
            (!selectedDate || order.date.toDateString() === selectedDate.toDateString())
        );
    });

    const columns = [
        { name: "ID", selector: row => row.id, sortable: true, width: "80px" },
        { name: "Nama Layanan", selector: row => row.name, sortable: true },
        { name: "Pelanggan", selector: row => row.customer, sortable: true },
        { name: "Tanggal", selector: row => row.date.toDateString(), sortable: true },
        {
            name: "Status",
            selector: row => row.status,
            sortable: true,
            cell: row => <span className={row.status === "Pending" ? "text-red-500" : "text-green-500"}>{row.status}</span>
        },
        {
            name: "Aksi",
            cell: row => (
                row.status === "Pending" && (
                    <button
                        onClick={() => updateStatus(row.id)}
                        className="bg-green-500 text-white px-4 py-2 rounded-full hover:bg-green-700 transition-all"
                    >
                        Finish
                    </button>
                )
            ),
            ignoreRowClick: true,
            allowOverflow: true,
        }
    ];

    return (
        <div className="flex min-h-screen">
            <Sidebar />

            {/* Content */}
            <div className="flex-1 pl-64">
                <div className="relative bg-teal-500 text-white py-22">
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
                        <DatePicker
                            selected={selectedDate}
                            onChange={setSelectedDate}
                            placeholderText="Tanggal"
                            className="w-full md:w-3/3 p-2 border border-gray-300 rounded"
                        />
                    </div>

                    <DataTable
                        columns={columns}
                        data={filteredOrders}
                        pagination
                        highlightOnHover
                        responsive
                        className="shadow-md rounded-lg"
                    />
                </div>
                <Footer />
            </div>
        </div>
    );
}
