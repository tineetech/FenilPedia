/* eslint-disable react/prop-types */
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../utils/firebase";
import Swal from 'sweetalert2'

export default function AuthPage({ type }) {
    const navigate = useNavigate();

    if (type === 'logout') {
        signOut(auth).then(() => {
        // Sign-out successful.
            localStorage.removeItem('authToken')
            Swal.fire({
                title: "Berhasil!",
                text: "Kamu telah logout!",
                icon: "success",
                timer: 2000
            }).then((res) => {
                if (res) {
                    console.log("Signed out successfully")
                    navigate("/");
                }
            })
        }).catch((error) => {
            console.log(error)
        // An error happened.
        });
    }

    const [form, setForm] = useState({ email: "", password: "", });

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (type === "register") {
            await createUserWithEmailAndPassword(auth, form.email, form.password)
            .then((userCredential) => {
                // Signed in
                const user = userCredential.user;
                console.log(user.accessToken);
                localStorage.setItem('authToken', user.accessToken)
                navigate("/")
                return
                // ...
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorCode, errorMessage);
                // ..
            });
        } else if (type === 'login') {
            signInWithEmailAndPassword(auth, form.email, form.password)
            .then((userCredential) => {
                // Signed in
                const user = userCredential.user;
                console.log(user.accessToken);
                localStorage.setItem('authToken', user.accessToken)
                navigate("/")
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorCode, errorMessage)
            });
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md">
                <h2 className="text-2xl font-semibold text-center mb-6">
                    {type === "register" ? "Buat Akun" : "Masuk ke Akun"}
                </h2>

                <form onSubmit={handleSubmit} className="space-y-4">
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
