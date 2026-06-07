"use client";

import { motion } from "framer-motion";

const ClientsSlider = () => {
  // Using the public folder path directly for the image
  const placeholderImage = "/solar_part_1.png";

  const brands = [
    "/brand1.jpeg",
    "/brand2.jpeg",
    "/brand3.jpeg",
    "/brand4.jpeg",
    "/brand5.jpeg",

  ];

  const clientItems = [...Array(18)].map((_, i) => {
    const brandIndex = i % brands.length;
    return {
      id: i,
      name: `Brand ${brandIndex + 1}`,
      image: brands[brandIndex]
    };
  });

  const duplicatedClients = [...clientItems, ...clientItems];

  return (
    <section className="bg-[#fafafa] overflow-hidden border-y border-gray-100">
      <div className="container-custom !mb-16 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <span className="text-[#e11d48] font-black uppercase tracking-[0.5em] text-[10px] !mb-4 block">
            OUR ESTEEMED PARTNERS
          </span>
          <h2 className="text-4xl md:text-5xl font-black text-primary uppercase tracking-tighter">
            Trusted By <span className="text-[#e11d48]">Top Brands</span>
          </h2>
          <div className="w-16 h-1 bg-[#e11d48] mx-auto !mt-6 rounded-full"></div>
        </motion.div>
      </div>

      <div className="container-custom">
        <div className="relative flex group overflow-hidden !my-8 ">
          <motion.div
            className="flex whitespace-nowrap !py-4"
            animate={{
              x: ["0%", "-50%"],
            }}
            transition={{
              x: {
                repeat: Infinity,
                repeatType: "loop",
                duration: 35,
                ease: "linear",
              },
            }}
          >
            {duplicatedClients.map((client, i) => (
              <div
                key={i}
                className="!mx-4 !px-10 !py-8 bg-white rounded-[2rem] border border-gray-100 flex items-center justify-center min-w-[240px] group hover:shadow-2xl hover:border-[#e11d48]/20 transition-all duration-500 hover:-translate-y-2 cursor-pointer"
              >
                <img
                  src={client.image}
                  alt={client.name}
                  className="h-24 md:h-28 w-auto object-contain transition-transform duration-500 group-hover:scale-110"
                  onError={(e) => {
                    e.currentTarget.src = "/brand1.jpeg";
                  }}
                />
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      <div className="container-custom !mb-16 text-center">
        <p className="text-muted-foreground text-xs font-bold uppercase tracking-[0.3em] opacity-40">
          Slide to explore our network
        </p>
      </div>
    </section>
  );
};

export default ClientsSlider;
