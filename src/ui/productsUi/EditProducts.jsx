import { useEffect, useState } from "react";
import { updateProductsForm } from "../../lib/actions";
import DropDown from "../../components/GDropDownList/DropDown";
import { MdOutlineDeleteOutline } from "react-icons/md";
import { IoAddCircle } from "react-icons/io5";
import { FiUploadCloud } from "react-icons/fi";
import AnimationLoader from "../sharedUi/loading";
import animation from "../../lib/utils/animationloading.json";
import { useNavigate } from "react-router-dom";

export default function EditProductsUi({ productsData, modelsData, drive_type, fuel_type, gears, seat_type, cylinders, brandsData, storesData, yearOptions, bodyType, type, handleBrandId }) {

    const nav = useNavigate();
    const [image, setImage] = useState(null);
    const [altImages, setAltImages] = useState([]);
    const [altImagesPreview, setAltImagesPreview] = useState([]);
    const [loading, setLoading] = useState(false);
    const [selectedValues, setSelectedValues] = useState({
        drive_type: null,
        fuel_type: null,
        gears: null,
        seat_type: null,
        cylinders: null,
        brand_id: null,
        model_id: null,
        store_id: null,
        year_of_construction: null,
        structure_id: null,
        type: null
    });

    useEffect(() => {
        setImage(productsData.main_photo);
        setSelectedValues({
            drive_type: productsData.drive_type,
            fuel_type: productsData.fuel_type,
            gears: productsData.gears,
            seat_type: productsData.seat_type,
            cylinders: productsData.cylinders,
            brand_id: productsData.brand_id,
            model_id: productsData.model_id,
            store_id: productsData.store_id,
            year_of_construction: productsData.year_of_construction,
            structure_id: productsData.structure_name,
            type: productsData.type
        })
        const photos = productsData?.photos || [];
        setAltImages(photos.map((photoUrl) => null));
        setAltImagesPreview(photos);
    }, [productsData]);

    const handleChange = (paramKey, value) => {
        setSelectedValues((prevValues) => ({
            ...prevValues,
            [paramKey]: value,
        }));
        if (paramKey === "brand_id") {
            handleBrandId(value)
        }
    };

    const handleSubmit = async (e) => {
        setLoading(true);
        e.preventDefault();
        const result = await updateProductsForm(productsData.id, new FormData(e.target), navigate);
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

    const handleAddAltImage = () => {
        setAltImages([...altImages, null]);
        setAltImagesPreview([...altImagesPreview, null]);
    };

    const handleAltImageChange = (index, e) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            const newPreview = URL.createObjectURL(file);
            setAltImages((prev) => {
                const newImages = [...prev];
                newImages[index] = file;
                return newImages;
            });
            setAltImagesPreview((prev) => {
                const newPreviews = [...prev];
                newPreviews[index] = newPreview;
                return newPreviews;
            });
        }
    };

    const handleDeleteAltImage = (index) => {
        setAltImages((prev) => {
            const newImages = [...prev];
            newImages[index] = null;
            return newImages;
        });
        setAltImagesPreview((prev) => {
            const newPreviews = [...prev];
            newPreviews[index] = null;
            return newPreviews;
        });
    };

    if ((Object.keys(productsData).length < 1) || (brandsData.length < 1) || (storesData.length < 1)) {
        return <div className="w-[100vw] h-[100vh] flex justify-center items-center"><AnimationLoader animationData={animation} /></div>
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-3">
                <div className="mb-4">
                    <label className="block text-black mb-2">الإسم</label>
                    <input
                        type="text"
                        name="name"
                        defaultValue={productsData?.name}
                        className="w-full px-4 py-2 border border-orange rounded-lg focus:outline-none focus:ring-2 focus:ring-orange"
                        placeholder="أدخل الإسم "
                    />
                </div>
                {[
                    { label: "نوعية الدفع", options: drive_type, paramKey: "drive_type" },
                    { label: "نوعية الوقود", options: fuel_type, paramKey: "fuel_type" },
                    { label: "نوعية الغيار", options: gears, paramKey: "gears" },
                    { label: "نوعية الفرش", options: seat_type, paramKey: "seat_type" },
                    { label: "عدد السلندرات", options: cylinders, paramKey: "cylinders" },
                    { label: "الماركة", options: brandsData, paramKey: "brand_id" },
                    { label: "المتجر", options: storesData, paramKey: "store_id" },
                    { label: "سنة الانتاج", options: yearOptions, paramKey: "year_of_construction" },
                    { label: "نوعية الهيكل", options: bodyType, paramKey: "structure_id" },
                    { label: " حالة السيارة", options: type, paramKey: "type" },
                    { label: " الموديل", options: modelsData, paramKey: "model_id" },

                ].map(({ label, options, paramKey }) => (
                    <div className="mb-4" key={paramKey}>
                        <label className="block text-black mb-2">{label}</label>
                        <DropDown options={options} value={selectedValues[paramKey]} onchange={(value) => handleChange(paramKey, value)} defaultText={`أختر ${label}`} paramkey={paramKey} />
                    </div>
                ))}
                <div className="mb-4">
                    <label className="block text-black mb-2">  عدد المقاعد </label>
                    <input
                        type="number"
                        defaultValue={productsData?.number_of_seats}
                        name="number_of_seats"
                        className="w-full px-4 py-2 border border-orange rounded-lg focus:outline-none focus:ring-2 focus:ring-orange"
                        placeholder="أدخل عدد المقاعد "
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-black mb-2">  الكيلومتراج </label>
                    <input
                        type="number"
                        defaultValue={productsData?.mileage}
                        name="mileage"
                        className="w-full px-4 py-2 border border-orange rounded-lg focus:outline-none focus:ring-2 focus:ring-orange"
                        placeholder="أدخل  ممشى السيارة "
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-black mb-2">  سعة المحرك</label>
                    <input
                        type="number"
                        defaultValue={productsData?.cylinder_capacity}
                        name="cylinder_capacity"
                        className="w-full px-4 py-2 border border-orange rounded-lg focus:outline-none focus:ring-2 focus:ring-orange"
                        placeholder="أدخل سعة المحرك "
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-black mb-2">  اللون </label>
                    <input
                        type="text"
                        defaultValue={productsData?.color}
                        name="color"
                        className="w-full px-4 py-2 border border-orange rounded-lg focus:outline-none focus:ring-2 focus:ring-orange"
                        placeholder="أدخل  اللون "
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-black mb-2"> نوعية الإضاءة </label>
                    <input
                        type="text"
                        defaultValue={productsData?.lights}
                        name="lights"
                        className="w-full px-4 py-2 border border-orange rounded-lg focus:outline-none focus:ring-2 focus:ring-orange"
                        placeholder="أدخل نوعية الإضاءة  "
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-black mb-2">  السعر </label>
                    <input
                        type="number"
                        defaultValue={productsData?.price}
                        name="price"
                        className="w-full px-4 py-2 border border-orange rounded-lg focus:outline-none focus:ring-2 focus:ring-orange"
                        placeholder="أدخل السعر   "
                    />
                </div>
            </div>


            <div className="grid grid-cols-1 lg:grid-cols-2 w-full mt-4 gap-8 pb-8">
                <div className="bg-gray-50 p-6 rounded-2xl border-2 border-dashed border-gray-200">
                    <label className="block text-sm font-medium text-gray-700 mb-4">الصورة الرئيسية</label>
                    <div className="relative group">
                        <div className={`flex flex-col items-center justify-center h-48 ${!image ? 'bg-white' : 'bg-transparent'} rounded-xl transition-all`}>
                            {!image ? (
                                <>
                                    <FiUploadCloud className="w-12 h-12 text-gray-400 mb-3 group-hover:text-orange-500 transition-colors" />
                                    <span className="text-sm text-gray-500 group-hover:text-orange-600 transition-colors">
                                        انقر لرفع الصورة
                                    </span>
                                </>
                            ) : (
                                <div className="relative w-full h-full">
                                    <img src={image} alt="الصورة الملتقطة" className="w-full h-full object-cover rounded-xl" />
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
                            name="main_photo"
                            accept="image/*"
                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                            onChange={handleImageChange}
                        />
                    </div>
                </div>
                <div className="bg-gray-50 p-6 rounded-2xl border-2 border-dashed border-gray-200">
                    <label className="block text-sm font-medium text-gray-700 mb-4">الصور الفرعية</label>
                    <div className="grid grid-cols-2 gap-4">
                        {altImages.map((_, index) => (
                            <div key={index} className="relative group h-32">
                                <div className={`w-full h-full ${!altImagesPreview[index] ? 'bg-white' : 'bg-transparent'} rounded-lg transition-all`}>
                                    {!altImagesPreview[index] ? (
                                        <div className="flex flex-col items-center justify-center h-full">
                                            <FiUploadCloud className="w-8 h-8 text-gray-400 mb-2 group-hover:text-orange-500 transition-colors" />
                                            <span className="text-xs text-gray-500 group-hover:text-orange-600">صورة {index + 1}</span>
                                        </div>
                                    ) : (
                                        <div className="relative w-full h-full">
                                            <img src={altImagesPreview[index]} alt={`الصورة الفرعية ${index + 1}`} className="w-full h-full object-cover rounded-lg" />
                                            <button
                                                type="button"
                                                className=" top-1 left-1 bg-red-500 z-50 absolute text-white p-1 rounded-full hover:bg-red-600 transition-colors"
                                                onClick={() => handleDeleteAltImage(index)}
                                            >
                                                <MdOutlineDeleteOutline className="w-4 h-4 " />
                                            </button>
                                        </div>
                                    )}
                                </div>
                                <input
                                    type="file"
                                    name={`photos[${index + 1}]`}
                                    accept="image/*"
                                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                    onChange={(e) => handleAltImageChange(index, e)}
                                />
                            </div>
                        ))}
                        <button
                            type="button"
                            onClick={handleAddAltImage}
                            className="h-32 flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-lg hover:border-orange-500 hover:bg-orange-50 transition-colors"
                        >
                            <IoAddCircle className="w-8 h-8 text-gray-400 mb-2" />
                            <span className="text-sm text-gray-600">إضافة صورة</span>
                        </button>
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
};