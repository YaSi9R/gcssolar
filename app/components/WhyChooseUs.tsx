"use client";

import { motion } from "framer-motion";
import { FaSolarPanel, FaHandHoldingUsd, FaUserTie, FaUsers, FaGlobe, FaClipboardCheck, FaClock, FaMapMarkedAlt } from "react-icons/fa";

const WhyChooseUs = () => {
  const reasons = [
    { title: "Quality Products", icon: <FaSolarPanel className="w-10 h-10" /> },
    { title: "Economically Better Than Others", icon: <FaHandHoldingUsd className="w-10 h-10" /> },
    { title: "Respective Manners", icon: <FaUserTie className="w-10 h-10" /> },
    { title: "Experience Team Members", icon: <FaUsers className="w-10 h-10" /> },
    { title: "World Class Products ( Germany & India )", icon: <FaGlobe className="w-10 h-10" /> },
    { title: "Projects Execution According to The Projects Format", icon: <FaClipboardCheck className="w-10 h-10" /> },
    { title: "Timely Completion Of The Projects", icon: <FaClock className="w-10 h-10" /> },
    { title: "Work Any Where in India & Abroad", icon: <FaMapMarkedAlt className="w-10 h-10" /> }
  ];

  return (
    <section className="!py-24 md:py-32 bg-[#fdfdfd] relative overflow-hidden ">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-gray-50/50 -skew-x-12 translate-x-20 z-0"></div>
      
      <div className="container-custom relative z-10 items-center justify-center ">
        {/* Centered Header Section */}
        <div className="mb-20 flex flex-col items-center text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col items-center"
          >
            <span className="text-primary font-black uppercase tracking-[0.5em] text-[10px] mb-4 block">
              GCS GROUP
            </span>
            <h2 className="text-5xl md:text-7xl font-black text-[#e11d48] uppercase tracking-tighter leading-none mb-6">
              Why Choose Us?
            </h2>
            <div className="w-24 h-2 bg-[#e11d48] rounded-full shadow-[0_4px_12px_rgba(225,29,72,0.3)]"></div>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 border border-gray-100 !mt-8">
          {reasons.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05, duration: 0.5 }}
              viewport={{ once: true }}
              className="relative p-12 bg-white border border-gray-100 flex flex-col items-center text-center group cursor-pointer overflow-hidden min-h-[320px] justify-center"
            >
              {/* Top-to-Down Red Slide Background */}
              <div className="absolute inset-0 bg-[#e11d48] translate-y-[-100%] group-hover:translate-y-0 transition-transform duration-500 ease-out z-0"></div>
              
              <div className="relative z-10 flex flex-col items-center">
                <div className="w-24 h-24 rounded-full flex items-center justify-center mb-10 transition-all duration-500 bg-red-50 text-[#e11d48] group-hover:bg-white/20 group-hover:text-white group-hover:scale-110">
                  {item.icon}
                </div>
                <h3 className="text-xl font-black uppercase tracking-tight leading-tight text-primary group-hover:text-white transition-colors duration-500">
                  {item.title}
                </h3>
              </div>

              {/* Animated corner accent */}
              <div className="absolute top-4 right-4 w-2 h-2 rounded-full bg-red-200 group-hover:bg-white/40 transition-colors"></div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
