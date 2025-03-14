/* eslint-disable react/prop-types */
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import getMethod from "../../utils/GetMethod";
import { useEffect, useState } from "react";

export default function ProductCard({ filteredServices }) {
    const navigate = useNavigate();

    const [brandImages, setBrandImages] = useState({}); 

    useEffect(() => {
        const fetchBrandImages = async () => {
            try {
                const data = await getMethod('brand');

                // Buat objek brand-gambar untuk akses cepat
                const brandMap = {};
                data.map((item) => {
                    // console.log('woi',item)
                    brandMap[item?.name?.toLowerCase() ?? ''] = item.image;
                });
                console.log(brandMap)
                setBrandImages(brandMap);
            } catch (error) {
                console.error("Error fetching brand images:", error);
            }
        };

        fetchBrandImages();

    }, []); // Hanya dipanggil sekali saat komponen dimuat
    
    useEffect(() => {

        console.log(filteredServices)
    }, [brandImages])
    return (
        <div className="w-full flex justify-center">
            <div className="flex flex-wrap gap-6 justify-center">
                {filteredServices && filteredServices.map((service) => (
                    <motion.div
                        key={service.id}
                        className={` border text-white hover:!bg-teal-600 text-center hover:!text-white border-gray-200 rounded-xl p-4 flex flex-col items-center cursor-pointer transition w-64 `}
                        whileHover={{ scale: 1.05 }}
                        // style={{ background: `url(${brandImages !== undefined ? brandImages[service?.category?.toLowerCase() ?? ''] : ''}) center center`, backgroundSize: 'contain',}}
                        style={{
                            background: `linear-gradient(180deg, rgba(0,0,0,0), rgba(0,0,0,1)), 
                                         url(${brandImages !== undefined ? brandImages[service?.category?.toLowerCase() ?? ''] : ''}) 
                                         center center / cover no-repeat`, // Gabungkan background size di sini
                        }}
                        onClick={() => navigate(`/order?`)}
                    >
                        <div className="bg-white drop-shadow-lg p-3 rounded-full mb-8 text-teal-400">
                            {service.icon}
                        </div>
                        <h3 className="text-lg font-semibold">{service.name}</h3>
                        <p className="font-medium">{service.price},00</p>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}
