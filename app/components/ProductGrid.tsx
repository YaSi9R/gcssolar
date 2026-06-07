"use client";

import { motion } from "framer-motion";

const products = [
  { title: "SW-SLL14LED", desc: "Advanced spike-mounted solar garden & street light with warm white LED output.", image: "/SLL14LED.jpg" },
  { title: "SW-SWL104LED", desc: "Slim panel-top solar wall light with 104 LEDs for wide area illumination.", image: "/SWL104LED.jpg" },
  { title: "SW-SWL90LED", desc: "Compact solar outdoor wall light with 90 LEDs and motion-activated modes.", image: "/SWL90LED.jpg" },
  { title: "SW-SWL120LED", desc: "High-intensity 120 LED solar floodlight ideal for large outdoor spaces.", image: "/SWL120LED.jpg" },
  { title: "GCS – 20W", desc: "20W all-in-one integrated solar street light for commercial roadway lighting.", image: "/20W.jpg" },
  { title: "GCS – 15W", desc: "15W all-in-one solar street light for residential lanes and pathways.", image: "/15W.jpg" },
  { title: "GCS – 5W", desc: "5W compact all-in-one solar street light for narrow lanes and gardens.", image: "/5W..jpg" },
  { title: "SW-SWL90LED-IR", desc: "Solar outdoor light with 90 LEDs and smart infrared remote control.", image: "/SWL90LED-IR.jpg" },
  { title: "SW-SW104LED-IR", desc: "104 LED solar wall light with infrared remote for customizable brightness.", image: "/SW104LED-IR.jpg" },
  { title: "GCS – 30W", desc: "30W heavy-duty all-in-one solar street light for highways and main roads.", image: "/GCS - 30W.jpg" },
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

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 !gap-8 lg:!gap-12 relative z-10">
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
