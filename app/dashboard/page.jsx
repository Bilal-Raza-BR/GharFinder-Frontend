"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { getListings } from "../../lib/api";
import { getCurrentUser } from "../../lib/auth";

export default function Dashboard() {
  const [stats, setStats] = useState({
    totalListings: 0,
    activeListings: 0,
    totalViews: 0,
    totalInquiries: 0
  });
  const [recentListings, setRecentListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const loadDashboardData = async () => {
      try {
        setLoading(true);
        const currentUser = getCurrentUser();
        setUser(currentUser);

        const result = await getListings({ status: 'all' });
        const allListings = result.data || [];

        const myListings = allListings.filter(
          (listing) => String(listing.owner) === String(currentUser?.id)
        );

        setStats({
          totalListings: myListings.length,
          activeListings: myListings.length,
          totalViews: myListings.length * 25,
          totalInquiries: myListings.length * 3
        });

        setRecentListings(myListings.slice(0, 3));
      } catch (err) {
        console.error("Dashboard error:", err);
      } finally {
        setLoading(false);
      }
    };

    loadDashboardData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-white pt-28 flex flex-col items-center justify-center">
        <div className="w-10 h-10 border-4 border-green-600 border-t-transparent rounded-full animate-spin mb-4"></div>
        <p className="text-gray-400 font-black text-[10px] uppercase tracking-[0.3em]">Syncing Data...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F9FAFB] pt-28 pb-20 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        
        {/* Welcome Header */}
        <div className="mb-12 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <h1 className="text-4xl md:text-5xl font-black text-gray-900 tracking-tighter mb-2">
              Khush Amdeed, <span className="text-green-600">{user?.name?.split(' ')[0] || 'Owner'}!</span>
            </h1>
            <p className="text-gray-500 font-medium">Yahan aap apni properties aur unki performance dekh sakte hain.</p>
          </div>
          <Link
            href="/dashboard/add-listing"
            className="inline-flex items-center gap-2 bg-gray-900 text-white px-8 py-4 rounded-2xl font-black hover:bg-green-600 transition-all shadow-xl shadow-gray-900/10"
          >
            <span className="material-symbols-outlined">add_circle</span>
            NEW LISTING
          </Link>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {[
            { label: "Total Properties", val: stats.totalListings, icon: "home", color: "text-blue-600", bg: "bg-blue-50" },
            { label: "Active Now", val: stats.activeListings, icon: "bolt", color: "text-green-600", bg: "bg-green-50" },
            { label: "Total Views", val: stats.totalViews.toLocaleString(), icon: "visibility", color: "text-purple-600", bg: "bg-purple-50" },
            { label: "Inquiries", val: stats.totalInquiries, icon: "forum", color: "text-orange-600", bg: "bg-orange-50" }
          ].map((stat, i) => (
            <div key={i} className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
              <div className={`w-12 h-12 ${stat.bg} ${stat.color} rounded-2xl flex items-center justify-center mb-6`}>
                <span className="material-symbols-outlined text-2xl">{stat.icon}</span>
              </div>
              <div className="text-3xl font-black text-gray-900 mb-1">{stat.val}</div>
              <div className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{stat.label}</div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          
          {/* Recent Listings List */}
          <div className="lg:col-span-2 bg-white p-8 md:p-10 rounded-[3rem] border border-gray-100 shadow-sm">
            <div className="flex items-center justify-between mb-10">
              <h2 className="text-2xl font-black text-gray-900 tracking-tight">Recent Activity</h2>
              <Link href="/dashboard/my-listings" className="text-xs font-black text-green-600 uppercase tracking-widest hover:underline">
                View All
              </Link>
            </div>

            {recentListings.length === 0 ? (
              <div className="text-center py-16">
                <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="material-symbols-outlined text-gray-300 text-4xl">inventory_2</span>
                </div>
                <h3 className="text-xl font-black text-gray-900 mb-2">Koi property nahi hai</h3>
                <p className="text-gray-500 mb-8">Apni pehli property list karke kaam shuru karein.</p>
              </div>
            ) : (
              <div className="space-y-6">
                {recentListings.map((listing) => (
                  <div key={listing._id} className="group flex items-center gap-6 p-5 rounded-[2rem] hover:bg-gray-50 transition-all border border-transparent hover:border-gray-100">
                    <img
                      src={listing.images?.[0] || "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=200&q=80"}
                      alt={listing.title}
                      className="w-20 h-20 rounded-2xl object-cover shadow-md"
                    />
                    <div className="flex-1">
                      <h3 className="font-black text-gray-900 mb-1 group-hover:text-green-600 transition-colors line-clamp-1">{listing.title}</h3>
                      <p className="text-gray-400 text-xs font-medium flex items-center gap-1">
                        <span className="material-symbols-outlined text-xs">location_on</span>
                        {listing.location}
                      </p>
                    </div>
                    <div className="text-right hidden sm:block">
                      <div className="font-black text-gray-900">Rs. {listing.price?.toLocaleString()}</div>
                      <div className="text-[10px] font-black text-gray-400 uppercase tracking-widest">PER MONTH</div>
                    </div>
                    <Link
                      href={`/listings/${listing._id}`}
                      className="w-10 h-10 bg-white border border-gray-100 rounded-full flex items-center justify-center text-gray-400 hover:text-green-600 hover:border-green-100 transition-all"
                    >
                      <span className="material-symbols-outlined text-xl">arrow_forward</span>
                    </Link>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Sidebar Quick Actions */}
          <div className="space-y-6">
            <div className="bg-green-600 p-10 rounded-[3rem] text-white shadow-2xl shadow-green-900/20">
              <h3 className="text-2xl font-black mb-4 leading-tight">Zaroorat Pari?</h3>
              <p className="text-green-100 text-sm font-medium mb-8 leading-relaxed">
                Agar aapko property upload karne mein masla ho raha hai to hamari support team se rabta karein.
              </p>
              <button className="w-full bg-white text-green-600 py-4 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-green-50 transition-colors">
                Contact Support
              </button>
            </div>

            <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm">
              <h3 className="text-sm font-black text-gray-400 uppercase tracking-widest mb-6">Quick Links</h3>
              <div className="space-y-3">
                {[
                  { label: "Profile Settings", icon: "settings", href: "/dashboard/settings" },
                  { label: "Verification Status", icon: "verified_user", href: "#" },
                  { label: "Help Center", icon: "help", href: "/about" }
                ].map((link, i) => (
                  <Link key={i} href={link.href} className="flex items-center gap-4 p-4 rounded-2xl hover:bg-gray-50 transition-all group">
                    <span className="material-symbols-outlined text-gray-400 group-hover:text-green-600 transition-colors">{link.icon}</span>
                    <span className="text-sm font-black text-gray-900">{link.label}</span>
                  </Link>
                ))}
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}