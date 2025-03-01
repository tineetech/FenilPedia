/* eslint-disable react/prop-types */
import HeroSection from "../components/Sections/HeroSection";
import AboutSection from "../components/Sections/AboutSection";
import FeatureSection from "../components/Sections/FeatureSection";
import ReviewSection from "../components/Sections/ReviewSection";
import FAQSection from "../components/Sections/FAQSection";
import ProductSection from "../components/Sections/ProductSection";
import ContactSection from "../components/Sections/ContactSection";

export default function Home({ services, reviews }) {
    return (
        <>
            <HeroSection />
            <AboutSection />
            <FeatureSection />
            <ReviewSection reviews={reviews} />
            <FAQSection />
            <ProductSection services={services} />
            <ContactSection />
        </>
    )
}