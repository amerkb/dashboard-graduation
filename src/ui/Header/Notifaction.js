import React, { useEffect, useRef, useState } from 'react';
import { IoIosNotifications } from 'react-icons/io';

const Notification = () => {
  const [open, setOpen] = useState(false);
  const notifications = [
    'New message from John',
    'Your order has been shipped',
    'Update your profile',
  ];
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Notification Icon */}
      <IoIosNotifications
        onClick={() => setOpen(!open)}
        className="text-gray-600 dark:text-darkTextColor text-3xl cursor-pointer hover:text-gray-600 transition duration-300"
      />

      {/* Notification Dropdown */}
      <ul
        className={`absolute bg-white shadow-lg rounded-lg text-gray-600 right-3 mt-2 w-64 z-50
          transform transition-all duration-300 ease-in-out ${
            open
              ? 'scale-100 opacity-100'
              : 'scale-75 opacity-0 pointer-events-none'
          }`}
      >
        {/* Header */}
        <li className="px-4 py-2 font-bold text-gray-700 dark:text-gray-50 dark:bg-gray-900 rounded-t-lg">
          Notifications
        </li>

        {/* Notifications List */}
        {notifications.length > 0 ? (
          notifications.map((notification, index) => (
            <li
              key={index}
              className="px-4 py-2 text-sm bg-secondary dark:bg-darkPrimary text-textColor dark:text-darkTextColor hover:bg-gray-300 dark:hover:bg-gray-900 cursor-pointer transition duration-300 flex justify-between items-center"
            >
              <span>{notification}</span>
            </li>
          ))
        ) : (
          <li className="px-4 py-2 text-center text-sm text-gray-500">
            No new notifications.
          </li>
        )}

        {/* Footer */}
        <li className="px-4 py-2 text-center text-blue-500 cursor-pointer dark:bg-gray-900 hover:bg-gray-100 dark:hover:bg-gray-600 transition duration-300 rounded-b-lg">
          View All
        </li>
      </ul>
    </div>
  );
};

export default Notification;
