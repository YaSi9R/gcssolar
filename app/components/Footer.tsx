import Link from "next/link";
import { Globe, Share2, MessageSquare, ThumbsUp, Mail, Phone, MapPin } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-primary text-white pt-24 pb-12">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          <div className="flex flex-col gap-6">
            <Link href="/" className="flex items-center gap-2">
              <span className="text-3xl font-bold tracking-tighter text-white">
                GCS<span className="text-secondary">SOLAR</span>
              </span>
            </Link>
            <p className="text-white/60 leading-relaxed">
              Leading the transition to sustainable energy with innovative solar solutions. Dedicated to quality, reliability, and customer satisfaction since 2015.
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
            <h4 className="text-xl font-bold mb-8 relative inline-block">
              Quick Links
              <span className="absolute -bottom-2 left-0 w-12 h-1 bg-secondary rounded-full"></span>
            </h4>
            <ul className="flex flex-col gap-4">
              <li><Link href="/" className="text-white/60 hover:text-secondary transition-colors">Home</Link></li>
              <li><Link href="/about" className="text-white/60 hover:text-secondary transition-colors">About Us</Link></li>
              <li><Link href="/services" className="text-white/60 hover:text-secondary transition-colors">Services</Link></li>
              <li><Link href="/contact" className="text-white/60 hover:text-secondary transition-colors">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-xl font-bold mb-8 relative inline-block">
              Our Services
              <span className="absolute -bottom-2 left-0 w-12 h-1 bg-secondary rounded-full"></span>
            </h4>
            <ul className="flex flex-col gap-4">
              <li><Link href="#" className="text-white/60 hover:text-secondary transition-colors">Residential Solar</Link></li>
              <li><Link href="#" className="text-white/60 hover:text-secondary transition-colors">Commercial Solar</Link></li>
              <li><Link href="#" className="text-white/60 hover:text-secondary transition-colors">Industrial Solar</Link></li>
              <li><Link href="#" className="text-white/60 hover:text-secondary transition-colors">Solar Maintenance</Link></li>
              <li><Link href="#" className="text-white/60 hover:text-secondary transition-colors">Consultancy</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-xl font-bold mb-8 relative inline-block">
              Contact Info
              <span className="absolute -bottom-2 left-0 w-12 h-1 bg-secondary rounded-full"></span>
            </h4>
            <ul className="flex flex-col gap-6">
              <li className="flex items-start gap-4">
                <MapPin className="w-6 h-6 text-secondary flex-shrink-0" />
                <span className="text-white/60">
                  123 Solar Plaza, Sector 45, Gurgaon, Haryana, India
                </span>
              </li>
              <li className="flex items-center gap-4">
                <Phone className="w-6 h-6 text-secondary flex-shrink-0" />
                <span className="text-white/60">+91 98765 43210</span>
              </li>
              <li className="flex items-center gap-4">
                <Mail className="w-6 h-6 text-secondary flex-shrink-0" />
                <span className="text-white/60">info@gcssolar.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 pt-12 text-center text-white/40 text-sm">
          <p>&copy; {currentYear} GCS Group Solar. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
