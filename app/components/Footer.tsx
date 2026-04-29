"use client";

import Link from "next/link";
import { Globe, Share2, MessageSquare, ThumbsUp, Mail, Phone, MapPin } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-primary text-white pt-24 pb-12 relative">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          <div className="flex flex-col gap-6">
            <Link href="/" className="flex items-center gap-2">
              <img src="/loo.png" alt="GCS SOLAR" className="h-16 w-auto brightness-0 invert" />
            </Link>
            <p className="text-white/60 leading-relaxed text-sm">
              GCS Group Solar Was established in 2015 in Gurgaon, India, With a focus on developing Solar as Sustainable Energy alternative in india.we've been at the forefront of India's sustainable energy revolution,...
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-secondary transition-colors group">
                <Globe className="w-5 h-5 group-hover:text-white" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-secondary transition-colors group">
                <Share2 className="w-5 h-5 group-hover:text-white" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-secondary transition-colors group">
                <MessageSquare className="w-5 h-5 group-hover:text-white" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-secondary transition-colors group">
                <ThumbsUp className="w-5 h-5 group-hover:text-white" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-xl font-bold mb-8 relative inline-block uppercase tracking-tight">
              Quick Links
              <span className="absolute -bottom-2 left-0 w-12 h-1 bg-secondary rounded-full"></span>
            </h4>
            <ul className="flex flex-col gap-4 text-sm font-medium">
              <li><Link href="/" className="text-white/60 hover:text-secondary transition-colors">Home</Link></li>
              <li><Link href="/about" className="text-white/60 hover:text-secondary transition-colors">About US</Link></li>
              <li><Link href="/gallery" className="text-white/60 hover:text-secondary transition-colors">Gallery</Link></li>
              <li><Link href="/contact" className="text-white/60 hover:text-secondary transition-colors">Contact Us</Link></li>
              <li><Link href="/dealers" className="text-white/60 hover:text-secondary transition-colors">Dealers</Link></li>
              <li><Link href="/dealers" className="text-white/60 hover:text-secondary transition-colors">Dealers/Distributors</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-xl font-bold mb-8 relative inline-block uppercase tracking-tight">
              EPC
              <span className="absolute -bottom-2 left-0 w-12 h-1 bg-secondary rounded-full"></span>
            </h4>
            <ul className="flex flex-col gap-4 text-sm font-bold uppercase tracking-widest">
              <li><Link href="#" className="text-white/60 hover:text-secondary transition-colors">RESIDENTIAL</Link></li>
              <li><Link href="#" className="text-white/60 hover:text-secondary transition-colors">COMMERCIAL</Link></li>
              <li><Link href="#" className="text-white/60 hover:text-secondary transition-colors">INDUSTRIAL</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-xl font-bold mb-8 relative inline-block uppercase tracking-tight">
              Contact Info
              <span className="absolute -bottom-2 left-0 w-12 h-1 bg-secondary rounded-full"></span>
            </h4>
            <ul className="flex flex-col gap-6">
              <li className="flex items-start gap-4">
                <MapPin className="w-6 h-6 text-secondary flex-shrink-0" />
                <span className="text-white/60 text-sm">
                  Unit No.221, JMD Megapolis, Sector 48 Gurgaon -122014
                </span>
              </li>
              <li className="flex items-center gap-4">
                <Phone className="w-6 h-6 text-secondary flex-shrink-0" />
                <span className="text-white/60 text-sm font-bold">+91-8800012625</span>
              </li>
              <li className="flex items-center gap-4">
                <Mail className="w-6 h-6 text-secondary flex-shrink-0" />
                <span className="text-white/60 text-sm font-bold">info@gcsgroupsolar.com</span>
              </li>
              <li className="flex items-center gap-4">
                <Mail className="w-6 h-6 text-secondary flex-shrink-0" />
                <span className="text-white/60 text-sm font-bold">sales@gcsgroupsolar.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 pt-12 text-center text-white/40 text-sm">
          <p>GCS Group &copy; {currentYear} All Right Reserved</p>
        </div>
      </div>

      {/* Floating Action Buttons */}
      <div className="fixed left-6 bottom-6 z-[100] flex flex-col gap-3">
        <a href="tel:+918800012625" className="w-14 h-14 bg-[#007bff] rounded-full flex items-center justify-center text-white shadow-2xl hover:scale-110 transition-transform border-4 border-white">
          <Phone className="w-7 h-7" />
        </a>
        <a href="https://wa.me/918800012625" className="w-14 h-14 bg-[#25d366] rounded-full flex items-center justify-center text-white shadow-2xl hover:scale-110 transition-transform border-4 border-white">
          <img src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg" alt="WA" className="w-9 h-9 brightness-0 invert" />
        </a>
      </div>
    </footer>
  );
};

export default Footer;
