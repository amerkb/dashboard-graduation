import { useState, useEffect } from "react";

import { GetCategoryService } from "../../../lib/data";
import AddServicesUi from "../../../ui/servicesUi/AddServicesUi"
export default function AddServices() {

    const [serviceData, setServicesData] = useState([]);

    useEffect(() => {
        handleApi();
    }, [])

    const handleApi = async () => {
        const serviceData = await GetCategoryService();
        setServicesData([]);
        serviceData.map((e) => setServicesData((prev) => [...prev, e]));
    };

    return (
        <div className="p-6">
            <div>
                <h1 className="text-[28px] pb-5">إضافة خدمة جديدة</h1>
                <AddServicesUi serviceData={serviceData} />
            </div>
        </div>
    );
};