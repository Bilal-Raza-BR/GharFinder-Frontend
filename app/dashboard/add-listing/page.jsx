"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  Home, MapPin, DollarSign, Bed, Bath,
  Maximize, Layers, Droplets, Flame, Zap,
  Check, Info, Image as ImageIcon, Send, Sparkles
} from "lucide-react";
import { createListing } from "../../../lib/api";

export default function AddListing() {
  const [formData, setFormData] = useState({
    title: "", description: "", price: "", location: "",
    rooms: 0, baths: 0, area: "", furnished: false,
    familyAllowed: false, floor: "", 
    gasAvailable: false, // Added to align with schema and edit-listing's formData
    utilities: { water: "", gas: "", electricity: "" },
    features: "", tenantRules: "", latitude: "", longitude: "",
  });

  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (name.startsWith("utilities.")) {
      const field = name.split(".")[1];
      setFormData(prev => ({ ...prev, utilities: { ...prev.utilities, [field]: value } }));
    } else {
      const processedValue = type === "checkbox" ? checked : 
                           (type === "number" ? (value === "" ? "" : Number(value)) : value);
      setFormData(prev => ({ ...prev, [name]: processedValue }));
    }
  };

  const handleImageChange = (e) => {
    setImages(Array.from(e.target.files));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.title.trim()) {
      alert('Property title is required');
      return;
    }
    if (!formData.description.trim()) {
      alert('Property description is required');
      return;
    }
    if (!formData.price || formData.price < 1000) {
      alert('Price is required and must be at least Rs. 1,000');
      return;
    }
    if (!formData.location.trim()) {
      alert('Location is required');
      return;
    }
    if (images.length < 1) {
      alert('At least 1 property image is required');
      return;
    }

    setLoading(true);

    try {
      const formDataToSend = new FormData();
      
      // Append all form fields
      Object.keys(formData).forEach(key => {
        if (key === 'utilities') {
          formDataToSend.append('utilities', JSON.stringify(formData.utilities));
        } else if (key === 'features') {
          formDataToSend.append('features', JSON.stringify(formData.features.split(',').map(f => f.trim())));
        } else {
          formDataToSend.append(key, formData[key]);
        }
      });

      // Append images
      images.forEach(image => {
        formDataToSend.append('images', image);
      });

      await createListing(formDataToSend);
      router.push('/dashboard/my-listings');
    } catch (error) {
      console.error('Error creating listing:', error);
      alert('Error creating listing: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FDFDFF] text-slate-900 selection:bg-green-100 pb-20 overflow-hidden relative">
      
      {/* Background Decorative Elements */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-green-50 rounded-full blur-[120px] -z-10 opacity-60"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[30%] h-[30%] bg-blue-50 rounded-full blur-[100px] -z-10 opacity-60"></div>

      <div className="max-w-5xl mx-auto px-6 pt-32">
        {/* Glass Header */}
        <div className="text-center mb-16 space-y-4">
          <span className="px-4 py-1.5 bg-green-50 text-green-700 text-xs font-black uppercase tracking-[0.3em] rounded-full border border-green-100">
            Property Portal
          </span>
          <h1 className="text-5xl md:text-6xl font-black tracking-tight text-slate-900">
            List Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-emerald-500">Masterpiece</span>
          </h1>
          <p className="text-slate-500 font-medium max-w-lg mx-auto">
            Hazaaroon log aapki property ka intezar kar rahe hain. Aaj hi list karein!
          </p>
        </div>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* LHS: Main Form (8 Columns) */}
          <div className="lg:col-span-8 space-y-8">
            
            {/* Card 1: Basic Info */}
            <div className="group bg-white/70 backdrop-blur-xl border border-white p-8 md:p-10 rounded-[3rem] shadow-2xl shadow-slate-200/40 hover:shadow-green-100/50 transition-all duration-500">
              <div className="flex items-center gap-4 mb-8">
                <div className="p-3 bg-green-600 text-white rounded-2xl shadow-lg shadow-green-200">
                  <Home size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-bold">Property Overview</h3>
                  <p className="text-sm text-slate-400">Buniyaadi maloomat yahan likhein</p>
                </div>
              </div>

              <div className="space-y-6">
                <div className="relative">
                  <input
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    placeholder=" "
                    className="peer block w-full rounded-[1.25rem] border border-slate-200 bg-slate-50 px-5 pt-5 pb-2 text-slate-900 outline-none transition-all duration-300 placeholder:text-transparent focus:border-emerald-500 focus:bg-white focus:shadow-[0_0_0_4px_rgba(16,185,129,0.1)]"
                  />
                  <label className="pointer-events-none absolute left-5 top-5 text-slate-400 font-semibold transition-all duration-300 peer-focus:top-2 peer-focus:text-[0.65rem] peer-focus:text-emerald-600 peer-focus:uppercase peer-focus:tracking-[0.1em] peer-placeholder-shown:top-5 peer-placeholder-shown:text-base">
                    Property Title
                  </label>
                </div>

                <div className="relative">
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    placeholder=" "
                    className="peer block w-full rounded-[1.25rem] border border-slate-200 bg-slate-50 px-5 pt-5 pb-2 text-slate-900 outline-none transition-all duration-300 placeholder:text-transparent focus:border-emerald-500 focus:bg-white focus:shadow-[0_0_0_4px_rgba(16,185,129,0.1)]"
                    rows="3"
                  ></textarea>
                  <label className="pointer-events-none absolute left-5 top-5 text-slate-400 font-semibold transition-all duration-300 peer-focus:top-2 peer-focus:text-[0.65rem] peer-focus:text-emerald-600 peer-focus:uppercase peer-focus:tracking-[0.1em] peer-placeholder-shown:top-5 peer-placeholder-shown:text-base">
                    Property Description
                  </label>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="relative">
                    <DollarSign className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                    <input 
                      name="price" 
                      type="number" 
                      value={formData.price} 
                      onChange={handleChange} 
                      placeholder="Monthly Rent" 
                      className="pl-12 w-full px-5 py-4 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-green-500 outline-none transition-all font-bold text-green-700" 
                    />
                  </div>
                  <div className="relative">
                    <Maximize className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                    <input 
                      name="area" 
                      value={formData.area} 
                      onChange={handleChange} 
                      placeholder="Area (e.g. 120 Sq. Yards)" 
                      className="pl-12 w-full px-5 py-4 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-green-500 outline-none transition-all" 
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Card 2: Location (Glassmorphism) */}
            <div className="bg-white/70 backdrop-blur-xl border border-white p-8 md:p-10 rounded-[3rem] shadow-2xl shadow-slate-200/40">
              <div className="flex items-center gap-4 mb-8">
                <div className="p-3 bg-blue-500 text-white rounded-2xl shadow-lg shadow-blue-200">
                  <MapPin size={24} />
                </div>
                <h3 className="text-xl font-bold">Location & Map</h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="md:col-span-2">
                  <input name="location" value={formData.location} onChange={handleChange} placeholder="Exact Address (Sector, Block, City)" className="w-full px-5 py-4 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none transition-all" />
                </div>
                <input name="latitude" value={formData.latitude} onChange={handleChange} placeholder="Latitude" className="w-full px-5 py-4 bg-slate-100/50 rounded-2xl outline-none" />
                <input name="longitude" value={formData.longitude} onChange={handleChange} placeholder="Longitude" className="w-full px-5 py-4 bg-slate-100/50 rounded-2xl outline-none" />
              </div>
            </div>

            {/* Card 3: Utilities & Features */}
            <div className="bg-slate-900 text-white p-10 rounded-[3.5rem] shadow-2xl overflow-hidden relative group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-green-500/20 blur-[60px]"></div>
              
              <h3 className="text-xl font-bold mb-8 flex items-center gap-2">
                <Zap className="text-green-400" size={24} /> Utilities Status
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                  { icon: Droplets, name: "utilities.water", label: "Water", color: "text-blue-400" },
                  { icon: Flame, name: "utilities.gas", label: "Gas", color: "text-orange-400" },
                  { icon: Zap, name: "utilities.electricity", label: "Electricity", color: "text-yellow-400" }
                ].map((item, idx) => (
                  <div key={idx} className="bg-white/5 border border-white/10 p-5 rounded-3xl hover:bg-white/10 transition-all duration-300">
                    <div className={`flex items-center gap-2 mb-2 ${item.color}`}>
                      <item.icon size={16} />
                      <span className="text-xs font-black uppercase tracking-widest">{item.label}</span>
                    </div>
                    <input name={item.name} onChange={handleChange} placeholder="Status..." className="bg-transparent border-none outline-none w-full text-sm placeholder:text-slate-600" />
                  </div>
                ))}
              </div>
            </div>

            {/* Card 4: Additional Details */}
            <div className="group bg-white/70 backdrop-blur-xl border border-white p-8 md:p-10 rounded-[3rem] shadow-2xl shadow-slate-200/40 hover:shadow-purple-50 transition-all duration-500">
              <div className="flex items-center gap-4 mb-8">
                <div className="p-3 bg-purple-500 text-white rounded-2xl shadow-lg shadow-purple-200">
                  <Info size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-bold">Additional Details</h3>
                  <p className="text-sm text-slate-400">Mazeed maloomat faraham karein</p>
                </div>
              </div>

              <div className="space-y-6">
                <div className="relative">
                  <textarea
                    name="features"
                    value={formData.features}
                    onChange={handleChange}
                    placeholder=" "
                    className="peer block w-full rounded-[1.25rem] border border-slate-200 bg-slate-50 px-5 pt-5 pb-2 text-slate-900 outline-none transition-all duration-300 placeholder:text-transparent focus:border-emerald-500 focus:bg-white focus:shadow-[0_0_0_4px_rgba(16,185,129,0.1)]"
                    rows="2"
                  ></textarea>
                  <label className="pointer-events-none absolute left-5 top-5 text-slate-400 font-semibold transition-all duration-300 peer-focus:top-2 peer-focus:text-[0.65rem] peer-focus:text-emerald-600 peer-focus:uppercase peer-focus:tracking-[0.1em] peer-placeholder-shown:top-5 peer-placeholder-shown:text-base">
                    Features (comma-separated)
                  </label>
                </div>
                <div className="relative">
                  <textarea
                    name="tenantRules"
                    value={formData.tenantRules}
                    onChange={handleChange}
                    placeholder=" "
                    className="peer block w-full rounded-[1.25rem] border border-slate-200 bg-slate-50 px-5 pt-5 pb-2 text-slate-900 outline-none transition-all duration-300 placeholder:text-transparent focus:border-emerald-500 focus:bg-white focus:shadow-[0_0_0_4px_rgba(16,185,129,0.1)]"
                    rows="2"
                  ></textarea>
                  <label className="pointer-events-none absolute left-5 top-5 text-slate-400 font-semibold transition-all duration-300 peer-focus:top-2 peer-focus:text-[0.65rem] peer-focus:text-emerald-600 peer-focus:uppercase peer-focus:tracking-[0.1em] peer-placeholder-shown:top-5 peer-placeholder-shown:text-base">
                    Tenant Rules
                  </label>
                </div>
              </div>
            </div>
          </div>

          {/* RHS: Sidebar (4 Columns) */}
          <div className="lg:col-span-4 space-y-6">
            
            {/* Quick Specs Sidebar */}
            <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-xl">
              <h4 className="font-bold mb-6 text-slate-400 text-xs uppercase tracking-widest">Key Specs</h4>
              <div className="space-y-4">
                <div className="flex items-center gap-4 bg-slate-50 p-3 rounded-2xl">
                  <Bed className="text-green-600" size={20} />
                  <input name="rooms" type="number" value={formData.rooms} onChange={handleChange} placeholder="Rooms" className="bg-transparent outline-none w-full font-bold" />
                </div>
                <div className="flex items-center gap-4 bg-slate-50 p-3 rounded-2xl">
                  <Bath className="text-blue-600" size={20} />
                  <input name="baths" type="number" value={formData.baths} onChange={handleChange} placeholder="Baths" className="bg-transparent outline-none w-full font-bold" />
                </div>
                <div className="flex items-center gap-4 bg-slate-50 p-3 rounded-2xl">
                  <Layers className="text-purple-600" size={20} />
                  <input name="floor" value={formData.floor} onChange={handleChange} placeholder="Floor No." className="bg-transparent outline-none w-full font-bold" />
                </div>
              </div>

              <div className="mt-8 space-y-3">
                <label className="flex items-center gap-3 p-4 border border-slate-100 rounded-2xl cursor-pointer hover:bg-green-50 transition-all">
                  <input type="checkbox" name="furnished" onChange={handleChange} className="hidden" />
                  <div className="w-5 h-5 rounded border-2 border-slate-200 flex items-center justify-center">
                    {formData.furnished && <Check size={14} className="text-green-600" />}
                  </div>
                  <span className="text-sm font-bold text-slate-600">Furnished</span>
                </label>
              </div>
              <div className="mt-4 space-y-3">
                <label className="flex items-center gap-3 p-4 border border-slate-100 rounded-2xl cursor-pointer hover:bg-green-50 transition-all">
                  <input type="checkbox" name="familyAllowed" onChange={handleChange} className="hidden" />
                  <div className="w-5 h-5 rounded border-2 border-slate-200 flex items-center justify-center">
                    {formData.familyAllowed && <Check size={14} className="text-green-600" />}
                  </div>
                  <span className="text-sm font-bold text-slate-600">Family Allowed</span>
                </label>
              </div>
            </div>

            {/* Image Upload Area */}
            <div className="bg-emerald-50 p-8 rounded-[2.5rem] border border-emerald-100">
              <div className="flex flex-col items-center text-center space-y-4">
                <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center shadow-sm text-emerald-600">
                  <ImageIcon size={32} />
                </div>
                <h4 className="font-bold text-emerald-900">Upload Photos ({images.length})</h4>
                <p className="text-xs text-emerald-600/70">Kam az kam 3 clear tasaveer upload karein</p>
                <input type="file" multiple onChange={handleImageChange} className="hidden" id="file-upload" />
                <label htmlFor="file-upload" className="w-full py-3 bg-white text-emerald-700 text-xs font-black uppercase tracking-widest rounded-xl shadow-md cursor-pointer hover:scale-105 transition-transform">
                  Browse Gallery
                </label>
                
                {/* Image Previews */}
                {images.length > 0 && (
                  <div className="w-full mt-4">
                    <p className="text-xs text-emerald-600/70 mb-2">Selected Images:</p>
                    <div className="grid grid-cols-3 gap-2">
                      {images.map((image, index) => (
                        <div key={index} className="relative">
                          <img
                            src={URL.createObjectURL(image)}
                            alt={`Preview ${index + 1}`}
                            className="w-full h-16 object-cover rounded-lg border border-emerald-200"
                          />
                          <button
                            type="button"
                            onClick={() => {
                              setImages(images.filter((_, i) => i !== index));
                            }}
                            className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white rounded-full text-xs flex items-center justify-center hover:bg-red-600"
                          >
                            ×
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Action Button */}
            <button type="submit" disabled={loading} className="w-full group bg-slate-900 text-white p-6 rounded-[2rem] font-black uppercase tracking-[0.2em] flex items-center justify-center gap-4 hover:bg-green-600 transition-all shadow-2xl shadow-green-200 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed">
              {loading ? 'Publishing...' : 'Publish Now'}
              <Send size={20} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}