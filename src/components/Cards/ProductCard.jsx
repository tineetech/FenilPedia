/* eslint-disable react/prop-types */
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

export default function ProductCard({ filteredServices }) {
    const navigate = useNavigate();

    return (
        <div className="w-full flex justify-center">
            <div className="flex flex-wrap gap-6 justify-center">
                {filteredServices.map((service) => (
                    <motion.div
                        key={service.id}
                        className="bg-white shadow-lg rounded-xl p-4 flex flex-col items-center cursor-pointer transition hover:shadow-xl w-64"
                        whileHover={{ scale: 1.05 }}
                        onClick={() => navigate(`/order`)}
                    >
                        <div className="bg-white drop-shadow-lg p-3 rounded-full mb-4 text-teal-400">
                            {service.icon}
                        </div>
                        <h3 className="text-lg font-semibold">{service.name}</h3>
                        <p className="text-teal-400 font-medium">{service.price}</p>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}
