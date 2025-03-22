import { useEffect, useState } from "react";
import { updateOrdersForm } from "../../lib/actions";
import DropDown from "../../components/GDropDownList/DropDown";
import AnimationLoader from "../sharedUi/loading";
import animation from "../../lib/utils/animationloading.json";
import { useNavigate } from "react-router-dom";

export default function EditOrdersUi({ ordersData, servicesData, storesData }) {

    const nav = useNavigate();
    const [serviceId, setserviceId] = useState(null)
    const [storeId, setstoreId] = useState(null)
    const [loading, setLoading] = useState(false);


    useEffect(() => {
        setserviceId(ordersData.service_id)
        setstoreId(ordersData.store_id)

    }, [ordersData])

    const onchange = (e) => {
        setserviceId(e);
    };

    const onchange2 = (e) => {
        setstoreId(e);
    };

    const handleSubmit = async (e) => {
        setLoading(true);
        e.preventDefault();
        const result = await updateOrdersForm(ordersData.id, new FormData(e.target), navigate);
        setLoading(false);
    };

    const navigate = (route) => {
        nav(route);
    };

    if ((Object.keys(ordersData).length < 1) || (servicesData.length < 1) || (storesData.length < 1)) {
        return <div className=" h-[100vh] flex justify-center items-center"><AnimationLoader animationData={animation} /></div>
    };
    return (
        <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1  md:grid-cols-2 sm:grid-cols-1 gap-3">

                <div className="mb-4">
                    <label className="block text-black mb-2">  الخدمة</label>
                    <DropDown options={servicesData} value={serviceId} onchange={onchange} defaultText="أختر الخدمة " paramkey="service_id" />
                </div>
                <div className="mb-4">
                    <label className="block text-black mb-2">  المتجر</label>
                    <DropDown options={storesData} value={storeId} onchange={onchange2} defaultText="أختر المعرض " paramkey="store_id" />
                </div>
                <div className="mb-4">
                    <label className="block text-black mb-2"> السعر </label>
                    <input
                        type="number"
                        defaultValue={ordersData.price}
                        name="price"
                        className="w-full px-4 py-2 border border-orange rounded-lg focus:outline-none focus:ring-2 focus:ring-orange"
                        placeholder="أدخل السعر "
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-black mb-2"> عدد الأيام </label>
                    <input
                        type="number"
                        defaultValue={ordersData.count_days}
                        name="count_days"
                        className="w-full px-4 py-2 border border-orange rounded-lg focus:outline-none focus:ring-2 focus:ring-orange"
                        placeholder="أدخل عدد الأيام "
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-black mb-2">  من التاريخ</label>
                    <input
                        type="date"
                        name="start_time"
                        defaultValue={ordersData.start_time}
                        className="w-full px-4 py-2 border border-orange rounded-lg focus:outline-none focus:ring-2 focus:ring-orange"
                        placeholder="أدخل التاريخ الجديد"
                    />
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