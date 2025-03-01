/* eslint-disable react/prop-types */
import Wave from "../components/Wave";
import Sidebar from "../components/Navigations/Sidebar";
import Footer from "../components/Navigations/Footer";

export default function CreateProduct({ dummyUser }) {
    return (
        <div className="flex flex-col md:flex-row min-h-screen">
            <Sidebar dummyUser={dummyUser} />

            {/* Content */}
            <div className="flex-1 p-4 md:pl-64 md:p-0">
                <div className="relative bg-teal-500 text-white py-16">
                    <h1 className="text-center text-2xl md:text-4xl font-semibold">Admin Panel</h1>
                    <div className="relative mt-6 flex justify-center">
                        <Wave position="absolute -bottom-22 left-0 w-full" />
                    </div>
                </div>

                {/* Main */}
                <div className="max-w-5xl mx-auto p-6 bg-white shadow-md rounded-lg">
                    <h1 className="text-2xl md:text-4xl text-center my-4 font-semibold">Buat Produk Baru</h1>
                    {/* Form */}
                </div>
                <Footer />
            </div>
        </div>
    );
}
