"use client";

import { motion } from "framer-motion";
import { Home, Factory, Building2, Sun } from "lucide-react";

const services = [
  {
    title: "Residential Solar",
    description: "Lower your electricity bills and increase your home value with our custom residential solar rooftop systems.",
    icon: Home,
    image: "https://images.unsplash.com/photo-1613665813446-82a78c468a1d?auto=format&fit=crop&q=80&w=600",
  },
  {
    title: "Commercial Solar",
    description: "Optimized solar solutions for businesses to reduce operational costs and enhance sustainability profiles.",
    icon: Building2,
    image: "https://images.unsplash.com/photo-1592833159155-c62df1b65634?auto=format&fit=crop&q=80&w=600",
  },
  {
    title: "Industrial Solar",
    description: "Large-scale solar installations designed for heavy industry requirements and significant energy savings.",
    icon: Factory,
    image: "https://images.unsplash.com/photo-1466611653911-95282fc3656b?auto=format&fit=crop&q=80&w=600",
  },
  {
    title: "Solar EPC",
    description: "Turnkey Engineering, Procurement, and Construction services for utility-scale solar power plants.",
    icon: Sun,
    image: "https://images.unsplash.com/photo-1548516173-3cabfa4607e9?auto=format&fit=crop&q=80&w=600",
  },
];

const Services = () => {
  return (
    <section id="services" className="py-24 md:py-32 bg-white">
      <div className="container-custom">
        {/* Centered Header Section */}
        <div className="flex flex-col items-center justify-center text-center w-full  !my-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-4xl flex flex-col items-center"
          >
            <span className="text-[#e11d48] font-black tracking-[0.5em] uppercase text-[20px] mb-4 block">
              WHAT WE OFFER
            </span>
            <h2 className="text-2xl md:text-5xl font-black text-primary mb-8 uppercase tracking-tighter leading-none">
              Solar Solutions For Every Need
            </h2>
            <p className="text-muted-foreground text-lg md:text-xl max-w-2xl leading-relaxed mb-10 !mt-2">
              From small rooftops to massive industrial plants, we provide end-to-end solar solutions tailored to your specific energy requirements.
            </p>
            <div className="w-24 h-2 bg-[#e11d48] rounded-full shadow-[0_4px_12px_rgba(225,29,72,0.3)]"></div>
          </motion.div>
        </div>

        {/* Services Grid with proper spacing */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white rounded-[2rem] overflow-hidden shadow-[0_15px_40_rgba(0,0,0,0.06)] hover:shadow-2xl transition-all duration-500 group border border-gray-100 flex flex-col h-full hover:-translate-y-3"
            >
              {/* Image Container */}
              <div className="relative h-60 overflow-hidden">
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-primary/20 group-hover:bg-primary/0 transition-colors duration-500"></div>
                {/* Icon Overlay */}
                <div className="absolute bottom-6 left-6 bg-[#e11d48] p-4 rounded-2xl shadow-xl text-white transform transition-transform group-hover:scale-110">
                  <service.icon className="w-7 h-7" />
                </div>
              </div>

              {/* Content Container */}
              <div className="p-10 flex flex-col flex-grow">
                <h3 className="text-2xl font-black text-primary mb-4 group-hover:text-[#e11d48] transition-colors uppercase tracking-tight">
                  {service.title}
                </h3>
                <p className="text-muted-foreground mb-8 line-clamp-3 leading-relaxed text-sm font-medium">
                  {service.description}
                </p>
                <div className="mt-auto">
                  <a
                    href="/contact"
                    className="inline-flex items-center gap-2 text-[#e11d48] font-black uppercase tracking-widest text-xs group/btn hover:gap-4 transition-all"
                  >
                    Learn More
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
