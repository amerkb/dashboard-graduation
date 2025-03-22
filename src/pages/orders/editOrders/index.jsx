import React, {useState, useEffect} from "react";
import { GetOrdersById, GetServices, GetStores } from "../../../lib/data";
import EditOrdersUi from "../../../ui/ordersUi/EditOrdersUi";
import { useParams } from "react-router-dom";

export default function EditOrders () {

    const {orderId} = useParams();
    const [servicesData, setServicesData] = useState([]);
    const [storesData, setStoresData] = useState([]);
    const [ordersData, setOrdersData] = useState({});
    
    useEffect(() => {
        handleApi();
    }, [])

    const handleApi = async () => {
        const serviceData = await GetServices();
        const storeData = await GetStores();
        const orderData = await GetOrdersById(orderId);
        setServicesData([]);
        setStoresData([]);
        setOrdersData({});
        serviceData.map((e) => setServicesData((prev) => [...prev, e]));
        storeData.data.map((e) => setStoresData((prev) => [...prev, e]));
        setOrdersData(orderData);
    };

    return(
        <div className="p-6">
            <div>
                <h1 className="text-[28px] pb-5">تعديل الطلب </h1>
                <EditOrdersUi ordersData={ordersData} servicesData={servicesData} storesData={storesData} />
            </div>
        </div>
    );
};