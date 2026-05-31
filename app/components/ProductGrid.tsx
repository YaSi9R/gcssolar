"use client";

import { motion } from "framer-motion";

const products = [
  { title: "RESIDENTIAL", desc: "Eco-friendly solar installations for homes.", image: "/solar_part_1.png" },
  { title: "COMMERCIAL", desc: "High-efficiency power for businesses.", image: "/solar_part_2.png" },
  { title: "INDUSTRIAL", desc: "Heavy-duty energy solutions for industry.", image: "/solar_part_3.png" },
  { title: "EPC SOLUTIONS", desc: "Turnkey engineering and construction.", image: "/solar_part_4.png" },
  { title: "SW-SLL14LED", desc: "Advanced LED solar street lighting.", image: "/solar_part_1.png" },
  { title: "SW-SWL104LED", desc: "Compact wall-mounted solar lights.", image: "/solar_part_2.png" },
  { title: "SW-SWL90LED", desc: "Energy-efficient outdoor lighting.", image: "/solar_part_3.png" },
  { title: "SW-SWL120LED", desc: "High-intensity solar floodlights.", image: "/solar_part_4.png" },
];

const ProductGrid = () => {
  return (
    <section className="!py-24 md:!py-32 bg-muted/30 relative">
      <div className="container-custom">
        {/* 
          Header Section using !pb-32 (Padding Bottom) instead of margin.
          Padding is much harder for the browser to ignore.
        */}
        <div className="flex flex-col items-center text-center !pb-8">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col items-center"
          >
            <h2 className="epc-title !mb-6">
              ENGINEERING PROCUREMENT CONSTRUCTION
            </h2>
            <div className="w-24 h-2 bg-[#e11d48] rounded-full shadow-[0_4px_12px_rgba(225,29,72,0.3)]"></div>
          </motion.div>
        </div>

        {/* Physical Spacer as a backup */}
        <div className="h-10 w-full block"></div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 !gap-8 lg:!gap-12 relative z-10">
          {products.map((product, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, type: "spring", stiffness: 100 }}
              viewport={{ once: true }}
              className="product-card group"
            >
              <div className="product-image-container">
                <img
                  src={product.image}
                  alt={product.title}
                />
                <div className="product-red-wave"></div>
              </div>
              <div className="product-info">
                <h3 className="product-title">{product.title}</h3>
                <p className="product-desc">{product.desc}</p>
                <a href="/services" className="read-more-btn">
                  READ MORE
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductGrid;
