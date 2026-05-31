"use client";

import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";

const AboutUs = () => {
  const points = [
    "Over 10 years of industry experience",
    "Tier 1 solar modules and inverters",
    "Dedicated operations and maintenance team",
    "Financial solutions and ROI modeling",
    "Hassle-free government liaisoning",
  ];

  return (
    <section id="about" className=" bg-white overflow-hidden">
      <div className="container-custom">
        <div className="flex flex-col lg:flex-row items-center !gap-16">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="lg:w-1/2 relative"
          >
            <div className="relative z-10 rounded-3xl overflow-hidden shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1542332213-31f87348057f?auto=format&fit=crop&q=80&w=1000"
                alt="Solar Installation Team"
                className="w-full h-full object-cover"
              />
            </div>
            {/* Decorative Elements */}
            <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-secondary/10 rounded-full blur-3xl z-0"></div>
            <div className="absolute -top-10 -left-10 w-64 h-64 bg-primary/5 rounded-full blur-3xl z-0"></div>

            <div className="absolute bottom-10 -left-0 bg-white !px-4 !py-2 rounded-3xl shadow-xl z-20 hidden md:block border border-border animate-bounce-slow text-center">
              <div className="text-4xl font-bold text-secondary !mb-1">10+</div>
              <div className="text-sm font-semibold text-muted-foreground uppercase tracking-widest">
                Years of Excellence
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="lg:w-1/2"
          >
            <span className="text-secondary font-bold tracking-widest uppercase text-sm !mb-4 block">
              Who We Are
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-primary !mb-8 leading-tight">
              A Legacy of Clean Energy and <span className="text-secondary">Sustainable Innovation</span>
            </h2>
            <p className="text-muted-foreground text-lg !mb-8 leading-relaxed">
              At GCS Group Solar, we are more than just solar installers. We are architects of a cleaner future. Founded with a vision to make solar energy accessible to everyone, we have grown into one of Gurgaon's most trusted solar solution providers.
            </p>
            <p className="text-muted-foreground text-lg !mb-10 leading-relaxed">
              Our team of expert engineers and technicians work tirelessly to ensure that every installation is a masterpiece of efficiency and reliability.
            </p>

            <ul className="!space-y-4">
              {points.map((point, index) => (
                <li key={index} className="flex items-start !gap-4">
                  <div className="!mt-1">
                    <CheckCircle2 className="w-5 h-5 text-secondary" />
                  </div>
                  <span className="text-foreground font-semibold">{point}</span>
                </li>
              ))}
            </ul>

            <div className="!mt-12">
              <a
                href="/contact"
                className="bg-secondary text-white !px-10 !py-4 rounded-full text-lg font-bold hover:bg-opacity-90 transition-all hover-lift inline-block"
              >
                Learn More About Us
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
