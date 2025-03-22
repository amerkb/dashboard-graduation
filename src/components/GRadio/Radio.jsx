import React from 'react';  
import { useSearchParams, useNavigate, useLocation } from 'react-router-dom';

const Radio = ({ placeholder, value, paramkey, paramValue }) => {  

    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const location = useLocation();
    const pathname = location.pathname;

    const handleSearch = () => {
        const params = new URLSearchParams(searchParams);  
        if (paramValue) {
          params.set(`${paramkey}`, paramValue);
        }
        else
          params.delete(`${paramkey}`);
          navigate(`${pathname}?${params.toString()}`);
    };

    return (  
        <label className="flex items-center text-sm md:text-base">
            <input checked={value == placeholder ? 1 : 0} type="checkbox" onChange={handleSearch} className="form-checkbox custom-checkbox" />
            <span className="mr-3 text-gray-700 text-[17px]">{placeholder == "new" ? "جديد" : "مستعمل"}</span>  
        </label>  
    );  
};  

export default Radio;