
import { updateRolesForm } from "../../lib/actions";
import { useNavigate } from "react-router-dom";

export default function EditRolesUi({ data }) {

    const nav = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const result = await updateRolesForm(data.id, new FormData(e.target), navigate);
    };

    const navigate = (route) => {
        nav(route);
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="mb-4">
                <label className="block text-black mb-2">اسم الماركة</label>
                <input
                    type="text"
                    name="name"
                    defaultValue={data.name}
                    className="w-full px-4 py-2 border border-orange rounded-lg focus:outline-none focus:ring-2 focus:ring-orange"
                    placeholder="أدخل اسم المستخدم"
                />
            </div>

            <div className="flex justify-center w-full mt-5">
                <button
                    type="submit"
                    className=" w-full  sm:w-2/3 md:w-[40%]   bg-orange text-white py-2 rounded-lg hover:bg-orange transition"
                >
                    حفظ
                </button>
            </div>
        </form>
    );
};