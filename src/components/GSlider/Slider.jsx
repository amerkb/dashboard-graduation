import React, { useState, useEffect } from "react";
import { useSearchParams, useNavigate, useLocation } from 'react-router-dom';

const PriceRangeSlider = ({minPrice, maxPrice}) => {
  
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const location = useLocation();
  const pathname = location.pathname;
    
  const defaultMinPrice = 25000;  
  const defaultMaxPrice = 75000;  
  const [sliderOneValue, setSliderOneValue] = useState(minPrice || defaultMinPrice);
  const [sliderTwoValue, setSliderTwoValue] = useState(maxPrice || defaultMaxPrice);
  const minGap = 500;
  const sliderMaxValue = 100000; 


  useEffect(() => {  
    setSliderOneValue(minPrice || defaultMinPrice);  
  }, [minPrice]);  

  useEffect(() => {  
    setSliderTwoValue(maxPrice || defaultMaxPrice);  
  }, [maxPrice]); 

  const slideOne = (value) => {
    if (parseInt(sliderTwoValue) - parseInt(value) <= minGap) {
      setSliderOneValue(parseInt(sliderTwoValue) - minGap);
    } else {
      setSliderOneValue(value);
    }
  };

  const slideTwo = (value) => {
    if (parseInt(value) - parseInt(sliderOneValue) <= minGap) {
      setSliderTwoValue(parseInt(sliderOneValue) + minGap);
    } else {
      setSliderTwoValue(value);
    }
  };

  const fillColor = () => {
    const percent1 = (sliderOneValue / sliderMaxValue) * 100;
    const percent2 = (sliderTwoValue / sliderMaxValue) * 100;
    return `linear-gradient(to left, #dadae5 ${percent1}% , #EBAC32 ${percent1}% , #EBAC32 ${percent2}%, #dadae5 ${percent2}%)`;
  };

  const handleSearchMin = (value) => {
      slideOne(value)
      const params = new URLSearchParams(searchParams);  
      if (value) {
        params.set(`MinPrice`,sliderOneValue);
      }
      else
        params.delete(`MinPrice`);
        navigate(`${pathname}?${params.toString()}`);
  };

  const handleSearchMax = (value) => {
      slideTwo(value)
      const params = new URLSearchParams(searchParams);  
      if (value) {
        params.set(`MaxPrice`,sliderTwoValue);
      }
      else
        params.delete(`MaxPrice`);
        navigate(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="relative w-full max-w-md mx-auto">

      <div className="flex justify-between text-gray-900 font-medium mb-2">
        <span>{sliderOneValue} $</span>
        <span>{sliderTwoValue} $</span>
      </div>

      <div className="relative">
        <div
          className="absolute top-1/2 left-0 right-0 h-1 bg-gray-300"
          style={{ background: fillColor() }}
        ></div>
        <input
          type="range"
          min="0"
          step="500"
          max={sliderMaxValue}
          value={sliderOneValue}
          onChange={(e) => handleSearchMin(e.target.value)}
          className="absolute w-full bg-transparent appearance-none pointer-events-auto"
          style={{ WebkitAppearance: "none" }}
        />
        <input
          type="range"
          min="0"
          step="500"
          max={sliderMaxValue}
          value={sliderTwoValue}
          onChange={(e) => handleSearchMax(e.target.value)}
          className="absolute w-full bg-transparent appearance-none pointer-events-auto"
          style={{ WebkitAppearance: "none" }}
        />
      </div>
    </div>
  );
};

export default PriceRangeSlider;
