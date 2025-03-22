import React, {useState, useEffect} from "react";
import { GetServices, GetStores } from "../../../lib/data";
import AddOrdersUi from "../../../ui/ordersUi/AddOrdersUi";

export default function AddOrders () {

    const [servicesData, setServicesData] = useState([]);
    const [storesData, setStoresData] = useState([]);
    
    useEffect(() => {
        handleApi();
    }, [])

    const handleApi = async () => {
        const serviceData = await GetServices();
        const storeData = await GetStores();
        setServicesData([]);
        setStoresData([]);
        serviceData.map((e) => setServicesData((prev) => [...prev, e]));
        storeData.data.map((e) => setStoresData((prev) => [...prev, e]));
    };

    return(
        <div className="p-6">
            <div>
                <h1 className="text-[28px] pb-5">إضافة طلب جديد</h1>
                <AddOrdersUi servicesData={servicesData} storesData={storesData} />
            </div>
        </div>
    );
};