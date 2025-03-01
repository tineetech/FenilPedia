export default function ContactSection() {
    const handleSubmit = (e) => {
        e.preventDefault();
        const email = e.target.email.value;
        const message = e.target.message.value;

        if (!email || !message) {
            alert("Harap isi semua field!");
            return;
        }

        const whatsappNumber = "6281234567890"; // Ganti dengan nomor WhatsApp tujuan
        const whatsappURL = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
            `Halo, saya ingin bertanya!\n\nEmail: ${email}\nPesan: ${message}`
        )}`;

        window.open(whatsappURL, "_blank");
    };

    return (
        <div className="max-w-7xl mx-auto px-6 py-12 md:py-20 flex flex-col md:flex-row-reverse items-center gap-10" id="kontak">
            {/* Ilustrasi (Muncul dulu di mobile) */}
            <div className="w-full md:w-1/2 flex justify-end">
                <img
                    src="/assets/contact.svg" // Ganti dengan ilustrasi yang sesuai
                    alt="Contact Illustration"
                    className="max-w-[16rem] md:max-w-md"
                />
            </div>

            {/* Form Kontak */}
            <div className="w-full md:w-1/2">
                <h2 className="text-2xl font-semibold text-gray-800 mb-6">Hubungi Kami</h2>
                <form onSubmit={handleSubmit} className="space-y-5">
                    {/* Input Email */}
                    <div>
                        <label className="text-sm font-medium text-gray-600">Email</label>
                        <input
                            type="email"
                            name="email"
                            className="w-full mt-1 px-4 py-3 border rounded-lg focus:ring-2 focus:ring-teal-400 focus:outline-none"
                            placeholder="Masukkan email Anda"
                            required
                        />
                    </div>

                    {/* Input Pesan */}
                    <div>
                        <label className="text-sm font-medium text-gray-600">Pesan</label>
                        <textarea
                            name="message"
                            rows="4"
                            className="w-full mt-1 px-4 py-3 border rounded-lg focus:ring-2 focus:ring-teal-400 focus:outline-none"
                            placeholder="Tulis pesan Anda..."
                            required
                        ></textarea>
                    </div>

                    {/* Tombol Kirim */}
                    <button
                        type="submit"
                        className="w-full py-3 bg-teal-500 text-white font-semibold rounded-lg hover:bg-teal-600 transition duration-300"
                    >
                        Kirim via WhatsApp
                    </button>
                </form>
            </div>
        </div>
    );
}
