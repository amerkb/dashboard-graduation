import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { GetBrands, GetModelById } from "../../../lib/data";
import EditModelsUi from "../../../ui/modelsUi/EditModelsUi";

export default function EditModels() {
    
    const {modelId} = useParams();
    const [brandsData, setBrandsData] = useState([]);
    const [modelsData, setModelsData] = useState({});
    
    useEffect (()=>{
        handleApi();
    },[])
    
    const handleApi = async () => {
        const brandData = await GetBrands();
        setBrandsData([]);
        brandData.map((e)=>setBrandsData((prev)=>[ ...prev, e]));
        
        const modelData = await GetModelById(modelId);
        setModelsData(modelData)
    };    

    return (
        <div className="p-6">
            <div>
                <h1 className="text-[28px] pb-5">تعديل الموديل </h1>
                <EditModelsUi brandData={brandsData} modelsData={modelsData} />
            </div>
        </div>
    );
};