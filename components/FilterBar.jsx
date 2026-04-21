"use client";

export function FilterBar({ filters, setFilters }) {
  const categories = ["All", "House", "Apartment", "Portion"];

  const handlePriceRangeChange = (minPrice, maxPrice) => {
    setFilters({
      ...filters,
      minPrice: minPrice || undefined,
      maxPrice: maxPrice || undefined,
    });
  };

  const handleRoomsChange = (rooms) => {
    setFilters({
      ...filters,
      rooms: rooms === "Any" ? undefined : Number(rooms),
    });
  };

  return (
    <div className="w-full space-y-6">
      {/* 1. MAIN SEARCH INPUT */}
      <div className="relative group">
        <span className="material-symbols-outlined absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-green-600 transition-colors">
          search
        </span>
        <input
          className="w-full pl-14 pr-6 py-5 bg-gray-50 border-2 border-transparent rounded-[2rem] focus:bg-white focus:border-green-600 focus:ring-4 focus:ring-green-600/5 placeholder:text-gray-400 text-gray-900 transition-all font-medium text-lg outline-none"
          placeholder="DHA Phase 5, Karachi ya koi bhi area search karein..."
          value={filters.query}
          onChange={(e) => setFilters({ ...filters, query: e.target.value })}
        />
      </div>

      {/* 2. FILTERS ROW */}
      <div className="flex flex-wrap items-center gap-2 md:gap-3">
        {/* Category Selection */}
        <div className="flex p-1 bg-gray-100 rounded-2xl overflow-x-auto">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilters({ ...filters, category: cat })}
              className={`px-3 md:px-6 py-2 rounded-xl text-xs md:text-sm font-bold transition-all whitespace-nowrap ${
                filters.category === cat
                  ? "bg-white text-green-700 shadow-sm"
                  : "text-gray-500 hover:text-gray-900"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Divider for Desktop */}
        <div className="hidden lg:block h-8 w-[1px] bg-gray-200 mx-2" />

        {/* Rooms Dropdown */}
        <div className="relative inline-block">
          <select
            value={filters.rooms || "Any"}
            onChange={(e) => handleRoomsChange(e.target.value)}
            className="appearance-none pl-3 md:pl-5 pr-8 md:pr-10 py-2 md:py-3 bg-white border border-gray-200 rounded-2xl text-xs md:text-sm font-bold text-gray-700 focus:border-green-600 outline-none cursor-pointer hover:bg-gray-50 transition-colors"
          >
            <option value="Any">Rooms: Any</option>
            <option value="1">1 Room</option>
            <option value="2">2 Rooms</option>
            <option value="3">3+ Rooms</option>
          </select>
          <span className="material-symbols-outlined absolute right-2 md:right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none text-lg md:text-xl">
            expand_more
          </span>
        </div>

        {/* Toggle Buttons (Furnished & Family) */}
        <div className="flex gap-1 md:gap-2">
          <button
            onClick={() =>
              setFilters({
                ...filters,
                furnished: filters.furnished === true ? undefined : true,
              })
            }
            className={`flex items-center gap-1 md:gap-2 px-3 md:px-5 py-2 md:py-3 rounded-2xl text-xs md:text-sm font-bold border transition-all ${
              filters.furnished === true
                ? "bg-green-600 text-white border-green-600 shadow-lg shadow-green-200"
                : "bg-white text-gray-700 border-gray-200 hover:bg-gray-50"
            }`}
          >
            <span className="material-symbols-outlined text-sm md:text-[18px]">chair</span>
            <span className="hidden sm:inline">Furnished</span>
            <span className="sm:hidden">Fur</span>
          </button>

          <button
            onClick={() =>
              setFilters({
                ...filters,
                tenantType: filters.tenantType === "Family" ? "All" : "Family",
              })
            }
            className={`flex items-center gap-1 md:gap-2 px-3 md:px-5 py-2 md:py-3 rounded-2xl text-xs md:text-sm font-bold border transition-all ${
              filters.tenantType === "Family"
                ? "bg-green-600 text-white border-green-600 shadow-lg shadow-green-200"
                : "bg-white text-gray-700 border-gray-200 hover:bg-gray-50"
            }`}
          >
            <span className="material-symbols-outlined text-sm md:text-[18px]">family_restroom</span>
            <span className="hidden sm:inline">Family Only</span>
            <span className="sm:hidden">Family</span>
          </button>
        </div>

        {/* Price Range - Compact Version */}
        <div className="flex items-center gap-2 md:gap-3 px-3 md:px-5 py-2 md:py-2.5 bg-gray-50 border border-gray-200 rounded-2xl">
          <span className="text-xs font-black text-gray-400 uppercase tracking-tighter hidden md:inline">Price (PKR)</span>
          <span className="text-xs font-black text-gray-400 uppercase tracking-tighter md:hidden">PKR</span>
          <div className="flex items-center gap-1 md:gap-2">
            <input
              type="number"
              placeholder="Min"
              value={filters.minPrice || ""}
              onChange={(e) => handlePriceRangeChange(e.target.value, filters.maxPrice)}
              className="w-16 md:w-20 bg-transparent border-b border-gray-300 focus:border-green-600 outline-none text-xs md:text-sm font-bold py-0.5"
            />
            <span className="text-gray-400 text-xs md:text-sm">—</span>
            <input
              type="number"
              placeholder="Max"
              value={filters.maxPrice || ""}
              onChange={(e) => handlePriceRangeChange(filters.minPrice, e.target.value)}
              className="w-16 md:w-20 bg-transparent border-b border-gray-300 focus:border-green-600 outline-none text-xs md:text-sm font-bold py-0.5"
            />
          </div>
        </div>
      </div>
    </div>
  );
}