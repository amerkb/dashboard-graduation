import { useState } from "react";
import { MdOutlineDeleteOutline } from "react-icons/md";
import { addBrandsForm } from "../../lib/actions";
import { FiUploadCloud } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import AnimationLoader from "../sharedUi/loading";
import animation from "../../lib/utils/animationloading.json";

export default function AddBrandsUi() {

    const nav = useNavigate();
    const [image, setImage] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        setLoading(true);
        e.preventDefault();
        const result = await addBrandsForm(new FormData(e.target), navigate);
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



    return (
        <form onSubmit={handleSubmit}>
            <div className="mb-4">
                <label className="block text-black mb-2">اسم الماركة</label>
                <input
                    type="text"
                    name="name"
                    className="w-full px-4 py-2 border border-orange rounded-lg focus:outline-none focus:ring-2 focus:ring-orange"
                    placeholder="أدخل اسم الماركة"
                />
            </div>
            <div className="mb-4">
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
                            name="logo"
                            accept="image/*"
                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                            onChange={handleImageChange}
                        />
                    </div>
                </div>
            </div>
            <div className="flex justify-center w-full mt-10">
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
};