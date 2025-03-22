import { useState, useEffect } from "react";
import AddModelsUi from "../../../ui/modelsUi/AddModelsUi";
import { GetBrands } from "../../../lib/data";

export default function AddModels() {
    
    const [brandsData, setBrandsData] = useState([]);
    
    useEffect (()=>{
        handleApi();
    },[])
    
    const handleApi = async () => {
        const brandData = await GetBrands();
        setBrandsData([]);
        brandData.map((e)=>setBrandsData((prev)=>[ ...prev, e]));
    };    

    return (
        <div className="p-6">
            <div>
                <h1 className="text-[28px] pb-5">إضافة موديل جديدة</h1>
                <AddModelsUi brandData={brandsData} />
            </div>
        </div>
    );
};