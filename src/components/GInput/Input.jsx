import React from 'react';  
import { useSearchParams, useNavigate, useLocation } from 'react-router-dom';
import { useDebouncedCallback } from 'use-debounce';

const InputFieldWithIcon = ({ placeholder, onchange, icon, paramkey }) => {  

    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const location = useLocation();
    const pathname = location.pathname;

    const handleSearch = useDebouncedCallback( (term) => {
        const params = new URLSearchParams(searchParams);  
        if (term) {
          params.set(`${paramkey}`,term);
        }
        else
          params.delete(`${paramkey}`);
          navigate(`${pathname}?${params.toString()}`);
    },1700);

    const handleChange = (e) => {
        const value = e.target.value;

        if(onchange)
            onchange(e);
    
        handleSearch(value);
    };
    return (  
        <div className="relative">  
            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">  
                {icon}
            </span>  
            <input  
                type="text"    
                onChange={handleChange}  
                placeholder={placeholder}  
                className="block w-full h-12 pl-10 pr-4 border border-gray rounded-md "  
            />  
        </div>  
    );  
};  

export default InputFieldWithIcon;