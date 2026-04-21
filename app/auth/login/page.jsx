"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { loginUser } from "../../../lib/api";

export default function Login() {
  const [formData, setFormData] = useState({
    phone: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false); // Fix: Loading state add ki
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // Validation logic
    const phoneRegex = /^(\+92|92|0)?[3][0-4][0-9]{8}$/;
    if (!phoneRegex.test(formData.phone.replace(/\s+/g, ''))) {
      setError("Meharbani karke sahi Pakistani phone number likhein (e.g. 03001234567)");
      return;
    }

    if (formData.password.length < 6) {
      setError("Password kam az kam 6 characters ka hona chahiye");
      return;
    }

    setLoading(true);
    try {
      const result = await loginUser(formData);
      console.log('Login result:', result);
      console.log('User role:', result.data.user.role);
      localStorage.setItem('user', JSON.stringify(result.data.user));
      localStorage.setItem('token', result.data.token);
      
      const redirectUrl = sessionStorage.getItem('redirectAfterLogin');
      if (redirectUrl) {
        sessionStorage.removeItem('redirectAfterLogin');
        if (result.data.user.role !== 'owner' && redirectUrl.startsWith('/dashboard')) {
          router.push('/');
        } else {
          router.push(redirectUrl);
        }
      } else {
        const targetPath = result.data.user.role === 'owner' ? "/dashboard" : "/";
        console.log('Routing to:', targetPath);
        router.push(targetPath);
      }
    } catch (err) {
      setError(err.message || "Login nakam raha. Phone ya password check karein.");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="w-full min-h-screen bg-gray-50 flex items-center justify-center pt-20 pb-12 px-4">
      <div className="max-w-md w-full">
        <div className="bg-white p-8 md:p-10 rounded-[2.5rem] border border-gray-100 shadow-2xl shadow-green-900/5">
          
          {/* Header */}
          <div className="text-center mb-10">
            <Link href="/" className="text-3xl font-black text-green-600 tracking-tighter mb-4 inline-block">
              GharFinder<span className="text-gray-900 text-4xl leading-none">.</span>
            </Link>
            <h2 className="text-2xl font-bold text-gray-900 mt-2">Welcome Back</h2>
            <p className="text-gray-500 mt-2 font-medium">Apne account mein login karein</p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-100 rounded-2xl text-red-600 text-sm font-bold flex items-center gap-3 animate-shake">
              <span className="material-symbols-outlined text-sm">error</span>
              {error}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-2 ml-1">Phone Number</label>
              <div className="relative">
                <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-xl">call</span>
                <input
                  name="phone"
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="0300 1234567"
                  className="w-full pl-12 pr-5 py-4 bg-gray-50 border border-transparent rounded-2xl focus:bg-white focus:border-green-600 focus:ring-4 focus:ring-green-600/5 transition-all outline-none font-bold text-gray-900"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-2 ml-1">Password</label>
              <div className="relative">
                <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-xl">lock</span>
                <input
                  name="password"
                  type="password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className="w-full pl-12 pr-5 py-4 bg-gray-50 border border-transparent rounded-2xl focus:bg-white focus:border-green-600 focus:ring-4 focus:ring-green-600/5 transition-all outline-none font-bold text-gray-900"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-green-600 text-white py-4 rounded-2xl font-black shadow-xl shadow-green-100 hover:bg-green-700 hover:-translate-y-0.5 active:scale-[0.98] transition-all disabled:opacity-70 disabled:cursor-not-allowed mt-4"
            >
              {loading ? (
                <div className="flex items-center justify-center gap-3">
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  Chaking...
                </div>
              ) : (
                "SIGN IN"
              )}
            </button>
          </form>

          {/* Footer Link */}
          <div className="mt-10 pt-6 border-t border-gray-50 text-center">
            <p className="text-gray-500 text-sm font-medium">
              Account nahi hai?{" "}
              <Link href="/auth/signup" className="text-green-600 font-black hover:underline underline-offset-4">
                REGISTER NOW
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}