"use client";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import AboutUs from "../components/AboutUs";
import { motion } from "framer-motion";

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      
      {/* Page Header - Fixed pt-48 to clear fixed navbar and mx-auto for centering */}
      <section className="!pt-38 pb-32 bg-premium-gradient text-white text-center">
        <div className="container-custom flex flex-col items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="flex flex-col items-center w-full"
          >
            <h1 className="text-6xl md:text-8xl font-black uppercase tracking-tighter mb-8 drop-shadow-2xl">
              About GCS Group
            </h1>
            <p className="text-xl !pb-8 md:text-2xl text-white/80 max-w-3xl mx-auto font-medium leading-relaxed drop-shadow-lg">
              Discover our journey, our mission, and the expert team driving the solar energy revolution across India.
            </p>
          </motion.div>
        </div>
      </section>

      <div className="!py-24">
        <div className="container-custom">
          <AboutUs />
        </div>
      </div>
      
      <section className="py-24 bg-muted/30">
        <div className="container-custom">
          {/* Rest of about content could go here */}
        </div>
      </section>

      <Footer />
    </main>
  );
}
