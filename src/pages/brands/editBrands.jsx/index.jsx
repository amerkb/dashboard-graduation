import { useEffect, useState } from "react";
import AddBrandsUi from "../../../ui/brandsUi/AddBrandsUi";
import { useParams } from "react-router-dom";
import { GetBrandById } from "../../../lib/data";
import EditBrandsUi from "../../../ui/brandsUi/EditBrandsUi";

export default function EditBrands () {

    const {brandId} = useParams();
    const [brandsData, setBrandsData] = useState({});
    
    useEffect (()=>{
        handleApi();
    },[])
    
    const handleApi = async () => {
        const brandData = await GetBrandById(brandId);
        setBrandsData(brandData);
    };

    return(
        <div className="p-6">
            <div>
                <h1 className="text-[28px] pb-5">تعديل ماركة </h1>
                <EditBrandsUi data={brandsData} />
            </div>
        </div>
    );
};