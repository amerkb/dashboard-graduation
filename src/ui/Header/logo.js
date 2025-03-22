import React from "react";
import ProfilePhoto from "../../Assets/images/icons/user.png";
import { IoMdCloseCircleOutline } from "react-icons/io";
import { useDispatch } from "react-redux";
import { setTOGGLE } from "../../Redux/SidebarReducer";
import DarkModeLogo from "../../Assets/images/logo.png";
import MainLogo from "../../Assets/images/main-logo.svg";

const Logo = ({ thememode }) => {
  const dispatch = useDispatch();
  return (
    <div className="w-full b-[#f3f3f3] border-b-2 h-[4rem] flex justify-between md:justify-center px-2 md:px-0 items-center">
      <p className="text-start md:text-center block">
        <img
          className={ProfilePhoto}
          src={
            thememode === "light"
              ? MainLogo
              : DarkModeLogo
          }
        />
      </p>
      <div
        className="close block md:hidden cursor-pointer"
        onClick={() => {
          dispatch(setTOGGLE(false));
        }}
      >
        <IoMdCloseCircleOutline size={"1.3rem"} />
      </div>
    </div>
  );
};

export default Logo;
