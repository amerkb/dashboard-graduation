import React, {useState, useEffect} from "react";
import AddProductsUi from "../../../ui/productsUi/AddProducts";
import { GetBrands, GetStores } from "../../../lib/data";
import { yearOptions, drive_type, fuel_type, gears, type, seat_type, cylinders, bodyType } from "../../../lib/definitions";

export default function AddProducts () {

    const [brandsData, setBrandsData] = useState([]);
    const [modelsData, setModelsData] = useState([]);
    const [brandId, setBrandId] = useState(null);
    const [storesData, setStoresData] = useState([]);
    
    useEffect(() => {
        handleApi();
    }, [])

    useEffect(() => {
        if(brandId){
            const modelData = brandsData.find((e) => brandId == e.id);
            setModelsData(modelData.models.map((e)=> e));
        }
    }, [brandId])

    const handleBrandId = (e) => {
        setBrandId(e);
    }

    const handleApi = async () => {
        const brandData = await GetBrands();
        setBrandsData([]);
        brandData.map((e) => setBrandsData((prev) => [...prev, e]));

        const storeData = await GetStores();
        setStoresData([]);
        storeData.data.map((e) => setStoresData((prev) => [...prev, e]));
    };

    return(
        <div className="p-6">
            <div>
                <h1 className="text-[28px] pb-5">إضافة منتج جديد</h1>
                <AddProductsUi modelsData={modelsData} drive_type={drive_type} fuel_type={fuel_type} gears={gears} type={type} seat_type={seat_type} cylinders={cylinders} brandsData={brandsData} storesData={storesData} yearOptions={yearOptions} bodyType={bodyType} handleBrandId={handleBrandId} />
            </div>
        </div>
    );
};