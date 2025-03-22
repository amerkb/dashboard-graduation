import React, {useState, useEffect} from "react";
import { GetBrands, GetPoductsById, GetStores } from "../../../lib/data";
import { yearOptions, drive_type, fuel_type, gears, type, seat_type, cylinders, bodyType } from "../../../lib/definitions";
import EditProductsUi from "../../../ui/productsUi/EditProducts";
import { useParams } from "react-router-dom";

export default function EditProducts () {

    const {productId} = useParams();
    const [brandsData, setBrandsData] = useState([]);
    const [productsData, setProductsData] = useState({});
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
        const productData = await GetPoductsById(productId);
        setProductsData({});
        setProductsData(productData.productDetail);

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
                <h1 className="text-[28px] pb-5">تعديل منتج </h1>
                <EditProductsUi productsData={productsData} modelsData={modelsData} drive_type={drive_type} fuel_type={fuel_type} gears={gears} type={type} seat_type={seat_type} cylinders={cylinders} brandsData={brandsData} storesData={storesData} yearOptions={yearOptions} bodyType={bodyType} handleBrandId={handleBrandId} />
            </div>
        </div>
    );
};