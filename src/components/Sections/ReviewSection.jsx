/* eslint-disable react/prop-types */
import { Star, ChevronLeft, ChevronRight } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";


export default function ReviewSection({ reviews }) {
    return (
        <div className="max-w-7xl mx-auto py-12 px-6 relative">
            <h2 className="text-3xl font-bold text-center mb-8">Apa Kata Mereka?</h2>

            <div className="relative">
                {/* Tombol Navigasi */}
                <button className="absolute left-4 top-1/2 -translate-y-1/2 z-10 swiper-button-prev">
                    <ChevronLeft size={24} className="text-gray-700 hover:text-black transition" />
                </button>
                <button className="absolute right-4 top-1/2 -translate-y-1/2 z-10 swiper-button-next">
                    <ChevronRight size={24} className="text-gray-700 hover:text-black transition" />
                </button>

                <Swiper
                    modules={[Navigation, Autoplay]}
                    spaceBetween={20}
                    slidesPerView={1}
                    loop={true}
                    autoplay={{ delay: 3000, disableOnInteraction: false }} // Autoplay 3 detik
                    navigation={{ nextEl: ".swiper-button-next", prevEl: ".swiper-button-prev" }}
                    breakpoints={{
                        768: { slidesPerView: 2 },
                        1024: { slidesPerView: 3 }
                    }}
                    className="pb-8"
                >
                    {reviews.map((review, index) => (
                        <SwiperSlide key={index}>
                            <div className="p-6 bg-white rounded-lg shadow-md flex flex-col items-center text-center">
                                <img src={review.avatar} alt={review.name} className="w-16 h-16 rounded-full mb-4" />
                                <h3 className="text-xl font-semibold">{review.name}</h3>
                                <div className="flex justify-center my-2">
                                    {Array.from({ length: review.rating }).map((_, i) => (
                                        <Star key={i} size={20} className="text-yellow-500" />
                                    ))}
                                </div>
                                <p className="text-gray-600">{review.review}</p>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </div>
    );
}
