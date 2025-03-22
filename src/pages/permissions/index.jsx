import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { GetRolesById } from "../../lib/data";
import GetEditPermissions from "../../ui/permissionsUi/getEditPermissions";

export default function Permissions () {

    const {permissionId} = useParams();
    const [permissionsData, setPermissionsData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);  

    useEffect(() => {
        handleApi();
    }, [])

    const handleApi = async () => {
        setIsLoading(true);  
        const permissionData = await GetRolesById(permissionId);
        setPermissionsData([]);
        permissionData.permissions.map((e) => setPermissionsData((prev) => [...prev, e]));
        setIsLoading(false);  
    };

    return(
        <div className="p-8">
            <div className="flex justify-between pb-6">
                <h1 className="text-[28px]"> الصلاحيات</h1>
            </div>
            <div>
                <GetEditPermissions permissionId={permissionId} permissionsData={permissionsData}/>
            </div>
        </div>
    );
};