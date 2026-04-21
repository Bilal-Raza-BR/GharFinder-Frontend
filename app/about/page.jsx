"use client";
import Link from "next/link";

export default function About() {
  return (
    <div className="bg-white min-h-screen pt-28 pb-20">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Hero Section */}
        <section className="text-center mb-24">
          <div className="inline-block px-4 py-1.5 bg-green-50 text-green-700 rounded-full text-xs font-black uppercase tracking-widest mb-6">
            Our Story
          </div>
          <h1 className="text-5xl md:text-7xl font-black text-gray-900 mb-8 tracking-tighter">
            Hamara Maqsad:<br />
            <span className="text-green-600">Ghar dhundna asan banana.</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-500 font-medium max-w-2xl mx-auto leading-relaxed">
            Pakistan ka sab se behtreen rental platform jo property owners aur tenants ko 
            seedha connect karta hai—baghair kisi middleman ya extra fees ke.
          </p>
        </section>

        {/* Mission Section */}
        <section className="mb-32">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="relative">
              <div className="absolute -top-10 -left-10 w-32 h-32 bg-green-50 rounded-full -z-10 blur-3xl opacity-60"></div>
              <h2 className="text-4xl font-black text-gray-900 mb-8 tracking-tight">
                Hum GharFinder kyun banaya?
              </h2>
              <div className="space-y-6">
                <p className="text-gray-500 text-lg leading-relaxed">
                  Real estate mein hamesha se commission aur beech ke logon ka masla raha hai. 
                  Humne **GharFinder** is liye shuru kiya taaki transparency aur bharosa wapis laya ja sakay.
                </p>
                <p className="text-gray-500 text-lg leading-relaxed">
                  Aaj hum hazaron verified properties ke sath logon ki madad kar rahe hain taaki 
                  woh apne liye aik perfect ashiyana talaash kar sakein.
                </p>
              </div>
            </div>
            
            <div className="bg-gray-50 border border-gray-100 p-12 rounded-[3rem] shadow-2xl shadow-green-900/5">
              <div className="grid grid-cols-2 gap-10">
                {[
                  { label: "Founded", value: "2024" },
                  { label: "Properties", value: "10K+" },
                  { label: "Total Users", value: "50K+" },
                  { label: "Cities", value: "15+" }
                ].map((stat, i) => (
                  <div key={i} className="text-center">
                    <div className="text-4xl font-black text-green-600 mb-1">{stat.value}</div>
                    <div className="text-xs font-black text-gray-400 uppercase tracking-widest">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="mb-32">
          <h2 className="text-sm font-black text-green-600 uppercase tracking-[0.3em] text-center mb-16">
            Hamari Khusoosiyat
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: "verified", title: "Verified Properties", desc: "Har property ki pehle tasdeeq ki jati hai." },
              { icon: "chat", title: "Direct Contact", desc: "WhatsApp ke zariye seedha malik-e-makan se baat karein." },
              { icon: "security", title: "Safe & Secure", desc: "Aapka data aur privacy hamari pehli tarjeeh hai." },
              { icon: "location_on", title: "All Over Pakistan", desc: "Lahore, Karachi, Islamabad—sab baray shehar shamil hain." },
              { icon: "filter_list", title: "Smart Filters", desc: "Budget aur location ke mutabiq asani se search karein." },
              { icon: "support_agent", title: "24/7 Support", desc: "Hamari team hamesha aapki madad ke liye hazir hai." }
            ].map((feature, i) => (
              <div key={i} className="group p-10 rounded-[2.5rem] bg-white border border-gray-50 hover:border-green-100 hover:shadow-xl hover:shadow-green-900/5 transition-all duration-300">
                <div className="w-14 h-14 bg-gray-50 group-hover:bg-green-600 group-hover:text-white rounded-2xl flex items-center justify-center mb-6 transition-colors">
                  <span className="material-symbols-outlined text-2xl">{feature.icon}</span>
                </div>
                <h3 className="text-xl font-black text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-500 leading-relaxed font-medium">{feature.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Team Section */}
        {/* <section className="mb-32">
          <h2 className="text-3xl font-black text-gray-900 text-center mb-16 tracking-tight">Hamari Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              { name: "Ahmed Khan", role: "CEO & Founder", desc: "10 years of Real Estate experience." },
              { name: "Sara Ahmed", role: "Operations Head", desc: "Expert in user experience and process." },
              { name: "Usman Ali", role: "Lead Developer", desc: "Tech wizard behind GharFinder platform." }
            ].map((member, i) => (
              <div key={i} className="text-center group">
                <div className="w-28 h-28 bg-gray-50 rounded-[2rem] flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 border border-gray-100">
                  <span className="material-symbols-outlined text-gray-400 text-5xl">person</span>
                </div>
                <h3 className="text-xl font-black text-gray-900 mb-1">{member.name}</h3>
                <p className="text-green-600 font-bold text-xs uppercase tracking-widest mb-4">{member.role}</p>
                <p className="text-gray-500 text-sm max-w-[200px] mx-auto font-medium leading-relaxed">
                  {member.desc}
                </p>
              </div>
            ))}
          </div>
        </section> */}

        {/* CTA Section */}
        <section className="text-center bg-gray-900 rounded-[3.5rem] p-16 relative overflow-hidden">
          {/* Background Decorative Element */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-green-600/10 rounded-full blur-[100px]"></div>
          
          <h2 className="text-4xl md:text-5xl font-black text-white mb-6 tracking-tight relative z-10">
            Apna naya ghar aaj hi talaash karein
          </h2>
          <p className="text-gray-400 text-lg mb-10 max-w-xl mx-auto font-medium relative z-10">
            Hazaron log GharFinder par bharosa karte hain. Aap kis ka intezar kar rahe hain?
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center relative z-10">
            <Link
              href="/listings"
              className="bg-green-600 hover:bg-green-700 text-white px-10 py-4 rounded-2xl font-black shadow-2xl shadow-green-900/20 hover:-translate-y-1 transition-all flex items-center justify-center gap-2"
            >
              Browse Properties
            </Link>
            <Link
              href="/auth/signup"
              className="bg-white/10 hover:bg-white/20 text-white px-10 py-4 rounded-2xl font-black backdrop-blur-md transition-all flex items-center justify-center gap-2 border border-white/10"
            >
              List Your Property
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}