"use client";
import { useState, useEffect } from "react";
import { getCurrentUser } from "../../../lib/auth";

export default function Profile() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const currentUser = getCurrentUser();
    setUser(currentUser);
    setLoading(false);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F9FAFB] flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-gray-900 border-t-green-500 rounded-full animate-spin mb-4 mx-auto"></div>
          <p className="text-gray-500 font-black uppercase tracking-widest text-[10px]">Loading Profile...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-[#F9FAFB] flex items-center justify-center px-6">
        <div className="text-center bg-white p-12 rounded-[3rem] shadow-xl border border-gray-100 max-w-sm w-full">
          <span className="material-symbols-outlined text-6xl text-red-500 mb-4">account_circle_off</span>
          <h2 className="text-2xl font-black text-gray-900 mb-2 tracking-tighter">Login Nahi Hain</h2>
          <p className="text-gray-500 font-medium mb-8">Profile dekhne ke liye login karna lazmi hai.</p>
          <button className="w-full bg-gray-900 text-white py-4 rounded-2xl font-black hover:bg-green-600 transition-all">
            LOGIN KAREIN
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F9FAFB] pt-28 pb-20 px-4 md:px-8">
      <div className="max-w-3xl mx-auto">
        
        {/* Header Section */}
        <div className="mb-10 text-center md:text-left">
          <h1 className="text-4xl font-black text-gray-900 tracking-tighter mb-2">
            Account <span className="text-green-600">Settings</span>
          </h1>
          <p className="text-gray-500 font-medium italic">Apni profile aur account ki maloomat yahan check karein.</p>
        </div>

        {/* Profile Card */}
        <div className="bg-white rounded-[3rem] border border-gray-100 shadow-sm overflow-hidden">
          
          {/* Visual Header / Banner Area */}
          <div className="h-32 bg-gray-900 relative">
            <div className="absolute -bottom-12 left-8 md:left-12">
               <div className="w-24 h-24 bg-green-500 rounded-[2rem] border-8 border-white flex items-center justify-center shadow-lg">
                  <span className="material-symbols-outlined text-white text-4xl font-bold">person</span>
               </div>
            </div>
          </div>

          {/* User Info & Stats */}
          <div className="pt-16 pb-8 px-8 md:px-12 border-b border-gray-50">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h2 className="text-3xl font-black text-gray-900 tracking-tighter">{user.name}</h2>
                <div className="flex items-center gap-2 mt-1">
                  <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                  <span className="text-xs font-black text-gray-400 uppercase tracking-widest">
                    {user.role === 'owner' ? 'Verified Property Owner' : 'Verified Tenant'}
                  </span>
                </div>
              </div>
              <div className="bg-gray-50 px-6 py-3 rounded-2xl border border-gray-100">
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-tighter mb-1">Account ID</p>
                <p className="text-xs font-mono font-bold text-gray-900">#{user.id?.slice(-8).toUpperCase() || 'GH-99201'}</p>
              </div>
            </div>
          </div>

          {/* Details Grid */}
          <div className="p-8 md:p-12 grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              { label: "Full Name", value: user.name, icon: "badge" },
              { label: "Phone Number", value: user.phone, icon: "call" },
              { label: "Account Type", value: user.role === 'owner' ? 'Property Owner' : 'Tenant', icon: "shield_person" },
              { label: "Member Since", value: new Date(user.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }), icon: "calendar_today" }
            ].map((field, idx) => (
              <div key={idx} className="group p-6 bg-gray-50/50 rounded-[2rem] border border-transparent hover:border-green-100 hover:bg-green-50/30 transition-all duration-300">
                <div className="flex items-center gap-4 mb-3">
                  <span className="material-symbols-outlined text-gray-400 group-hover:text-green-600 transition-colors">
                    {field.icon}
                  </span>
                  <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{field.label}</span>
                </div>
                <p className="text-lg font-black text-gray-900 ml-10">{field.value}</p>
              </div>
            ))}
          </div>

          {/* Notification / Info Box */}
          <div className="mx-8 md:mx-12 mb-12 p-6 bg-green-900 rounded-[2rem] flex items-start gap-4 shadow-xl shadow-green-900/10">
            <span className="material-symbols-outlined text-green-400">info</span>
            <div>
              <p className="text-sm font-black text-white uppercase tracking-tighter mb-1">Profile Editing</p>
              <p className="text-xs text-green-100/70 font-medium leading-relaxed">
                Aapki maloomat filhal "Read-Only" mode mein hain. Agli update mein aap apna naam aur phone number tabdeel kar sakenge.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}