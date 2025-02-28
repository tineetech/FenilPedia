import { useState } from "react";
import Select from "react-select";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Wave from "../components/Wave";

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

export default function AdminOrders() {
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

    return (
        <div className="min-h-screen">
            <div className="relative bg-teal-500 text-white py-22">
                <div className="relative mt-6 flex justify-center">
                    <Wave position="absolute -bottom-22 left-0 w-full" />
                </div>
            </div>

            <div className="max-w-5xl mx-auto p-6 bg-white shadow-md rounded-lg mt-6">
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

                <table className="w-full border-collapse bg-white shadow-md rounded-lg overflow-hidden">
                    <thead>
                        <tr className="bg-gray-200 text-gray-700">
                            <th className="border p-3">ID</th>
                            <th className="border p-3">Nama Layanan</th>
                            <th className="border p-3">Pelanggan</th>
                            <th className="border p-3">Tanggal</th>
                            <th className="border p-3">Status</th>
                            <th className="border p-3">Aksi</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredOrders.length > 0 ? (
                            filteredOrders.map(order => (
                                <tr key={order.id} className="text-center border-t">
                                    <td className="border p-3">{order.id}</td>
                                    <td className="border p-3">{order.name}</td>
                                    <td className="border p-3">{order.customer}</td>
                                    <td className="border p-3">{order.date.toDateString()}</td>
                                    <td className={`border p-3 ${order.status === "Pending" ? "text-red-500" : "text-green-500"}`}>{order.status}</td>
                                    <td className="border p-3">
                                        {order.status === "Pending" && (
                                            <button
                                                onClick={() => updateStatus(order.id)}
                                                className="bg-green-500 text-white px-4 py-2 rounded-full hover:bg-green-700 transition-all"
                                            >
                                                Finish
                                            </button>
                                        )}
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="6" className="text-center text-gray-500 p-4">Tidak ada data yang sesuai</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}