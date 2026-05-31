"use client";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Services from "../components/Services";
import ProductGrid from "../components/ProductGrid";
import { motion } from "framer-motion";

export default function ServicesPage() {
  return (
    <main className="min-h-screen">
      <Navbar />
      
      {/* Page Header with increased top padding to clear Fixed Navbar */}
      <section className="!pt-40 sm:!pt-48 md:!pt-56 !pb-20 md:!pb-32 bg-premium-gradient text-white">
        <div className="container-custom text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl sm:text-6xl md:text-8xl font-black uppercase tracking-tighter mb-8 drop-shadow-2xl">
              Our Services
            </h1>
            <p className="text-xl md:text-2xl text-white/80 max-w-3xl mx-auto font-medium leading-relaxed">
              Comprehensive solar solutions tailored for maximum efficiency and long-term performance.
            </p>
          </motion.div>
        </div>
      </section>

      <Services />
      
      <div className="bg-muted !py-16 md:!py-24">
        <ProductGrid />
      </div>

      <section className="!py-16 md:!py-24 bg-white">
        <div className="container-custom">
          <div className="max-w-6xl mx-auto">
            <div className="text-center !mb-12 md:!mb-20">
              <span className="text-[#e11d48] font-black tracking-[0.5em] uppercase text-xs mb-4 block">PROCESS</span>
              <h2 className="text-3xl sm:text-5xl md:text-6xl font-black text-primary mb-8 uppercase tracking-tighter">Our EPC Process</h2>
              <div className="w-24 h-2 bg-[#e11d48] mx-auto rounded-full"></div>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 !gap-6 md:!gap-8">
              {[
                { step: "01", title: "Site Survey", desc: "Technical assessment of your rooftop." },
                { step: "02", title: "Design", desc: "Custom engineering for optimal yield." },
                { step: "03", title: "Installation", desc: "Professional execution by experts." },
                { step: "04", title: "Maintenance", desc: "Continuous monitoring & support." },
              ].map((item, i) => (
                <div key={i} className="relative p-10 bg-white rounded-[2.5rem] border border-gray-100 shadow-xl hover:shadow-2xl transition-all duration-500 group">
                  <div className="text-7xl font-black text-primary/5 absolute top-6 right-6 transition-colors group-hover:text-[#e11d48]/10">{item.step}</div>
                  <div className="w-16 h-16 bg-red-50 rounded-2xl flex items-center justify-center mb-8 text-[#e11d48] group-hover:bg-[#e11d48] group-hover:text-white transition-all duration-500">
                    <span className="text-2xl font-black">{item.step}</span>
                  </div>
                  <h4 className="text-2xl font-black text-primary mb-4 relative z-10">{item.title}</h4>
                  <p className="text-muted-foreground leading-relaxed relative z-10">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
