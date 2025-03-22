import { useEffect, useState } from "react";
import Table from "../../components/GTable/Table";
import { GetRoles } from "../../lib/data";
import Button from "../../components/GButton/Button";
import { FaPlus } from "react-icons/fa";
import { rolesColumns } from "../../lib/definitions";
import { deleteRolesForm } from "../../lib/actions";
import DeleteRecord from "../../ui/Models/deleteRecord";
import TableSkeleton from "../../ui/sharedUi/tableSkeleton";

export default function Products() {

    const [rolesData, setRolesData] = useState([]);
    const [deleteConfirmation, setDeleteConfirmation] = useState({ isOpen: false, idToDelete: null });
    const [isLoading, setIsLoading] = useState(true);  
    const [loadingDelete, setLoadingDelete] = useState(false);  

    useEffect(() => {
        handleApi();
    }, [])

    const handleApi = async () => {
        setIsLoading(true);  
        const roleData = await GetRoles();
        console.log(roleData);
        setRolesData([]);
        roleData.map((e) => setRolesData((prev) => [...prev, e]));
        setIsLoading(false);  
    };

    const openDeleteConfirmation = (id) => {
        setDeleteConfirmation({ isOpen: true, idToDelete: id });
    };

    const closeDeleteConfirmation = () => {
        setDeleteConfirmation({ isOpen: false, idToDelete: null });
    };

    const handelDelete = async () => {
        if (deleteConfirmation.idToDelete) {
            setLoadingDelete(true);
            const result = await deleteRolesForm(deleteConfirmation.idToDelete);
            if (result) {
                setLoadingDelete(false);
                handleApi();
            }
            closeDeleteConfirmation();
        }
    };

    return (
        <div className="p-8">
            <div className="flex justify-between pb-6">
                <h1 className="text-[28px]">جدول الوظائف</h1>
                <Button background="#EBAC32" borderRadius="8px" color="white" padding="12px" text=" اضف وظيفة" nav={"/addRoles"} icon={<FaPlus />} />
            </div>
            <div>
                {isLoading ? <TableSkeleton cols={rolesColumns}/> : (  
                    <Table columns={rolesColumns} rows={rolesData} openDeleteConfirmation={openDeleteConfirmation} edit="/editRoles" />
                )}  
            </div>
            {deleteConfirmation.isOpen && <DeleteRecord loadingDelete={loadingDelete} handelDelete={handelDelete} closeDeleteConfirmation={closeDeleteConfirmation} />}
        </div>
    );
};