"use client";
import Link from "next/link";

export function Footer() {
  const socialLinks = [
    { name: "facebook", path: "M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" },
    { name: "instagram", path: "M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z M17.5 6.5h.01" },
    { name: "twitter", path: "M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z" },
    { name: "linkedin", path: "M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z M2 9h4v12H2z M4 2a2 2 0 1 1-2 2 2 2 0 0 1 2-2z" }
  ];

  return (
    <footer className="bg-white border-t border-gray-100 mt-24">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          
          {/* 1. Brand & About */}
          <div className="lg:col-span-2">
            <Link href="/" className="text-2xl font-black text-green-600 tracking-tighter mb-6 inline-block">
              GharFinder<span className="text-gray-900 text-3xl leading-none">.</span>
            </Link>
            <p className="text-gray-500 mb-8 max-w-sm leading-relaxed text-sm md:text-base">
              Pakistan's premier rental platform. Hum owners aur tenants ko direct connect karte hain, 
              baghair kisi middleman ya bhari commission ke.
            </p>
            
            {/* Social Links - Fixed UI */}
            <div className="flex gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href="#"
                  className="w-11 h-11 bg-gray-50 hover:bg-green-600 group rounded-2xl flex items-center justify-center transition-all duration-300 shadow-sm border border-gray-100"
                  aria-label={social.name}
                >
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors"
                  >
                    {social.name === "instagram" ? (
                      <>
                        <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                        <path d={social.path} />
                      </>
                    ) : (
                      <path d={social.path} />
                    )}
                  </svg>
                </a>
              ))}
            </div>
          </div>

          {/* 2. Quick Links */}
          <div>
            <h3 className="text-sm font-black text-gray-900 uppercase tracking-widest mb-6">Explore</h3>
            <ul className="space-y-4">
              {["Browse Properties", "About Our Process", "List Your Property", "Owner Dashboard"].map((link, i) => (
                <li key={i}>
                  <Link href="#" className="text-gray-500 hover:text-green-600 font-medium transition-colors text-sm">
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* 3. Support & Contact */}
          <div>
            <h3 className="text-sm font-black text-gray-900 uppercase tracking-widest mb-6">Support</h3>
            <div className="space-y-4">
              <a href="mailto:hello@gharfinder.pk" className="block text-gray-500 hover:text-green-600 font-medium transition-colors text-sm font-bold">
                hello@gharfinder.pk
              </a>
              <p className="text-gray-500 font-medium text-sm leading-6">
                +92 300 123 4567 <br />
                <span className="text-gray-400 font-normal">Mon - Sat: 9 AM - 6 PM</span>
              </p>
              <div className="pt-2">
                 <Link href="/contact" className="text-green-600 font-black text-xs uppercase tracking-tighter hover:underline flex items-center gap-1">
                    Get Help Now <span>→</span>
                 </Link>
              </div>
            </div>
          </div>
        </div>

        {/* 4. Major Cities Section */}
        <div className="border-t border-gray-50 pt-12 mb-12">
          <h3 className="text-xs font-black text-gray-400 uppercase tracking-widest mb-6">Popular Locations</h3>
          <div className="flex flex-wrap gap-2">
            {[
              "Lahore", "Karachi", "Islamabad", "Rawalpindi", "Faisalabad",
              "Multan", "Peshawar", "Quetta", "Sialkot", "Gujranwala"
            ].map((city) => (
              <Link
                key={city}
                href={`/listings?location=${city}`}
                className="px-4 py-2 rounded-xl text-xs font-bold bg-gray-50 text-gray-500 hover:bg-green-50 hover:text-green-700 transition-all border border-transparent hover:border-green-100"
              >
                {city}
              </Link>
            ))}
          </div>
        </div>

        {/* 5. Bottom Bar */}
        <div className="pt-8 border-t border-gray-50 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-gray-400 text-xs font-medium">
            © 2026 GharFinder Pakistan. Built with ❤️ for better living.
          </p>
          <div className="flex gap-8 text-xs font-bold text-gray-400">
            <Link href="/privacy" className="hover:text-gray-900 transition-colors uppercase tracking-tighter">Privacy</Link>
            <Link href="/terms" className="hover:text-gray-900 transition-colors uppercase tracking-tighter">Terms</Link>
            <Link href="/cookies" className="hover:text-gray-900 transition-colors uppercase tracking-tighter">Cookies</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}