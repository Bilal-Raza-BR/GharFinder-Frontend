"use client";
import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { FilterBar } from "../components/FilterBar";
import { PropertyCard } from "../components/PropertyCard";
import { getListings } from "../lib/api";

// --- UI Components for the Redesign ---

// const Navbar = () => (
//   <nav className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-md border-b border-gray-100">
//     <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
//       <div className="flex items-center gap-8">
//         <Link href="/" className="text-2xl font-black text-green-600 tracking-tighter">
//           KIRAYA<span className="text-gray-900">.</span>
//         </Link>
//         <div className="hidden md:flex items-center gap-6 text-sm font-semibold text-gray-600">
//           <Link href="/" className="hover:text-green-600 transition-colors">Home</Link>
//           <Link href="/listings" className="hover:text-green-600 transition-colors">Listings</Link>
//           <Link href="/about" className="hover:text-green-600 transition-colors">About</Link>
//         </div>
//       </div>
//       <Link href="/auth/signup" className="bg-green-600 text-white px-6 py-2.5 rounded-full font-bold text-sm hover:bg-green-700 transition-all shadow-lg shadow-green-200">
//         Post Property
//       </Link>
//     </div>
//   </nav>
// );

const FeatureCard = ({ icon, title, desc }: { icon: string, title: string, desc: string }) => (
  <div className="bg-white p-8 rounded-3xl border border-gray-100 hover:border-green-100 hover:shadow-xl hover:shadow-green-500/5 transition-all group">
    <div className="w-12 h-12 rounded-2xl bg-green-50 flex items-center justify-center mb-6 group-hover:bg-green-600 transition-colors">
      <span className="material-symbols-outlined text-green-600 group-hover:text-white">{icon}</span>
    </div>
    <h3 className="text-xl font-bold text-gray-900 mb-3">{title}</h3>
    <p className="text-gray-500 leading-relaxed text-sm">{desc}</p>
  </div>
);

const Step = ({ num, title, desc }: { num: string, title: string, desc: string }) => (
  <div className="flex flex-col items-center text-center space-y-4 relative">
    <div className="w-16 h-16 rounded-full bg-white border-2 border-green-600 flex items-center justify-center text-green-600 font-black text-xl z-10 shadow-sm">
      {num}
    </div>
    <h3 className="text-lg font-bold text-gray-900">{title}</h3>
    <p className="text-gray-500 text-sm max-w-[200px]">{desc}</p>
  </div>
);

// --- Main Home Component ---

export default function Home() {
  const [filters, setFilters] = useState({
    query: "",
    category: "All",
    tenantType: "All",
    minPrice: undefined,
    maxPrice: undefined,
    rooms: undefined,
    furnished: undefined,
  });

  const [properties, setProperties] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Helper function to map API response to UI model
  const mapListingToProperty = (listing: any) => ({
    id: listing._id,
    title: listing.title,
    location: listing.location,
    price: listing.price,
    beds: listing.rooms || 0,
    baths: listing.baths || 0,
    area: listing.area || "N/A",
    image: listing.images?.[0] || "https://images.unsplash.com/photo-1560448204-603b3fc33ddc?q=80&w=2070&auto=format&fit=crop",
    verified: listing.verified || false,
    category: listing.furnished ? "Apartment" : "House",
    floor: listing.floor,
    utilities: listing.utilities,
    features: listing.features,
    tenantRules: listing.tenantRules,
    images: listing.images,
  });

  useEffect(() => {
    const loadListings = async () => {
      try {
        setLoading(true);
        const queryParams: any = {};
        if (filters.query) queryParams.location = filters.query;
        if (filters.minPrice) queryParams.minPrice = filters.minPrice;
        if (filters.maxPrice) queryParams.maxPrice = filters.maxPrice;
        if (filters.rooms) queryParams.rooms = filters.rooms;
        if (filters.furnished !== undefined) queryParams.furnished = filters.furnished;
        
        const result = await getListings(queryParams);
        const backendListings = result.data || [];

        setProperties(backendListings.map(mapListingToProperty));
      } catch {
        setProperties([]);
      } finally {
        setLoading(false);
      }
    };
    loadListings();
  }, [filters]);

  const filteredProperties = useMemo(() => {
    return properties.filter((p) => {
      return (
        (filters.category === "All" || p.category === filters.category) &&
        (!filters.query || p.location.toLowerCase().includes(filters.query.toLowerCase())) &&
        (!filters.minPrice || p.price >= filters.minPrice) &&
        (!filters.maxPrice || p.price <= filters.maxPrice)
      );
    });
  }, [properties, filters]);

  return (
    <div className="min-h-screen bg-white text-slate-900 selection:bg-green-100 selection:text-green-900">
      {/* <Navbar /> */}

      {/* 1. HERO SECTION */}
      <section className="relative pt-12 pb-32 lg:pt-20 lg:pb-40 overflow-hidden">
        {/* Soft Background Gradient */}
        <div className="absolute top-0 left-0 w-full h-[800px] bg-gradient-to-b from-green-50 to-transparent -z-10" />
        
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-10">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-100 text-green-700 text-xs font-bold uppercase tracking-widest">
              <span className="w-2 h-2 rounded-full bg-green-600 animate-pulse" />
              Pakistan's Premier Rental Network
            </div>
            
            <h1 className="text-5xl lg:text-7xl font-extrabold leading-[1.1] tracking-tight text-gray-900">
              Find Your Perfect <br />
              <span className="text-green-600 italic">Rental Home</span> in Pakistan
            </h1>

            <p className="text-xl text-gray-600 max-w-lg leading-relaxed">
              Experience the smartest way to rent. <span className="font-bold text-gray-900">Apna naya ghar dhundna ab aur bhi asaan.</span> No middleman, zero brokerage, and direct owner access.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/listings" className="px-8 py-4 bg-green-600 text-white rounded-2xl font-bold shadow-xl shadow-green-200 hover:bg-green-700 hover:-translate-y-1 transition-all text-center">
                Browse Properties
              </Link>
              <Link href="/auth/signup" className="px-8 py-4 bg-white text-green-600 border-2 border-green-600 rounded-2xl font-bold hover:bg-green-50 transition-all text-center">
                List Your Property
              </Link>
            </div>
          </div>

          <div className="relative hidden lg:block">
            <div className="absolute -inset-4 bg-green-200/50 blur-3xl rounded-full" />
            <div className="relative rounded-[2.5rem] overflow-hidden shadow-2xl border-8 border-white">
              <img
                src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2070&auto=format&fit=crop"
                className="w-full h-[500px] object-cover"
                alt="Modern Pakistani Home"
              />
              <div className="absolute top-6 right-6 bg-white/90 backdrop-blur-md p-4 rounded-2xl shadow-lg border border-white/20">
                <p className="text-xs font-bold text-green-600 uppercase mb-1">DHA Phase 6, Karachi</p>
                <p className="text-lg font-black text-gray-900">Rs. 85,000/mo</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. SEARCH SECTION (Floating) */}
      <section className="relative z-20 -mt-20 max-w-5xl mx-auto px-6">
        <div className="bg-white rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.08)] p-8 lg:p-10 border border-gray-100">
          <div className="flex items-center gap-3 mb-6">
             <div className="w-1.5 h-6 bg-green-600 rounded-full" />
             <h3 className="text-2xl font-bold text-gray-900">Search Properties</h3>
          </div>
          <FilterBar filters={filters} setFilters={setFilters} />
        </div>
      </section>

      {/* 3. FEATURED PROPERTIES */}
      <section className="py-24 max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div className="space-y-3">
            <h2 className="text-4xl font-black text-gray-900">Featured Listings</h2>
            <p className="text-gray-500 text-lg">Hand-picked premium rentals for your comfort.</p>
          </div>
          <Link href="/listings" className="font-bold text-green-600 flex items-center gap-2 hover:gap-4 transition-all">
            View All <span className="material-symbols-outlined">arrow_forward</span>
          </Link>
        </div>

        {loading ? (
          <div className="grid md:grid-cols-3 gap-8">
            {[1, 2, 3].map((n) => (
              <div key={n} className="h-[350px] bg-gray-50 animate-pulse rounded-3xl" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProperties.slice(0, 6).map((p) => (
              <div key={p.id} className="hover:scale-[1.02] transition-transform duration-300">
                <PropertyCard property={p} />
              </div>
            ))}
          </div>
        )}
      </section>

      {/* 4. WHY CHOOSE US */}
      <section className="py-24 bg-green-50/50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-4xl font-black text-gray-900">Why GharFinder ?</h2>
            <p className="text-gray-500 max-w-xl mx-auto">We are redefining the rental experience with transparency and trust.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <FeatureCard icon="verified" title="Verified Listings" desc="Hamari har property expert team se verified hoti hai." />
            <FeatureCard icon="account_balance_wallet" title="No Brokerage" desc="Direct owner se deal karein aur fuzool kharche bachayein." />
            <FeatureCard icon="bolt" title="Fast Search" desc="Advanced filters ki madad se chand minutes mein ghar payein." />
            <FeatureCard icon="support_agent" title="Direct Contact" desc="Single tap par WhatsApp ya call ke zariye raabta karein." />
          </div>
        </div>
      </section>

      {/* 5. HOW IT WORKS */}
      <section className="py-24 max-w-7xl mx-auto px-6">
        <div className="text-center mb-20">
          <h2 className="text-4xl font-black text-gray-900">How It Works</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-24 relative">
          <div className="hidden md:block absolute top-8 left-0 w-full h-[2px] bg-dashed bg-green-100 -z-0" />
          <Step num="1" title="Search" desc="Use our filters to find properties that match your lifestyle." />
          <Step num="2" title="Visit" desc="Contact the owner and visit the property at your convenience." />
          <Step num="3" title="Move In" desc="Pay the security, sign the contract, and get your keys!" />
        </div>
      </section>

      {/* 6. STATS SECTION */}
      <section className="py-16 max-w-7xl mx-auto px-6">
        <div className="bg-gray-900 rounded-[3rem] p-12 lg:p-20 grid grid-cols-2 md:grid-cols-4 gap-12">
          {[
            { num: "12k+", label: "Listings" },
            { num: "45k+", label: "Users" },
            { num: "100%", label: "Direct Owner" },
            { num: "20+", label: "Cities" },
          ].map((stat, i) => (
            <div key={i} className="text-center space-y-2">
              <div className="text-4xl lg:text-5xl font-black text-green-500">{stat.num}</div>
              <div className="text-gray-400 text-xs font-bold uppercase tracking-widest">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* 7. CTA SECTION */}
      <section className="py-24 px-6">
        <div className="max-w-5xl mx-auto bg-green-600 rounded-[3rem] p-12 lg:p-20 text-center relative overflow-hidden">
          {/* Abstract circles for flair */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-20 -mt-20 blur-2xl" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-black/10 rounded-full -ml-20 -mb-20 blur-2xl" />
          
          <div className="relative z-10 space-y-8">
            <h2 className="text-4xl lg:text-6xl font-black text-white tracking-tight">
              Ready to find your <br /> next home?
            </h2>
            <p className="text-green-50 text-lg opacity-80 max-w-md mx-auto">
              Join thousands of happy renters who found their home through GharFinder.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Link href="/listings" className="bg-white text-green-600 px-10 py-4 rounded-2xl font-black text-lg hover:shadow-2xl transition-all">
                Get Started
              </Link>
              <Link href="/about" className="bg-green-700 text-white border border-green-500/50 px-10 py-4 rounded-2xl font-bold text-lg hover:bg-green-800 transition-all">
                Learn More
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER MINI */}
      {/* <footer className="py-12 border-t border-gray-100 text-center">
        <p className="text-gray-400 text-sm">© 2026 Kiraya. Built for Pakistan with ❤️</p>
      </footer> */}
    </div>
  );
}