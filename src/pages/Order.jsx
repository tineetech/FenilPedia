/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import Select from "react-select";
import Wave from "../components/Wave";
import Header from "../components/Navigations/Header";
import Footer from "../components/Navigations/Footer";
import { useLocation, useNavigate } from "react-router-dom";
import getMethod from "../utils/GetMethod";
import { push, ref } from "firebase/database";
import { db } from "../utils/firebase";
import Swal from "sweetalert2";
import Chatbot from "../components/Chatbot";

const metodePay = [
    { label: "Gopay Virtual account ( Biaya admin 0,9% ) - 0878-7480-2713", value: "GOPAY", image: 'https://logowik.com/content/uploads/images/gopay7196.jpg' },
    { label: "Dana Virtual account ( Biaya admin 0,8% ) - 0878-7480-2713", value: "DANA", image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/72/Logo_dana_blue.svg/2560px-Logo_dana_blue.svg.png' },
    { label: "QRIS ALL PAYMENT ( VIA WHATSAPP BIAYA ADMIN 0,9% ) - CHAT DI WA", value: "QRIS", image: 'https://images.seeklogo.com/logo-png/39/1/quick-response-code-indonesia-standard-qris-logo-png_seeklogo-391791.png' },
    { label: "Ovo Virtual account ( Soon released )", value: "OVO", image: 'https://i.pinimg.com/736x/28/fd/ed/28fdedc2022b5de9ae5a7f2507eb5f2d.jpg' },
];


// Komponen untuk menampilkan gambar dalam daftar opsi
const CustomOption = (props) => {
    const { data, innerRef, innerProps } = props;
    return (
        <div ref={innerRef} {...innerProps} className="flex items-center gap-2 p-2 cursor-pointer hover:bg-gray-100">
            <img src={data.image} alt={data.label} className="w-6 h-6 object-contain" />
            <span>{data.label}</span>
        </div>
    );
};

// Komponen untuk menampilkan gambar pada opsi yang terpilih
const CustomSingleValue = (props) => {
    const { data } = props;
    return (
        <div className="flex items-center gap-2">
            <img src={data.image} alt={data.label} className="w-6 h-6" />
            <span>{data.label}</span>
        </div>
    );
};

export default function Order({ dummyUser }) {
    const [data, setData] = useState([])
    const [namesLayanan, setNamesLayanan] = useState([])
    const [serviceOptions, setServiceOptions] = useState([
    ])
    const [selecteLayanan, setSelectedLayanan] = useState(null);
    const [selectedService, setSelectedService] = useState(null);
    const [selectedPayment, setSelectedPayment] = useState(null);
    const [username, setUsername] = useState("");
    const [nomor, setNomor] = useState("");
    const [quantity, setQuantity] = useState("");
    const [priceInit, setPriceinit] = useState(null);
    const [priceTotal, setPriceTotal] = useState(null);
    
    const location = useLocation();
    const navigate = useNavigate();
    
    useEffect(() => {
        const fetchUtilsGetProduk = async () => {
            try {
                const data = await getMethod('products');

                // optional condition
                if (!data) return 'gagal'

                setNamesLayanan([...data].map(sosmed => ({ label: sosmed.name + ' - ' + sosmed.brandSosmed + ' - ' + parseFloat(sosmed.price), value: sosmed.name })));
                setServiceOptions(
                    [...new Set(data.map(service => service.brandSosmed))].map(uniqueBrand => ({
                        label: uniqueBrand,
                        value: uniqueBrand
                    }))
                );                
                setData(data)
            } catch (error) {
                console.error("Gagal mengambil data:", error.message);
            }
        };

        fetchUtilsGetProduk()
    }, [])
    
    useEffect(() => {
        if (selectedService) {
            let find = data.filter(item => item.brandSosmed === selectedService.value);
    
            if (find.length > 0) {
                setNamesLayanan(find.map(sosmed => ({
                    label: sosmed.name + ' - ' + sosmed.brandSosmed + ' - Rp' + parseFloat(sosmed.price) + ',00',
                    value: sosmed.name
                })));
                // if (selecteLayanan !== null) { 
                //     setSelectedLayanan(null);
                // }
            }
        }
    }, [selectedService]);

    // useEffect(() => {
    //     if (selectedService !== null && selecteLayanan !== null) {
    //             setSelectedLayanan(null);
    //         console.log('tes')
    //     }
    // }, [selectedService])
    
    useEffect(() => {
        if (selecteLayanan) {
            let find = data.find((item) => item.name === selecteLayanan.value);
    
            if (find) {
                setSelectedService({
                    label: find.brandSosmed, // Label yang akan ditampilkan di Select
                    value: find.brandSosmed   // Value yang akan digunakan sebagai nilai
                });
                setPriceinit(parseInt(find.price))
            }
    
        }
    }, [selecteLayanan, data]);    

    useEffect(() => {
        const calculate = quantity * priceInit
        setPriceTotal(calculate)
    }, [quantity])

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const sosmed = params.get("sosmed");
        const service = params.get("service");
        const target = params.get("target");
        const qty = params.get("qty");

        if (sosmed) {
            const selectedSosmed = namesLayanan.find((option) => option.value.toLowerCase() === sosmed.toLowerCase());
            setSelectedLayanan(selectedSosmed || null);
        }

        if (service) {
            const selectedService = serviceOptions.find((option) => option.value.toLowerCase() === service.toLowerCase());
            setSelectedService(selectedService || null);
        }

        if (target) setUsername(target);
        if (qty) setQuantity(qty);
    }, [location.search]);
    
    const generateOrderId = () => {
        return `ORD-${Date.now()}-${Math.random().toString(36).substr(2, 6).toUpperCase()}`;
    };
    // Contoh hasil ID: ORD-1709731256789-ABC123
    
    
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (dummyUser?.isLoggedIn === false) {
            navigate("/login");
            // console.log('woi : ', dummyUser)
        }

        if (!selecteLayanan || !selectedService || !username || !nomor || !quantity || !selectedPayment) {
            alert("Harap lengkapi semua data!");
            return;
        }
        const orderId = generateOrderId()
        const message = `
            *Halo min! saya ingin konfirmasi pembayaran untuk order id ${orderId}*
            📌 *Jenis Sosmed:* ${selecteLayanan.label}
            📌 *Jenis Layanan:* ${selectedService.label}
            👤 *Target:* ${username}
            ✉️ *Nomor Wa:* ${nomor}
            
            Mohon segera diproses! ✅
            (sertakan bukti transfer dalam bentuk foto)
        `.trim();

        const newOrder = {
            orderId: orderId,
            orderName: dummyUser?.name,
            layanan: selecteLayanan.value,
            sosmed: selectedService.value,
            payemnt: selectedPayment.value,
            target: username,
            kontakPembeli: nomor,
            status: 'PENDING',
            quantity,
            createdAt: new Date().toISOString() || null,
            priceInit,
            priceTotal,
        };

        try {
            const orderRef = ref(db, "orders"); // Referensi ke tabel "orders"
            await push(orderRef, newOrder); // Simpan order ke Firebase
            
            const phoneNumber = "6283819912771"; // Ganti dengan nomor WhatsApp tujuan
            const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
            
            Swal.fire({
                title: "Berhasil!",
                text: "Kamu berhasil membuat pesanan. jangan lupa untuk konfirmasi pembayaran ke whatsapp admin.",
                icon: "success",
            }).then((res) => {
                if (res.isConfirmed) {
                    window.location.href = '/profile';
                    // localStorage.setItem('createOrder')
                }
            })

        } catch (error) {
            console.error("Gagal menyimpan order:", error);
            alert("Gagal menyimpan order, coba lagi!");
        }
    };

    return (
        <div className="flex flex-col md:flex-row min-h-screen">
            <Chatbot />
            <Header dummyUser={dummyUser} />
            <div className="flex-1">
                <div className="relative bg-teal-500 text-white py-16">
                    <h1 className="text-center text-2xl md:text-5xl font-semibold">Pesan Layanan</h1>
                    <div className="relative mt-6 flex justify-center">
                        <Wave position="absolute -bottom-22 left-0 w-full" />
                    </div>
                </div>

                <div className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-6 mb-12">
                    <h1 className="text-xl md:text-3xl text-center my-4 font-semibold">Detail Pesanan</h1>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block text-gray-700 font-medium mb-2">Jenis Sosial Media</label>
                            <Select
                                options={serviceOptions}
                                value={selectedService}
                                onChange={setSelectedService}
                                placeholder="Pilih Jenis Sosmed"
                                className="text-gray-700"
                            />
                        </div>

                        <div>
                            <label className="block text-gray-700 font-medium mb-2">Nama Layanan</label>
                            <Select
                                options={namesLayanan}
                                value={selecteLayanan}
                                onChange={setSelectedLayanan}
                                placeholder="Pilih Layanan"
                                isClearable
                                className="text-gray-700 mb-2"
                            />
                            {
                                selecteLayanan ? (
                                    <span className="text-gray-400">Estimasi 2-3 Jam.</span>
                                ) : ''
                            }
                        </div>

                        <div>
                            <label className="block text-gray-700 font-medium mb-2">Target Username {selecteLayanan ? selectedService?.value : ''}</label>
                            <input
                                type="text"
                                className={`w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 ${selecteLayanan ? '' : '!bg-gray-100'}`}
                                placeholder="@daniatest123"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-gray-700 font-medium mb-2">Nomor Whatsapp Pembeli</label>
                            <div className="flex items-center border border-gray-300 rounded-lg">
                                <span className="px-3 py-3 bg-gray-200 text-gray-700 rounded-l-lg">+62</span>
                                <input
                                    type="number"
                                    className={`w-full p-3 focus:ring-2 focus:ring-teal-500 focus:border-teal-500 ${selecteLayanan ? '' : '!bg-gray-100'}`}
                                    placeholder="8273123... Nomor whatsapp mu untuk informasi terkait pesanan"
                                    value={nomor}
                                    onChange={(e) => setNomor(e.target.value)}
                                    required
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-gray-700 font-medium mb-2">Jumlah Pembelian</label>
                            <input
                                type="number"
                                className={`w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 ${selecteLayanan ? '' : '!bg-gray-100'}`}
                                placeholder="Masukkan jumlah pembelian"
                                value={quantity}
                                min={1}
                                max={1000}
                                readOnly={selecteLayanan ? false : true}
                                onChange={(e) => setQuantity(e.target.value)}
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-gray-700 font-medium mb-2">Harga Layanan</label>
                            <div className="flex items-center border border-gray-300 rounded-lg bg-gray-100">
                                <span className="px-3 py-3 bg-gray-200 text-gray-700 rounded-l-lg">Rp</span>
                                <input
                                    type="number"
                                    className="w-full py-3 pl-3 bg-gray-100 focus:outline-none"
                                    placeholder="Pilih Layanan Dahulu"
                                    value={priceInit || ""}
                                    readOnly
                                />
                                <span className="px-3 py-3 bg-gray-200 text-gray-700 rounded-r-lg">,00</span>
                            </div>
                        </div>

                        <div>
                            <label className="block text-gray-700 font-medium mb-2">Total Harga</label>
                            <div className="flex items-center border border-gray-300 rounded-lg bg-gray-100">
                                <span className="p-3 bg-gray-200 text-gray-700 rounded-l-lg">Rp</span>
                                <input
                                    type="number"
                                    className="w-full p-3 bg-gray-100 focus:outline-none"
                                    placeholder={selecteLayanan  ? "Masukan QTY" : "Pilih Layanan Dahulu dan Masukkan QTY"}
                                    value={priceTotal || ""}
                                    readOnly
                                />
                                <span className="p-3 bg-gray-200 text-gray-700 rounded-r-lg">,00</span>
                            </div>
                        </div>

                        <div>
                            <label className="block text-gray-700 font-medium mb-2">Metode Pembayaran</label>
                            <Select
                                options={metodePay}
                                value={selectedPayment}
                                onChange={setSelectedPayment}
                                placeholder="Pilih Layanan Dahulu"
                                isDisabled={!selecteLayanan}
                                className={`text-gray-700 mb-2 ${selecteLayanan ? '' : '!bg-gray-100'}`}
                                components={{ Option: CustomOption, SingleValue: CustomSingleValue }} // Menggunakan custom components
                            />
                            <span className="text-red-600">Semua motede pembayaran wajib konfirmasi setelah membayar ke nomor wa <a className="underline" href="https://wa.me/6283819912771">admin.</a></span>
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-teal-500 text-white py-3 rounded-lg font-semibold hover:bg-teal-700 transition-all"
                        >
                            Pesan Sekarang
                        </button>
                    </form>
                </div>  
            </div>
        </div>
    );
}
