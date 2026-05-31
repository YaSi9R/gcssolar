"use client";

import { useState } from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

const specs = [
  { label: "Platinum G12R", watt: "600-635 Wp", pdf: "GCS PLATINUM SERIES.pdf" },
  { label: "Platinum M10R", watt: "580-600 Wp", pdf: "GCS PLATINUM SERIES.pdf" },
  { label: "Platinum M10R DCR", watt: "550-580 Wp", pdf: "GCS PLATINUM SERIES.pdf" },
];

const features = [
  {
    icon: (
      <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="#e11d48" strokeWidth="1.5">
        <path d="M3 17l6-6 4 4 8-8" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M17 3h4v4" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    text: "Features an advanced Tunnel Oxide Passivated Contact (TOPCon) layer that minimizes electron recombination at contacts, boosting solar cell conversion efficiency to over 22.5%.",
  },
  {
    icon: (
      <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="#e11d48" strokeWidth="1.5">
        <circle cx="12" cy="12" r="3" />
        <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
      </svg>
    ),
    text: "Utilizes an N-type silicon substrate, which eliminates boron-oxygen related Light-Induced Degradation (LID), preventing early performance loss and securing maximum lifetime yield.",
  },
  {
    icon: (
      <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="#e11d48" strokeWidth="1.5">
        <rect x="3" y="3" width="18" height="18" rx="2" />
        <path d="M3 9h18M9 3v18" />
      </svg>
    ),
    text: "Boasts a minimal annual linear degradation rate of 0.40% over 30 years, preserving long-term investment value and providing exceptional generation capacity.",
  },
  {
    icon: (
      <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="#e11d48" strokeWidth="1.5">
        <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    text: "Achieves an impressive rear-side bifaciality factor of 80-85%, letting the panel capture albedo light efficiently to generate up to 25% more power.",
  },
  {
    icon: (
      <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="#e11d48" strokeWidth="1.5">
        <path d="M9 12l2 2 4-4" />
        <path d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    text: "Integrates Super Multi-Busbar (SMBB) designs to shorten current pathways on the cell surface, cutting resistive losses and lowering microcrack propagation risks.",
  },
  {
    icon: (
      <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="#e11d48" strokeWidth="1.5">
        <path d="M12 8v4l3 3" />
        <circle cx="12" cy="12" r="9" />
      </svg>
    ),
    text: "Displays a superior temperature coefficient of -0.30%/°C, ensuring high operational stability and power output even in hot tropical locations.",
  },
  {
    icon: (
      <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="#e11d48" strokeWidth="1.5">
        <rect x="2" y="6" width="20" height="12" rx="2" />
        <path d="M6 12h12M12 6v12" />
      </svg>
    ),
    text: "Enhanced low-light sensitivity allows the modules to begin power generation earlier at dawn and extend output later into the dusk.",
  },
  {
    icon: (
      <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="#e11d48" strokeWidth="1.5">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
    text: "Constructed with a dual-glass layout and IP68 protection, delivering remarkable resistance against heavy snow (5400 Pa) and severe wind (2400 Pa) loads.",
  },
  {
    icon: (
      <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="#e11d48" strokeWidth="1.5">
        <path d="M4 4h16v16H4z" />
        <path d="M4 8h16M4 12h16M4 16h16M8 4v16M12 4v16M16 4v16" />
      </svg>
    ),
    text: "Offers high resistance to chemical degradation, safeguarding the module against salt spray, sand erosion, and ammonia in coastal or agricultural environments.",
  },
  {
    icon: (
      <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="#e11d48" strokeWidth="1.5">
        <rect x="3" y="4" width="18" height="16" rx="2" />
        <path d="M8 2v4M16 2v4M3 10h18" />
        <text x="12" y="16" textAnchor="middle" fill="#e11d48" fontSize="6" fontWeight="bold">30</text>
      </svg>
    ),
    text: "Comes with an extensive 30-year linear performance warranty, offering long-term investment security for commercial projects and utility installations.",
  },
  {
    icon: (
      <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="#e11d48" strokeWidth="1.5">
        <path d="M9 12l2 2 4-4" />
        <rect x="3" y="3" width="18" height="18" rx="2" />
      </svg>
    ),
    text: "Includes a 12-year product warranty on materials and workmanship, verified by rigorous double EL testing and strict quality inspections.",
  },
];

const certifications = [
  {
    name: "UL Certified",
    svg: (
      <svg className="w-16 h-16" viewBox="0 0 100 100">
        <circle cx="50" cy="50" r="45" fill="none" stroke="#c4161c" strokeWidth="5" />
        <text x="50" y="60" textAnchor="middle" fill="#c4161c" fontSize="32" fontWeight="black" fontFamily="Georgia, serif">UL</text>
      </svg>
    ),
  },
  {
    name: "ISO Certified",
    svg: (
      <svg className="w-16 h-16" viewBox="0 0 100 100">
        <circle cx="50" cy="50" r="45" fill="none" stroke="#0f4c81" strokeWidth="5" />
        <text x="50" y="46" textAnchor="middle" fill="#0f4c81" fontSize="22" fontWeight="black" fontFamily="Arial, sans-serif">ISO</text>
        <text x="50" y="66" textAnchor="middle" fill="#0f4c81" fontSize="11" fontWeight="bold" fontFamily="Arial, sans-serif">9001:2015</text>
      </svg>
    ),
  },
  {
    name: "CE Certified",
    svg: (
      <svg className="w-16 h-16" viewBox="0 0 100 100">
        <text x="32" y="62" textAnchor="middle" fill="#000000" fontSize="50" fontWeight="bold" fontFamily="Arial, sans-serif">C</text>
        <text x="68" y="62" textAnchor="middle" fill="#000000" fontSize="50" fontWeight="bold" fontFamily="Arial, sans-serif">E</text>
      </svg>
    ),
  },
  {
    name: "ALMM Approved",
    svg: (
      <svg className="w-16 h-16" viewBox="0 0 100 100">
        <rect x="10" y="25" width="80" height="50" rx="6" fill="none" stroke="#a03c3c" strokeWidth="5" transform="rotate(-8 50 50)" />
        <text x="50" y="48" textAnchor="middle" fill="#a03c3c" fontSize="18" fontWeight="black" fontFamily="Impact, Arial Black, sans-serif" transform="rotate(-8 50 50)">ALMM</text>
        <text x="50" y="66" textAnchor="middle" fill="#a03c3c" fontSize="10" fontWeight="black" fontFamily="Arial, sans-serif" transform="rotate(-8 50 50)">APPROVED</text>
      </svg>
    ),
  },
  {
    name: "BIS Certified",
    svg: (
      <svg className="w-16 h-16" viewBox="0 0 100 100">
        <polygon points="50,15 90,80 10,80" fill="none" stroke="#005ea6" strokeWidth="5" />
        <line x1="50" y1="15" x2="50" y2="80" stroke="#005ea6" strokeWidth="4" />
        <text x="50" y="72" textAnchor="middle" fill="#005ea6" fontSize="13" fontWeight="bold" fontFamily="Arial, sans-serif">BIS</text>
      </svg>
    ),
  },
  {
    name: "IEC Certified",
    svg: (
      <svg className="w-16 h-16" viewBox="0 0 100 100">
        <rect x="5" y="15" width="90" height="70" fill="#004b87" rx="4" />
        <text x="50" y="60" textAnchor="middle" fill="#ffffff" fontSize="32" fontWeight="black" fontFamily="Arial, sans-serif" letterSpacing="1">IEC</text>
      </svg>
    ),
  },
];

const faqs = [
  {
    q: "How does TOPCon technology compare to standard PERC?",
    a: "TOPCon (Tunnel Oxide Passivated Contact) is a cutting-edge cell design featuring an ultra-thin tunnel oxide and doped polysilicon on the rear. This structure reduces recombination losses, allowing TOPCon cells to achieve superior conversion efficiencies (exceeding 22%) compared to conventional P-type PERC designs (which hover around 20-21%).",
  },
  {
    q: "What makes N-type silicon more durable than traditional P-type?",
    a: "N-type silicon uses phosphorus rather than boron as a dopant. P-type silicon is susceptible to Light-Induced Degradation (LID) when boron reacts with oxygen in sunlight. Since N-type cells lack boron, they are immune to this degradation, ensuring excellent long-term power stability.",
  },
  {
    q: "How does the bifaciality factor of GCS TOPCon panels benefit output?",
    a: "Our TOPCon panels have a high bifaciality rating of 80-85%, meaning the rear side generates up to 85% of the front-side capacity. When mounted on reflective grounds (like light gravel, concrete, or white roofs), this albedo capture can enhance total power generation by 10% to 30%.",
  },
  {
    q: "How does a lower temperature coefficient improve real-world output?",
    a: "With a low temperature coefficient of -0.30%/°C, our panels lose less power as temperature rises. Standard panels degrade more severely (-0.35%/°C or higher) in hot weather, meaning TOPCon panels produce more energy on hot summer days.",
  },
  {
    q: "What warranty coverage is included with GCS TOPCon panels?",
    a: "We offer a 12-year product warranty on workmanship and materials alongside an extensive 30-year linear power warranty. Utilizing N-type silicon allows us to limit first-year degradation to under 1.0% and annual degradation thereafter to 0.40%, guaranteeing at least 87.4% output in year 30.",
  },
  {
    q: "Are TOPCon solar modules a good fit for residential rooftops?",
    a: "Absolutely. Their superior cell efficiency lets you produce more electricity from a smaller surface area. This makes them perfect for residential roofs with space constraints, allowing homeowners to optimize generation and accelerate return on investment.",
  },
];

export default function TOPConSolarPanelPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      <div className="!h-28 md:!h-36 bg-white" />

      {/* Hero Section */}
      <section className="bg-white !pt-4 !pb-8 border-b border-gray-200">
        <div className="container-custom w-full !mx-auto !max-w-[1100px]">
          {/* Sales Enquiry Row */}
          <div className="flex justify-end !mb-2">
            <div className="flex items-center !gap-3">

              <div className="text-right">
                <p className="text-xs text-gray-500 font-bold uppercase tracking-wider">Sales Enquiries</p>
                <p className="text-sm font-black text-[#e11d48]">+91-8800012625</p>
              </div>
            </div>
          </div>

          <div className="flex items-end justify-between">
            <div>
              <h1 className="text-3xl md:text-4xl font-black text-[#0a2540] uppercase tracking-tight">
                TOPCon Solar Panel
              </h1>
              <div className="w-20 h-1 bg-[#e11d48] !mt-3" />
            </div>
            <div className="flex items-center !gap-2 text-sm text-gray-500 font-medium">
              <Link href="/" className="hover:text-primary transition-colors">Home</Link>
              <span className="text-gray-400">&gt;</span>
              <span className="text-gray-700">TOPCon Solar Panel</span>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="!py-16 bg-white">
        <div className="container-custom w-full !mx-auto !max-w-[1100px]">
          <div className="grid grid-cols-1 lg:grid-cols-12 !gap-8 lg:!gap-12 items-start">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-7"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-[#e11d48]  leading-snug" style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}>
                Introduction to TOPCon Solar Panel Technology
              </h2>
              <p className="text-gray-600 leading-relaxed !mb-5 text-[15px]">
                Tunnel Oxide Passivated Contact (TOPCon) modules represent the vanguard of modern solar energy innovation. Utilizing N-type silicon wafers coated with a micro-thin tunnel oxide layer and doped polysilicon, TOPCon cells achieve outstanding passivation, resulting in much higher energy conversion compared to standard PERC cells.
              </p>
              <p className="text-gray-600 leading-relaxed !mb-5 text-[15px]">
                GCS TOPCon modules feature optimized cell design that reduces carrier recombination, providing top-tier efficiency ratings. Because the N-type silicon wafer is boron-free, it is highly resistant to Light-Induced Degradation (LID), guaranteeing stable power generation over the module's entire service life.
              </p>
              <Link
                href="/contact"
                className="inline-flex !px-6 !py-3 items-center !gap-2 bg-[#e11d48] !text-white font-bold text-sm  rounded-full shadow-md hover:bg-[#e11d48] hover:-translate-y-0.5 transition-all duration-300"
              >
                Enquire Now
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-5 flex justify-center lg:justify-end"
            >
              <img
                src="/solar_part_2.png"
                alt="TOPCon Solar Panel"
                className="w-full !max-w-[580px] h-auto object-contain"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Bifacial Description Section */}
      <section className="bg-white border-t border-gray-100 !py-12">
        <div className="container-custom w-full !mx-auto !max-w-[1100px]">
          <h2 className="text-2xl md:text-3xl font-bold text-[#e11d48] !mb-6 font-serif">
            High-Efficiency TOPCon Solar Panels for Reliable Power Generation
          </h2>
          <div
            className="!space-y-4 md:!space-y-6 text-[#666] text-[15px] leading-[2] font-normal !mb-6"
            style={{ fontFamily: "Poppins, sans-serif" }}
          >
            <p>Offering high power outputs from 550 Wp to 580 Wp, our TOPCon panels deliver top-tier efficiency for diverse installation environments. Advanced engineering maximizes sunlight conversion on both the front and rear surfaces.</p>
            <p>We convert commercial structures, roofs, and large utility sites into highly productive solar generators. By absorbing light from both sides, these panels capture albedo reflection from the ground to boost generation yields well beyond traditional single-sided modules.</p>
            <p>Selecting our TOPCon modules ensures long-term return on investment and high energy security. Their design guarantees reliable generation across various climates, producing stable electricity even on hazy or overcast days.</p>
            <p>Made in advanced manufacturing plants, our modules are subjected to precise quality-controlled assembly. We employ automated systems and high-end PLC technology to guarantee that every panel meets strict international durability standards.</p>
            <p>Our commitment to quality ensures that GCS TOPCon panels deliver outstanding longevity and stability. They handle extreme environmental loads easily, giving homes, commercial facilities, and utility projects clean energy generation year after year.</p>
            <p>We are dedicated to supporting the renewable energy expansion across the country. Our extensive partner network spanning over 100 districts ensures our modules are accessible, trusted, and backed by prompt local support.</p>
            <p>Commercial, industrial, and residential users depend on GCS TOPCon modules for high reliability. They are simple to mount, require minimal maintenance, and are highly resilient to harsh weather, offering a cost-effective, high-output clean power solution.</p>
          </div>
        </div>
      </section>

      {/* Technical Specifications */}
      <section className="!mb-[24px] bg-[#e8ecf1] !mt-4 !pt-[20px]">
        <div className="container-custom w-full !pt-[20px] !mx-auto !max-w-[1100px]">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-2xl md:text-3xl font-bold text-primary text-center !pb-12"
            style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}
          >
            Explore Comprehensive Technical Specifications
          </motion.h2>

          <div className="flex justify-center !gap-6 flex-wrap !mb-[24px]">
            {specs.map((spec, i) => (
              <motion.a
                key={i}
                href={`/${spec.pdf}`}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className="bg-white rounded-lg !p-8 !mb-[64px] text-center shadow-sm border border-gray-100 w-[220px] h-[240px] flex flex-col justify-between items-center hover:shadow-md hover:-translate-y-1 transition-all duration-300 cursor-pointer group"
              >
                <p className="text-[#e11d48] text-xs font-bold uppercase tracking-wider !mb-2">{spec.label}</p>
                <p className="text-2xl font-black text-primary !mb-4">{spec.watt}</p>
                {/* PDF Download Icon */}
                <svg className="w-8 h-8 text-red-600 group-hover:scale-110 transition-transform duration-300" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8l-6-6zM6 20V4h7v5h5v11H6z" />
                  <path d="M8 14h2v4H8zM11 12h2v6h-2zM14 15h2v3h-2z" />
                </svg>
              </motion.a>
            ))}
          </div>
        </div>
      </section>

      {/* Product Features - 2 Column Row Layout with Dividers */}
      <section className="!py-8 bg-white">
        <div className="container-custom w-full !mx-auto !max-w-[1100px]">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-2xl md:text-3xl font-black text-primary text-center !mb-12"
          >
            Product Features
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-2 !gap-y-6 md:!gap-y-8 md:!gap-x-16 !px-6 md:!px-12">
            {features.map((f, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="flex items-start !gap-5 !p-4  hover:bg-gray-50/50 !px-2 transition-all duration-200"
              >
                <div className="w-14 h-14 rounded-lg border border-[#e11d48]/30 flex items-center justify-center flex-shrink-0 group-hover:bg-[#e11d48]/10 transition-colors">
                  {f.icon}
                </div>
                <p className="text-gray-600 text-[14px] leading-relaxed pt-1">{f.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Accreditations Section */}
      <section className="!py-16 bg-[#e8ecf1]">
        <div className="container-custom w-full text-center !mx-auto !max-w-[1100px]">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-xl md:text-2xl font-black text-primary uppercase tracking-wider !mb-6">
              Accreditations: Imprint of Trust!
            </h2>
            <p className="text-gray-600 text-[16px] leading-9 max-w-[900px] !mx-auto text-center !mb-14 !px-4">
              Our solar panels are manufactured to meet globally recognized quality standards and are certified by leading national and international organizations. These certifications reflect our dedication to delivering reliable, efficient, and sustainable solar energy solutions with consistent performance and long-term durability.
            </p>
            <div className="flex justify-center items-center !gap-6 md:!gap-10 lg:!gap-14 flex-wrap">
              {certifications.map((cert, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="flex flex-col items-center !gap-3 w-[120px]"
                >
                  <div className="hover:scale-110 transition-transform duration-300">
                    {cert.svg}
                  </div>
                  <span className="text-xs font-black text-gray-800 text-center uppercase tracking-wider">{cert.name}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Application Section */}
      <section className="relative !py-20 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="/solar_part_3.png"
            alt="Solar Application"
            className="w-full h-full object-cover brightness-[0.25]"
          />
        </div>
        <div className="container-custom w-full relative z-10 text-center !mx-auto !max-w-[1100px]">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-black text-white uppercase tracking-tight !mb-14">Application</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 !gap-x-16 !gap-y-4 md:!gap-y-6 max-w-2xl !mx-auto text-left !mb-12">
              {[
                "Residential",
                "Commercial",
                "Industrial",
                "Solar Farms",
                "Solar Pump",
              ].map((item, i) => (
                <div key={i} className="border-b border-white/20 !pb-3 text-white">
                  <p className="font-bold text-lg">{item}</p>
                </div>
              ))}
            </div>
            <Link
              href="/contact"
              className="inline-flex items-center !gap-2 bg-[#e11d48] !text-white font-bold text-sm !px-6 !py-3.5 rounded-full shadow-lg hover:bg-[#e11d48] hover:-translate-y-0.5 transition-all duration-300"
            >
              Enquire Now
            </Link>
          </motion.div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="!py-20 bg-white">
        <div className="container-custom w-full !mx-auto !max-w-[1100px]">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl font-black text-primary !mb-12 text-center"
          >
            FAQ&apos;s
          </motion.h2>

          <div className="!space-y-4 max-w-4xl !mx-auto">
            {faqs.map((faq, i) => (
              <div
                key={i}
                className="border border-gray-200 rounded-xl overflow-hidden bg-gray-50/30 transition-all duration-300 shadow-sm"
              >
                <button
                  onClick={() => toggleFaq(i)}
                  className="w-full flex items-center justify-between !p-5 text-left text-primary font-bold text-[15px] hover:bg-gray-50 transition-colors cursor-pointer"
                >
                  <span>{faq.q}</span>
                  <svg
                    className={`w-5 h-5 text-gray-500 transition-transform duration-300 ${openFaq === i ? "rotate-180" : ""
                      }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                <AnimatePresence initial={false}>
                  {openFaq === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: "easeInOut" }}
                    >
                      <div className="!p-5 !pt-0 text-[14px] text-gray-600 border-t border-gray-100 bg-white leading-relaxed">
                        {faq.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
