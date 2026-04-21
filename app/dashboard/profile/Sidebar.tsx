"use client";
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, PlusCircle, User, LogOut, Home } from 'lucide-react';
import { cn } from '@/lib/utils';

const menuItems = [
  { name: 'My Listings', href: '/dashboard', icon: LayoutDashboard },
  { name: 'Add Listing', href: '/dashboard/add-listing', icon: PlusCircle },
  { name: 'Profile', href: '/dashboard/profile', icon: User },
];

export function Sidebar() {
  const pathname = usePathname();

  const handleLogout = () => {
    // TODO: Add your logout logic here (e.g., supabase.auth.signOut())
    console.log("User logged out");
  };

  return (
    <aside className="w-64 bg-white border-r border-gray-200 flex flex-col h-screen sticky top-0">
      <div className="p-6">
        <Link href="/" className="flex items-center gap-2 text-primary font-bold text-xl">
          <Home size={24} />
          <span>GharFinder</span>
        </Link>
      </div>

      <nav className="flex-1 px-4 space-y-1" aria-label="Dashboard Navigation">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all",
                isActive 
                  ? "bg-primary text-white shadow-lg shadow-primary/20" 
                  : "text-gray-500 hover:bg-gray-50 hover:text-primary"
              )}
            >
              <Icon size={20} />
              {item.name}
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-gray-100">
        <button 
          onClick={handleLogout}
          className="flex items-center gap-3 px-4 py-3 w-full text-red-500 font-medium hover:bg-red-50 rounded-xl transition-all"
        >
          <LogOut size={20} />
          Logout
        </button>
      </div>
    </aside>
  );
}
