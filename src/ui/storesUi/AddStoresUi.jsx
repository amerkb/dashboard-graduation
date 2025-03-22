import { useState } from "react";
import { MdOutlineDeleteOutline } from "react-icons/md";
import { addStoresForm } from "../../lib/actions";
import DropDown from "../../components/GDropDownList/DropDown";
import { storesType } from "../../lib/definitions"
import { FiUploadCloud } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

export default function AddStoresUi() {

    const nav = useNavigate();
    const [image, setImage] = useState(null);
    const [storeType, setStoreType] = useState("");
    const [loading, setLoading] = useState(false);


    const handleSubmit = async (e) => {
        setLoading(true);
        e.preventDefault();
        const reslut = await addStoresForm(new FormData(e.target), navigate);
        setLoading(false);
    };

    const navigate = (route) => {
        nav(route);
    };

    const handleImageChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            setImage(URL.createObjectURL(file));
        }
    };

    const handleDeleteImage = () => {
        setImage(null);
    };

    const onchange = (e) => {
        setStoreType(e);
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 sm:grid-cols-1 gap-3">


                <div>
                    <label className="block text-black mb-2">اسم المتجر</label>
                    <input
                        type="text"
                        name="name"
                        className="w-full px-4 py-2 border border-orange rounded-lg focus:outline-none focus:ring-2 focus:ring-orange"
                        placeholder="أدخل اسم المتجر"
                        required
                    />
                </div>
                <div>
                    <label className="block text-black mb-2">العنوان</label>
                    <input
                        type="text"
                        name="address"
                        className="w-full px-4 py-2 border border-orange rounded-lg focus:outline-none focus:ring-2 focus:ring-orange"
                        placeholder="أدخل العنوان"
                        required
                    />
                </div>
                <div>
                    <label className="block text-black mb-2">نوع المتجر</label>
                    <DropDown
                        options={storesType}
                        defaultText="اختر نوع المتجر"
                        value={storeType}
                        paramkey={"type"}
                        onchange={onchange} />
                </div>
                <div>
                    <label className="block text-black mb-2">البريد الإلكتروني</label>
                    <input
                        type="email"
                        name="email"
                        className="w-full px-4 py-2 border border-orange rounded-lg focus:outline-none focus:ring-2 focus:ring-orange"
                        placeholder="أدخل البريد الإلكتروني"
                        required
                    />
                </div>
                <div>
                    <label className="block text-black mb-2">رقم الهاتف</label>
                    <input
                        dir="rtl"
                        type="tel"
                        name="phone"
                        className="w-full px-4 py-2 border border-orange rounded-lg focus:outline-none focus:ring-2 focus:ring-orange"
                        placeholder="أدخل رقم الهاتف"
                        required
                    />
                </div>
                <div>
                    <label className="block text-black mb-2">رقم واتساب</label>
                    <input
                        dir="rtl"
                        type="tel"
                        name="whatsapp_phone"
                        className="w-full px-4 py-2 border border-orange rounded-lg focus:outline-none focus:ring-2 focus:ring-orange"
                        placeholder="أدخل رقم الواتساب"
                    />
                </div>
                <div>
                    <label className="block text-black mb-2">كلمة المرور</label>
                    <input
                        type="password"
                        name="password"
                        className="w-full px-4 py-2 border border-orange rounded-lg focus:outline-none focus:ring-2 focus:ring-orange"
                        placeholder="أدخل كلمة المرور"
                        required
                    />
                </div>
                <div>
                    <label className="block text-black mb-2">تأكيد كلمة المرور</label>
                    <input
                        type="password"
                        name="password_confirmation"
                        className="w-full px-4 py-2 border border-orange rounded-lg focus:outline-none focus:ring-2 focus:ring-orange"
                        placeholder="أعد إدخال كلمة المرور"
                        required
                    />
                </div>
            </div>
            <div className="my-4">
                <label className="block text-black mb-2">الصورة</label>
                <div className="bg-gray-50 p-6 rounded-2xl border-2 border-dashed border-gray-200">
                    <label className="block text-sm font-medium text-gray-700 mb-4">الصورة الرئيسية</label>
                    <div className="relative group">
                        <div className={`flex flex-col items-center justify-center  h-48 ${!image ? 'bg-white' : 'bg-transparent'} rounded-xl transition-all`}>
                            {!image ? (
                                <>
                                    <FiUploadCloud className="w-12 h-12 text-gray-400 mb-3 group-hover:text-orange-500 transition-colors" />
                                    <span className="text-sm text-gray-500 group-hover:text-orange-600 transition-colors">
                                        انقر لرفع الصورة
                                    </span>
                                </>
                            ) : (
                                <div className="relative w-full h-full">
                                    <img src={image} alt="الصورة الملتقطة" className="w-full h-full object-contain rounded-xl" />
                                    <button
                                        type="button"
                                        className="absolute top-2 left-2 z-50 bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition-colors shadow-lg"
                                        onClick={handleDeleteImage}
                                    >
                                        <MdOutlineDeleteOutline className="w-5 h-5" />
                                    </button>
                                </div>
                            )}
                        </div>
                        <input
                            type="file"
                            name="photo"
                            accept="image/*"
                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                            onChange={handleImageChange}
                        />
                    </div>
                </div>
            </div>
            <div className="flex justify-center w-full mt-5">
                <button
                    type="submit"
                    disabled={loading}
                    className={`w-full sm:w-2/3 md:w-[40%] bg-orange text-white py-2 rounded-lg transition flex items-center justify-center ${loading ? "cursor-not-allowed" : "hover:bg-orange"
                        }`}
                >
                    {loading ? (
                        <>
                            <svg
                                className="animate-spin h-5 w-5 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" ></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
                            </svg>
                        </>
                    ) : (
                        "حفظ"
                    )}
                </button>
            </div>
        </form>
    );
}
