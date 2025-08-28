import React, { useEffect, useState } from 'react';
import HeroPhoto from '../../Assests/top-head.png';

const SimpleTable = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // قراءة المستخدم من localStorage
    const storedUser = localStorage.getItem("auth_user");
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error("خطأ أثناء قراءة بيانات المستخدم:", error);
      }
    }
  }, []);

  return (
    <div className="p-4">
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <div
          className="relative py-10 bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 rounded-sm shadow-lg"
          style={{
            backgroundImage: `url(${HeroPhoto})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          <div className="absolute inset-0 bg-black bg-opacity-30 rounded-b-lg"></div>
          <div className="relative w-full px-6 py-8">
            <div className="flex flex-wrap justify-between text-white items-start w-full flex-col">
              <h1 className="text-3xl font-bold text-darkTextColor drop-shadow-md">
                مرحبًا بك سيد المدير 
              </h1>
              <p className="mt-2 text-lg text-gray-200 drop-shadow-sm">
                {user
                  ? "تابع تأثير موقعك الإلكتروني من خلال الإحصائيات التفصيلية"
                  : "سجّل دخولك لمشاهدة إحصائيات موقعك"}
              </p>
             
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SimpleTable;
