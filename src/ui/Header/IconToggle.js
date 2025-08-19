import { useState } from "react";

const IconToggle = ({ onClick }) => {
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    if (onClick) onClick(); // استدعاء الفنكشن الجاي من الأب
  };

  return (
    <div
      onClick={handleClick}
      className="w-[22px] cursor-pointer md:block"
    >
      {/* الخط الأول */}
      <div
        className={`w-full h-[2px] mb-[4px] bg-main transition-all duration-300
          ${open ? "rotate-45 translate-y-[6px]" : ""}`}
      ></div>

      {/* الخط الثاني */}
      <div
        className={`h-[2px] mb-[4px] bg-main transition-all duration-300
          ${open ? "opacity-0" : "w-3/4"}`}
      ></div>

      {/* الخط الثالث */}
      <div
        className={`h-[2px] bg-main transition-all duration-300
          ${open ? "-rotate-45 -translate-y-[6px]" : "w-1/2"}`}
      ></div>
    </div>
  );
};

export default IconToggle;
