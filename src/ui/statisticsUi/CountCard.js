import React from "react";

const CountCard = ({ title, count, Icon }) => {

  return (
    <div className="bg-white shadow-lg rounded-2xl p-6 w-72 h-44 flex flex-col items-center justify-evenly text-center transition duration-300 hover:scale-105">
      {/* Icon */}
      <div className="flex items-center justify-center">
        {/* size as number (px) is more consistent */}
        <Icon size={40} className="text-[#7d224b]" />
      </div>
      {/* Title */}
      <h2 className={` text-base font-bold`}>
        {title}
      </h2>
      {/* Count */}
      <div className={`text-black  text-3xl font-extrabold`}>
        {Number(count || 0).toLocaleString()}
      </div>


    </div>
  );
};

export default CountCard;
