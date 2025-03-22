import { useEffect, useState } from "react";
import AddBrandsUi from "../../../ui/brandsUi/AddBrandsUi";
import { useParams } from "react-router-dom";
import { GetRolesById } from "../../../lib/data";
import EditRolesUi from "../../../ui/rolesui/EditRolesUi";
export default function EditBrands() {

    const { roleId } = useParams();
    const [rolesData, setRolesData] = useState({});

    useEffect(() => {
        handleApi();
    }, [])

    const handleApi = async () => {
        const roleData = await GetRolesById(roleId);
        setRolesData(roleData);
    };

    return (
        <div className="p-6">
            <div>
                <h1 className="text-[28px] pb-5">تعديل ماركة </h1>
                <EditRolesUi data={rolesData} />
            </div>
        </div>
    );
};