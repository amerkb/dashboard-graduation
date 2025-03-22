import React from "react";
import { useSelector, useDispatch } from "react-redux";
// import SetElementSidebarReducer, {
//   setTOGGLE,
// } from "../../Redux/SidebarReducer";
const IconToggle = () => {
  // const toggle = useSelector((state) => state.Sidebar.toggle);
  // const dispatch = useDispatch();
  // const handleClick = () => {
  //   dispatch(setTOGGLE(!toggle));
  // };
  return (
    <div
      className={`w-[22px] cursor-pointer ${true ? "hidden md:block" : ""}`}
      // onClick={handleClick}
    >
      <div className="w-full h-[2px] mb-[4px] bg-main"></div>
      <div
        className={`h-[2px] mb-[4px] bg-main duration-300 ${
          true ? "w-3/4" : "w-full"
        }`}
      ></div>
      <div
        className={`h-[2px] mb-[4px] bg-main duration-300 ${
          true ? "w-1/2" : "w-full"
        }`}
      ></div>
    </div>
  );
};

export default IconToggle;
