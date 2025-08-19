<<<<<<< HEAD
// src/pages/auth/login.jsx
import React, { useState, useCallback } from "react";
import university from "../../Assests/university.jpg";
import Logo from "../../Assests/Logo.png";
import { MdEmail } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";

import { Helper, AUTH_TOKEN_KEY, AUTH_USER_KEY } from "../../lib/helper";

const SignIn = () => {
  // form state
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  // --- Snackbar (Tailwind-only) ---
  const [toasts, setToasts] = useState([]);
  const removeToast = useCallback((id) => {
    setToasts((t) => t.filter((x) => x.id !== id));
  }, []);
  const showToast = useCallback((message, type = "info", duration = 3000) => {
    const id = `${Date.now()}-${Math.random()}`;
    setToasts((t) => [...t, { id, message, type }]);
    if (duration) setTimeout(() => removeToast(id), duration);
  }, [removeToast]);

  // --- Submit ---
  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);

    try {
      // مثل Postman: نرسل form-data
      const formData = new FormData();
      formData.append("email", email);
      formData.append("password", password);

      const res = await Helper.Post({
        url: "/login",
        data: formData,
        config: { headers: { "Content-Type": "multipart/form-data" } },
      });

      // نتوقّع { user: {...}, token: "..." }
      const { data } = res || {};
      const token = data?.token;
      const user  = data?.user;

      if (!token) throw { status: 500, data: { message: "Token not returned" } };

      // تخزين التوكن والمستخدم؛ سيقرأه الـ interceptor من نفس المفاتيح
      localStorage.setItem(AUTH_TOKEN_KEY, token);
      if (user) localStorage.setItem(AUTH_USER_KEY, JSON.stringify(user));

      showToast("تم تسجيل الدخول بنجاح ✅", "success", 1800);

      // تحويل للواجهة بعد لحظة
      setTimeout(() => {
        // إن أردت اعتماد الراوتر: استخدم useNavigate("/") بدلاً من السطر التالي
        window.location.href = "http://localhost:3000/";
      }, 600);
    } catch (err) {
      // Helper.Post يرمي error.response -> فيها status و data.message
      const status  = err?.status || 0;
      const message = err?.data?.message || "Login failed";

      if (status === 401 && message === "Unauthorized") {
        showToast("بيانات الدخول غير صحيحة.", "error");
      } else if (status) {
        showToast(`فشل تسجيل الدخول (HTTP ${status}).`, "error");
      } else {
        showToast("تعذّر الاتصال بالخادم. حاول مجددًا.", "error");
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex min-h-screen w-full">
      {/* Toast container */}
      <div className="fixed top-4 inset-x-0 z-[9999] flex flex-col items-center gap-2 px-4 pointer-events-none">
        {toasts.map((t) => (
          <div
            key={t.id}
            className={`pointer-events-auto w-full max-w-md rounded-xl border shadow-lg bg-white/90 backdrop-blur px-4 py-3 flex items-start gap-3 transition-all
              ${t.type === "success" ? "border-green-200" : t.type === "error" ? "border-red-200" : "border-slate-200"}`}
          >
            <span
              className={`mt-0.5 inline-flex h-5 w-5 items-center justify-center rounded-full
                ${t.type === "success" ? "bg-green-500" : t.type === "error" ? "bg-red-500" : "bg-sky-500"}`}
              aria-hidden
            />
            <div className="text-sm text-slate-800" dir="rtl">{t.message}</div>
            <button
              onClick={() => removeToast(t.id)}
              className="ml-auto text-slate-400 hover:text-slate-700"
              aria-label="Close"
            >
              ×
            </button>
          </div>
        ))}
      </div>

      {/* LEFT PANEL (Sign In Form) */}
      <div className="flex w-full flex-col justify-center px-8 py-10 lg:w-1/2 lg:px-16 bg-[#eaeaeb] shadow-md" dir="rtl">
        <div className="mb-8 flex justify-center">
          <img src={Logo} alt="University Logo" className="w-60" />
        </div>

        <h2 className="mb-2 text-center text-3xl font-bold text-gray-900">تسجيل الدخول</h2>

        <form onSubmit={handleSubmit} className="mt-4">
          {/* Email */}
          <div className="mb-4">
            <label htmlFor="email" className="mb-1 block text-right text-sm font-medium text-gray-700">
              البريد الإلكتروني
            </label>
            <div className="relative">
              <input
                type="email"
                id="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 pr-10 text-gray-700 shadow-sm"
                placeholder="email@gmail.com"
              />
              <span className="absolute inset-y-0 right-3 flex items-center text-gray-400">
                <MdEmail />
              </span>
            </div>
=======
import React, { useState } from 'react';
import university from '../../Assests/university.jpg';
import Logo from '../../Assests/Logo.png';
import { MdEmail } from 'react-icons/md';
import { RiLockPasswordFill } from 'react-icons/ri';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';

const SignIn = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ email, password });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4 sm:p-6 lg:p-8">
      <div className="w-full max-w-6xl bg-white rounded-2xl shadow-xl overflow-hidden grid grid-cols-1 md:grid-cols-2">
        {/* Image for md+ as background */}
        <div className="hidden md:block relative">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: `url(${university})`,
            }}
            aria-hidden="true"
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                'linear-gradient(180deg, rgba(125,34,75,0.78) 0%, rgba(125,34,75,0.55) 40%, rgba(0,0,0,0.25) 100%)',
            }}
          />
          <div className="relative z-10 h-full flex flex-col items-center justify-center text-center p-8 text-white">
            <img src={Logo} alt="Logo" className="w-28 md:w-36 mb-4 md:mb-6" />
            <h3 className="text-lg md:text-2xl font-bold">مرحبا بكم في الجامعة</h3>
            <p className="mt-3 max-w-xs text-sm md:text-base opacity-90 leading-relaxed">
              سجّل دخولك للوصول إلى المواد، الإعلانات وفرص العمل.
            </p>
>>>>>>> ce7dd8391f0064da7f81ca624b3af4b9bb68daa1
          </div>

<<<<<<< HEAD
          {/* Password */}
          <div className="mb-4">
            <label htmlFor="password" className="mb-1 block text-right text-sm font-medium text-gray-700">
              كلمة المرور
            </label>
            <div className="relative">
              <input
                type="password"
                id="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 pr-10 text-gray-700 shadow-sm"
                placeholder="••••••••"
              />
              <span className="absolute inset-y-0 right-3 flex items-center text-gray-400">
                <RiLockPasswordFill />
              </span>
=======
        {/* For small screens: image block above form */}
        <div className="md:hidden w-full">
          <img
            src={university}
            alt="university"
            className="w-full h-40 sm:h-56 object-cover"
          />
          <div className="w-full -mt-14 flex justify-center">
            <div className="bg-white rounded-xl p-3 shadow-md flex items-center gap-3">
              <img src={Logo} alt="logo" className="w-16" />
              <div className="text-right">
                <div className="text-sm font-semibold">مرحبا بكم في الجامعة</div>
                <div className="text-xs text-gray-500">سجّل دخولك للوصول للمزايا</div>
              </div>
>>>>>>> ce7dd8391f0064da7f81ca624b3af4b9bb68daa1
            </div>
          </div>

<<<<<<< HEAD
          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className={`mb-4 w-full rounded-md bg-main px-4 py-2 text-white shadow-lg transition-transform duration-300
              ${loading ? "opacity-70 cursor-not-allowed" : "hover:scale-[1.01]"}`}
          >
            {loading ? (
              <span className="inline-flex items-center gap-2">
                <span className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-white border-r-transparent" />
                جارِ التحقق...
              </span>
            ) : (
              "تسجيل الدخول"
            )}
          </button>
        </form>
      </div>

      {/* RIGHT PANEL (Background) */}
      <div
        className="relative hidden h-screen w-1/2 overflow-hidden bg-cover bg-center lg:block"
        style={{ backgroundImage: `url(${university})` }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-30"></div>
=======
        {/* Form */}
        <div className="p-6 sm:p-8 md:p-10" dir="rtl">
          <div className="mx-auto w-full max-w-md">
            {/* hidden logo on md+ because left shows it */}
            <div className="flex justify-center md:hidden mb-6">
              <img src={Logo} alt="Logo" className="w-36 sm:w-44" />
            </div>

            <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 mb-2 text-center">تسجيل الدخول</h2>
            <p className="text-sm sm:text-base text-gray-500 mb-6 text-center">أدخل بيانات حسابك للمتابعة</p>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Email */}
              <label className="block text-right">
                <span className="text-sm sm:text-base font-medium text-gray-700">البريد الإلكتروني</span>
                <div className="relative mt-2">
                  <input
                    type="email"
                    id="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="email@gmail.com"
                    className="w-full pr-10 pl-4 py-2.5 sm:py-3 rounded-lg border border-gray-200 bg-white text-right placeholder-gray-400 shadow-sm text-sm sm:text-base
                      focus:outline-none focus:ring-2 focus:ring-[#7d224b] focus:border-transparent transition"
                    aria-label="البريد الإلكتروني"
                  />
                  <span className="absolute inset-y-0 right-3 flex items-center text-[#7d224b]">
                    <MdEmail size={18} />
                  </span>
                </div>
              </label>

              {/* Password */}
              <label className="block text-right">
                <span className="text-sm sm:text-base font-medium text-gray-700">كلمة المرور</span>
                <div className="relative mt-2">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    id="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full pr-12 pl-4 py-2.5 sm:py-3 rounded-lg border border-gray-200 bg-white text-right placeholder-gray-400 shadow-sm text-sm sm:text-base
                      focus:outline-none focus:ring-2 focus:ring-[#7d224b] focus:border-transparent transition"
                    aria-label="كلمة المرور"
                  />
                  <div className="absolute inset-y-0 right-3 flex items-center gap-2">
                    <span className="text-[#7d224b]">
                      <RiLockPasswordFill size={16} />
                    </span>
                    <button
                      type="button"
                      onClick={() => setShowPassword((s) => !s)}
                      className=" rounded-md focus:outline-none focus:ring-2 focus:ring-[#7d224b]/40"
                      aria-label={showPassword ? 'اخفاء كلمة المرور' : 'إظهار كلمة المرور'}
                    >
                      {showPassword ? <AiOutlineEyeInvisible size={16} /> : <AiOutlineEye size={16} />}
                    </button>
                  </div>
                </div>
              </label>

              {/* Extras */}
              <div className="flex flex-col sm:flex-row items-center sm:justify-between gap-3 text-sm sm:text-base text-gray-600">
                <label className="inline-flex items-center gap-2">
                  <input type="checkbox" className="rounded border-gray-300 text-[#7d224b] focus:ring-[#7d224b]" />
                  <span>تذكرني</span>
                </label>

                <a href="#" className="text-[#7d224b] font-medium hover:underline">
                  نسيت كلمة المرور؟
                </a>
              </div>

              {/* Submit */}
              <button
                type="submit"
                className="w-full mt-2 py-2.5 sm:py-3 rounded-lg text-white font-semibold shadow-md
                 bg-gradient-to-r from-[#7d224b] to-[#5b1638] transform hover:-translate-y-0.5 transition text-sm sm:text-base"
              >
                تسجيل الدخول
              </button>

              {/* Footer small text */}
              <p className="text-center text-sm sm:text-base text-gray-500 mt-3">
                ليس لديك حساب؟{' '}
                <a href="#" className="text-[#7d224b] font-medium hover:underline">
                  إنشئ حساباً
                </a>
              </p>
            </form>
          </div>
        </div>
>>>>>>> ce7dd8391f0064da7f81ca624b3af4b9bb68daa1
      </div>
    </div>
  );
};

export default SignIn;
