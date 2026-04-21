"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { getListings, deleteListing } from "../../../lib/api";
import { getCurrentUser } from "../../../lib/auth";

export default function MyListings() {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadMyListings = async () => {
      try {
        setLoading(true);
        const result = await getListings({ status: 'all' });
        const allListings = result.data || [];
        const user = getCurrentUser();
        const myListings = allListings.filter(
          (listing) => String(listing.owner) === String(user?.id)
        );
        setListings(myListings);
        setError("");
      } catch (err) {
        setError(err.message || "Listings load karne mein masla hua.");
      } finally {
        setLoading(false);
      }
    };
    loadMyListings();
  }, []);

  const handleDelete = async (id) => {
    if (!confirm("Kya aap waqai ye listing delete karna chahte hain?")) return;
    try {
      setDeletingId(id);
      await deleteListing(id);
      setListings(listings.filter(listing => listing._id !== id));
    } catch (err) {
      setError(err.message || "Delete nahi ho saka.");
    } finally {
      setDeletingId(null);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F9FAFB] flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-gray-900 border-t-green-500 rounded-full animate-spin mb-4 mx-auto"></div>
          <p className="text-gray-500 font-black uppercase tracking-widest text-xs">Loading Listings...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F9FAFB] pt-28 pb-20 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        
        {/* Header Area */}
        <div className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <h1 className="text-4xl font-black text-gray-900 tracking-tighter mb-2">
              Meri <span className="text-green-600">Properties</span>
            </h1>
            <p className="text-gray-500 font-medium italic">Apni listed properties ko yahan se manage karein.</p>
          </div>
          <Link
            href="/dashboard/add-listing"
            className="bg-gray-900 hover:bg-green-600 text-white px-8 py-4 rounded-[1.5rem] font-black shadow-2xl shadow-gray-200 transition-all flex items-center gap-3 w-fit"
          >
            <span className="material-symbols-outlined font-black">add</span>
            NAYI LISTING
          </Link>
        </div>

        {error && (
          <div className="mb-8 p-5 bg-red-50 border border-red-100 rounded-[2rem] text-red-600 text-sm font-black flex items-center gap-3">
            <span className="material-symbols-outlined">warning</span>
            {error}
          </div>
        )}

        {/* Listings Grid */}
        {listings.length === 0 ? (
          <div className="text-center py-32 bg-white rounded-[3.5rem] border border-gray-100 shadow-sm">
            <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="material-symbols-outlined text-4xl text-gray-300">real_estate_agent</span>
            </div>
            <h3 className="text-2xl font-black text-gray-900 mb-2">Koi listing nahi mili</h3>
            <p className="text-gray-400 font-medium mb-8">Abhi apni pehli property list karein!</p>
            <Link
              href="/dashboard/add-listing"
              className="inline-flex items-center gap-3 bg-green-600 text-white px-8 py-4 rounded-[1.5rem] font-black hover:bg-gray-900 transition-all"
            >
              POST LISTING
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {listings.map((listing) => (
              <div
                key={listing._id}
                className="group bg-white rounded-[2.5rem] overflow-hidden border border-gray-100 shadow-sm hover:shadow-2xl hover:shadow-gray-200/50 transition-all duration-500"
              >
                {/* Image Section */}
                <div className="relative h-64 w-full overflow-hidden">
                  <img
                    src={listing.images?.[0] || "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=800&q=80"}
                    alt={listing.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute top-5 left-5">
                    <span className={`px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-widest shadow-sm ${
                      listing.status === 'active' ? 'bg-green-50 text-green-600' :
                      listing.status === 'inactive' ? 'bg-yellow-50 text-yellow-600' :
                      'bg-red-50 text-red-600'
                    }`}>
                      {listing.status}
                    </span>
                  </div>
                </div>

                {/* Content Section */}
                <div className="p-8">
                  <div className="mb-4">
                    <span className="text-[10px] font-black text-green-600 uppercase tracking-widest bg-green-50 px-3 py-1 rounded-lg">
                      {listing.area || "Standard Size"}
                    </span>
                  </div>
                  
                  <h3 className="text-xl font-black text-gray-900 mb-2 line-clamp-1 tracking-tighter">
                    {listing.title}
                  </h3>
                  
                  <p className="text-gray-400 text-sm font-medium flex items-center gap-2 mb-6">
                    <span className="material-symbols-outlined text-sm text-green-600">location_on</span>
                    {listing.location}
                  </p>

                  <div className="flex items-center justify-between mb-8 pb-6 border-b border-gray-50">
                    <div className="flex flex-col">
                      <span className="text-[10px] font-black text-gray-400 uppercase tracking-tighter">Mahana Kiraya</span>
                      <span className="text-2xl font-black text-gray-900">
                        Rs. <span className="text-green-600">{listing.price?.toLocaleString()}</span>
                      </span>
                    </div>
                    <div className="flex gap-4">
                       <div className="text-center">
                          <p className="text-xs font-black text-gray-900">{listing.rooms || 0}</p>
                          <p className="text-[9px] font-bold text-gray-400 uppercase">Beds</p>
                       </div>
                       <div className="text-center">
                          <p className="text-xs font-black text-gray-900">{listing.baths || 0}</p>
                          <p className="text-[9px] font-bold text-gray-400 uppercase">Baths</p>
                       </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="grid grid-cols-3 gap-3">
                    <Link
                      href={`/listings/${listing._id}`}
                      className="bg-gray-50 text-gray-900 hover:bg-gray-900 hover:text-white px-4 py-3 rounded-xl font-black text-[11px] uppercase tracking-widest text-center transition-all"
                    >
                      VIEW
                    </Link>
                    <Link
                      href={`/dashboard/edit-listing/${listing._id}`}
                      className="bg-blue-50 text-blue-600 hover:bg-blue-600 hover:text-white px-4 py-3 rounded-xl font-black text-[11px] uppercase tracking-widest text-center transition-all"
                    >
                      EDIT
                    </Link>
                    <button
                      onClick={() => handleDelete(listing._id)}
                      disabled={deletingId === listing._id}
                      className="bg-red-50 text-red-600 hover:bg-red-600 hover:text-white disabled:opacity-50 px-4 py-3 rounded-xl font-black text-[11px] uppercase tracking-widest transition-all flex items-center justify-center gap-2"
                    >
                      {deletingId === listing._id ? '...' : 'DELETE'}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}