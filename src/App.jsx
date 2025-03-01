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

const dummyUser = {
  name: "John Doe",
  profilePicture: "https://avatar.iran.liara.run/public/50",
  isAdmin: true,
  isLoggedIn: true,
};

const reviews = [
  { name: "Budi Santoso", review: "Layanannya sangat berkualitas! Saya sangat puas dengan hasilnya.", rating: 5, avatar: "https://avatar.iran.liara.run/public/49" },
  { name: "Renate Amelya", review: "Harga sangat terjangkau dan layanan pelanggan sangat responsif.", rating: 4, avatar: "https://avatar.iran.liara.run/public/70" },
  { name: "Dewi Rahma", review: "Fenil Pedia benar-benar membantu bisnis saya berkembang di media sosial.", rating: 5, avatar: "https://avatar.iran.liara.run/public/80" },
  { name: "Rudi Hartono", review: "Tim supportnya luar biasa, sangat membantu dan fast response!", rating: 4, avatar: "https://avatar.iran.liara.run/public/47" },
];

const services = [
  { id: 1, name: "Instagram Likes", category: "Instagram", price: "Mulai Rp 5.000", icon: <FaInstagram size={24} /> },
  { id: 2, name: "TikTok Followers", category: "TikTok", price: "Mulai Rp 12.000", icon: <FaTiktok size={24} /> },
  { id: 3, name: "YouTube Subscribers", category: "YouTube", price: "Mulai Rp 25.000", icon: <FaYoutube size={24} /> },
  { id: 4, name: "Facebook Likes", category: "Facebook", price: "Mulai Rp 8.000", icon: <FaFacebook size={24} /> },
  { id: 5, name: "Telegram Subscribers", category: "Telegram", price: "Mulai Rp 10.000", icon: <FaTelegramPlane size={24} /> },
  { id: 6, name: "X Followers", category: "X", price: "Mulai Rp 20.000", icon: <FaXTwitter size={24} /> },
];


export default function App() {
  return (
    <Router>
      <Routes>
        {/* Halaman dengan Header & Footer */}
        <Route
          path="/"
          element={
            <>
              <Header dummyUser={dummyUser} />
              <Home services={services} reviews={reviews} />
              <Footer />
            </>
          }
        />
        <Route
          path="/order"
          element={
            <>
              <Header dummyUser={dummyUser} />
              <Order services={services} />
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
      </Routes>
    </Router>
  );
}
