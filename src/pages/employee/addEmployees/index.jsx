import { useState, useEffect } from "react";
import { GetRoles } from "../../../lib/data";
import AddEmployeesUi from "../../../ui/employeesUi/AddEmployessUi";
export default function AddEmployees() {

    const [rolesData, setRolesData] = useState([]);

    useEffect(() => {
        handleApi();
    }, [])

    const handleApi = async () => {
        const roleData = await GetRoles();
        setRolesData([]);
        roleData.map((e) => setRolesData((prev) => [...prev, e]));
    };

    return (
        <div className="p-6">
            <div>
                <h1 className="text-[28px] pb-5">إضافة موظف جديد</h1>
                <AddEmployeesUi rolesData={rolesData} />
            </div>
        </div>
    );
};