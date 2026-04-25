"use client";

import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

const heroSlides = [
  {
    image: "https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&q=80&w=2072",
    badge: "Pioneering Sustainable Energy",
    titleLine1: "Empowering",
    titleLine2: "The Future",
    titleLine3: "Solar Energy",
    description: "GCS Group Solar delivers high-efficiency solar solutions for homes, businesses, and industries. Join the energy revolution.",
    color: "#e11d48"
  },
  {
    image: "https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?auto=format&fit=crop&q=80&w=2072",
    badge: "Residential & Commercial Expert",
    titleLine1: "Smart Energy",
    titleLine2: "For Your",
    titleLine3: "Home & Business",
    description: "Cut your electricity bills by up to 90% with our state-of-the-art rooftop solar installations. Sustainable living made easy.",
    color: "#f3a323"
  },
  {
    image: "https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?auto=format&fit=crop&q=80&w=2072",
    badge: "Industrial Scale Solutions",
    titleLine1: "Powering",
    titleLine2: "Heavy",
    titleLine3: "Industries",
    description: "Reliable, large-scale solar power plants for industrial giants. Reduce carbon footprint while increasing efficiency.",
    color: "#0070f3"
  }
];

const Hero = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % heroSlides.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const slide = heroSlides[current];

  return (
    <section className="relative h-[100vh] flex items-center overflow-hidden bg-primary mb-20">
      {/* Background Image Slider */}
      <div className="absolute inset-0 z-0">
        <AnimatePresence mode="wait">
          <motion.div
            key={`bg-${current}`}
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
            className="absolute inset-0"
          >
            <Image
              src={slide.image}
              alt={slide.titleLine1}
              fill
              className="object-cover"
              priority
            />
            {/* Multi-layered Overlay */}
            <div className="absolute inset-0 bg-black/50 z-10"></div>
            <div className="absolute inset-0 bg-gradient-to-r from-primary/90 via-primary/30 to-transparent z-10"></div>
            {/* Top Shadow for Navbar Visibility */}
            <div className="absolute top-0 left-0 w-full h-40 bg-gradient-to-b from-black/80 to-transparent z-10"></div>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="container-custom relative z-20 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12">
          <div className="lg:col-span-10">
            <AnimatePresence mode="wait">
              <motion.div
                key={`content-${current}`}
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 50 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              >
                <motion.span 
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.2 }}
                  style={{ backgroundColor: slide.color }}
                  className="inline-flex items-center gap-3 py-2.5 px-8 rounded-full text-white text-xs font-black tracking-[0.4em] uppercase mb-10 shadow-2xl transition-colors duration-500"
                >
                  <span className="w-3 h-3 bg-white rounded-full animate-pulse"></span>
                  {slide.badge}
                </motion.span>

                <h1 className="text-3xl md:text-6xl font-black text-white mb-10 leading-[0.85] tracking-tighter uppercase drop-shadow-[0_4px_12px_rgba(0,0,0,0.3)]">
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                  >
                    {slide.titleLine1}
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    style={{ color: slide.color }}
                    className="relative inline-block py-2 transition-colors duration-500"
                  >
                    {slide.titleLine2}
                    <motion.svg 
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ delay: 1, duration: 1 }}
                      className="absolute -bottom-2 left-0 w-full" 
                      height="12" 
                      viewBox="0 0 100 10" 
                      preserveAspectRatio="none"
                    >
                      <path d="M0 5 Q 25 0, 50 5 T 100 5" stroke="currentColor" strokeWidth="6" fill="transparent" />
                    </motion.svg>
                  </motion.div>
                  <br />
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7 }}
                  >
                    {slide.titleLine3}
                  </motion.div>
                </h1>

                <motion.p 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.9, duration: 0.8 }}
                  style={{ borderLeftColor: slide.color }}
                  className="text-xl md:text-3xl text-white/90 mb-16 max-w-3xl leading-relaxed font-medium tracking-tight border-l-[12px] pl-16 transition-colors duration-500 drop-shadow-[0_2px_8px_rgba(0,0,0,0.3)]"
                >
                  {slide.description}
                </motion.p>

                <motion.div 
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.1, duration: 0.6 }}
                  className="flex flex-col sm:flex-row gap-10 !mt-10"
                >
                  <a
                    href="/contact"
                    style={{ backgroundColor: slide.color }}
                    className="!text-white !w-auto cursor-pointer !px-12 md:px-16 py-7 text-xl rounded-2xl font-black uppercase tracking-[0.2em] flex items-center justify-center gap-4 shadow-[0_20px_50px_rgba(0,0,0,0.4)] transition-all duration-500 hover:scale-105 active:scale-95 group"
                  >
                    Get Quote
                    <svg className="w-8 h-8 transition-transform duration-300 group-hover:translate-x-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={4} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </a>
                  <a
                    href="/services"
                    className="bg-white/10 backdrop-blur-xl border-2 border-white/30 !text-white cursor-pointer !px-12 md:px-16 py-7 text-xl rounded-2xl font-black uppercase tracking-[0.2em] flex items-center justify-center transition-all duration-500 hover:bg-white/20 hover:border-white/50"
                  >
                    Solutions
                  </a>
                </motion.div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Slide Indicators */}
      <div className="absolute bottom-12 right-12 z-30 flex flex-col gap-6">
        {heroSlides.map((_, i) => (
          <button 
            key={i}
            onClick={() => setCurrent(i)}
            className="group relative flex items-center justify-end gap-4"
          >
            <span className={`text-white text-xs font-black uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity ${current === i ? "opacity-100" : ""}`}>
              0{i + 1}
            </span>
            <div 
              className={`w-1.5 transition-all duration-500 rounded-full ${current === i ? "h-16 bg-white" : "h-6 bg-white/20"}`}
              style={{ backgroundColor: current === i ? slide.color : "" }}
            ></div>
          </button>
        ))}
      </div>

      {/* Decorative Bottom Shadow */}
      <div className="absolute bottom-0 left-0 w-full h-40 bg-gradient-to-t from-black/80 to-transparent z-20"></div>
    </section>
  );
};

export default Hero;
