import { useEffect, useState } from "react";
import Table from "../../components/GTable/Table";
import { GetProducts } from "../../lib/data";
import Button from "../../components/GButton/Button";
import { FaPlus } from "react-icons/fa";
import { productsColumns } from "../../lib/definitions";
import { deleteProductsForm } from "../../lib/actions";
import DeleteRecord from "../../ui/Models/deleteRecord";
import Pagination from "../../ui/paginations/Paginations";
import TableSkeleton from "../../ui/sharedUi/tableSkeleton";

export default function Products() {

    const [productsData, setProductsData] = useState([]);
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
        const productData = await GetProducts(currentPage);
        setProductsData([]);
        setcurrentPage(productData.pagination.current_page);
        setlast_page(productData.pagination.last_page);
        productData.data.map((e) => setProductsData((prev) => [...prev, e]));
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
            const result = await deleteProductsForm(deleteConfirmation.idToDelete);
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
                <h1 className="text-[28px]">جدول السيارات</h1>
                <Button background="#EBAC32" borderRadius="8px" color="white" padding="12px" text="أضف سيارة" nav={"/addProducts"} icon={<FaPlus />} />
            </div>
            <div>
                {isLoading ? <TableSkeleton cols={productsColumns}/> : (  
                    <Table columns={productsColumns} rows={productsData} openDeleteConfirmation={openDeleteConfirmation} edit="/editProducts" />
                )}  
            </div>
            <div className="flex justify-center items-center py-5">
                <Pagination currentPage={currentPage} totalPages={last_page} handleChangePage={handlePageChange} />
            </div>
            {deleteConfirmation.isOpen && <DeleteRecord loadingDelete={loadingDelete} handelDelete={handelDelete} closeDeleteConfirmation={closeDeleteConfirmation} />}
        </div>
    );
};