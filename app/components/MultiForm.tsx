"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { User, Mail, Phone, Briefcase, MessageSquare, Send, Building2, MapPin, BadgeCheck, Warehouse } from "lucide-react";

type FormType = "user" | "distributor" | "dealer";

const MultiForm = ({ defaultTab = "user" }: { defaultTab?: FormType }) => {
  const [activeTab, setActiveTab] = useState<FormType>(defaultTab);

  const tabs = [
    { id: "user", label: "User", icon: User },
    { id: "distributor", label: "Distributor", icon: Warehouse },
    { id: "dealer", label: "Dealer", icon: Building2 },
  ];

  const renderFormFields = () => {
    switch (activeTab) {
      case "user":
        return (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <FormField icon={User} label="Full Name" placeholder="John Doe" id="user-name" />
              <FormField icon={Mail} label="Email Address" placeholder="john@example.com" id="user-email" type="email" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
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
          </>
        );
      case "distributor":
        return (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <FormField icon={Building2} label="Entity Name" placeholder="Distribution Co." id="dist-name" />
              <FormField icon={Warehouse} label="Warehouse Capacity" placeholder="e.g. 5000 sq ft" id="dist-cap" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <FormField icon={Mail} label="Official Email" placeholder="dist@example.com" id="dist-email" type="email" />
              <FormField icon={Phone} label="Official Phone" placeholder="+91 XXXXX XXXXX" id="dist-phone" type="tel" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <FormField icon={BadgeCheck} label="GST Number" placeholder="22AAAAA0000A1Z5" id="dist-gst" />
              <FormField icon={MapPin} label="Target Distribution Area" placeholder="e.g. Haryana" id="dist-area" />
            </div>
          </>
        );
      case "dealer":
        return (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <FormField icon={User} label="Contact Person" placeholder="Manager Name" id="dealer-name" />
              <FormField icon={Building2} label="Company Name" placeholder="Solar Solutions Ltd" id="dealer-company" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <FormField icon={Mail} label="Business Email" placeholder="business@example.com" id="dealer-email" type="email" />
              <FormField icon={Phone} label="Contact Number" placeholder="+91 XXXXX XXXXX" id="dealer-phone" type="tel" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <FormField icon={MapPin} label="Operating Region" placeholder="e.g. North India" id="dealer-region" />
              <FormField icon={BadgeCheck} label="Years in Business" placeholder="e.g. 5 Years" id="dealer-exp" />
            </div>
          </>
        );
    }
  };

  return (
    <div className="relative group">
      <div className="absolute -inset-4 bg-gradient-to-r from-[#e11d48]/10 to-blue-500/10 rounded-[4rem] blur-2xl opacity-100 transition-opacity duration-700"></div>
      
      <div className="bg-white/90 backdrop-blur-xl !p-8 md:p-12 rounded-[3rem] shadow-[0_40px_100px_rgba(0,0,0,0.1)] border border-gray-100 relative overflow-hidden">
        {/* Tabs */}
        <div className="flex flex-wrap gap-4 mb-12 p-2 bg-gray-50 rounded-3xl">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as FormType)}
              className={`flex-1 flex items-center justify-center gap-3 py-4 rounded-2xl font-black uppercase tracking-widest text-xs transition-all duration-500 ${
                activeTab === tab.id
                  ? "bg-white text-[#e11d48] shadow-xl scale-105"
                  : "text-muted-foreground hover:bg-white/50"
              }`}
            >
              <tab.icon className={`w-4 h-4 ${activeTab === tab.id ? "text-[#e11d48]" : ""}`} />
              {tab.label}
            </button>
          ))}
        </div>

        <div className="mb-10 !mt-4">
          <h3 className="text-3xl font-black text-primary uppercase tracking-tighter">
            {activeTab === "user" ? "Quick Inquiry" : activeTab === "distributor" ? "Distributor Network" : "Dealer Partnership"}
          </h3>
          <p className="text-muted-foreground mt-2 font-medium">
            {activeTab === "user" 
              ? "Tell us about your solar needs and we'll get back to you." 
              : activeTab === "distributor"
              ? "Expand your distribution portfolio with GCS Solar."
              : "Join India's fastest growing solar network."}
          </p>
        </div>

        <form className="space-y-8" onSubmit={(e) => e.preventDefault()}>
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="space-y-8"
            >
              {renderFormFields()}
              
              <div className="relative group/field">
                <div className="absolute left-0 top-6 text-gray-400 group-focus-within/field:text-[#e11d48] transition-colors">
                  <MessageSquare className="w-5 h-5" />
                </div>
                <textarea 
                  rows={3} 
                  className="peer w-full pl-10 pr-0 !py-6 bg-transparent border-b-2 border-gray-200 focus:border-[#e11d48] outline-none transition-all font-bold text-lg text-primary placeholder-transparent resize-none"
                  placeholder="Message"
                  id={`${activeTab}-msg`}
                ></textarea>
                <label htmlFor={`${activeTab}-msg`} className="absolute left-10 -top-4 text-[10px] font-black uppercase tracking-widest text-muted-foreground peer-placeholder-shown:text-base peer-placeholder-shown:top-6 peer-focus:-top-4 peer-focus:text-[#e11d48] transition-all">Additional Notes</label>
                <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#e11d48] transition-all duration-500 group-focus-within/field:w-full shadow-[0_2px_10px_rgba(225,29,72,0.5)]"></div>
              </div>
            </motion.div>
          </AnimatePresence>

          <motion.button 
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full bg-[#e11d48] text-white py-6 rounded-2xl font-black uppercase tracking-[0.3em] shadow-[0_20px_50px_rgba(225,29,72,0.4)] hover:shadow-[0_30px_70px_rgba(225,29,72,0.6)] transition-all duration-500 flex items-center justify-center gap-4 group/btn mt-8"
          >
            Submit Application
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
