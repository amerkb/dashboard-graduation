import React, { useEffect } from 'react';
import university from '../../Assests/university.jpg';
import Logo from '../../Assests/Logo.png';
// import AOS from "aos";
import { MdEmail } from 'react-icons/md';
import { RiLockPasswordFill } from 'react-icons/ri';

const SignIn = () => {
  // useEffect(() => {
  //   AOS.init({
  //     duration: 1200,
  //     easing: "ease-in-out-quad",
  //     once: true,
  //     delay: 300,
  //   });
  //   return () => AOS.refresh();
  // }, []);

  return (
    <div className="flex min-h-screen w-full">
      {/* LEFT PANEL (Sign In Form) */}
      <div
        className="flex w-full flex-col justify-center px-8 py-10 lg:w-1/2 lg:px-16 bg-[#eaeaeb] shadow-md"
        dir="rtl"
      >
        {/* Logo */}
        <div data-aos="zoom-in" className="mb-8 flex justify-center">
          <img src={Logo} alt="University Logo" className="w-60" />
        </div>

        {/* Sign In Header */}
        <h2 className="mb-2 text-center text-3xl font-bold text-gray-900">
          تسجيل الدخول
        </h2>

        {/* Email */}
        <div className="mb-4">
          <label
            htmlFor="email"
            className="mb-1 block text-right text-sm font-medium text-gray-700"
          >
            البريد الإلكتروني
          </label>
          <div className="relative">
            <input
              type="email"
              id="email"
              className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 pr-10 text-gray-700 shadow-sm "
              placeholder="email@gmail.com"
            />
            <span className="absolute inset-y-0 right-3 flex items-center text-gray-400">
              <MdEmail />
            </span>
          </div>
        </div>

        {/* Password */}
        <div className="mb-4">
          <label
            htmlFor="password"
            className="mb-1 block text-right text-sm font-medium text-gray-700"
          >
            كلمة المرور
          </label>
          <div className="relative">
            <input
              type="password"
              id="password"
              className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 pr-10 text-gray-700 shadow-sm transition"
              placeholder="••••••••"
            />
            <span className="absolute inset-y-0 right-3 flex items-center text-gray-400">
              <RiLockPasswordFill />
            </span>
          </div>
        </div>

        {/* Sign In Button */}
        <button
          type="button"
          className="mb-4 w-full rounded-md bg-blue-600 px-4 py-2 bg-main
           text-white shadow-lg transition-transform duration-300"
        >
          تسجيل الدخول
        </button>
      </div>

      {/* RIGHT PANEL (Background) */}
      <div
        className="relative hidden h-screen w-1/2 overflow-hidden bg-cover bg-center lg:block"
        style={{
          backgroundImage: `url(${university})`,
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-30"></div>
      </div>
    </div>
  );
};

export default SignIn;
