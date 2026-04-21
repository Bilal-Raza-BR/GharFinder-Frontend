"use client";
import Link from "next/link";

export function PropertyCard({ property }) {
  const imageSrc =
    property.image ||
    property.images?.[0] ||
    "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1200&q=80";

  return (
    <div className="bg-white rounded-[2.5rem] overflow-hidden group border border-gray-100 shadow-sm hover:shadow-2xl hover:shadow-green-900/5 hover:-translate-y-2 transition-all duration-500 flex flex-col h-full">
      {/* Image Section */}
      <div className="relative h-64 w-full overflow-hidden">
        <img
          src={imageSrc}
          alt={property.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
        />
        
        {/* Badges */}
        <div className="absolute top-5 left-5 flex flex-col gap-2">
          {property.verified && (
            <span className="bg-white/95 backdrop-blur-md px-3 py-1.5 rounded-full text-[10px] font-black text-green-700 flex items-center gap-1 shadow-sm border border-green-100">
              <span className="material-symbols-outlined text-[14px] fill-1">verified</span>
              VERIFIED
            </span>
          )}
          {property.premium && (
            <span className="bg-gray-900 text-white px-3 py-1.5 rounded-full text-[10px] font-black shadow-sm">
              PREMIUM
            </span>
          )}
        </div>

        {/* Wishlist Button */}
        <button className="absolute top-5 right-5 w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white hover:bg-white hover:text-red-500 transition-all duration-300">
          <span className="material-symbols-outlined text-xl">favorite</span>
        </button>
      </div>

      {/* Content Section */}
      <div className="p-6 flex flex-col flex-grow">
        <div className="flex flex-col mb-4">
          <h3 className="text-xl font-bold text-gray-900 leading-tight group-hover:text-green-700 transition-colors">
            {property.title}
          </h3>
          <p className="text-gray-500 text-sm flex items-center gap-1 mt-2">
            <span className="material-symbols-outlined text-[18px] text-green-600">location_on</span>
            {property.location}
          </p>
        </div>

        {/* Property Features */}
        <div className="flex items-center gap-5 py-4 border-y border-gray-50 mb-6">
          <div className="flex items-center gap-1.5 text-gray-700 font-bold text-xs uppercase tracking-tight">
            <span className="material-symbols-outlined text-gray-400 text-[20px]">bed</span> 
            {property.beds} <span className="text-gray-400 font-medium">Beds</span>
          </div>
          <div className="flex items-center gap-1.5 text-gray-700 font-bold text-xs uppercase tracking-tight">
            <span className="material-symbols-outlined text-gray-400 text-[20px]">bathtub</span> 
            {property.baths} <span className="text-gray-400 font-medium">Baths</span>
          </div>
          <div className="flex items-center gap-1.5 text-gray-700 font-bold text-xs uppercase tracking-tight">
            <span className="material-symbols-outlined text-gray-400 text-[20px]">square_foot</span> 
            {property.area}
          </div>
        </div>

        {/* Footer: Price & Action */}
        <div className="flex items-center justify-between mt-auto">
          <div>
            <div className="flex items-baseline gap-1">
              <span className="text-green-600 font-black text-2xl tracking-tighter">Rs. {property.price.toLocaleString()}</span>
              <span className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">/mo</span>
            </div>
          </div>
          
          <Link 
            href={`/listings/${property.id}`}
            className="bg-gray-50 text-gray-900 hover:bg-green-600 hover:text-white px-6 py-3 rounded-2xl font-bold text-sm transition-all flex items-center gap-2 active:scale-95"
          >
            Details
            <span className="material-symbols-outlined text-sm font-bold">arrow_outward</span>
          </Link>
        </div>
      </div>
    </div>
  );
}