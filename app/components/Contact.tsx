"use client";

import { Send, PhoneCall, Mail, MapPin, ExternalLink, User, MessageSquare, Briefcase, Phone, Building2, Warehouse, BadgeCheck } from "lucide-react";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";
import { motion } from "framer-motion";
import MultiForm from "./MultiForm";

const Contact = () => {

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 !gap-10 lg:!gap-16 items-start">

      {/* Left Side: Contact Information */}
      <div className="lg:col-span-5 !space-y-8 md:!space-y-12">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >


          <span className="text-[#e11d48] font-black uppercase tracking-[0.4em] text-xs !mb-4 block">
            GET IN TOUCH
          </span>
          <h2 className="text-3xl sm:text-5xl md:text-6xl font-black text-primary uppercase tracking-tighter leading-[0.9] !mb-8">
            Powering Your <br />
            <span className="text-[#e11d48] relative inline-block">
              Green Future
              <svg className="absolute -bottom-2 left-0 w-full h-3 text-[#e11d48]/20" viewBox="0 0 100 10" preserveAspectRatio="none">
                <path d="M0 5 Q 25 0, 50 5 T 100 5" fill="none" stroke="currentColor" strokeWidth="8" />
              </svg>
            </span>
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed max-w-md font-medium">
            Join the solar revolution. Our experts are ready to help you save 90% on electricity bills.
          </p>
        </motion.div>

        <div className="!space-y-6">
          {[
            { icon: PhoneCall, label: "Call Experts", value: "+91-8800012625", color: "bg-red-50", text: "text-red-600" },
            { icon: Mail, label: "Official Email", value: "info@gcssolar.com", color: "bg-blue-50", text: "text-blue-600" },
            { icon: MapPin, label: "Visit Office", value: "UnitNo.111 A, Vipul Business Park, Sector-48, Gurgaon( Haryana)-122018", color: "bg-orange-50", text: "text-orange-600" },
            { icon: BadgeCheck, label: "GST NO", value: "06ACZPJ6906B3ZE", color: "bg-emerald-50", text: "text-emerald-600" },
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.2 }}
              viewport={{ once: true }}
              whileHover={{ x: 10 }}
              className="flex items-center !gap-3 sm:!gap-6 !p-4 sm:!p-6 md:!p-8 bg-white shadow-[0_10px_40px_rgba(0,0,0,0.03)] border border-gray-100 hover:shadow-2xl transition-all duration-500 group cursor-pointer rounded-[2.5rem]"
            >
              <div className={`w-12 h-12 sm:w-16 sm:h-16 shrink-0 rounded-2xl ${item.color} flex items-center justify-center ${item.text} group-hover:scale-110 transition-transform duration-500`}>
                <item.icon className="w-6 h-6 sm:w-8 sm:h-8" />
              </div>
              <div className="flex-grow min-w-0">
                <div className="text-[10px] font-black text-muted-foreground uppercase tracking-widest !mb-1">{item.label}</div>
                <div className="text-sm sm:text-lg md:text-xl font-black text-primary tracking-tight break-all">{item.value}</div>
              </div>
              <ExternalLink className="w-4 h-4 sm:w-5 sm:h-5 shrink-0 text-gray-300 group-hover:text-[#e11d48] transition-colors" />
            </motion.div>
          ))}
        </div>

        {/* Social Bar */}
        <div className="!p-6 md:!p-8 bg-primary rounded-[2.5rem] text-white shadow-2xl relative overflow-hidden group !mt-4">
          <div className="absolute top-0 right-0 w-full h-32 bg-[#e11d48] rounded-full blur-[60px] opacity-20 -mr-10 -mt-10 group-hover:opacity-40 transition-opacity"></div>
          <div className="relative z-10">
            <div className="flex !gap-4">
              {[FaFacebook, FaTwitter, FaInstagram, FaLinkedin].map((Icon, i) => (
                <motion.a
                  key={i}
                  whileHover={{ y: -5, scale: 1.1 }}
                  href="#"
                  className="w-12 h-12 !m-2 rounded-xl bg-white/10 backdrop-blur-md flex items-center justify-center hover:bg-[#e11d48] transition-all duration-300"
                >
                  <Icon className="w-5 h-5" />
                </motion.a>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Right Side: Multi-Type Form */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        className="lg:col-span-7"
      >
        <MultiForm defaultTab="user" />
      </motion.div>
    </div>
  );
};

const FormField = ({ icon: Icon, label, id, type = "text", placeholder = "" }: any) => (
  <div className="relative group/field">
    <div className="absolute left-0 top-6 text-gray-400 group-focus-within/field:text-[#e11d48] transition-colors">
      <Icon className="w-5 h-5" />
    </div>
    <input
      type={type}
      className="peer w-full !pl-10 !pr-0 !py-6 bg-transparent border-b-2 border-gray-200 focus:border-[#e11d48] outline-none transition-all font-bold text-lg text-primary placeholder-transparent"
      placeholder={placeholder || label}
      id={id}
    />
    <label htmlFor={id} className="absolute left-10 -top-4 text-[10px] font-black uppercase tracking-widest text-muted-foreground peer-placeholder-shown:text-base peer-placeholder-shown:top-6 peer-focus:-top-4 peer-focus:text-[#e11d48] transition-all">{label}</label>
    <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#e11d48] transition-all duration-500 group-focus-within/field:w-full shadow-[0_2px_10px_rgba(225,29,72,0.5)]"></div>
  </div>
);

export default Contact;
