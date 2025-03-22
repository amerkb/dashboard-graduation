import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { GetStoreById } from "../../../lib/data";
import EditStoresUi from "../../../ui/storesUi/EditStoresUi";
export default function EditModels() {

    const { storeId } = useParams();

    const [storesData, setStoreData] = useState({});

    useEffect(() => {
        handleApi();
    }, [])

    const handleApi = async () => {


        const storeData = await GetStoreById(storeId);
        setStoreData(storeData)
    };

    return (
        <div className="p-6">
            <div>
                <h1 className="text-[28px] pb-5">تعديل الموديل </h1>
                <EditStoresUi storeData={storesData} />
            </div>
        </div>
    );
};