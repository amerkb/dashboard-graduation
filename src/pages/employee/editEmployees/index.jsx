import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { GetRoles, GetEmployeesById } from "../../../lib/data";
import EditEmployeesUi from "../../../ui/employeesUi/EditEmployeesUi";
export default function EditEmployees() {

    const { roleId } = useParams();
    const [rolesData, setRolesData] = useState([]);
    const [employeesData, setEmployeesData] = useState({});

    useEffect(() => {
        handleApi();
    }, [])

    const handleApi = async () => {
        const roleData = await GetRoles();
        setRolesData([]);
        roleData.map((e) => setRolesData((prev) => [...prev, e]));

        const employeeData = await GetEmployeesById(roleId);
        setEmployeesData(employeeData)
    };

    return (
        <div className="p-6">
            <div>
                <h1 className="text-[28px] pb-5">تعديل معلومات الموظف </h1>
                <EditEmployeesUi employeeData={employeesData} roleData={rolesData} />
            </div>
        </div>
    );
};