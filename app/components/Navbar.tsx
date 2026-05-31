"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const productItems = [
  { name: "Solar PV Module", href: "/products/solar-pv-module" },
  { name: "TOPCon Solar Panel", href: "/products/topcon-solar-panel" },
  { name: "Mono PERC Module", href: "/products/mono-perc-module" },
];

const Navbar = () => {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [productsOpen, setProductsOpen] = useState(false);
  const [mobileProductsOpen, setMobileProductsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setProductsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "About US", href: "/about" },
    { name: "Gallery", href: "/gallery" },
    { name: "Contact Us", href: "/contact" },
    { name: "Dealers/Distributors", href: "/dealers" },
  ];

  const showScrolled = true;

  const linkClass = `text-sm font-black uppercase tracking-[0.2em] relative group !py-2 transition-all duration-300 ${showScrolled ? "!text-primary" : "!text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]"
    }`;

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${showScrolled ? "glass !py-3 md:!py-3.5 shadow-md" : "bg-transparent !py-5 md:!py-6"
        }`}
    >
      <div className="container-custom flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center group">
          <img
            src="/loo.png"
            alt="GCS SOLAR"
            // brightness-0 invert
            className={`h-12 md:h-14 w-auto transition-all duration-300 ${showScrolled ? "" : ""
              }`}
          />
        </Link>

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center !gap-10">

          {/* Products Dropdown */}
          <div
            className="relative"
            ref={dropdownRef}
            onMouseEnter={() => setProductsOpen(true)}
            onMouseLeave={() => setProductsOpen(false)}
          >
            <button
              className={`${linkClass} flex items-center !gap-2 cursor-pointer bg-transparent border-none outline-none`}
              onClick={() => setProductsOpen((v) => !v)}
              aria-expanded={productsOpen}
              aria-haspopup="true"
            >
              <span
                className={`transition-colors duration-300 ${productsOpen
                  ? "text-[#e11d48]"
                  : showScrolled
                    ? "text-primary"
                    : "text-white"
                  }`}
              >
                Products
              </span>
              {/* Chevron */}
              <svg
                className={`w-3 h-3 transition-transform duration-300 ${productsOpen ? "rotate-180" : ""
                  } ${showScrolled ? "text-primary" : "text-white"} ${productsOpen ? "!text-[#e11d48]" : ""
                  }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={3}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
              <span
                className={`absolute bottom-0 left-0 h-1 bg-[#e11d48] transition-all duration-500 ${productsOpen ? "w-full" : "w-0 group-hover:w-full"
                  }`}
              />
            </button>

            {/* Invisible bridge prevents gap from closing the dropdown */}
            <div className="absolute top-full left-0 w-full h-3" />

            {/* Dropdown Panel */}
            <div
              className={`absolute top-[calc(100%+0.5rem)] left-1/2 -translate-x-1/2 w-72 transition-all duration-300 origin-top ${productsOpen
                ? "opacity-100 scale-y-100 pointer-events-auto"
                : "opacity-0 scale-y-95 pointer-events-none"
                }`}
            >
              <div className="bg-white rounded-2xl shadow-[0_15px_50px_rgba(10,37,64,0.15)] overflow-hidden border border-gray-100 !p-2 !space-y-1">
                {productItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setProductsOpen(false)}
                    className="flex items-center justify-between !px-5 !py-3.5 rounded-xl text-sm font-black text-[#0a2540] hover:text-white hover:bg-[#e11d48] transition-all duration-300 group"
                  >
                    <span className="tracking-wide uppercase text-[12px]">{item.name}</span>
                    <span className="flex items-center justify-center w-6 h-6 rounded-full bg-gray-50 group-hover:bg-[#f3a323]/10 transition-colors duration-300">
                      <svg
                        className="w-3 h-3 text-gray-400 group-hover:text-[#f3a323] transition-all duration-300 transform group-hover:translate-x-0.5"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={3}
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                      </svg>
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Rest of nav links */}
          {navLinks.slice(1).map((link) => (
            <Link key={link.name} href={link.href} className={linkClass}>
              {link.name}
              <span className="absolute bottom-0 left-0 w-0 h-1 bg-[#e11d48] transition-all duration-500 group-hover:w-full" />
            </Link>
          ))}

          <Link href="/contact" className="btn-primary !px-10 !py-3.5 !rounded-lg">
            APPOINTMENT
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="lg:hidden text-2xl relative z-[210]"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          <div
            className={`w-8 h-1 !mb-2 transition-all duration-300 rounded-full ${showScrolled || mobileMenuOpen ? "bg-primary" : "bg-white shadow-lg"
              } ${mobileMenuOpen ? "rotate-45 translate-y-3" : ""}`}
          />
          <div
            className={`w-8 h-1 !mb-2 transition-all duration-300 rounded-full ${showScrolled || mobileMenuOpen ? "bg-primary" : "bg-white shadow-lg"
              } ${mobileMenuOpen ? "opacity-0 scale-0" : ""}`}
          />
          <div
            className={`w-8 h-1 transition-all duration-300 rounded-full ${showScrolled || mobileMenuOpen ? "bg-primary" : "bg-white shadow-lg"
              } ${mobileMenuOpen ? "-rotate-45 -translate-y-3" : ""}`}
          />
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 bg-white z-[200] transition-all duration-700 flex flex-col items-center justify-start sm:justify-center !gap-6 sm:!gap-8 overflow-y-auto !py-16 sm:!py-20 !px-6 w-full ${mobileMenuOpen
          ? "opacity-100 pointer-events-auto"
          : "opacity-0 pointer-events-none translate-y-10"
          }`}
      >
        <Link
          href="/"
          className="text-primary text-xl sm:text-2xl md:text-3xl font-black uppercase tracking-tight sm:tracking-tighter hover:text-[#e11d48] transition-colors duration-300 text-center w-full !px-4"
          onClick={() => setMobileMenuOpen(false)}
        >
          Home
        </Link>

        {/* Mobile Products Accordion */}
        <div className="flex flex-col items-center w-full !px-4">
          <button
            className="text-primary text-xl sm:text-2xl md:text-3xl font-black uppercase tracking-tight sm:tracking-tighter hover:text-[#f3a323] transition-colors duration-300 flex items-center justify-center !gap-2 w-full text-center"
            onClick={() => setMobileProductsOpen((v) => !v)}
          >
            Products
            <svg
              className={`w-4 h-4 sm:w-5 sm:h-5 transition-transform duration-300 ${mobileProductsOpen ? "rotate-180" : ""
                }`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          <div
            className={`overflow-hidden transition-all duration-500 ${mobileProductsOpen ? "max-h-60 !mt-4" : "max-h-0"
              }`}
          >
            {productItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="block text-center text-[#f3a323] text-base sm:text-xl font-bold !py-2 hover:text-primary transition-colors duration-200"
                onClick={() => {
                  setMobileMenuOpen(false);
                  setMobileProductsOpen(false);
                }}
              >
                {item.name}
              </Link>
            ))}
          </div>
        </div>

        {navLinks.slice(1).map((link, index) => (
          <Link
            key={link.name}
            href={link.href}
            className="text-primary text-xl sm:text-2xl md:text-3xl font-black uppercase tracking-tight sm:tracking-tighter hover:text-[#e11d48] transition-colors duration-300 text-center w-full !px-4"
            style={{ transitionDelay: `${index * 100}ms` }}
            onClick={() => setMobileMenuOpen(false)}
          >
            {link.name}
          </Link>
        ))}

        <Link
          href="/contact"
          className="bg-[#e11d48] text-white !px-10 sm:!px-12 !py-4 sm:!py-5 rounded-lg text-base sm:text-xl font-black uppercase tracking-widest shadow-xl text-center"
          onClick={() => setMobileMenuOpen(false)}
        >
          APPOINTMENT
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
