import { ShieldCheck, DollarSign, Headset } from "lucide-react";

export default function FeatureSection() {
    return (
        <div className="py-12 bg-gradient-to-t from-white to-teal-100 flex justify-center">
            <div className="container">
                <h2 className="text-3xl font-bold text-center mb-8">Kenapa Harus Memilih <br /> Fenil Pedia?</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:mx-12">
                    {/* Feature 1 */}
                    <div className="flex items-center space-x-6 p-6">
                        <ShieldCheck size={128} className="w-[200px]" />
                        <div>
                            <h3 className="text-lg md:text-xl font-semibold">Layanan Berkualitas</h3>
                            <p className="text-gray-600 text-sm md:text-base">Kami menyediakan layanan sosial media terbaik dengan kualitas tinggi dan hasil optimal.</p>
                        </div>
                    </div>
                    {/* Feature 2 */}
                    <div className="flex items-center space-x-6 p-6">
                        <DollarSign size={128} className="w-[200px]" />
                        <div>
                            <h3 className="text-lg md:text-xl font-semibold">Harga Terjangkau</h3>
                            <p className="text-gray-600 text-sm md:text-base">Dapatkan layanan premium dengan harga yang lebih hemat dibanding kompetitor lain.</p>
                        </div>
                    </div>
                    {/* Feature 3 */}
                    <div className="flex items-center space-x-6 p-6">
                        <Headset size={128} className="w-[200px]" />
                        <div>
                            <h3 className="text-lg md:text-xl font-semibold">Dukungan 24/7</h3>
                            <p className="text-gray-600 text-sm md:text-base">Tim kami siap membantu Anda kapan saja untuk memastikan pengalaman terbaik.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
