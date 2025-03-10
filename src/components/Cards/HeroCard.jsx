import { useEffect, useState } from "react"
import getMethod from "../../utils/GetMethod"

export default function HeroCard() {
    const [totalProduk, setTotalProduk] = useState(null)
    const [totalOrders, setTotalOrders] = useState(null)
   
    useEffect(() => {
        const fetchUtilsGetProduk = async () => {
            try {
                const data = await getMethod('products');

                // optional condition
                setTotalProduk(data.length);
            } catch (error) {
                console.error("Gagal mengambil data:", error.message);
            }
        };
        const fetchUtilsGetOrder = async () => {
            try {
                const data = await getMethod('orders');

                // optional condition
                setTotalOrders(data.length);
            } catch (error) {
                console.error("Gagal mengambil data:", error.message);
            }
        };
        fetchUtilsGetProduk();
        fetchUtilsGetOrder()
    }, []);
    return (
        <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 max-w-4xl gap-4 md:gap-12 pb-4 mx-4">
            <div className="flex flex-col justify-center text-center bg-white text-gray-700 px-12 rounded-2xl py-2 md:py-4 drop-shadow-md">
                <h1 className="text-3xl font-bold text-teal-400">{totalProduk}</h1>
                <h3>Produk dan Layanan</h3>
            </div>
            <div className="flex flex-col justify-center text-center bg-white text-gray-700 px-12 rounded-2xl py-2 md:py-4 drop-shadow-md">
                <h1 className="text-3xl font-bold text-teal-400">{'10,310'}</h1>
                <h3>Pesanan Dikerjakan</h3>
            </div>
            <div className="flex flex-col justify-center text-center bg-white text-gray-700 px-12 rounded-2xl py-2 md:py-4 drop-shadow-md">
                <h1 className="text-3xl font-bold text-teal-400">{'5,276'}</h1>
                <h3>Pengguna Aktif</h3>
            </div>
        </div>
    )
}