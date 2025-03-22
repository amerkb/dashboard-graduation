import { useEffect, useState } from "react";
import Table from "../../components/GTable/Table";
import { GetOffers } from "../../lib/data";
import Button from "../../components/GButton/Button";
import { offersColumns } from "../../lib/definitions";
import { deleteOffersForm } from "../../lib/actions";
import DeleteRecord from "../../ui/Models/deleteRecord";
import Pagination from "../../ui/paginations/Paginations";
import { FaPlus } from "react-icons/fa";
import TableSkeleton from "../../ui/sharedUi/tableSkeleton";

export default function Offers() {

    const [offerData, setOfferData] = useState([]);
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
        const offerData = await GetOffers(currentPage);
        setOfferData([]);
        setcurrentPage(offerData.pagination.current_page);
        setlast_page(offerData.pagination.last_page);
        offerData.data.map((e) => setOfferData((prev) => [...prev, e]));
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
            const result = await deleteOffersForm(deleteConfirmation.idToDelete);
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
                <h1 className="text-[28px]">جدول العروض</h1>
                <Button background="#EBAC32" borderRadius="8px" color="white" padding="12px" text="أضف عرض" nav={"/addOffers"} icon={<FaPlus />} />
            </div>
            <div>
                {isLoading ? <TableSkeleton cols={offersColumns}/> : (  
                    <Table columns={offersColumns} rows={offerData} openDeleteConfirmation={openDeleteConfirmation} edit="/editOffers" />
                )}
            </div>
            <div className="flex justify-center items-center py-5">
                <Pagination currentPage={currentPage} totalPages={last_page} handleChangePage={handlePageChange} />
            </div>
            {deleteConfirmation.isOpen && <DeleteRecord loadingDelete={loadingDelete} handelDelete={handelDelete} closeDeleteConfirmation={closeDeleteConfirmation} />}
        </div>
    );
};