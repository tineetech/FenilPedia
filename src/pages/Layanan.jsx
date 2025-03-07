/* eslint-disable react/prop-types */
import HeroSection from "../components/Sections/HeroSection";
import AboutSection from "../components/Sections/AboutSection";
import FeatureSection from "../components/Sections/FeatureSection";
import ReviewSection from "../components/Sections/ReviewSection";
import FAQSection from "../components/Sections/FAQSection";
import ProductSection from "../components/Sections/ProductSection";
import ContactSection from "../components/Sections/ContactSection";
import Wave from "../components/Wave";
import Chatbot from "../components/Chatbot";

export default function Layanan({ services, dummyUser, reviews }) {
    return (
        <>
            <Chatbot />
            <div className="relative bg-teal-500 text-white py-16">
                {/* <h1 className="text-center text-2xl md:text-4xl font-semibold">Layanan Kami</h1> */}
                <div className="relative mt-6 flex justify-center">
                    <Wave position="absolute -bottom-22 left-0 w-full" />
                </div>
            </div>
            <ProductSection services={services} />
        </>
    )
}