import { useEffect, useState } from "react";
import Table from "../../components/GTable/Table";
import { GetOrders } from "../../lib/data";
import Button from "../../components/GButton/Button";
import { ordersColumns } from "../../lib/definitions";
import { deleteOrdersForm } from "../../lib/actions";
import DeleteRecord from "../../ui/Models/deleteRecord";
import Pagination from "../../ui/paginations/Paginations";
import { FaPlus } from "react-icons/fa";
import TableSkeleton from "../../ui/sharedUi/tableSkeleton";

export default function Orders() {

    const [ordersData, setOrdersData] = useState([]);
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
        const orderData = await GetOrders(currentPage);
        setOrdersData([]);
        setcurrentPage(orderData.pagination.current_page);
        setlast_page(orderData.pagination.last_page);
        orderData.data.map((e) => setOrdersData((prev) => [...prev, e]));
        setIsLoading(false);  
    };

    const handlePageChange = (page) => {
        setcurrentPage(page);
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
            const result = await deleteOrdersForm(deleteConfirmation.idToDelete);
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
                <h1 className="text-[28px]">جدول الطلبات</h1>
                <Button background="#EBAC32" borderRadius="8px" color="white" padding="12px" text="أضف طلب" nav={"/addOrders"} icon={<FaPlus />} />
            </div>
            <div>
                {isLoading ? <TableSkeleton cols={ordersColumns}/> : (  
                    <Table columns={ordersColumns} rows={ordersData} openDeleteConfirmation={openDeleteConfirmation} edit="/editOrders" />
                )}
            </div>
            <div className="flex justify-center items-center py-5">
                <Pagination currentPage={currentPage} totalPages={last_page} handleChangePage={handlePageChange} />
            </div>
            {deleteConfirmation.isOpen && <DeleteRecord loadingDelete={loadingDelete} handelDelete={handelDelete} closeDeleteConfirmation={closeDeleteConfirmation} />}
        </div>
    );
};