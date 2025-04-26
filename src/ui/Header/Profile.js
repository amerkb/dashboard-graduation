import React, { useEffect, useRef, useState } from 'react';
import { IoPersonOutline } from 'react-icons/io5';
import { motion } from 'framer-motion';

const Profile = () => {
  const [open, setOpen] = useState(false);
  const userData = JSON.parse(localStorage.getItem('user'));
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <div
        className="flex gap-2 items-center justify-center cursor-pointer"
        onClick={() => setOpen(!open)}
      >
        <IoPersonOutline className="text-black" />
        <div className="data px-2 flex flex-col items-start">
          <div className="name font-semibold">{userData?.name}</div>
          <div className="role text-gray-800 dark:text-darkTextColor">
            {userData?.role}
          </div>
        </div>
      </div>
      {open && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
          className="absolute right-0 mt-2 w-40 bg-black overflow-auto  shadow-md rounded-lg p-2"
        >
          <button
            className="w-full text-left px-4 py-2 text-red-600 hover:bg-gray-100 rounded"
            onClick={() => {
              localStorage.removeItem('user');
              window.location.reload();
            }}
          >
            تسجيل الخروج
          </button>
        </motion.div>
      )}
    </div>
  );
};

export default Profile;
