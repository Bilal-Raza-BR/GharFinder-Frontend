"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { getCurrentUser, logout } from "../../lib/auth";

const navigation = [
  { name: "Dashboard", href: "/dashboard", icon: "dashboard" },
  { name: "My Listings", href: "/dashboard/my-listings", icon: "inventory" },
  { name: "Add Listing", href: "/dashboard/add-listing", icon: "add_business" },
  { name: "Profile", href: "/dashboard/profile", icon: "person" },
];

export default function DashboardLayout({ children }) {
  const pathname = usePathname();
  const router = useRouter();
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    const user = getCurrentUser();
    if (!user) {
      router.replace('/auth/login');
      return;
    }

    if (user.role !== 'owner') {
      router.replace('/');
      return;
    }

    setAuthorized(true);
  }, [router]);

  if (!authorized) {
    return null;
  }

  return (
    <div className="min-h-screen bg-[#F9FAFB]">
      {/* Sidebar: 
        - top-16: Navbar ki height (64px) ke niche se shuru hoga.
        - h-[calc(100vh-64px)]: Screen height se navbar height minus kardi.
      */}
      <aside className="fixed top-16 left-0 z-40 w-72 h-[calc(100vh-64px)] bg-white border-r border-gray-100 hidden md:flex flex-col">
        
        {/* Navigation Section */}
        <nav className="flex-1 px-6 py-10 space-y-2 overflow-y-auto" aria-label="Dashboard Navigation">
          <div className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-6 ml-4">
            Owner Panel
          </div>
          
          {navigation.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center gap-4 px-5 py-4 rounded-[1.5rem] text-sm font-black transition-all duration-300 ${
                  isActive
                    ? "bg-gray-900 text-white shadow-xl shadow-gray-200 scale-[1.02]"
                    : "text-gray-500 hover:bg-gray-50 hover:text-gray-900"
                }`}
              >
                <span className={`material-symbols-outlined text-xl ${isActive ? 'text-green-500' : ''}`}>
                  {item.icon}
                </span>
                <span className="tracking-tight">{item.name}</span>
              </Link>
            );
          })}
        </nav>

        {/* Logout Section */}
        <div className="p-6 border-t border-gray-50">
          <button
            onClick={() => {
              logout();
              router.push('/auth/login');
            }}
            className="group flex items-center gap-4 px-6 py-4 w-full text-red-600 text-sm font-black hover:bg-red-600 hover:text-white rounded-[1.5rem] transition-all duration-300"
          >
            <span className="material-symbols-outlined text-xl group-hover:rotate-12 transition-transform">
              logout
            </span>
            LOGOUT
          </button>
        </div>
      </aside>

      {/* Main Content Area:
        - pl-72: Sidebar ki width (w-72) ke barabar padding left.
        - pt-16: Navbar ki height ke barabar top padding taaki content navbar ke piche na jaye.
      */}
      <main className="md:pl-72 pt-16 min-h-screen">
        <div className="p-4 md:p-8">
          {children}
        </div>
      </main>
    </div>
  );
}