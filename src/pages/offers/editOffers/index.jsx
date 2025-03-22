
import React, {useState, useEffect} from "react";
import EditOffersUi from "../../../ui/offersUi/EditOffers";
import { useParams } from "react-router-dom";
import { GetOfferById, GetPoductsById, GetProducts } from "../../../lib/data";

export default function EditOffers () {

    const {offerId} = useParams();
    const [offersData, setOffersData] = useState({});
    const [productsData, setProductsData] = useState([]);
    
    useEffect (()=>{
        handleApi();
    },[])
    
    const handleApi = async () => {
        const offerData = await GetOfferById(offerId);
        setOffersData(offerData);
        const productData = await GetProducts();
        setProductsData(productData.data);
    };

    return(
        <div className="p-6">
            <div>
                <h1 className="text-[28px] pb-5">تعديل عرض </h1>
                <EditOffersUi productsData={productsData} offersData={offersData} />
            </div>
        </div>
    );
};