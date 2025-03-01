/* eslint-disable react/prop-types */
import { useState } from "react";
import Select from "react-select";
import ProductCard from "../Cards/ProductCard";

const categories = [
    { value: "Semua", label: "Semua" },
    { value: "Instagram", label: "Instagram" },
    { value: "TikTok", label: "TikTok" },
    { value: "YouTube", label: "YouTube" },
    { value: "Facebook", label: "Facebook" },
    { value: "Telegram", label: "Telegram" },
    { value: "X", label: "X" }
];

export default function ProductSection({ services }) {
    const [activeCategory, setActiveCategory] = useState("Semua");
    const filteredServices = activeCategory === "Semua"
        ? services
        : services.filter(service => service.category === activeCategory);

    return (
        <div className="max-w-7xl mx-auto py-12 px-6" id="layanan">
            <h2 className="text-3xl font-bold text-center mb-8">Layanan Kami</h2>

            {/* Dropdown Kategori */}
            <div className="max-w-xs mx-auto mb-8">
                <Select
                    options={categories}
                    defaultValue={categories[0]}
                    onChange={(selectedOption) => setActiveCategory(selectedOption.value)}
                />
            </div>

            {/* Grid Layanan */}
            <ProductCard filteredServices={filteredServices} />
        </div>
    );
}
