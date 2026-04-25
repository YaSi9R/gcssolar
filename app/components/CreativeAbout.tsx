"use client";

import { motion } from "framer-motion";
import { Lightbulb } from "lucide-react";

const CreativeAbout = () => {
  return (
    <section className="section-spacing bg-white overflow-hidden relative">
      {/* Decorative Background Elements */}
      <div className="absolute top-20 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl -z-10"></div>
      <div className="absolute bottom-20 left-0 w-96 h-96 bg-secondary/5 rounded-full blur-3xl -z-10"></div>
      
      {/* Dotted Grid Decoration */}
      <div className="absolute bottom-10 left-10 opacity-20 -z-10">
        <svg width="200" height="200" viewBox="0 0 200 200">
          <defs>
            <pattern id="dots" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
              <circle cx="2" cy="2" r="2" fill="#e11d48" />
            </pattern>
          </defs>
          <rect width="200" height="200" fill="url(#dots)" />
        </svg>
      </div>

      <div className="container-custom">
        <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
          
          {/* Image Side with Overlapping Box */}
          <motion.div 
            initial={{ opacity: 0, x: -100, rotate: -2 }}
            whileInView={{ opacity: 1, x: 0, rotate: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            viewport={{ once: true }}
            className="lg:w-1/2 relative"
          >
            <div className="relative rounded-2xl overflow-hidden shadow-2xl z-10">
              <img 
                src="https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&q=80&w=1200" 
                alt="Solar Energy" 
                className="w-full h-[550px] object-cover"
              />
            </div>
            
            {/* Red Overlapping Experience Box */}
            <motion.div 
              initial={{ scale: 0.5, opacity: 0, y: 50 }}
              whileInView={{ scale: 1, opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8, type: "spring" }}
              viewport={{ once: true }}
              className="absolute -bottom-12 -left-6 md:-left-12 bg-[#e11d48] p-12 rounded-[2rem] shadow-[0_20px_60px_rgba(225,29,72,0.4)] z-20 text-white text-center min-w-[280px]"
            >
              <div className="flex justify-center mb-6">
                <motion.div 
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ repeat: Infinity, duration: 2 }}
                  className="w-20 h-20 rounded-full bg-white/20 flex items-center justify-center"
                >
                  <Lightbulb className="w-10 h-10 text-white fill-white/30" />
                </motion.div>
              </div>
              <div className="text-7xl font-black mb-2 tracking-tighter">10</div>
              <div className="text-xl font-black uppercase tracking-[0.2em] leading-tight">
                Years of<br />Experience
              </div>
            </motion.div>
          </motion.div>

          {/* Content Side */}
          <motion.div 
            initial={{ opacity: 0, x: 100 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            viewport={{ once: true }}
            className="lg:w-1/2"
          >
            <span className="text-[#e11d48] font-black tracking-[0.2em] uppercase text-sm mb-4 block">
              ABOUT US
            </span>
            <h2 className="text-5xl md:text-6xl font-black text-primary mb-8 leading-tight">
              Welcome To <span className="text-[#e11d48]">GCS Group</span>
            </h2>
            <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
              GCS Group Solar was established in 2015 in Gurgaon, India, with a focus on developing Solar as a sustainable energy alternative in India. We&apos;ve been at the forefront of India&apos;s sustainable energy revolution, based in Gurgaon.
            </p>
            <p className="text-lg text-muted-foreground mb-10 leading-relaxed">
              Our mission: Deliver immediate and lasting solar solutions, providing maximum energy and financial advantages to our clients. Today, we&apos;re a leading sustainable energy provider, driven by our unwavering faith in the sun&apos;s limitless potential to combat non-renewable energy issues. Join us on the path to a brighter, more sustainable future.
            </p>
            
            <a 
              href="/about" 
              className="btn-primary !px-12 !py-5 !text-lg"
            >
              READ MORE
            </a>
          </motion.div>

        </div>
      </div>

      {/* Background Transmission Line Illustration (SVG) */}
      <div className="absolute right-0 bottom-0 opacity-5 pointer-events-none -z-10">
        <svg width="400" height="400" viewBox="0 0 100 100" fill="none" stroke="currentColor">
          <path d="M20 90 L50 20 L80 90 M30 70 L70 70 M40 45 L60 45" strokeWidth="1" />
          <path d="M10 95 L90 95" strokeWidth="0.5" />
        </svg>
      </div>
    </section>
  );
};

export default CreativeAbout;
