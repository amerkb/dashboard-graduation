import { useEffect, useState } from "react";
import { updateServicesForm } from "../../lib/actions";
import DropDown from "../../components/GDropDownList/DropDown";
import AnimationLoader from "../sharedUi/loading";
import animation from "../../lib/utils/animationloading.json";
import { useNavigate } from "react-router-dom";

export default function EditServicesUi({ categoryData, serviceData }) {

    const nav = useNavigate();
    const [categoryId, setCategoryId] = useState(null);
    const [loading, setLoading] = useState(false);


    useEffect(() => {
        setCategoryId(serviceData.category_id);
    }, [serviceData]);


    const onchange = (e) => {
        setCategoryId(e);
    };

    const handleSubmit = async (e) => {
        setLoading(true);
        e.preventDefault();
        const result = await updateServicesForm(serviceData.id, new FormData(e.target), navigate);
        setLoading(false);
    };

    const navigate = (route) => {
        nav(route);
    };

    if ((Object.keys(serviceData).length < 1) || (categoryData.length < 1)) {
        return <div className=" h-[100vh] flex justify-center items-center"><AnimationLoader animationData={animation} /></div>
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1  md:grid-cols-2 sm:grid-cols-1 gap-3">

                <div className="mb-4">
                    <label className="block text-black mb-2">اسم الخدمة</label>
                    <input
                        type="text"
                        defaultValue={serviceData?.name}
                        name="name"
                        className="w-full px-4 py-2 border border-orange rounded-lg focus:outline-none focus:ring-2 focus:ring-orange"
                        placeholder="أدخل اسم الخدمة"
                    />

                </div>
                <div className="mb-4">
                    <label className="block text-black mb-2">شرح الخدمة</label>
                    <input
                        type="text"
                        defaultValue={serviceData?.description}
                        name="description"
                        className="w-full px-4 py-2 border border-orange rounded-lg focus:outline-none focus:ring-2 focus:ring-orange"
                        placeholder="أدخل شرح الخدمة"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-black mb-2">فئة الخدمة </label>
                    <DropDown options={categoryData} value={categoryId} onchange={onchange} paramkey={"category_service_id"} defaultText="أختر الفئة" />
                </div>
            </div>
            {/* add dropdwon here  */}
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