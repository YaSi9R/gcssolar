"use client";

import { motion } from "framer-motion";
import { Send, PhoneCall, Mail, MapPin, ExternalLink, User, MessageSquare, Briefcase, Phone } from "lucide-react";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";

const Contact = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-start">
      
      {/* Left Side: Contact Information */}
      <div className="lg:col-span-5 space-y-12">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <span className="text-[#e11d48] font-black uppercase tracking-[0.4em] text-xs mb-4 block">
            GET IN TOUCH
          </span>
          <h2 className="text-5xl md:text-6xl font-black text-primary uppercase tracking-tighter leading-[0.9] !mb-8">
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

        <div className="space-y-6">
          {[
            { icon: PhoneCall, label: "Call Experts", value: "+91 98765 43210", color: "bg-red-50", text: "text-red-600" },
            { icon: Mail, label: "Official Email", value: "info@gcssolar.com", color: "bg-blue-50", text: "text-blue-600" },
            { icon: MapPin, label: "Visit Office", value: "Gurugram, Haryana", color: "bg-orange-50", text: "text-orange-600" },
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.2 }}
              viewport={{ once: true }}
              whileHover={{ x: 10 }}
              className="flex items-center gap-6 p-8 bg-white shadow-[0_10px_40px_rgba(0,0,0,0.03)] border border-gray-100 hover:shadow-2xl transition-all duration-500 group cursor-pointer rounded-[2.5rem]"
            >
              <div className={`w-16 h-16 rounded-2xl ${item.color} flex items-center justify-center ${item.text} group-hover:scale-110 transition-transform duration-500`}>
                <item.icon className="w-8 h-8" />
              </div>
              <div className="flex-grow">
                <div className="text-[10px] font-black text-muted-foreground uppercase tracking-widest mb-1">{item.label}</div>
                <div className="text-xl font-black text-primary tracking-tight">{item.value}</div>
              </div>
              <ExternalLink className="w-5 h-5 text-gray-300 group-hover:text-[#e11d48] transition-colors" />
            </motion.div>
          ))}
        </div>

        {/* Social Bar */}
        <div className="p-8 bg-primary rounded-[2.5rem] text-white shadow-2xl relative overflow-hidden group !mt-4">
          <div className="absolute top-0 right-0 w-full h-32 bg-[#e11d48] rounded-full blur-[60px] opacity-20 -mr-10 -mt-10 group-hover:opacity-40 transition-opacity"></div>
          <div className="relative z-10">
            <div className="flex gap-4">
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

      {/* Right Side: Animated Form */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        className="lg:col-span-7 relative group"
      >
        <div className="absolute -inset-4 bg-gradient-to-r from-[#e11d48]/10 to-blue-500/10 rounded-[4rem] blur-2xl opacity-100 transition-opacity duration-700"></div>
        
        <div className=" !p-10 md:p-16  shadow-[0_40px_100px_rgba(0,0,0,0.1)] border border-gray-100 relative overflow-hidden">
          {/* Internal Glow Decorative */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-red-50/50 rounded-full blur-3xl -z-10 translate-x-20 -translate-y-20"></div>
          
          <div className="mb-12">
            <h3 className="text-3xl font-black text-primary uppercase tracking-tighter">Quick Inquiry</h3>
            <p className="text-muted-foreground mt-2 font-medium !mb-4">Send us a message and our engineers will call you back.</p>
          </div>

          <form className="!space-y-10" onSubmit={(e) => e.preventDefault()}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              {/* Full Name */}
              <div className="relative group/field">
                <div className="absolute left-0 top-6 text-gray-400 group-focus-within/field:text-[#e11d48] transition-colors">
                  <User className="w-5 h-5" />
                </div>
                <input 
                  type="text" 
                  className="peer w-full pl-10 pr-0 !py-6 bg-transparent border-b-2 border-gray-200 focus:border-[#e11d48] outline-none transition-all font-bold text-lg text-primary placeholder-transparent"
                  placeholder="Name"
                  id="name"
                />
                <label htmlFor="name" className="absolute left-10 -top-4 text-[10px] font-black uppercase tracking-widest text-muted-foreground peer-placeholder-shown:text-base peer-placeholder-shown:top-6 peer-focus:-top-4 peer-focus:text-[#e11d48] transition-all">Full Name</label>
                <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#e11d48] transition-all duration-500 group-focus-within/field:w-full shadow-[0_2px_10px_rgba(225,29,72,0.5)]"></div>
              </div>

              {/* Email */}
              <div className="relative group/field">
                <div className="absolute left-0 top-6 text-gray-400 group-focus-within/field:text-[#e11d48] transition-colors">
                  <Mail className="w-5 h-5" />
                </div>
                <input 
                  type="email" 
                  className="peer w-full pl-10 pr-0 !py-6 bg-transparent border-b-2 border-gray-200 focus:border-[#e11d48] outline-none transition-all font-bold text-lg text-primary placeholder-transparent"
                  placeholder="Email"
                  id="email"
                />
                <label htmlFor="email" className="absolute left-10 -top-4 text-[10px] font-black uppercase tracking-widest text-muted-foreground peer-placeholder-shown:text-base peer-placeholder-shown:top-6 peer-focus:-top-4 peer-focus:text-[#e11d48] transition-all">Email Address</label>
                <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#e11d48] transition-all duration-500 group-focus-within/field:w-full shadow-[0_2px_10px_rgba(225,29,72,0.5)]"></div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              {/* Phone */}
              <div className="relative group/field">
                <div className="absolute left-0 top-6 text-gray-400 group-focus-within/field:text-[#e11d48] transition-colors">
                  <Phone className="w-5 h-5" />
                </div>
                <input 
                  type="tel" 
                  className="peer w-full pl-10 pr-0 !py-6 bg-transparent border-b-2 border-gray-200 focus:border-[#e11d48] outline-none transition-all font-bold text-lg text-primary placeholder-transparent"
                  placeholder="Phone"
                  id="phone"
                />
                <label htmlFor="phone" className="absolute left-10 -top-4 text-[10px] font-black uppercase tracking-widest text-muted-foreground peer-placeholder-shown:text-base peer-placeholder-shown:top-6 peer-focus:-top-4 peer-focus:text-[#e11d48] transition-all">Phone Number</label>
                <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#e11d48] transition-all duration-500 group-focus-within/field:w-full shadow-[0_2px_10px_rgba(225,29,72,0.5)]"></div>
              </div>

              {/* Project Selection */}
              <div className="relative group/field">
                <div className="absolute left-0 top-6 text-gray-400 group-focus-within/field:text-[#e11d48] transition-colors">
                  <Briefcase className="w-5 h-5" />
                </div>
                <select className="peer w-full pl-10 pr-0 !py-6 bg-transparent border-b-2 border-gray-200 focus:border-[#e11d48] outline-none transition-all font-bold text-lg text-primary appearance-none">
                  <option className="bg-white">Residential Solar</option>
                  <option className="bg-white">Commercial Solar</option>
                  <option className="bg-white">Industrial Solar</option>
                </select>
                <label className="absolute left-10 -top-4 text-[10px] font-black uppercase tracking-widest text-[#e11d48]">Project Type</label>
                <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#e11d48] transition-all duration-500 group-focus-within/field:w-full shadow-[0_2px_10px_rgba(225,29,72,0.5)]"></div>
              </div>
            </div>

            {/* Message */}
            <div className="relative group/field">
              <div className="absolute left-0 top-6 text-gray-400 group-focus-within/field:text-[#e11d48] transition-colors">
                <MessageSquare className="w-5 h-5" />
              </div>
              <textarea 
                rows={4} 
                className="peer w-full pl-10 pr-0 !py-6 bg-transparent border-b-2 border-gray-200 focus:border-[#e11d48] outline-none transition-all font-bold text-lg text-primary placeholder-transparent resize-none"
                placeholder="Message"
                id="msg"
              ></textarea>
              <label htmlFor="msg" className="absolute left-10 -top-4 text-[10px] font-black uppercase tracking-widest text-muted-foreground peer-placeholder-shown:text-base peer-placeholder-shown:top-6 peer-focus:-top-4 peer-focus:text-[#e11d48] transition-all">Your Message</label>
              <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#e11d48] transition-all duration-500 group-focus-within/field:w-full shadow-[0_2px_10px_rgba(225,29,72,0.5)]"></div>
            </div>

            <motion.button 
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full bg-[#e11d48] text-white py-7 rounded-[2rem] font-black uppercase tracking-[0.3em] shadow-[0_20px_50px_rgba(225,29,72,0.4)] hover:shadow-[0_30px_70px_rgba(225,29,72,0.6)] transition-all duration-500 flex items-center justify-center gap-4 group/btn"
            >
              Confirm Inquiry
              <Send className="w-7 h-7 group-hover/btn:translate-x-2 group-hover/btn:-translate-y-1 transition-transform" />
            </motion.button>
          </form>
        </div>
      </motion.div>
    </div>
  );
};

export default Contact;
