/* eslint-disable react/prop-types */
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

export default function ProductCard({ filteredServices }) {
    const navigate = useNavigate();
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredServices.map((service) => (
                <motion.div
                    key={service.id}
                    className="bg-white shadow-lg rounded-xl p-4 flex flex-col items-center cursor-pointer transition hover:shadow-xl"
                    whileHover={{ scale: 1.05 }}
                    onClick={() => navigate(`/service/${service.id}`)}
                >
                    <div className="bg-gray-200 p-3 rounded-full mb-4 text-teal-400">
                        {service.icon}
                    </div>
                    <h3 className="text-lg font-semibold">{service.name}</h3>
                    <p className="text-teal-400 font-medium">{service.price}</p>
                </motion.div>
            ))}
        </div>
    )
}