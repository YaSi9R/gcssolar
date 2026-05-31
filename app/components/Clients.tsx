"use client";

import { motion } from "framer-motion";

const clients = [
  { name: "Tata Power", industry: "Energy" },
  { name: "Adani Solar", industry: "Renewables" },
  { name: "Reliance Energy", industry: "Power" },
  { name: "Vikram Solar", industry: "Manufacturing" },
  { name: "Loom Solar", industry: "Retail" },
  { name: "Waaree Energies", industry: "Solar" },
  { name: "Azure Power", industry: "Utility" },
  { name: "Sunteck Solar", industry: "Solutions" },
];

const Clients = () => {
  return (
    <section className=" bg-muted/30 overflow-hidden">
      <div className="container-custom">
        <div className="text-center !mb-16">
          <span className="text-secondary font-bold uppercase tracking-widest text-sm !mb-4 block">
            Trusted by Industry Leaders
          </span>
          <h2 className="text-4xl md:text-5xl font-black text-primary uppercase tracking-tighter">
            Our Clients
          </h2>
          <div className="w-20 h-1 bg-[#e11d48] mx-auto !mt-6 rounded-full"></div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 !gap-8">
          {clients.map((client, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white !p-10 rounded-3xl shadow-sm border border-gray-100 flex flex-col items-center justify-center group hover:shadow-xl transition-all duration-500"
            >
              <div className="text-2xl font-black text-primary/30 group-hover:text-[#e11d48] transition-colors duration-500 text-center uppercase tracking-tighter">
                {client.name}
              </div>
              <div className="text-[10px] font-bold text-muted-foreground uppercase tracking-[0.2em] !mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                {client.industry}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Clients;
