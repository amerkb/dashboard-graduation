import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from "framer-motion";
import { Link, useLocation } from 'react-router-dom';
import { FaBars, FaChevronDown, FaTimes } from 'react-icons/fa';
import { navigationItems } from "../../lib/definitions"
import mainLogo from "../.././Assests/Logo.png";

export default function Sidebar({ isOpen, toggleSidebar }) {
    const [dropdownsOpen, setDropdownsOpen] = useState({
        brands: false,
        models: false,
        stores: false,
        roles: false,
        services: false,
        employees: false
    });

    const toggleDropdown = (dropdown) => {
        setDropdownsOpen(prev => ({ ...prev, [dropdown]: !prev[dropdown] }));
    };
    return (
        <div className="h-screen  rounded-xl fixed z-50 shadow-2xl">
            <motion.div
                animate={{
                    width: isOpen ? "260px" : "80px",
                    boxShadow: "4px 0 15px rgba(0, 0, 0, 0.1)"
                }}
                className="bg-main h-screen max-h-screen p-4 fixed overflow-y-auto transition-[width] duration-300 ease-in-out"
                style={{ backdropFilter: 'blur(10px)' }}
            >
                <div className="flex  items-center justify-between mb-3">
                    {isOpen && (
                        <img
                            src={mainLogo}
                            className="w-[228px] h-28 object-contain"
                            loading="eager"
                        />
                    )}
                    {/* <motion.button
                        onClick={toggleSidebar}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="p-2 rounded-lg hover:bg-white bg-white  transition-all duration-300"
                    >
                        {isOpen ? (
                            <FaTimes className="w-6 h-6 text-orange" />
                        ) : (
                            <FaBars className="w-6 h-6 text-orange" />
                        )}
                    </motion.button> */}
                </div>

                <nav className="space-y-2">
                    {navigationItems.map((item, index) => (
                        <div key={index}>   {item.static ? (
                            <div className={`relative`}>
                                <span className="text-xs uppercase tracking-widest text-white/60 px-3">
                                    {item.static}
                                </span>
                            </div>
                        )
                            : item.hr ?
                                (

                                    <hr className=" border-0 h-[0.7px] bg-gradient-to-r from-transparent via-white/30 to-transparent" />
                                )

                                : item.subItems ?
                                    (
                                        <>
                                            <SidebarItem
                                                icon={item.icon}
                                                text={item.text}
                                                isOpen={isOpen}
                                                hasDropdown={isOpen}
                                                isOpenDropdown={dropdownsOpen[item.text]}
                                                onClick={() => {
                                                    if (isOpen) {
                                                        toggleDropdown(item.text);
                                                    }
                                                }}
                                                to={!isOpen ? item.subItems[0].to : undefined}
                                            />
                                            <AnimatePresence>
                                                {dropdownsOpen[item.text] && isOpen && (
                                                    <motion.div
                                                        initial={{ opacity: 0, height: 0 }}
                                                        animate={{
                                                            opacity: 1,
                                                            height: "auto",
                                                            transition: {
                                                                type: "spring",
                                                                bounce: 0.2,
                                                                duration: 0.5
                                                            }
                                                        }}
                                                        exit={{
                                                            opacity: 0,
                                                            height: 0,
                                                            transition: {
                                                                duration: 0.2
                                                            }
                                                        }}
                                                        className="ml-4 space-y-1 border-r-2  pr-3 text-white border-white"
                                                    >
                                                        {item.subItems.map((subItem, subIndex) => (
                                                            <motion.div
                                                                key={subIndex}
                                                                initial={{ opacity: 0, x: -10 }}
                                                                animate={{ opacity: 1, x: 0 }}
                                                                exit={{ opacity: 0 }}
                                                                transition={{ delay: 0.1 * subIndex }}
                                                            >
                                                                <SidebarItem
                                                                    icon={subItem.icon}  
                                                                    text={subItem.text}  
                                                                    to={subItem.to}      
                                                                    isOpen={isOpen}
                                                                    nested={true}
                                                                />
                                                            </motion.div>
                                                        ))}
                                                    </motion.div>
                                                )}
                                            </AnimatePresence>
                                        </>
                                    ) :
                                    (
                                        <SidebarItem

                                            icon={item.icon}
                                            text={item.text}
                                            to={item.to}
                                            isOpen={isOpen}
                                        />
                                    )
                        }
                        </div>
                    ))}
                </nav>
            </motion.div>
        </div>
    );
}

function SidebarItem({ icon, text, to, isOpen, hasDropdown, isOpenDropdown, nested, onClick }) {
    const Component = to ? motion(Link) : motion.div;
    const location = useLocation();
    const isActive = location.pathname === to;

    return (
        <Component
            to={to}
            onClick={!to ? onClick : undefined}
            initial={{ scale: 0.95 }}
            animate={{ scale: 1 }}
            whileHover={!hasDropdown ? {
                translateX: 5,
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                scale: 1.02

            } : {}}
            whileTap={{ scale: 0.98 }}
            transition={{ type: "spring", stiffness: 300 }}
            className={`group flex items-center p-3 rounded-xl transition-all duration-300 cursor-pointer 
                ${isActive ? 'bg-white/10 shadow-inner border-l-4 border-white' : ''}
                ${nested ? "pl-6 text-sm" : "text-base"
                } ${location.pathname === to
                    ? "bg-white/20 backdrop-blur-sm shadow-lg "
                    : "hover:bg-white/40 hover:shadow-xl"
                }`}

        >
            <span className={`transform transition-transform duration-300 text-white font-bold
             ${location.pathname === to
                    ? "text-black/70 scale-110"
                    : "text-white group-hover:scale-110"
                }`}>
                {icon}
            </span>

            {isOpen && (
                <motion.span
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    className={`mx-3 font-medium tracking-wide ${location.pathname === to
                        ? "text-white font-semibold"
                        : "text-white"
                        }`}
                >
                    {text}
                </motion.span>
            )}

            {hasDropdown && isOpen && (
                <motion.span
                    animate={{ rotate: isOpenDropdown ? 180 : 0 }}
                    className={`ml-auto transition-colors ${location.pathname === to
                        ? "text-orange-300"
                        : "text-white"
                        }`}
                >
                    <FaChevronDown />
                </motion.span>
            )}
        </Component>
    );
}
