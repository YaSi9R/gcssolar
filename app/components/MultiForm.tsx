"use client";

import { motion } from "framer-motion";
import { User, Mail, Phone, Briefcase, MessageSquare, Send } from "lucide-react";

interface MultiFormProps {
  defaultTab?: string;
}

const MultiForm = ({ defaultTab }: MultiFormProps) => {
  return (
    <div className="relative group">
      <div className="absolute -inset-4 bg-gradient-to-r from-[#e11d48]/10 to-blue-500/10 rounded-[4rem] blur-2xl opacity-100 transition-opacity duration-700"></div>
      
      <div className="bg-white/90 backdrop-blur-xl !p-8 md:!p-12 rounded-[3rem] shadow-[0_40px_100px_rgba(0,0,0,0.1)] border border-gray-100 relative overflow-hidden">
        <div className="!mb-10">
          <h3 className="text-3xl font-black text-primary uppercase tracking-tighter">
            Quick Inquiry
          </h3>
          <p className="text-muted-foreground !mt-2 font-medium text-sm leading-relaxed">
            Tell us about your solar needs and our team will get back to you with a customized quote.
          </p>
        </div>

        <form className="!space-y-8" onSubmit={(e) => e.preventDefault()}>
          <div className="!space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 !gap-8">
              <FormField icon={User} label="Full Name" placeholder="John Doe" id="user-name" />
              <FormField icon={Mail} label="Email Address" placeholder="john@example.com" id="user-email" type="email" />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 !gap-8">
              <FormField icon={Phone} label="Phone Number" placeholder="+91 XXXXX XXXXX" id="user-phone" type="tel" />
              
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

            <div className="relative group/field">
              <div className="absolute left-0 top-6 text-gray-400 group-focus-within/field:text-[#e11d48] transition-colors">
                <MessageSquare className="w-5 h-5" />
              </div>
              <textarea 
                rows={3} 
                className="peer w-full pl-10 pr-0 !py-6 bg-transparent border-b-2 border-gray-200 focus:border-[#e11d48] outline-none transition-all font-bold text-lg text-primary placeholder-transparent resize-none"
                placeholder="Message"
                id="user-msg"
              ></textarea>
              <label htmlFor="user-msg" className="absolute left-10 -top-4 text-[10px] font-black uppercase tracking-widest text-muted-foreground peer-placeholder-shown:text-base peer-placeholder-shown:top-6 peer-focus:-top-4 peer-focus:text-[#e11d48] transition-all">Additional Notes</label>
              <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#e11d48] transition-all duration-500 group-focus-within/field:w-full shadow-[0_2px_10px_rgba(225,29,72,0.5)]"></div>
            </div>
          </div>

          <motion.button 
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full bg-[#e11d48] text-white !py-6 rounded-2xl font-black uppercase tracking-[0.3em] shadow-[0_20px_50px_rgba(225,29,72,0.4)] hover:shadow-[0_30px_70px_rgba(225,29,72,0.6)] transition-all duration-500 flex items-center justify-center !gap-4 group/btn !mt-8"
          >
            Submit Inquiry
            <Send className="w-6 h-6 group-hover/btn:translate-x-2 group-hover/btn:-translate-y-1 transition-transform" />
          </motion.button>
        </form>
      </div>
    </div>
  );
};

const FormField = ({ icon: Icon, label, placeholder, id, type = "text" }: any) => (
  <div className="relative group/field">
    <div className="absolute left-0 top-6 text-gray-400 group-focus-within/field:text-[#e11d48] transition-colors">
      <Icon className="w-5 h-5" />
    </div>
    <input 
      type={type} 
      className="peer w-full pl-10 pr-0 !py-6 bg-transparent border-b-2 border-gray-200 focus:border-[#e11d48] outline-none transition-all font-bold text-lg text-primary placeholder-transparent"
      placeholder={placeholder}
      id={id}
    />
    <label htmlFor={id} className="absolute left-10 -top-4 text-[10px] font-black uppercase tracking-widest text-muted-foreground peer-placeholder-shown:text-base peer-placeholder-shown:top-6 peer-focus:-top-4 peer-focus:text-[#e11d48] transition-all">
      {label}
    </label>
    <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#e11d48] transition-all duration-500 group-focus-within/field:w-full shadow-[0_2px_10px_rgba(225,29,72,0.5)]"></div>
  </div>
);

export default MultiForm;
