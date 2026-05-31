"use client";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Contact from "../components/Contact";
import { motion } from "framer-motion";

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />

      {/* Page Header - Massive pt-56 to ensure zero overlap with navbar */}
      <section className="!pt-56 pb-40 bg-[#0a2540] text-white text-center relative overflow-hidden">
        {/* Animated Background Decoration */}
        <div className="absolute inset-0 z-0">
          <img
            src="/solar_part_1.png"
            alt="Solar Background"
            className="w-full h-full object-cover opacity-40 scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0a2540] via-[#0a2540]/80 to-[#0a2540]"></div>
        </div>

        {/* Animated Background Decoration */}
        <div className="absolute inset-0 opacity-30 pointer-events-none">
          <div className="absolute top-1/4 right-1/4 w-[500px] h-[500px] bg-[#e11d48] rounded-full blur-[180px] animate-pulse"></div>
          <div className="absolute bottom-1/4 left-1/4 w-[600px] h-[600px] bg-blue-600 rounded-full blur-[200px]"></div>
        </div>
        <div className="container-custom flex flex-col items-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="flex flex-col items-center w-full"
          >
            <span className="text-[#e11d48] font-black tracking-[0.6em] uppercase text-xs mb-6 block animate-bounce">
              Connect With Us
            </span>
            <h1 className="text-5xl !mb-8 md:text-7xl font-black uppercase tracking-tighter mb-8 drop-shadow-[0_10px_30px_rgba(0,0,0,0.5)]">
              Get In <span className="text-[#e11d48]">Touch</span>
            </h1>
            <div className="w-24 h-2 bg-[#e11d48] rounded-full !mb-8 shadow-[0_0_20px_rgba(225,29,72,0.6)]"></div>

          </motion.div>
        </div>
      </section>

      <div className="!py-20 md:!py-32 bg-white">
        <div className="container-custom">
          <Contact />
        </div>
      </div>

      {/* Map Section */}
      <section className="!py-24 bg-gray-50 relative">
        <div className="container-custom">
          <div className="text-center !mb-16">
            <h3 className="text-4xl font-black text-primary !mb-4 uppercase tracking-tight">Visit Our Headquarters</h3>
            <div className="w-16 h-1.5 bg-[#e11d48] mx-auto rounded-full !mb-6"></div>
            <p className="text-muted-foreground text-lg">Located in the heart of Gurgaon&apos;s business hub.</p>
          </div>
          <div className="w-full h-[600px] bg-white shadow-[0_30px_100px_rgba(0,0,0,0.12)] rounded-[4rem] border border-gray-100 overflow-hidden group">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d112214.16279930866!2d76.95351239726563!3d28.488881200000004!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d19d582e38859%3A0x2cf5e3482d799b92!2sGurugram%2C%20Haryana!5e0!3m2!1sen!2sin!4v1714010000000!5m2!1sen!2sin"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen={true}
              loading="lazy"
              className="grayscale group-hover:grayscale-0 transition-all duration-1000"
            />
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
