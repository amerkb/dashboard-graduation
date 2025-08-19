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
          </div>

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
            </div>
          </div>

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
      </div>
    </div>
  );
};

export default SignIn;
