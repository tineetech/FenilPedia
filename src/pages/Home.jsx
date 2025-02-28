/* eslint-disable react/prop-types */
import HeroSection from "../components/Sections/HeroSection";
import ContactSection from "../components/Sections/ContactSection";
import FeatureSection from "../components/Sections/FeatureSection";
import ReviewSection from "../components/Sections/ReviewSection";
import FAQSection from "../components/Sections/FAQSection";
import ProductSection from "../components/Sections/ProductSection";

export default function Home({ services, reviews }) {
    return (
        <>
            <HeroSection />
            <ContactSection />
            <FeatureSection />
            <ReviewSection reviews={reviews} id="layanan" />
            <FAQSection />
            <ProductSection services={services} />
        </>
    )
}