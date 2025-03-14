import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Header from "./components/Navigations/Header";
import Home from "./pages/Home";
import Order from "./pages/Order";
import AuthPage from "./pages/AuthPage";
import Footer from "./components/Navigations/Footer";
import ListOrders from "./pages/ListOrders";
import Profile from "./pages/Profile";
import { FaTiktok, FaYoutube, FaInstagram, FaFacebook, FaTelegramPlane, FaWhatsapp, FaShoppingBasket, FaSpotify } from "react-icons/fa";
import { FaThreads, FaXTwitter } from "react-icons/fa6";
import CreateProduct from "./pages/CreateProduct";
import NullPage from "./pages/NullPage";
import './App.css'
import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import getMethod from "./utils/GetMethod";
import { auth } from "./utils/firebase";
import { getIdTokenResult } from "firebase/auth";
import ListProduk from "./pages/ListProduk";
import Layanan from "./pages/Layanan";
import GetDummyUser from "./GetDummyUser";
import ListKategori from "./pages/ListKategori";
import CreateType from "./pages/CreateType";
import CreateBrand from "./pages/CreateBrand";


const reviews = [
  { name: "Budi Santoso", review: "Layanannya sangat berkualitas! Saya sangat puas dengan hasilnya.", rating: 5, avatar: "https://avatar.iran.liara.run/public/49" },
  { name: "Renate Amelya", review: "Harga sangat terjangkau dan layanan pelanggan sangat responsif.", rating: 4, avatar: "https://avatar.iran.liara.run/public/70" },
  { name: "Dewi Rahma", review: "Fenil Pedia benar-benar membantu bisnis saya berkembang di media sosial.", rating: 5, avatar: "https://avatar.iran.liara.run/public/80" },
  { name: "Rudi Hartono", review: "Tim supportnya luar biasa, sangat membantu dan fast response!", rating: 4, avatar: "https://avatar.iran.liara.run/public/47" },
];

// const services = [
//   { id: 1, name: "Instagram Likes", category: "Instagram", price: "Mulai Rp 5.000", icon: <FaInstagram size={24} /> },
//   { id: 2, name: "TikTok Followers", category: "TikTok", price: "Mulai Rp 12.000", icon: <FaTiktok size={24} /> },
//   { id: 3, name: "YouTube Subscribers", category: "YouTube", price: "Mulai Rp 25.000", icon: <FaYoutube size={24} /> },
//   { id: 4, name: "Facebook Likes", category: "Facebook", price: "Mulai Rp 8.000", icon: <FaFacebook size={24} /> },
//   { id: 5, name: "Telegram Subscribers", category: "Telegram", price: "Mulai Rp 10.000", icon: <FaTelegramPlane size={24} /> },
//   { id: 6, name: "X Followers", category: "X", price: "Mulai Rp 20.000", icon: <FaXTwitter size={24} /> },
// ];
const platformIcons = {
  Instagram: <FaInstagram size={24} />,
  TikTok: <FaTiktok size={24} />,
  YouTube: <FaYoutube size={24} />,
  Facebook: <FaFacebook size={24} />,
  Telegram: <FaTelegramPlane size={24} />,
  Whatsapp: <FaWhatsapp size={24} />,
  Shoppe: <FaShoppingBasket size={24} />,
  Thread: <FaThreads size={24} />,
  Spotify: <FaSpotify size={24} />,
  X: <FaXTwitter size={24} />,
};


const PrivateRoute = ({element}) => {
  const { dummyUser } = GetDummyUser()
  const cekLogin = localStorage.getItem('authToken')
  // const cekAdmin = sessionStorage.getItem('role')
    if (!cekLogin && !dummyUser.isLoggedIn && !dummyUser.isAdmin) {
      return <Navigate to='/' replace />
    }
    return element;
}

const CekAuth = ({element, context}) => {
  const { dummyUser } = GetDummyUser()
  const cekLogin = localStorage.getItem('authToken')
  // const cekAdmin = sessionStorage.getItem('role')
  if (context === 'order') {
    if (!cekLogin && !dummyUser.isLoggedIn) return <Navigate to='/login' replace />
    return element
  } else if (context === 'profile') {
    if (!cekLogin && !dummyUser.isLoggedIn) return <Navigate to='/' replace />
    return element
  } else if (context === 'login' || context === 'register') {
    if (cekLogin && dummyUser && dummyUser.isLoggedIn) return <Navigate to='/' replace />
    return element
  }
    
  if (!cekLogin && !dummyUser.isLoggedIn) {
      return <Navigate to='/' replace />
    } 
    
    return element;
}

const privateRoute = [
  { route: '/admin', mustLogin: true, role: "admin" },
  { route: '/admin/list-order', mustLogin: true, role: "admin" },
  { route: '/admin/list-product', mustLogin: true, role: "admin" },
  { route: '/admin/create-product', mustLogin: true, role: "admin" },
  { route: '/profile', mustLogin: true, role: "guest" },
  { route: '/order', mustLogin: true, role: "guest" },
  { route: '/login', mustLogin: false, role: "guest" },
  { route: '/register', mustLogin: false, role: "guest" },
  { route: '/logout', mustLogin: false, role: "guest" },
]

export default function App() {
  const [services, setServies] = useState([])
  const { dummyUser } = GetDummyUser()

  useEffect(() => {
      const fetchUtilsGetProduk = async () => {
          try {
              const data = await getMethod('products');

              // optional condition
              if (!data) return 'gagal'
              const mappedServices = Object.values(data).flatMap((item, index) => {
                // Jika item berupa array, ambil indeks yang memiliki data produk
                // console.log(item)
                const produkData = Array.isArray(item) ? item.find(obj => typeof obj === "object") : item;
                if (!produkData) return []; // Jika tidak ada data, return array kosong
                return {
                  id: index + 1,
                  name: produkData.name || "Unknown Product",
                  category: produkData.brandSosmed || "Unknown Category",
                  price: `Mulai Rp ${produkData.price ? produkData.price.toLocaleString() : "0"}`,
                  icon: platformIcons[produkData.brandSosmed] || <FaInstagram size={24} />, // Default icon
                };
              });
              setServies(mappedServices);
          } catch (error) {
              console.error("Gagal mengambil data:", error.message);
          }
      };

      fetchUtilsGetProduk()
  }, [])

  return (
    <Router>
    <Routes>
      {/* Halaman dengan Header & Footer */}
      <Route path="/" element={<><Header dummyUser={dummyUser} /><Home dummyUser={dummyUser} services={services} reviews={reviews} /><Footer /></>} />
      <Route path="/layanan" element={<><Header dummyUser={dummyUser} /><Layanan dummyUser={dummyUser} services={services} reviews={reviews} /><Footer /></>} />

      {/* Halaman Admin (Hanya bisa diakses oleh "admin") */}
      <Route path="/admin" element={<PrivateRoute element={<ListOrders dummyUser={dummyUser} />} />} />
      <Route path="/admin/create-product" element={<PrivateRoute element={<CreateProduct dummyUser={dummyUser} />} />} />
      <Route path="/admin/list-product" element={<PrivateRoute element={<ListProduk dummyUser={dummyUser} />} />} />
      <Route path="/admin/create-type" element={<PrivateRoute element={<CreateType dummyUser={dummyUser} />} />} />
      <Route path="/admin/create-brand" element={<PrivateRoute element={<CreateBrand dummyUser={dummyUser} />} />} />
      <Route path="/admin/list-kategori" element={<PrivateRoute element={<ListKategori dummyUser={dummyUser} />} />} />

      {/* Halaman User (Hanya bisa diakses oleh "guest") */}
      <Route path="/profile" element={<CekAuth context={'profile'} element={<Profile dummyUser={dummyUser} />} />} />
      <Route path="/order" element={<CekAuth context={'order'} element={<><Header dummyUser={dummyUser} /><Order services={services} dummyUser={dummyUser} /><Footer /></>} />} />

      {/* Halaman Login & Register (tanpa Header & Footer) */}
      <Route path="/login" element={<CekAuth element={<AuthPage type="login" />} context={'login'} />} />
      <Route path="/register" element={<CekAuth element={<AuthPage type="register" />} context={'register'} />} />
      <Route path="/logout" element={<AuthPage type="logout" />} />

      {/* Not Found Page */}
      <Route path="*" element={<NullPage />} />
    </Routes>
  </Router>

  );
}
