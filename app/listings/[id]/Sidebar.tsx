"use client";
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, PlusCircle, User, LogOut, Home } from 'lucide-react';
import { cn } from '@/lib/utils';

const menuItems = [
  { name: 'My Listings', href: '/dashboard', icon: LayoutDashboard },
  { name: 'Add Listing', href: '/dashboard/add-listing', icon: PlusCircle },
  { name: 'Profile Settings', href: '/dashboard/profile', icon: User },
];

export function Sidebar() {
  const pathname = usePathname();

  const handleLogout = () => {
    console.log("User logged out");
  };

  return (
    /* Yahan h-screen ki jagah h-[calc(100vh-64px)] use kiya hai 
       (64px assume kar raha hoon aapki navbar ki height) 
       Aur top-16 (64px) set kiya hai.
    */
    <aside className="w-72 bg-white border-r border-gray-100 flex flex-col h-[calc(100vh-64px)] sticky top-16 z-40">
      
      {/* Navigation Links */}
      <nav className="flex-1 px-6 space-y-2 mt-8" aria-label="Dashboard Navigation">
        <div className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-6 ml-4">
          Main Menu
        </div>
        
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "flex items-center gap-4 px-5 py-4 rounded-[1.5rem] text-sm font-black transition-all duration-300",
                isActive 
                  ? "bg-gray-900 text-white shadow-xl shadow-gray-200 scale-[1.02]" 
                  : "text-gray-500 hover:bg-gray-50 hover:text-gray-900"
              )}
            >
              <Icon size={18} strokeWidth={isActive ? 3 : 2} />
              <span className="tracking-tight">{item.name}</span>
            </Link>
          );
        })}
      </nav>

      {/* Footer Section */}
      <div className="p-6 border-t border-gray-50">
        <div className="bg-red-50/50 p-2 rounded-[2rem]">
          <button 
            onClick={handleLogout}
            className="flex items-center gap-4 px-6 py-4 w-full text-red-600 text-sm font-black hover:bg-red-600 hover:text-white rounded-[1.5rem] transition-all duration-300 group"
          >
            <LogOut size={18} strokeWidth={3} className="group-hover:translate-x-1 transition-transform" />
            LOGOUT
          </button>
        </div>
      </div>
    </aside>
  );
}