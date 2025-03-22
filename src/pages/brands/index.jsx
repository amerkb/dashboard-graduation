// import { Suspense, useEffect, useState } from "react";
// import Table from "../../components/GTable/Table";
// import { GetBrands } from "../../lib/data";
// import Button from "../../components/GButton/Button";
// import { FaPlus } from "react-icons/fa";
// import { brandsColumns } from "../../lib/definitions";
// import { deleteBrandsForm } from "../../lib/actions";
// import DeleteRecord from "../../ui/Models/deleteRecord";
// import TableSkeleton from "../../ui/sharedUi/tableSkeleton";

// export default function Brands() {

//     const [brandsData, setBrandsData] = useState([]);
//     const [deleteConfirmation, setDeleteConfirmation] = useState({ isOpen: false, idToDelete: null });
//     const [isLoading, setIsLoading] = useState(true);  
//     const [loadingDelete, setLoadingDelete] = useState(false);  

//     useEffect(() => {
//         handleApi();
//     }, [])

//     const handleApi = async () => {
//         setIsLoading(true);  
//         const brandData = await GetBrands();
//         setBrandsData([]);
//         brandData.map((e) => setBrandsData((prev) => [...prev, e]));
//         setIsLoading(false);  
//     };

//     const openDeleteConfirmation = (id) => {
//         setDeleteConfirmation({ isOpen: true, idToDelete: id });
//     };

//     const closeDeleteConfirmation = () => {
//         setDeleteConfirmation({ isOpen: false, idToDelete: null });
//     };

//     const handelDelete = async () => {
//         if (deleteConfirmation.idToDelete) {
//             setLoadingDelete(true);
//             const result = await deleteBrandsForm(deleteConfirmation.idToDelete);
//             if (result) {
//                 setLoadingDelete(false);
//                 handleApi();
//             }
//             closeDeleteConfirmation();
//         }
//     };

//     return (
//         <div className="p-8">
//             <div className="flex justify-between pb-6">
//                 <h1 className="text-[28px]">جدول الماركات</h1>
//                 <Button background="#EBAC32" borderRadius="8px" color="white" padding="12px" text="أضف ماركة" nav={"/addBrands"} icon={<FaPlus />} />
//             </div>
//             <div>
//                 {isLoading ? <TableSkeleton cols={brandsColumns}/> : (  
//                     <Table columns={brandsColumns} rows={brandsData} openDeleteConfirmation={openDeleteConfirmation} edit="/editBrands" />
//                 )}  
//             </div>
//             {deleteConfirmation.isOpen && <DeleteRecord loadingDelete={loadingDelete} handelDelete={handelDelete} closeDeleteConfirmation={closeDeleteConfirmation} />}
//         </div>
//     );
// };