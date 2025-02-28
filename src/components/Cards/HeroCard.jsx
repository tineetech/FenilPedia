export default function HeroCard() {
    return (
        <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 max-w-4xl gap-4 md:gap-12 pb-4 mx-4">
            <div className="flex flex-col justify-center text-center bg-white text-gray-700 px-12 rounded-2xl py-2 md:py-4 drop-shadow-md">
                <h1 className="text-3xl font-bold text-teal-400">39.045</h1>
                <h3>Pengguna aktif</h3>
            </div>
            <div className="flex flex-col justify-center text-center bg-white text-gray-700 px-12 rounded-2xl py-2 md:py-4 drop-shadow-md">
                <h1 className="text-3xl font-bold text-teal-400">12.567</h1>
                <h3>Order selesai</h3>
            </div>
            <div className="flex flex-col justify-center text-center bg-white text-gray-700 px-12 rounded-2xl py-2 md:py-4 drop-shadow-md">
                <h1 className="text-3xl font-bold text-teal-400">99%</h1>
                <h3>Kepuasan pelanggan</h3>
            </div>
        </div>
    )
}