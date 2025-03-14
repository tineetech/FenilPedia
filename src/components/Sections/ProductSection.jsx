/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import Select from "react-select";
import ProductCard from "../Cards/ProductCard";
import Loading from "../Loading";
import getMethod from "../../utils/GetMethod";

export default function ProductSection({ services }) {
    const [categories, setCategories] = useState([])
    const [activeCategory, setActiveCategory] = useState("Semua");
    const filteredServices = activeCategory === "Semua"
        ? services
        : services.filter(service => service.category === activeCategory);

    useEffect(() => {
        const fetchUtilsGetBrand = async () => {
            try {
                const data = await getMethod('brand');

                // optional condition
                setCategories(
                    data.map(item => ({
                        value: item.name,
                        label: item.name
                    }))
                );                
            } catch (error) {
                console.error("Gagal mengambil data:", error.message);
            }
        };
        
        fetchUtilsGetBrand()
    }, [])
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
            {
                services.length > 0 ? (
                    <ProductCard filteredServices={filteredServices} />
                ) : (
                    <div className="w-full flex items-center justify-center">
                        <Loading />
                    </div>
                )
            }
        </div>
    );
}
