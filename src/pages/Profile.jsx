/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import Wave from "../components/Wave";
import SideBar from "../components/Navigations/Sidebar";
import Footer from "../components/Navigations/Footer";

const userOrders = [
    { id: 1, name: "Paket Instagram Likes", status: "Pending", date: new Date("2024-02-01") },
    { id: 2, name: "Paket YouTube Views", status: "Completed", date: new Date("2024-02-05") },
];

export default function Profile({ dummyUser }) {
    return (
        <div className="flex flex-col md:flex-row min-h-screen">
            <SideBar dummyUser={dummyUser} className="hidden md:block" />

            {/* Content */}
            <div className="flex-1 md:pl-64">
                {/* Header Profile */}
                <div className="relative w-full bg-teal-500 text-white py-10 px-4 flex flex-col items-center rounded-b-3xl shadow-lg">
                    <img
                        src={dummyUser.profilePicture}
                        alt="Profile"
                        className="w-24 h-24 md:w-28 md:h-28 rounded-full border-4 border-white shadow-md"
                    />
                    <h2 className="mt-4 text-xl md:text-2xl font-bold text-center">{dummyUser.name}</h2>
                    <Wave position="absolute -bottom-12 left-0 w-full" />
                </div>

                {/* Profile Content */}
                <div className="w-full mt-12 p-4 md:p-6 mx-auto max-w-4xl">
                    {dummyUser.isAdmin ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <Link to="/admin/create-product" className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-all text-center">
                                Buat Produk Baru
                            </Link>
                            <Link to="/admin" className="w-full bg-green-600 text-white py-3 px-6 rounded-lg hover:bg-green-700 transition-all text-center">
                                Pergi ke List Order
                            </Link>
                        </div>
                    ) : (
                        <div className="text-left">
                            <h3 className="text-lg md:text-xl font-semibold text-gray-800 mb-4 text-center md:text-left">Order History</h3>
                            <div className="space-y-4">
                                {userOrders.map((order) => (
                                    <div key={order.id} className="p-4 bg-gray-50 rounded-lg shadow flex flex-col md:flex-row justify-between items-center border border-gray-200">
                                        <div className="text-center md:text-left">
                                            <p className="text-gray-800 font-medium">{order.name}</p>
                                            <p className={`text-sm font-semibold ${order.status === 'Pending' ? 'text-yellow-500' : 'text-green-600'}`}>{order.status}</p>
                                            <p className="text-sm text-gray-500">{order.date.toDateString()}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
                <Footer />
            </div>
        </div>
    );
}