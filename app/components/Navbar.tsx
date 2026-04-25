"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "About US", href: "/about" },
    { name: "Gallery", href: "/gallery" },
    { name: "Contact Us", href: "/contact" },
    { name: "Dealers/Distributors", href: "/dealers" },
  ];

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${scrolled ? 'glass py-4 shadow-xl' : 'bg-transparent py-8'}`}>
      <div className="container-custom flex items-center justify-between mt-6">
        {/* Logo */}
        <Link href="/" className="flex items-center group">
          <div className="text-3xl font-black tracking-tighter flex flex-col leading-none">
            <span className={`${scrolled ? '!text-primary' : '!text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.4)]'}`}>GCS GROUP</span>
            <span className="text-[#e11d48] text-sm tracking-[0.4em] font-black">SOLAR</span>
          </div>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center gap-10">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className={`text-sm font-black uppercase tracking-[0.2em] relative group py-2 transition-all duration-300 ${
                scrolled ? '!text-primary' : '!text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]'
              }`}
            >
              {link.name}
              <span className="absolute bottom-0 left-0 w-0 h-1 bg-[#e11d48] transition-all duration-500 group-hover:w-full"></span>
            </Link>
          ))}
          
          <Link 
            href="/contact" 
            className="btn-primary !px-10 !py-3.5 !rounded-lg"
          >
            APPOINTMENT
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="lg:hidden text-2xl relative z-50"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          <div className={`w-8 h-1 mb-2 transition-all duration-300 rounded-full ${scrolled || mobileMenuOpen ? "bg-primary" : "bg-white shadow-lg"} ${mobileMenuOpen ? "rotate-45 translate-y-3" : ""}`}></div>
          <div className={`w-8 h-1 mb-2 transition-all duration-300 rounded-full ${scrolled || mobileMenuOpen ? "bg-primary" : "bg-white shadow-lg"} ${mobileMenuOpen ? "opacity-0 scale-0" : ""}`}></div>
          <div className={`w-8 h-1 transition-all duration-300 rounded-full ${scrolled || mobileMenuOpen ? "bg-primary" : "bg-white shadow-lg"} ${mobileMenuOpen ? "-rotate-45 -translate-y-3" : ""}`}></div>
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 bg-white z-40 transition-all duration-700 flex flex-col items-center justify-center gap-10 ${
          mobileMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none translate-y-10"
        }`}
      >
        {navLinks.map((link, index) => (
          <Link
            key={link.name}
            href={link.href}
            className="text-primary text-3xl font-black uppercase tracking-tighter hover:text-[#e11d48] transition-colors duration-300"
            style={{ transitionDelay: `${index * 100}ms` }}
            onClick={() => setMobileMenuOpen(false)}
          >
            {link.name}
          </Link>
        ))}
        <Link
          href="/contact"
          className="bg-[#e11d48] text-white px-12 py-5 rounded-lg text-xl font-black uppercase tracking-widest shadow-xl"
          onClick={() => setMobileMenuOpen(false)}
        >
          APPOINTMENT
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
