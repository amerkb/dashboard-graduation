import { useState } from "react";
import { addEmployeesForm } from "../../lib/actions";
import DropDown from "../../components/GDropDownList/DropDown";
import { useNavigate } from "react-router-dom";
import AnimationLoader from "../sharedUi/loading";
import animation from "../../lib/utils/animationloading.json";

export default function AddEmployeesUi({ rolesData }) {

    const nav = useNavigate();
    const [roleId, setRoleId] = useState(null);
    const [loading, setLoading] = useState(false);

    const onchange = (e) => {
        setRoleId(e);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        await addEmployeesForm(new FormData(e.target), navigate);
        setLoading(false);
    };

    const navigate = (route) => {
        nav(route);
    };

    if ((rolesData).length < 1) {
        return <div className=" h-[100vh] flex justify-center items-center"><AnimationLoader animationData={animation} /></div>
    };
    return (
        <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 sm:grid-cols-1 gap-3">
                <div className="mb-4">
                    <label className="block text-black mb-2">اسم الموظف</label>
                    <input
                        type="text"
                        name="name"
                        className="w-full px-4 py-2 border border-orange rounded-lg focus:outline-none focus:ring-2 focus:ring-orange"
                        placeholder=" الاسم "
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-black mb-2">ايميل الموظف</label>
                    <input
                        type="text"
                        name="email"
                        className="w-full px-4 py-2 border border-orange rounded-lg focus:outline-none focus:ring-2 focus:ring-orange"
                        placeholder=" الايميل "
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-black mb-2">كلمة سر حساب الموظف</label>
                    <input
                        type="password"
                        name="password"
                        className="w-full px-4 py-2 border border-orange rounded-lg focus:outline-none focus:ring-2 focus:ring-orange"
                        placeholder="أدخل كلمة السر  "
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-black mb-2">تاكيد كلمة سر حساب الموظف</label>
                    <input
                        type="password"
                        name="password_confirmation"
                        className="w-full px-4 py-2 border border-orange rounded-lg focus:outline-none focus:ring-2 focus:ring-orange"
                        placeholder="   اعد كلمة السر  "
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-black mb-2">اسم الوظيفة</label>
                    <DropDown
                        options={rolesData}
                        value={roleId}
                        onchange={onchange}
                        paramkey={"role_id"}
                        defaultText="أختر الوظيفة"
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
}
