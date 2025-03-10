/* eslint-disable react/prop-types */
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

export default function ProductCard({ filteredServices }) {
    const navigate = useNavigate();
    console.log(filteredServices)
    return (
        <div className="w-full flex justify-center">
            <div className="flex flex-wrap gap-6 justify-center">
                {filteredServices.map((service) => (
                    <motion.div
                        key={service.id}
                        className={` border text-white hover:!bg-teal-600 hover:!text-white border-gray-200 rounded-xl p-4 flex flex-col items-center cursor-pointer transition w-64 ${service.category === "TikTok" ? 'bg-tiktok' : service.category === 'Instagram' ? 'bg-instagram' : service.category === 'Youtube' ? 'bg-youtube' : service.category === 'Whatsapp' ? 'bg-whatsapp' : ''} `}
                        whileHover={{ scale: 1.05 }}
                        onClick={() => navigate(`/order`)}
                    >
                        <div className="bg-white drop-shadow-lg p-3 rounded-full mb-8 text-teal-400">
                            {service.icon}
                        </div>
                        <h3 className="text-lg font-semibold">{service.name}</h3>
                        <p className="font-medium">{service.price}</p>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}
