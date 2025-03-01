import { useState } from "react";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import Wave from "../Wave";

const faqs = [
    {
        question: "Apa itu Fenil Pedia?",
        answer: "Fenil Pedia adalah platform layanan sosial media terbaik yang menyediakan berbagai solusi digital dengan hasil optimal."
    },
    {
        question: "Bagaimana cara memesan layanan?",
        answer: "Anda dapat memesan layanan dengan mengunjungi website kami, memilih layanan yang diinginkan, dan mengikuti langkah-langkah pemesanan."
    },
    {
        question: "Apakah ada layanan pelanggan?",
        answer: "Tentu! Kami menyediakan layanan pelanggan 24/7 untuk membantu semua kebutuhan dan pertanyaan Anda."
    },
];

export default function FAQSection() {
    const [openIndex, setOpenIndex] = useState(null);

    const toggleFAQ = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <div className="bg-gradient-to-b from-white to-teal-100">
            <div className="max-w-7xl mx-auto py-24 px-6 flex flex-col md:flex-row items-center gap-12">
                {/* Ilustrasi */}
                <div className="w-[85%] md:w-1/2 flex justify-center">
                    <img src="/assets/faq.svg" alt="FAQ Illustration" className="w-3/4 md:w-full" />
                </div>

                {/* FAQ List */}
                <div className="w-full md:w-1/2">
                    <h2 className="text-3xl font-bold mb-6 text-center md:text-left">Pertanyaan yang Sering Diajukan</h2>
                    <div className="space-y-4">
                        {faqs.map((faq, index) => (
                            <div key={index} className="border-b border-gray-300 pb-2">
                                <button
                                    onClick={() => toggleFAQ(index)}
                                    className="w-full flex justify-between items-center text-left py-3 text-lg font-semibold"
                                >
                                    {faq.question}
                                    <motion.span
                                        animate={{ rotate: openIndex === index ? 180 : 0 }}
                                        transition={{ duration: 0.2 }}
                                    >
                                        <ChevronDown size={20} />
                                    </motion.span>
                                </button>

                                <motion.div
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={openIndex === index ? { opacity: 1, height: "auto" } : { opacity: 0, height: 0 }}
                                    transition={{ duration: 0.3, ease: "easeInOut" }}
                                    className="overflow-hidden text-gray-600"
                                >
                                    <p className="py-2">{faq.answer}</p>
                                </motion.div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <Wave position={"absolute left-0 w-full"} />
        </div>
    );
}
