import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { GetBrands, GetCategoryService, GetServicesById } from "../../../lib/data";
import EditServicesUi from "../../../ui/servicesUi/EditServicesUi";
export default function EditServices() {

    const { serviceId } = useParams();
    const [categoryData, setCategoryData] = useState([]);
    const [servicesData, setServicesData] = useState({});

    useEffect(() => {
        handleApi();
    }, [])

    const handleApi = async () => {
        const serviceData = await GetCategoryService();
        setCategoryData([]);
        serviceData.map((e) => setCategoryData((prev) => [...prev, e]));

        const modelData = await GetServicesById(serviceId);
        setServicesData(modelData)
    };

    return (
        <div className="p-6">
            <div>
                <h1 className="text-[28px] pb-5">تعديل الخدمة </h1>
                <EditServicesUi serviceData={servicesData} categoryData={categoryData} />
            </div>
        </div>
    );
};