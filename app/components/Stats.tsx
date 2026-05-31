"use client";

import { motion } from "framer-motion";
import { Zap, Users, Award, ShieldCheck } from "lucide-react";

const stats = [
  { label: "MW Capacity Installed", value: "250+", icon: Zap },
  { label: "Satisfied Clients", value: "1500+", icon: Users },
  { label: "Years of Excellence", value: "10+", icon: Award },
  { label: "Quality Assurance", value: "100%", icon: ShieldCheck },
];

const Stats = () => {
  return (
    <section className="relative z-30 bg-white !pt-12 !pb-12">
      <div className="container-custom">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 !gap-8 md:!gap-12">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              viewport={{ once: true }}
              className="flex flex-col items-center text-center group !p-8 rounded-[2rem] bg-white border border-gray-100 shadow-[0_10px_30px_rgba(0,0,0,0.03)] hover:shadow-2xl transition-all duration-500 hover:-translate-y-2"
            >
              <div className="w-16 h-16 bg-muted rounded-2xl flex items-center justify-center !mb-6 group-hover:bg-[#e11d48] transition-all duration-500 !mt-4">
                <stat.icon className="w-8 h-8 text-primary group-hover:text-white transition-colors duration-300" />
              </div>
              <h3 className="text-4xl font-bold text-primary !mb-2 tracking-tight group-hover:text-[#e11d48] transition-colors">
                {stat.value}
              </h3>
              <p className="text-muted-foreground font-medium uppercase text-[10px] tracking-widest">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Stats;
