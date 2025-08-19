import { Helper } from "../lib/helper";
import { AUTH_TOKEN_KEY, AUTH_USER_KEY } from "../lib/helper";

export async function loginService({ email, password }) {
  const formData = new FormData();
  formData.append("email", email);
  formData.append("password", password);

  try {
    const res = await Helper.Post({ url: "/login", data: formData, config: {
      headers: { "Content-Type": "multipart/form-data" },
    }});

    // توقّع: { user: {...}, token: "..." }
    const { data } = res || {};
    const token = data?.token;
    const user  = data?.user;

    if (!token) throw { status: 500, data: { message: "Token not returned" } };

    localStorage.setItem(AUTH_TOKEN_KEY, token);
    if (user) localStorage.setItem(AUTH_USER_KEY, JSON.stringify(user));

    return { token, user };
  } catch (err) {
    // err هنا ممكن يكون error.response من Helper.Post
    const status  = err?.status || err?.statusCode || 0;
    const message = err?.data?.message || "Login failed";
    // توحيد الرسائل الشائعة
    if (status === 401 && message === "Unauthorized")
      throw new Error("بيانات الدخول غير صحيحة.");
    throw new Error(message);
  }
}

export function logoutService() {
  localStorage.removeItem(AUTH_TOKEN_KEY);
  localStorage.removeItem(AUTH_USER_KEY);
}

export function isAuthenticated() {
  return !!localStorage.getItem(AUTH_TOKEN_KEY);
}
