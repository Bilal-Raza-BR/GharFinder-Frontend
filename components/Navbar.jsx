"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { getCurrentUser, logout } from "../lib/auth";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setUser(getCurrentUser());
    setMounted(true);
  }, []);

  const handleLogout = () => {
    logout();
    setUser(null);
  };

  return (
    <nav className="fixed top-0 w-full z-50 bg-white/90 backdrop-blur-lg border-b border-gray-100">
      <div className="max-w-7xl mx-auto flex justify-between items-center h-20 px-6 md:px-8">
        
        {/* LOGO & MOBILE MENU TOGGLE */}
        <div className="flex items-center gap-4">
          <button 
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 hover:bg-gray-50 transition-colors rounded-xl md:hidden border border-gray-100 text-gray-600"
          >
            <span className="material-symbols-outlined text-green-600">
              {isOpen ? "close" : "menu"}
            </span>
          </button>
          <Link href="/" className="text-2xl font-black text-green-600 tracking-tighter flex items-center gap-1">
            GharFinder<span className="text-gray-900 text-3xl leading-none">.</span>
          </Link>
        </div>

        {/* DESKTOP MENU */}
        <div className="hidden md:flex items-center gap-10">
          <div className="flex items-center gap-8">
            <Link href="/listings" className="text-sm font-bold text-gray-600 hover:text-green-600 transition-colors">Browse</Link>
            <Link href="/about" className="text-sm font-bold text-gray-600 hover:text-green-600 transition-colors">About Us</Link>
            {user && user.role === 'owner' && (
              <Link href="/dashboard" className="text-sm font-bold text-gray-600 hover:text-green-600 transition-colors">Dashboard</Link>
            )}
          </div>

          <div className="h-6 w-[1px] bg-gray-200"></div>

          <div className="flex items-center gap-6">
            {mounted && user ? (
              <>
                <button 
                  onClick={handleLogout}
                  className="text-sm font-bold text-gray-500 hover:text-red-500 transition-colors"
                >
                  Logout
                </button>
                {user.role === 'owner' && (
                  <Link href="/dashboard/add-listing" className="bg-green-600 text-white px-6 py-2.5 rounded-2xl font-bold text-sm shadow-xl shadow-green-100 hover:bg-green-700 hover:-translate-y-0.5 transition-all">
                    Post Property
                  </Link>
                )}
              </>
            ) : (
              <>
                <Link href="/auth/login" className="text-sm font-bold text-gray-700 hover:text-green-600 transition-colors">Login</Link>
                <Link href="/auth/login" className="bg-green-600 text-white px-6 py-2.5 rounded-2xl font-bold text-sm shadow-xl shadow-green-100 hover:bg-green-700 hover:-translate-y-0.5 transition-all">
                  Post Property
                </Link>
              </>
            )}
          </div>
        </div>
      </div>

        {/* MOBILE DRAWER */}
      {isOpen && (
        <div className="md:hidden absolute top-20 left-0 w-full bg-white border-b border-gray-100 p-6 flex flex-col gap-6 shadow-2xl animate-in slide-in-from-top duration-300">
          <div className="flex flex-col gap-4">
            <Link href="/" className="text-lg font-bold text-gray-900" onClick={() => setIsOpen(false)}>Home</Link>
            <Link href="/listings" className="text-lg font-bold text-gray-900" onClick={() => setIsOpen(false)}>Browse Properties</Link>
            <Link href="/about" className="text-lg font-bold text-gray-900" onClick={() => setIsOpen(false)}>About Us</Link>
            {user && user.role === 'owner' && (
              <Link href="/dashboard" className="text-lg font-bold text-gray-900" onClick={() => setIsOpen(false)}>Dashboard</Link>
            )}
          </div>
          
          <div className="pt-6 border-t border-gray-100 flex flex-col gap-4">
            {user ? (
              <>
                {user.role === 'owner' && (
                  <Link href="/dashboard/add-listing" className="bg-green-600 text-white px-6 py-4 rounded-2xl font-bold text-center shadow-lg" onClick={() => setIsOpen(false)}>
                    Post Property
                  </Link>
                )}
                <button 
                  onClick={() => { setIsOpen(false); handleLogout(); }}
                  className="text-lg font-bold text-red-500 text-center py-2"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link href="/auth/login" className="text-lg font-bold text-gray-900 text-center py-2" onClick={() => setIsOpen(false)}>Login</Link>
                <Link href="/auth/login" className="bg-green-600 text-white px-6 py-4 rounded-2xl font-bold text-center shadow-lg" onClick={() => setIsOpen(false)}>
                  Post Property
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}