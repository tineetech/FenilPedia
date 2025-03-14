/* eslint-disable react/prop-types */
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../utils/firebase";
import Swal from "sweetalert2";

export default function AuthPage({ type }) {
    const navigate = useNavigate();

    if (type === "logout") {
        signOut(auth)
            .then(() => {
                localStorage.removeItem("authToken");
                Swal.fire({
                    title: "Berhasil!",
                    text: "Kamu telah logout!",
                    icon: "success",
                    timer: 2000,
                }).then(() => navigate("/"));
            })
            .catch((error) => console.log(error));
    }

    const [form, setForm] = useState({ email: "", password: "" });

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (type === "register") {
            await createUserWithEmailAndPassword(auth, form.email, form.password)
                .then((userCredential) => {
                    localStorage.setItem("authToken", userCredential.user.accessToken);
                    navigate("/");
                })
                .catch((error) => {
                    Swal.fire({
                        title: "Gagal!",
                        text: error.message,
                        icon: "error",
                        timer: 2000,
                        timerProgressBar: true,
                    });
                });
        } else if (type === "login") {
            signInWithEmailAndPassword(auth, form.email, form.password)
                .then((userCredential) => {
                    localStorage.setItem("authToken", userCredential.user.accessToken);
                    Swal.fire({
                        title: "Berhasil Login!",
                        text: "Kamu berhasil masuk",
                        icon: "success",
                        timer: 2000,
                        timerProgressBar: true,
                    });
                    navigate("/");
                })
                .catch((error) => {
                    Swal.fire({
                        title: "Gagal!",
                        text: error.message,
                        icon: "error",
                        timer: 2000,
                        timerProgressBar: true,
                    });
                });
        }
    };

    return (
        <div className="flex min-h-screen">
            {/* Bagian Kiri - Gradien dan Welcome Text */}
            <div className="hidden lg:flex w-1/2 bg-gradient-to-br from-blue-700 to-indigo-800 text-white flex-col items-center justify-center p-12">
                <h1 className="text-4xl font-bold mb-4">Hello! 👋</h1>
                <p className="text-lg text-center">
                    Nikmati pengalaman pemesanan layanan sosial media terbaik di FinelPedia. Dapatkan info menarik langsung dari website kami !
                </p>
                <p className="absolute bottom-6 text-sm">© 2025 FinelPedia. All rights reserved.</p>
            </div>

            {/* Bagian Kanan - Form Login/Register */}
            <div className="w-full lg:w-1/2 flex flex-col justify-center items-center px-10">
                <div className="w-full max-w-md">
                    <h2 className="text-3xl font-bold text-gray-900 text-center">FinelPedia</h2>
                    {
                        type === 'login' ? (
                            <>
                            <h3 className="text-xl font-semibold text-gray-800 mt-4 text-center">
                                Welcome Back!
                            </h3>
                            <p className="text-gray-600 text-center">
                                Don’t have an account?
                                <Link to="/register" className="text-blue-600 pl-2 hover:underline">
                                    Create a new account now
                                </Link>
                            </p>
                            </>
                        ) : type === 'register' ? (
                            <>
                            <h3 className="text-xl font-semibold text-gray-800 mt-4 text-center">
                                Create Account
                            </h3>
                            <p className="text-gray-600 text-center">
                                Already have an account?
                                <Link to="/login" className="text-blue-600 pl-2 hover:underline">
                                    Login into your account now
                                </Link>
                            </p>
                            </>
                            
                        ) : ''
                    }

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                        <div>
                            <label className="block text-sm font-medium">Email</label>
                            <input
                                type="email"
                                name="email"
                                value={form.email}
                                placeholder="Masukan Email"
                                onChange={handleChange}
                                className="w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium">Password</label>
                            <input
                                type="password"
                                name="password"
                                value={form.password}
                                placeholder="Masukan Password"
                                onChange={handleChange}
                                className="w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                required
                            />
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-black text-white p-3 rounded-md font-semibold hover:bg-gray-800 transition"
                        >
                            {type === 'login' ? 'Login' : type === 'register' ? 'Register' : ''} Now
                        </button>

                        {/* <button
                            type="button"
                            className="w-full border flex items-center justify-center gap-2 text-gray-700 p-3 rounded-md hover:bg-gray-100 transition"
                        >
                            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/512px-Google_%22G%22_Logo.svg.png" 
                                alt="Google Logo" 
                                className="w-5 h-5"
                            />
                            Login with Google
                        </button> */}
                    </form>

                    {/* Link Lupa Password */}
                    <div className="text-center mt-4">
                        Kami menjaga privasi data anda dengan aman.
                    </div>
                </div>
            </div>
        </div>
    );
}
