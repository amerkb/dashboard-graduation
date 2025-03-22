import { useEffect, useState } from "react";
import Table from "../../components/GTable/Table";
import { GetStores } from "../../lib/data";
import Button from "../../components/GButton/Button";
import { FaPlus } from "react-icons/fa";
import { storesColumns } from "../../lib/definitions";
import { deleteStoresForm } from "../../lib/actions";
import DeleteRecord from "../../ui/Models/deleteRecord";
import TableSkeleton from "../../ui/sharedUi/tableSkeleton";
import Pagination from "../../ui/paginations/Paginations";

export default function Stores() {

    const [storesData, setStoreData] = useState([]);
    const [currentPage, setcurrentPage] = useState(1);
    const [last_page, setlast_page] = useState(1);
    const [deleteConfirmation, setDeleteConfirmation] = useState({ isOpen: false, idToDelete: null });
    const [isLoading, setIsLoading] = useState(true);  
    const [loadingDelete, setLoadingDelete] = useState(false);  

    useEffect(() => {
        handleApi();
    }, [currentPage])

    const handleApi = async () => {
        setIsLoading(true);  
        const storeData = await GetStores(currentPage);
        setStoreData([]);
        setcurrentPage(storeData.pagination.current_page);
        setlast_page(storeData.pagination.last_page);
        storeData.data.map((e) => setStoreData((prev) => [...prev, e]));
        setIsLoading(false);  
    };

    const openDeleteConfirmation = (id) => {
        setDeleteConfirmation({ isOpen: true, idToDelete: id });
    };

    const closeDeleteConfirmation = () => {
        setDeleteConfirmation({ isOpen: false, idToDelete: null });
    };

    const handlePageChange = (page) => {
        setcurrentPage(page);
    };

    const handelDelete = async () => {
        if (deleteConfirmation.idToDelete) {
            setLoadingDelete(true);
            const result = await deleteStoresForm(deleteConfirmation.idToDelete);
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
                <h1 className="text-[28px]">جدول المعارض</h1>
                <Button background="#EBAC32" borderRadius="8px" color="white" padding="12px" text="أضف متجر" nav={"/addStores"} icon={<FaPlus />} />
            </div>
            <div>
                {isLoading ? <TableSkeleton cols={storesColumns}/> : (  
                    <Table columns={storesColumns} rows={storesData} openDeleteConfirmation={openDeleteConfirmation} edit="/editStores" />
                )}  
            </div>
            <div className="flex justify-center items-center py-5">
                <Pagination currentPage={currentPage} totalPages={last_page} handleChangePage={handlePageChange} />
            </div>
            {deleteConfirmation.isOpen && <DeleteRecord loadingDelete={loadingDelete} handelDelete={handelDelete} closeDeleteConfirmation={closeDeleteConfirmation} />}
        </div>
    );
};