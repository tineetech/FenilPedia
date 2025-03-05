import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Navigations/Header";
import Home from "./pages/Home";
import Order from "./pages/Order";
import AuthPage from "./pages/AuthPage"; // 
import Footer from "./components/Navigations/Footer";
import ListOrders from "./pages/ListOrders";
import Profile from "./pages/Profile";
import { FaTiktok, FaYoutube, FaInstagram, FaFacebook, FaTelegramPlane } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
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
  X: <FaXTwitter size={24} />,
};



export default function App() {
  const [services, setServies] = useState([])
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [dummyUser, setDummyUser] = useState({
    name: "John Doe",
    profilePicture: "https://avatar.iran.liara.run/public/50",
    isAdmin: false, 
    isLoggedIn: true,
  })

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        // Ambil token dan cek apakah user memiliki role admin
        const token = await getIdTokenResult(currentUser);
        const isAdmin = token.claims.admin || false;
  
        setUser(currentUser);
        console.log(currentUser)
        setDummyUser({
          name: currentUser.email || "User",
          profilePicture: currentUser.photoURL || "https://avatar.iran.liara.run/public/50",
          isAdmin: isAdmin, // Set status admin
          isLoggedIn: true,
        });
      } else {
        setUser(null);
        setDummyUser({
          name: "Guest",
          profilePicture: "https://avatar.iran.liara.run/public/50",
          isAdmin: false,
          isLoggedIn: false,
        });
      }
      setLoading(false);
    });
  
    return () => unsubscribe();
  }, []);

  useEffect(() => {
      const fetchUtilsGetProduk = async () => {
          try {
              const data = await getMethod('products');

              // optional condition
              if (!data) return 'gagal'
              const mappedServices = Object.values(data).flatMap((item, index) => {
                // Jika item berupa array, ambil indeks yang memiliki data produk
                const produkData = Array.isArray(item) ? item.find(obj => typeof obj === "object") : item;
          
                if (!produkData) return []; // Jika tidak ada data, return array kosong
                
                return {
                  id: index + 1,
                  name: produkData.name || "Unknown Product",
                  category: produkData.category || "Unknown Category",
                  price: `Mulai Rp ${produkData.price ? produkData.price.toLocaleString() : "0"}`,
                  icon: platformIcons[produkData.category] || <FaInstagram size={24} />, // Default icon
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
        <Route
          path="/"
          element={
            <>
              <Header dummyUser={dummyUser} />
              <Home dummyUser={dummyUser} services={services} reviews={reviews} />
              <Footer />
            </>
          }
        />
        <Route
          path="/layanan"
          element={
            <>
              <Header dummyUser={dummyUser} />
              <Layanan dummyUser={dummyUser} services={services} reviews={reviews} />
              <Footer />
            </>
          }
        />
        <Route
          path="/order"
          element={
            <>
              <Header dummyUser={dummyUser} />
              <Order services={services} dummyUser={dummyUser} />
              <Footer />
            </>
          }
        />
        <Route
          path="/admin"
          element={
            <>
              <ListOrders dummyUser={dummyUser} />
            </>
          }
        />
        <Route
          path="/admin/create-product"
          element={
            <>
              <CreateProduct dummyUser={dummyUser} />
            </>
          }
        />
        <Route
          path="/admin/list-product"
          element={
            <>
              <ListProduk dummyUser={dummyUser} />
            </>
          }
        />
        <Route
          path="/profile"
          element={
            <>
              <Profile dummyUser={dummyUser} />
            </>
          }
        />

        {/* Halaman Login & Register (tanpa Header & Footer) */}
        <Route path="/login" element={<AuthPage type="login" />} />
        <Route path="/register" element={<AuthPage type="register" />} /> 
        <Route path="/logout" element={<AuthPage type="logout" />} />

        <Route path="*" element={
          <NullPage />
        } />
      </Routes>
    </Router>
  );
}
