import React from 'react';
import { useSearchParams, useNavigate, useLocation } from 'react-router-dom';

const DropDown = ({ options, defaultText, value, onchange, paramkey }) => {

    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const location = useLocation();
    const pathname = location.pathname;

    const handleSearch = (term) => {
        const params = new URLSearchParams(searchParams);
        if (term) {
            params.set(`${paramkey}`, term);
        }
        else
            params.delete(`${paramkey}`);
        navigate(`${pathname}?${params.toString()}`);
    };

    const handleChange = (e) => {
        const value = e.target.value;

        if (onchange)
            onchange(value);

        handleSearch(value);
    };

    

    return (
        <select name={paramkey} onChange={handleChange} value={value || ""} className="block w-full h-[42px] px-4 border text-gray bg-white border-orange rounded-md " defaultValue="">
            <option value="" disabled className='text-gray'>{defaultText}</option>
            {options?.map((option, index) => (
                <option key={index} value={option?.id}>
                    {option?.name}
                </option>
            ))}
        </select>
    );
};

export default DropDown;