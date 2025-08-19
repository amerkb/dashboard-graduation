import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import ApplicationRoutes from './routes/route';
import { Header } from './ui/layout/Header';
import Hero from './ui/layout/Hero';
import Sidebar from './ui/layout/SideBar';

export default function AppContent() {
  const location = useLocation();
  const isLoginPage = location.pathname === '/login';

  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleResize = () => {
    if (window.innerWidth < 968) {
      setIsSidebarOpen(false);
    }
  };

  // useEffect(() => {

  //     window.addEventListener('resize', handleResize);

  //     handleResize();

  //     return () => {
  //         window.removeEventListener('resize', handleResize);
  //     };
  // }, []);

  useEffect(() => {
    const contentElement = document.querySelector('.content');
    if (isSidebarOpen && !isLoginPage) {
      contentElement.style.paddingRight = '260px';
    } else if (!isSidebarOpen && !isLoginPage) {
      contentElement.style.paddingRight = '80px';
    } else {
      contentElement.style.paddingRight = '0px';
    }
  }, [isSidebarOpen, location.pathname]);

  return (
    <>
      {!isLoginPage && (
        <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      )}
      <div className="content h-screen overflow-auto w-[100%] bg-[#f3f4f9]  relative">
        {!isLoginPage && <Header toggleSidebar={toggleSidebar} />}
        {!isLoginPage && <Hero />}
        <ApplicationRoutes />
      </div>
    </>
  );
}
