import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Navigations/Header";
import Home from "./pages/Home";
import DetailService from "./pages/DetailServices";
import AuthPage from "./pages/AuthPage"; // 
import Footer from "./components/Navigations/Footer";
import ListOrder from "./pages/ListOrder";
import { Users, Eye, ThumbsUp } from "lucide-react";

const reviews = [
  { name: "Budi Santoso", review: "Layanannya sangat berkualitas! Saya sangat puas dengan hasilnya.", rating: 5, avatar: "https://avatar.iran.liara.run/public/49" },
  { name: "Renate Amelya", review: "Harga sangat terjangkau dan layanan pelanggan sangat responsif.", rating: 4, avatar: "https://avatar.iran.liara.run/public/70" },
  { name: "Dewi Rahma", review: "Fenil Pedia benar-benar membantu bisnis saya berkembang di media sosial.", rating: 5, avatar: "https://avatar.iran.liara.run/public/80" },
  { name: "Rudi Hartono", review: "Tim supportnya luar biasa, sangat membantu dan fast response!", rating: 4, avatar: "https://avatar.iran.liara.run/public/47" },
];

const services = [
  { id: 1, name: "Instagram Followers", category: "Instagram", price: "Mulai Rp 10.000", icon: <Users size={24} /> },
  { id: 2, name: "Instagram Likes", category: "Instagram", price: "Mulai Rp 5.000", icon: <ThumbsUp size={24} /> },
  { id: 3, name: "TikTok Followers", category: "TikTok", price: "Mulai Rp 12.000", icon: <Users size={24} /> },
  { id: 4, name: "TikTok Views", category: "TikTok", price: "Mulai Rp 7.000", icon: <Eye size={24} /> },
  { id: 5, name: "YouTube Views", category: "YouTube", price: "Mulai Rp 15.000", icon: <Eye size={24} /> },
  { id: 6, name: "YouTube Subscribers", category: "YouTube", price: "Mulai Rp 25.000", icon: <Users size={24} /> },
  { id: 7, name: "Facebook Likes", category: "Facebook", price: "Mulai Rp 8.000", icon: <ThumbsUp size={24} /> },
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
              <Header />
              <Home services={services} reviews={reviews} />
              <Footer />
            </>
          }
        />
        <Route
          path="/service/:id"
          element={
            <>
              <Header />
              <DetailService services={services} />
              <Footer />
            </>
          }
        />
        <Route
          path="/admin"
          element={
            <>
              <Header />
              <ListOrder />
              <Footer />
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
