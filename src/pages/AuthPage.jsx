/* eslint-disable react/prop-types */
import { useState } from "react";
import { Link } from "react-router-dom";

export default function AuthPage({ type }) {
    const [form, setForm] = useState({ email: "", password: "", name: "" });

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Form Submitted:", form);
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md">
                <h2 className="text-2xl font-semibold text-center mb-6">
                    {type === "register" ? "Buat Akun" : "Masuk ke Akun"}
                </h2>

                <form onSubmit={handleSubmit} className="space-y-4">
                    {type === "register" && (
                        <div>
                            <label className="block text-sm font-medium">Nama</label>
                            <input
                                type="text"
                                name="name"
                                value={form.name}
                                onChange={handleChange}
                                className="w-full mt-1 p-2 border rounded-md"
                                required
                            />
                        </div>
                    )}
                    <div>
                        <label className="block text-sm font-medium">Email</label>
                        <input
                            type="email"
                            name="email"
                            value={form.email}
                            onChange={handleChange}
                            className="w-full mt-1 p-2 border rounded-md"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium">Password</label>
                        <input
                            type="password"
                            name="password"
                            value={form.password}
                            onChange={handleChange}
                            className="w-full mt-1 p-2 border rounded-md"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white p-2 rounded-md hover:bg-blue-700 transition"
                    >
                        {type === "register" ? "Daftar" : "Masuk"}
                    </button>
                </form>

                <p className="text-center text-sm mt-4">
                    {type === "register" ? (
                        <>
                            Sudah punya akun?{" "}
                            <Link to="/login" className="text-blue-600 hover:underline">
                                Masuk di sini
                            </Link>
                        </>
                    ) : (
                        <>
                            Belum punya akun?{" "}
                            <Link to="/register" className="text-blue-600 hover:underline">
                                Daftar sekarang
                            </Link>
                        </>
                    )}
                </p>
            </div>
        </div>
    );
}
