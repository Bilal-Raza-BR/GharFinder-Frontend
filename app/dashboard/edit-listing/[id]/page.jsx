"use client";
import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { getListingById, updateListing, deleteImage } from "../../../../lib/api";
import { useToast } from "../../../../components/toast/ToastProvider";
import { 
  Home, MapPin, DollarSign, Bed, Bath, Maximize, Layers, 
  Droplets, Flame, Zap, Check, Info, Image as ImageIcon, 
  Trash2, ArrowLeft
} from "lucide-react";

export default function EditListing() {
  const { id } = useParams();
  const router = useRouter();
  const { addToast } = useToast();
  
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    location: "",
    rooms: 0,
    baths: 0,
    area: "",
    furnished: false,
    familyAllowed: false,
    floor: "",
    utilities: { water: "", gas: "", electricity: "" },
    features: "",
    tenantRules: "",
    status: "active",
    latitude: "",
    longitude: "",
  });

  const [existingImages, setExistingImages] = useState([]);
  const [newImages, setNewImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [fetchLoading, setFetchLoading] = useState(true);
  const [error, setError] = useState("");

  // Load listing data on mount
  useEffect(() => {
    const loadListing = async () => {
      try {
        setFetchLoading(true);
        const result = await getListingById(id);
        const listing = result.data;
        
        console.log('Loaded listing:', listing);

        setFormData({
          title: listing.title || "",
          description: listing.description || "",
          price: listing.price || "",
          location: listing.location || "",
          latitude: listing.latitude || "",
          longitude: listing.longitude || "",
          rooms: listing.rooms || 0,
          baths: listing.baths || 0,
          area: listing.area || "",
          furnished: listing.furnished || false,
          familyAllowed: listing.familyAllowed || false,
          status: listing.status || "active",
          floor: listing.floor || "",
          utilities: {
            water: listing.utilities?.water || "",
            gas: listing.utilities?.gas || "",
            electricity: listing.utilities?.electricity || "",
          },
          features: listing.features?.join(", ") || "",
          tenantRules: listing.tenantRules || "",
        });
        
        setExistingImages(listing.images || []);
        setError("");
      } catch (err) {
        console.error('Error loading listing:', err);
        setError("Listing load nahi ho saki");
        addToast("Failed to load listing", "error");
      } finally {
        setFetchLoading(false);
      }
    };

    if (id) loadListing();
  }, [id, addToast]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    if (name.includes(".")) {
      const [parent, child] = name.split(".");
      setFormData(prev => ({
        ...prev,
        [parent]: { ...prev[parent], [child]: value }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: type === "checkbox" ? checked : (type === "number" ? (value === "" ? "" : Number(value)) : value)
      }));
    }
  };

  const handleImageChange = (e) => {
    setNewImages(Array.from(e.target.files));
  };

  const handleDeleteImage = async (imageUrl) => {
    if (!confirm("Are you sure you want to delete this image?")) return;

    try {
      console.log('Deleting image:', imageUrl);
      await deleteImage(id, imageUrl);
      setExistingImages(prev => prev.filter(img => img !== imageUrl));
      addToast("Image deleted successfully", "success");
    } catch (err) {
      console.error('Delete error:', err);
      addToast("Failed to delete image: " + err.message, "error");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // Validation
    if (!formData.title.trim() || formData.title.length < 5) {
      setError("Title kam az kam 5 characters ka hona chahiye");
      addToast("Title must be at least 5 characters", "error");
      return;
    }

    if (!formData.description.trim() || formData.description.length < 20) {
      setError("Description kam az kam 20 characters ka hona chahiye");
      addToast("Description must be at least 20 characters", "error");
      return;
    }

    if (!formData.price || formData.price < 1000) {
      setError("Price kam az kam 1000 hona chahiye");
      addToast("Price must be at least 1000", "error");
      return;
    }

    const totalImages = existingImages.length + newImages.length;
    if (totalImages === 0) {
      setError("Kam az kam ek tasveer lazmi hai");
      addToast("At least 1 image is required", "error");
      return;
    }

    setLoading(true);

    try {
      const formDataToSend = new FormData();

      // Add form fields
      Object.keys(formData).forEach(key => {
        if (key === 'utilities') {
          formDataToSend.append('utilities', JSON.stringify(formData.utilities));
        } else if (key === 'features') {
          const featuresArray = formData.features.split(',').map(f => f.trim()).filter(f => f);
          formDataToSend.append('features', JSON.stringify(featuresArray));
        } else {
          formDataToSend.append(key, formData[key]);
        }
      });

      // Add new images
      newImages.forEach(image => {
        formDataToSend.append('images', image);
      });

      // Add existing images URLs
      formDataToSend.append('existingImages', JSON.stringify(existingImages));

      console.log('Updating listing with data...');
      await updateListing(id, formDataToSend);
      addToast("Listing updated successfully", "success");
      router.push('/dashboard/my-listings');
    } catch (err) {
      console.error('Update error:', err);
      setError("Update nahi ho saki: " + err.message);
      addToast("Failed to update listing: " + err.message, "error");
    } finally {
      setLoading(false);
    }
  };

  if (fetchLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-green-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-slate-500 font-bold">Loading listing...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-6 bg-[#f8fafc] min-h-screen">
      <div className="mb-10 flex items-center gap-4">
        <button onClick={() => router.back()} className="p-2 hover:bg-slate-200 rounded-lg">
          <ArrowLeft size={20} />
        </button>
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">
            EDIT <span className="text-green-600">LISTING</span>
          </h1>
          <p className="text-slate-500 font-medium">Property ki details update karein</p>
        </div>
      </div>

      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 font-bold">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Core Details */}
        <div className="lg:col-span-8 space-y-6">
          
          {/* Main Info Card */}
          <section className="bg-white p-8 rounded-[2rem] shadow-sm border border-slate-100">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-green-100 text-green-600 rounded-lg"><Home size={20}/></div>
              <h3 className="font-bold text-lg">Property Details</h3>
            </div>
            
            <div className="space-y-4">
              <div className="group">
                <label className="text-xs font-black uppercase tracking-widest text-slate-400 ml-1">Title</label>
                <input 
                  name="title" 
                  value={formData.title} 
                  onChange={handleChange}
                  className="w-full mt-1 p-4 bg-slate-50 rounded-2xl border-2 border-transparent focus:border-green-500 focus:bg-white transition-all outline-none font-semibold"
                  placeholder="e.g. Luxury Apartment in DHA Phase 6"
                />
              </div>

              <div>
                <label className="text-xs font-black uppercase tracking-widest text-slate-400 ml-1">Description</label>
                <textarea 
                  name="description" 
                  rows={4}
                  value={formData.description} 
                  onChange={handleChange}
                  className="w-full mt-1 p-4 bg-slate-50 rounded-2xl border-2 border-transparent focus:border-green-500 focus:bg-white transition-all outline-none font-medium"
                  placeholder="Property ki mukammal tafseel likhein..."
                />
              </div>

              <div>
                <label className="text-xs font-black uppercase tracking-widest text-slate-400 ml-1">Location</label>
                <input 
                  name="location" 
                  value={formData.location} 
                  onChange={handleChange}
                  className="w-full mt-1 p-4 bg-slate-50 rounded-2xl border-2 border-transparent focus:border-green-500 focus:bg-white transition-all outline-none"
                  placeholder="e.g. DHA Phase 6, Karachi"
                />
              </div>
            </div>
          </section>

          {/* Utilities & Features */}
          <section className="bg-slate-900 p-8 rounded-[2rem] text-white">
            <div className="flex items-center gap-3 mb-8">
              <Zap className="text-yellow-400" size={20}/>
              <h3 className="font-bold text-lg text-white">Utilities & Infrastructure</h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { icon: Droplets, color: "text-blue-400", label: "Water", name: "utilities.water" },
                { icon: Flame, color: "text-orange-400", label: "Gas", name: "utilities.gas" },
                { icon: Zap, color: "text-yellow-400", label: "Electricity", name: "utilities.electricity" }
              ].map((util) => (
                <div key={util.name} className="bg-white/5 border border-white/10 p-4 rounded-2xl">
                  <div className={`flex items-center gap-2 mb-2 ${util.color}`}>
                    <util.icon size={16}/>
                    <span className="text-[10px] font-black uppercase tracking-tighter">{util.label}</span>
                  </div>
                  <input 
                    name={util.name}
                    value={formData.utilities[util.name.split('.')[1]]}
                    onChange={handleChange}
                    className="bg-transparent w-full outline-none text-sm font-bold placeholder:text-slate-600"
                    placeholder="e.g. 24/7 Available"
                  />
                </div>
              ))}
            </div>

            <div className="mt-8 pt-8 border-t border-white/10">
              <label className="text-xs font-black uppercase tracking-widest text-slate-300">Features (Comma Separated)</label>
              <input 
                name="features"
                value={formData.features}
                onChange={handleChange}
                className="w-full mt-2 bg-white/5 border border-white/10 p-3 rounded-2xl outline-none font-bold text-sm text-white placeholder:text-slate-500"
                placeholder="Parking, Gym, Swimming Pool, Security..."
              />
            </div>

            <div className="mt-6">
              <label className="text-xs font-black uppercase tracking-widest text-slate-300">Tenant Rules</label>
              <textarea 
                name="tenantRules"
                value={formData.tenantRules}
                onChange={handleChange}
                rows={3}
                className="w-full mt-2 bg-white/5 border border-white/10 p-3 rounded-2xl outline-none font-bold text-sm text-white placeholder:text-slate-500"
                placeholder="Tenant rules aur restrictions..."
              />
            </div>
          </section>

          {/* Image Management */}
          <section className="bg-white p-8 rounded-[2rem] shadow-sm border border-slate-100">
            <h3 className="font-bold text-lg mb-6 flex items-center gap-3">
              <div className="p-2 bg-blue-100 text-blue-600 rounded-lg"><ImageIcon size={20}/></div>
              Images
            </h3>

            {/* Existing Images */}
            {existingImages.length > 0 && (
              <div className="mb-8">
                <h4 className="text-sm font-bold text-slate-500 mb-3 uppercase tracking-widest">Existing Images ({existingImages.length})</h4>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {existingImages.map((img, idx) => (
                    <div key={idx} className="relative group">
                      <img src={img} alt={`Existing ${idx}`} className="w-full h-32 object-cover rounded-lg border border-slate-200" />
                      <button
                        type="button"
                        onClick={() => handleDeleteImage(img)}
                        className="absolute top-1 right-1 p-2 bg-red-500 text-white rounded-lg opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* New Images */}
            <div>
              <label className="text-xs font-black uppercase tracking-widest text-slate-400 ml-1">Upload New Images</label>
              <input 
                type="file" 
                multiple 
                accept="image/*"
                onChange={handleImageChange}
                className="w-full mt-2 p-4 bg-slate-50 rounded-2xl border-2 border-dashed border-slate-200 cursor-pointer"
              />
              {newImages.length > 0 && (
                <div className="mt-4">
                  <p className="text-xs font-bold text-slate-500 mb-2">New Images: {newImages.length}</p>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {newImages.map((img, idx) => (
                      <div key={idx} className="relative">
                        <img src={URL.createObjectURL(img)} alt={`New ${idx}`} className="w-full h-32 object-cover rounded-lg border border-slate-200" />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </section>
        </div>

        {/* Right Column: Numbers & Status */}
        <div className="lg:col-span-4 space-y-6">
          
          {/* Price & Status Card */}
          <div className="bg-white p-6 rounded-[2rem] shadow-sm border border-slate-100">
            <div className="space-y-6">
              <div>
                <label className="text-xs font-black text-slate-400 uppercase tracking-widest">Price (PKR)</label>
                <div className="flex items-center gap-2 mt-1 bg-green-50 p-4 rounded-2xl border border-green-100">
                  <DollarSign className="text-green-600" />
                  <input 
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                    className="bg-transparent w-full font-black text-green-700 text-xl outline-none"
                    placeholder="0"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-black text-slate-400 uppercase tracking-widest">Listing Status</label>
                <select 
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  className="w-full mt-1 p-4 bg-slate-900 text-white rounded-2xl font-bold outline-none cursor-pointer"
                >
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                  <option value="sold">Sold</option>
                </select>
              </div>
            </div>
          </div>

          {/* Location Card */}
          <div className="bg-white p-6 rounded-[2rem] shadow-sm border border-slate-100">
            <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-4">Coordinates</h4>
            <div className="space-y-3">
              <input 
                type="number" 
                step="0.000001"
                name="latitude"
                value={formData.latitude}
                onChange={handleChange}
                placeholder="Latitude"
                className="w-full p-3 bg-slate-50 rounded-lg border border-slate-200 outline-none font-bold text-sm"
              />
              <input 
                type="number" 
                step="0.000001"
                name="longitude"
                value={formData.longitude}
                onChange={handleChange}
                placeholder="Longitude"
                className="w-full p-3 bg-slate-50 rounded-lg border border-slate-200 outline-none font-bold text-sm"
              />
            </div>
          </div>

          {/* Specifications Grid */}
          <div className="bg-white p-6 rounded-[2rem] shadow-sm border border-slate-100">
            <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-4">Specifications</h4>
            <div className="grid grid-cols-2 gap-4">
              {[
                { label: "Rooms", name: "rooms", icon: Bed },
                { label: "Baths", name: "baths", icon: Bath },
                { label: "Floor", name: "floor", icon: Layers },
                { label: "Area", name: "area", icon: Maximize },
              ].map((spec) => (
                <div key={spec.name} className="p-3 bg-slate-50 rounded-2xl border border-slate-100">
                  <div className="flex items-center gap-2 mb-1 text-slate-400">
                    <spec.icon size={14}/>
                    <span className="text-[10px] font-black uppercase">{spec.label}</span>
                  </div>
                  <input 
                    name={spec.name}
                    type={spec.name === "floor" ? "text" : "number"}
                    value={formData[spec.name]}
                    onChange={handleChange}
                    className="w-full bg-transparent font-bold text-slate-800 outline-none text-sm"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Toggle Switches */}
          <div className="space-y-3">
            {[
              { label: "Fully Furnished", name: "furnished" },
              { label: "Family Allowed", name: "familyAllowed" },
            ].map((toggle) => (
              <label key={toggle.name} className="flex items-center justify-between p-4 bg-white rounded-2xl border border-slate-100 cursor-pointer hover:bg-green-50 transition-colors">
                <span className="font-bold text-slate-700 text-sm">{toggle.label}</span>
                <div className="relative inline-flex items-center cursor-pointer">
                  <input 
                    type="checkbox" 
                    name={toggle.name}
                    checked={formData[toggle.name]}
                    onChange={handleChange}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"></div>
                </div>
              </label>
            ))}
          </div>

          <button 
            type="submit"
            disabled={loading}
            className="w-full bg-green-600 hover:bg-green-700 disabled:opacity-50 text-white p-6 rounded-[2rem] font-black tracking-widest transition-all shadow-xl shadow-green-100 active:scale-95"
          >
            {loading ? 'SAVING...' : 'SAVE CHANGES'}
          </button>
        </div>
      </form>
    </div>
  );
}