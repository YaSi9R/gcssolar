"use client";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { motion } from "framer-motion";
import Image from "next/image";

const images = [
  "/Gallery1.jpeg",
  "/Gallery2.jpeg",
  "/Gallery3.jpeg",
  "/Gallery4.jpeg",
  "/Gallery5.jpeg",
  "/Gallery6.jpeg",
  "/Gallery7.jpeg",
  "/Gallery8.jpeg",
  "/Gallery9.jpeg",
  "/Gallery10.jpeg",
  "/Gallery11.jpeg",
  "/Gallery12.jpeg",
  "/Gallery13.jpeg",
  "/Gallery14.jpeg",
  "/Gallery15.jpeg",
  "/Gallery16.jpeg",
  "/Gallery17.jpeg",
  "/Gallery18.jpeg",
  "/Gallery19.jpeg",
  "/Gallery20.jpeg",
  "/Gallery21.jpeg",
  "/Gallery22.jpeg",
  "/Gallery23.jpeg",
  "/Gallery24.jpeg",
  "/Gallery25.jpeg",
  "/Gallery26.jpeg",
  "/Gallery27.jpeg",
  "/Gallery28.jpeg",
  "/Gallery29.jpeg",
  "/Gallery30.jpeg",
];

export default function GalleryPage() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />

      {/* Page Header with increased top padding to clear Fixed Navbar */}
      <section className="!pt-40 sm:!pt-48 md:!pt-56 !pb-16 md:!pb-20 bg-premium-gradient text-white">
        <div className="container-custom text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl sm:text-6xl md:text-8xl font-black uppercase tracking-tighter !mb-6 md:!mb-8 drop-shadow-2xl">
              Our Gallery
            </h1>
            <p className="text-xl md:text-2xl text-white/80 !mx-auto font-medium leading-relaxed">
              Take a visual tour of our successful installations and high-tech solar modules across the country.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="!py-24">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 !gap-6 md:!gap-8 lg:!gap-10">
            {images.map((img, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className="group relative overflow-hidden rounded-[2.5rem] shadow-xl aspect-square border border-gray-100"
              >
                <Image src={img} alt="Gallery" width={600} height={400} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" loading="lazy" />
                <div className="absolute inset-0 bg-primary/60 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col items-center justify-center !p-8 text-center backdrop-blur-sm">
                  <span className="text-white text-3xl font-black uppercase tracking-tighter !mb-4 translate-y-8 group-hover:translate-y-0 transition-transform duration-500">Image {i + 1}</span>
                  <div className="w-12 h-1 bg-[#e11d48] rounded-full scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
