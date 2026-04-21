"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { getListingById } from "../../../lib/api";
import { isAuthenticated } from "../../../lib/auth";
import { Badge } from "./Badge";
import { ImageGallery } from "./ImageGallery";

export default function ListingDetail() {
  const { id } = useParams();
  const router = useRouter();
  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!isAuthenticated()) {
      sessionStorage.setItem('redirectAfterLogin', window.location.pathname);
      router.push('/auth/login');
      return;
    }

    const loadListing = async () => {
      try {
        setLoading(true);
        const result = await getListingById(id);
        setListing(result.data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Property load nahi ho saki");
      } finally {
        setLoading(false);
      }
    };

    if (id) loadListing();
  }, [id, router]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F9FAFB] flex flex-col items-center justify-center">
        <div className="w-14 h-14 border-4 border-gray-900 border-t-green-500 rounded-full animate-spin mb-6"></div>
        <p className="text-gray-400 font-black uppercase tracking-[0.3em] text-[10px]">Loading Masterpiece...</p>
      </div>
    );
  }

  if (error || !listing) {
    return (
      <div className="min-h-screen bg-[#F9FAFB] flex items-center justify-center px-6 text-center">
        <div className="bg-white p-16 rounded-[4rem] shadow-sm border border-gray-100 max-w-lg w-full">
          <div className="w-24 h-24 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-8">
            <span className="material-symbols-outlined text-5xl text-red-500">heart_broken</span>
          </div>
          <h2 className="text-4xl font-black text-gray-900 mb-4 tracking-tighter">Gayab Ho Gayi!</h2>
          <p className="text-gray-500 font-medium mb-10 leading-relaxed italic">{error || "Yeh property hamare database se nikal chuki hai."}</p>
          <Link
            href="/listings"
            className="inline-flex items-center gap-3 bg-gray-900 text-white px-10 py-5 rounded-[2rem] font-black hover:bg-green-600 transition-all shadow-xl shadow-gray-200"
          >
            WAPIS TALASH KAREIN
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F9FAFB] pt-32 pb-24">
      <div className="max-w-7xl mx-auto px-4 md:px-10">
        
        {/* Navigation & Context */}
        <div className="mb-12">
          <Link
            href="/listings"
            className="group inline-flex items-center gap-3 text-gray-400 hover:text-green-600 font-black text-[10px] uppercase tracking-[0.3em] mb-8 transition-all"
          >
            <span className="material-symbols-outlined text-sm group-hover:-translate-x-2 transition-transform">west</span>
            Back to Discovery
          </Link>
          
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
            <div className="max-w-3xl">
              <div className="flex items-center gap-3 mb-4">
                <span className="bg-green-600 text-white px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest shadow-lg shadow-green-200">Featured Home</span>
                <span className="text-gray-300 font-black text-xs uppercase tracking-widest">ID: #{listing?._id?.slice(-6).toUpperCase()}</span>
              </div>
              <h1 className="text-5xl md:text-6xl font-black text-gray-900 tracking-tighter leading-[0.9] mb-6">
                {listing.title}
              </h1>
              <div className="flex items-center gap-3 text-gray-500 bg-white w-fit px-6 py-3 rounded-2xl border border-gray-100 shadow-sm font-medium">
                <span className="material-symbols-outlined text-green-600">distance</span>
                {listing.location}
              </div>
            </div>
            <div className="bg-white p-8 rounded-[3rem] border border-gray-100 shadow-xl shadow-gray-200/50 flex flex-col items-center justify-center min-w-[280px]">
              <span className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-2">Monthly Investment</span>
              <div className="flex items-baseline gap-1">
                <span className="text-sm font-black text-gray-900">PKR</span>
                <span className="text-5xl font-black text-green-600 tracking-tighter">{listing.price?.toLocaleString()}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Main Content Area */}
          <div className="lg:col-span-8 space-y-12">
            
            {/* Gallery Wrapper */}
            <div className="rounded-[4rem] overflow-hidden shadow-2xl shadow-gray-200 border-8 border-white">
              <ImageGallery images={listing.images || []} title={listing.title} />
            </div>

            {/* Overview Bento Box */}
            <div className="bg-white p-10 md:p-14 rounded-[4rem] border border-gray-50 shadow-sm">
              <h2 className="text-3xl font-black text-gray-900 mb-12 tracking-tighter border-l-8 border-green-500 pl-6 uppercase">Property Specs</h2>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
                {[
                  { icon: "king_bed", val: listing.rooms || 0, label: "Bedrooms" },
                  { icon: "water_full", val: listing.baths || 0, label: "Bathrooms" },
                  { icon: "straighten", val: listing.area || 'N/A', label: "Living Area" },
                  { icon: "verified", val: "Instant", label: "Availability" }
                ].map((item, i) => (
                  <div key={i} className="group hover:bg-gray-900 transition-all duration-500 bg-gray-50/50 p-6 rounded-[2.5rem] border border-gray-100 text-center">
                    <span className="material-symbols-outlined text-green-600 mb-3 group-hover:scale-125 transition-transform">{item.icon}</span>
                    <div className="text-2xl font-black text-gray-900 group-hover:text-white tracking-tighter">{item.val}</div>
                    <div className="text-[9px] text-gray-400 font-black uppercase tracking-widest mt-1">{item.label}</div>
                  </div>
                ))}
              </div>

              {/* Description Section */}
              <div className="space-y-12">
                <div className="grid md:grid-cols-2 gap-12">
                   <div>
                      <h3 className="text-[11px] font-black text-gray-400 uppercase tracking-[0.3em] mb-6 flex items-center gap-2">
                        <span className="w-2 h-2 bg-green-500 rounded-full"></span> Details
                      </h3>
                      <p className="text-gray-600 leading-relaxed font-medium text-lg">
                        {listing.description || "Iss property ki mazeed maloomat ke liye niche diye gaye WhatsApp button ka istemal karein."}
                      </p>
                   </div>
                   <div className="bg-gray-50 p-8 rounded-[2.5rem]">
                      <h3 className="text-[11px] font-black text-gray-400 uppercase tracking-[0.3em] mb-6">Status & Rules</h3>
                      <div className="flex flex-wrap gap-3">
                        {listing.furnished ? <Badge variant="success">Furnished</Badge> : <Badge variant="outline">Unfurnished</Badge>}
                        {listing.familyAllowed && <Badge variant="primary">Family Only</Badge>}
                        {listing.gasAvailable && <Badge variant="secondary">Gas Ready</Badge>}
                      </div>
                      <p className="mt-6 text-sm text-gray-400 font-medium italic">"{listing.tenantRules || 'Rules will be shared on call.'}"</p>
                   </div>
                </div>

                {/* Utilities Grid */}
                {(listing.utilities?.water || listing.utilities?.gas || listing.utilities?.electricity) && (
                  <div className="pt-10 border-t border-gray-100">
                    <h3 className="text-[11px] font-black text-gray-400 uppercase tracking-[0.3em] mb-8">Service Connections</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {['water', 'gas', 'electricity'].map((util) => (
                        listing.utilities?.[util] && (
                          <div key={util} className="flex items-center gap-4 bg-white p-6 rounded-3xl border border-gray-100">
                            <span className="material-symbols-outlined text-green-600">
                              {util === 'water' ? 'waves' : util === 'gas' ? 'fire_truck' : 'bolt'}
                            </span>
                            <div>
                              <div className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{util}</div>
                              <div className="text-sm font-black text-gray-900">{listing.utilities[util]}</div>
                            </div>
                          </div>
                        )
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Location Section */}
            {listing.latitude && listing.longitude && (
              <div className="bg-gray-900 p-10 md:p-14 rounded-[4rem] shadow-2xl shadow-gray-200 overflow-hidden relative group">
                <div className="relative z-10">
                  <h2 className="text-3xl font-black text-white mb-8 tracking-tighter uppercase">Neighborhood</h2>
                  <div className="flex flex-col md:flex-row items-center justify-between gap-8">
                    <div className="max-w-xs">
                      <p className="text-gray-400 font-medium mb-6 leading-relaxed">Property ki exact location dekhne ke liye Google Maps ka link open karein.</p>
                      <a
                        href={`https://www.google.com/maps/search/?api=1&query=${listing.latitude},${listing.longitude}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-4 bg-green-600 text-white px-8 py-4 rounded-2xl font-black hover:bg-white hover:text-gray-900 transition-all shadow-xl shadow-green-900/20"
                      >
                        <span className="material-symbols-outlined">map</span>
                        OPEN IN MAPS
                      </a>
                    </div>
                    <div className="w-full md:w-64 h-64 bg-white/5 rounded-[3rem] border border-white/10 flex items-center justify-center backdrop-blur-sm">
                        <span className="material-symbols-outlined text-8xl text-white/10 group-hover:scale-125 transition-transform duration-700">explore</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Sidebar Area */}
          <div className="lg:col-span-4">
            <div className="sticky top-32 space-y-6">
              <div className="bg-white p-10 rounded-[3.5rem] border border-gray-100 shadow-xl shadow-gray-200/50">
                <h3 className="text-xs font-black text-gray-400 uppercase tracking-[0.3em] mb-10 text-center">Owner Information</h3>
                
                <div className="text-center mb-10">
                  <div className="w-24 h-24 bg-gray-50 rounded-[2.5rem] border-4 border-white shadow-lg mx-auto mb-6 flex items-center justify-center text-gray-300">
                    <span className="material-symbols-outlined text-5xl">account_circle</span>
                  </div>
                  <h4 className="text-2xl font-black text-gray-900 tracking-tighter">{listing.owner?.name || 'Authorized Owner'}</h4>
                  <div className="flex items-center justify-center gap-2 mt-2">
                    <span className="material-symbols-outlined text-green-600 text-sm">verified</span>
                    <span className="text-[10px] font-black text-green-600 uppercase tracking-[0.2em]">Partner Level I</span>
                  </div>
                </div>

                <div className="space-y-4">
                  {listing.contactLink ? (
                    <a
                      href={listing.contactLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full bg-[#25D366] hover:bg-gray-900 text-white py-6 rounded-[2rem] font-black flex items-center justify-center gap-4 transition-all hover:-translate-y-1 active:scale-95 shadow-xl shadow-green-100"
                    >
                      <span className="material-symbols-outlined font-black">forum</span>
                      WHATSAPP NOW
                    </a>
                  ) : (
                    <div className="w-full bg-gray-50 text-gray-400 py-6 rounded-[2rem] font-black text-[10px] uppercase tracking-widest text-center border border-dashed border-gray-200">
                      Private Listing
                    </div>
                  )}
                  
                  <div className="p-6 bg-gray-50/50 rounded-[2rem] border border-gray-100 mt-8">
                     <p className="text-[9px] text-gray-400 text-center font-black uppercase tracking-widest leading-relaxed">
                       GharFinder guarantees zero commission between tenant & owner.
                     </p>
                  </div>
                </div>
              </div>

              {/* Quick Safety Tip */}
              <div className="px-10 py-6 bg-yellow-50 rounded-[2rem] border border-yellow-100">
                <div className="flex gap-4">
                  <span className="material-symbols-outlined text-yellow-600">security</span>
                  <p className="text-[10px] text-yellow-800 font-bold leading-tight">
                    PAYMENT SAFETY: Humesha property khud dekhne ke bad aur legal agreement ke sath payment karein.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}