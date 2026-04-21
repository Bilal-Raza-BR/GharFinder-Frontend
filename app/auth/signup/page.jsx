"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { registerUser } from "../../../lib/api";
import { useToast } from "../../../components/toast/ToastProvider";

export default function Signup() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    password: "",
    confirmPassword: "",
    role: "tenant",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { addToast } = useToast();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // Basic Validations
    if (formData.name.length < 2) {
      setError("Naam kam az kam 2 characters ka hona chahiye");
      return;
    }

    const phoneRegex = /^(\+92|92|0)?[3][0-4][0-9]{8}$/;
    if (!phoneRegex.test(formData.phone.replace(/\s+/g, ''))) {
      setError("Sahi Pakistani phone number likhein (e.g. 03001234567)");
      return;
    }

    if (formData.password.length < 6) {
      setError("Password kam az kam 6 characters ka hona chahiye");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords aapas mein nahi mil rahe");
      return;
    }

    setLoading(true);
    try {
      const { confirmPassword, ...userData } = formData;
      await registerUser(userData);
      addToast("Account successfully created! Please login.", "success");
      setTimeout(() => {
        router.push("/auth/login");
      }, 1500);
    } catch (err) {
      setError(err.message || "Registration nakam rahi. Dobara koshish karein.");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="w-full min-h-screen bg-gray-50 pt-28 pb-12 px-4">
      <div className="max-w-md mx-auto">
        <div className="bg-white p-8 md:p-10 rounded-[2.5rem] border border-gray-100 shadow-2xl shadow-green-900/5">
          
          {/* Brand Header */}
          <div className="text-center mb-10">
            <Link href="/" className="text-2xl font-black text-green-600 tracking-tighter mb-2 inline-block">
              GharFinder<span className="text-gray-900 text-3xl leading-none">.</span>
            </Link>
            <h2 className="text-2xl font-bold text-gray-900 mt-2">Naya Account Banayein</h2>
            <p className="text-gray-500 mt-1 font-medium text-sm">Aaj hi GharFinder join karein</p>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-100 rounded-2xl text-red-600 text-xs font-bold flex items-center gap-3 animate-shake">
              <span className="material-symbols-outlined text-sm">error</span>
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Full Name */}
            <div>
              <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-2 ml-1">Full Name</label>
              <input
                name="name"
                type="text"
                required
                value={formData.name}
                onChange={handleChange}
                placeholder="John Doe"
                className="w-full px-5 py-4 bg-gray-50 border border-transparent rounded-2xl focus:bg-white focus:border-green-600 focus:ring-4 focus:ring-green-600/5 transition-all outline-none font-bold text-gray-900"
              />
            </div>

            {/* Phone */}
            <div>
              <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-2 ml-1">Phone Number</label>
              <input
                name="phone"
                type="tel"
                required
                value={formData.phone}
                onChange={handleChange}
                placeholder="0300 1234567"
                className="w-full px-5 py-4 bg-gray-50 border border-transparent rounded-2xl focus:bg-white focus:border-green-600 focus:ring-4 focus:ring-green-600/5 transition-all outline-none font-bold text-gray-900"
              />
            </div>

            {/* Role Selection */}
            <div>
              <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-3 ml-1">Main Aik Hoon:</label>
              <div className="grid grid-cols-2 gap-3">
                <label className={`flex flex-col items-center justify-center p-4 rounded-2xl border-2 transition-all cursor-pointer ${formData.role === 'tenant' ? 'border-green-600 bg-green-50 text-green-700' : 'border-gray-100 bg-gray-50 text-gray-400 hover:border-gray-200'}`}>
                  <input type="radio" name="role" value="tenant" checked={formData.role === "tenant"} onChange={handleChange} className="hidden" />
                  <span className="material-symbols-outlined mb-1">search</span>
                  <span className="text-[10px] font-black uppercase">Tenant</span>
                </label>
                <label className={`flex flex-col items-center justify-center p-4 rounded-2xl border-2 transition-all cursor-pointer ${formData.role === 'owner' ? 'border-green-600 bg-green-50 text-green-700' : 'border-gray-100 bg-gray-50 text-gray-400 hover:border-gray-200'}`}>
                  <input type="radio" name="role" value="owner" checked={formData.role === "owner"} onChange={handleChange} className="hidden" />
                  <span className="material-symbols-outlined mb-1">real_estate_agent</span>
                  <span className="text-[10px] font-black uppercase">Owner</span>
                </label>
              </div>
            </div>

            {/* Password */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-2 ml-1">Password</label>
                <input
                  name="password"
                  type="password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className="w-full px-5 py-4 bg-gray-50 border border-transparent rounded-2xl focus:bg-white focus:border-green-600 transition-all outline-none font-bold text-gray-900"
                />
              </div>
              <div>
                <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-2 ml-1">Confirm</label>
                <input
                  name="confirmPassword"
                  type="password"
                  required
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className="w-full px-5 py-4 bg-gray-50 border border-transparent rounded-2xl focus:bg-white focus:border-green-600 transition-all outline-none font-bold text-gray-900"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-green-600 text-white py-4 rounded-2xl font-black shadow-xl shadow-green-100 hover:bg-green-700 hover:-translate-y-0.5 active:scale-[0.98] transition-all disabled:opacity-70 mt-4"
            >
              {loading ? "ACCOUNT BAN RAHA HAI..." : "CREATE ACCOUNT"}
            </button>
          </form>

          <p className="text-center mt-8 text-sm font-medium text-gray-500">
            Pehle se account hai?{" "}
            <Link href="/auth/login" className="text-green-600 font-black hover:underline underline-offset-4">
              SIGN IN
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}