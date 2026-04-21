"use client";
import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { FilterBar } from "../../components/FilterBar";
import { PropertyCard } from "../../components/PropertyCard";
import { getListings } from "../../lib/api";

const mapListingToProperty = (listing) => ({
  id: listing._id,
  title: listing.title,
  location: listing.location,
  price: listing.price,
  beds: listing.rooms || 0,
  baths: listing.baths || 0,
  area: listing.area || 'N/A',
  image:
    listing.images?.[0] ||
    "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1200&q=80",
  verified: listing.verified || false,
  premium: listing.price > 100000,
  category: listing.furnished ? "Apartment" : "House",
  tenantType: listing.familyAllowed ? "Family" : "All",
  furnished: listing.furnished,
  familyAllowed: listing.familyAllowed,
  gasAvailable: listing.gasAvailable,
  floor: listing.floor,
  utilities: listing.utilities,
  features: listing.features,
  tenantRules: listing.tenantRules,
  images: listing.images,
});

export default function Listings() {
  const [filters, setFilters] = useState({
    query: "",
    category: "All",
    tenantType: "All",
    minPrice: undefined,
    maxPrice: undefined,
    rooms: undefined,
    furnished: undefined,
  });
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadListings = async () => {
      try {
        setLoading(true);
        const queryParams = {};
        if (filters.query) queryParams.location = filters.query;
        if (filters.minPrice) queryParams.minPrice = filters.minPrice;
        if (filters.maxPrice) queryParams.maxPrice = filters.maxPrice;
        if (filters.rooms) queryParams.rooms = filters.rooms;
        if (filters.furnished !== undefined) queryParams.furnished = filters.furnished;
        if (filters.tenantType === 'Family') queryParams.familyAllowed = true;

        const result = await getListings(queryParams);
        const backendListings = result.data || [];
        
        setProperties(backendListings.map(mapListingToProperty));
      } catch (err) {
        setError("Failed to load listings. Please try again.");
        setProperties([]);
      } finally {
        setLoading(false);
      }
    };
    loadListings();
  }, [filters]);

  const filteredProperties = useMemo(() => {
    return properties.filter((p) => {
      const matchCategory = filters.category === "All" || p.category === filters.category;
      const matchQuery = !filters.query || p.location.toLowerCase().includes(filters.query.toLowerCase()) || p.title.toLowerCase().includes(filters.query.toLowerCase());
      const matchMinPrice = !filters.minPrice || p.price >= filters.minPrice;
      const matchMaxPrice = !filters.maxPrice || p.price <= filters.maxPrice;
      const matchRooms = !filters.rooms || (filters.rooms === 3 ? p.beds >= filters.rooms : p.beds <= filters.rooms);
      const matchFurnished = filters.furnished === undefined || (filters.furnished ? p.furnished : true);
      const matchTenantType = filters.tenantType === "All" || p.tenantType === filters.tenantType;
      return matchCategory && matchQuery && matchMinPrice && matchMaxPrice && matchRooms && matchFurnished && matchTenantType;
    });
  }, [properties, filters]);

  return (
    <div className="bg-white min-h-screen">
      <main className="pt-28 pb-20 px-4 md:px-8 max-w-7xl mx-auto">
        
        {/* Header Section */}
        <section className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="max-w-2xl">
            <div className="inline-block px-3 py-1 bg-green-50 text-green-700 rounded-lg text-[10px] font-black uppercase tracking-[0.2em] mb-4">
              Explore Home
            </div>
            <h1 className="text-4xl md:text-6xl font-black text-gray-900 tracking-tighter">
              Talaash Karein<span className="text-green-600">.</span>
            </h1>
            <p className="text-gray-500 font-medium text-lg mt-2">
              GharFinder par har kism ki properties, seedha aapke liye.
            </p>
          </div>
          <Link 
            href="/" 
            className="group inline-flex items-center gap-2 text-sm font-black text-gray-900 hover:text-green-600 transition-colors uppercase tracking-widest"
          >
            <span className="material-symbols-outlined text-xl group-hover:-translate-x-1 transition-transform">arrow_back</span>
            Back to Home
          </Link>
        </section>

        {/* Filter Section - Standardized with other pages */}
        <div className="mb-12 p-2 bg-gray-50 rounded-[2.5rem] border border-gray-100">
          <FilterBar filters={filters} setFilters={setFilters} />
        </div>

        {/* Listings Logic */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="h-[400px] bg-gray-50 rounded-[2.5rem] animate-pulse border border-gray-100"></div>
            ))}
          </div>
        ) : (
          <section>
            {filteredProperties.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
                {filteredProperties.map((p) => (
                  <PropertyCard key={p.id} property={p} />
                ))}
              </div>
            ) : (
              <div className="text-center py-32 bg-gray-50 rounded-[3rem] border-2 border-dashed border-gray-200">
                <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm">
                  <span className="material-symbols-outlined text-4xl text-gray-300">search_off</span>
                </div>
                <h3 className="text-2xl font-black text-gray-900 mb-2">Koi result nahi mila</h3>
                <p className="text-gray-500 font-medium mb-8">Try karein filters badalne ki ya kisi aur city mein search karein.</p>
                <button 
                  onClick={() => setFilters({
                    query: "", category: "All", tenantType: "All", minPrice: undefined, maxPrice: undefined, rooms: undefined, furnished: undefined
                  })}
                  className="px-8 py-3 bg-gray-900 text-white rounded-2xl font-black text-sm hover:bg-green-600 transition-colors"
                >
                  RESET FILTERS
                </button>
              </div>
            )}
          </section>
        )}
      </main>
    </div>
  );
}