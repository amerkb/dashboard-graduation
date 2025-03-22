import React, {useState, useEffect} from "react";
import AddOffersUi from "../../../ui/offersUi/AddOffersUi";
import { GetProducts } from "../../../lib/data";

export default function AddOffers () {

    const [productsData, setProductsData] = useState([]);
    const [currentPage, setcurrentPage] = useState(1);
    const [last_page, setlast_page] = useState(1);
    
    useEffect(() => {
        handleApi();
    }, [])

    const handleApi = async () => {
        const productData = await GetProducts();
        setProductsData([]);
        setcurrentPage(productData.pagination.current_page);
        setlast_page(productData.pagination.last_page);
        productData.data.map((e) => setProductsData((prev) => [...prev, e]));
    };

    return(
        <div className="p-6">
            <div>
                <h1 className="text-[28px] pb-5">إضافةعرض جديد</h1>
                <AddOffersUi productsData={productsData} />
            </div>
        </div>
    );
};