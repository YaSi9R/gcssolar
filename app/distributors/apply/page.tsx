"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Building2, MapPin, Phone, Mail, Globe, Hash, CheckSquare, Square,
  Plus, Trash2, ArrowLeft, ArrowRight, Printer, Sparkles, AlertCircle,
  Copy, Check, FileText, Landmark, User, Award, ShieldAlert, Edit2, Download
} from "lucide-react";
import Link from "next/link";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

// Interface definitions
interface PersonnelRow {
  name: string;
  age: string;
  qualification: string;
}

interface FormState {
  refNo: string;
  firmName: string;
  address: string;
  city: string;
  pinCode: string;
  district: string;
  state: string;
  telNo: string;
  resNo: string;
  faxNo: string;
  mobileNo: string;
  email: string;
  website: string;
  firmType: "Private Ltd." | "Partnership" | "Proprietary" | "";
  gstn: string;
  cstNo: string;
  personnel: PersonnelRow[];
  ownerName: string;
  designation: string;
  signatureType: "draw" | "type" | "upload";
  signatureText: string;
  signatureImage: string; // Base64 or URL
  date: string;
  agreedToTerms: boolean;
}

export default function DistributorApplyPage() {
  const [step, setStep] = useState<number>(1);
  const [copiedAccount, setCopiedAccount] = useState<boolean>(false);
  const [copiedIfsc, setCopiedIfsc] = useState<boolean>(false);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  // Form State
  const [form, setForm] = useState<FormState>({
    refNo: `GCS-DST-${Math.floor(100000 + Math.random() * 900000)}`,
    firmName: "",
    address: "",
    city: "",
    pinCode: "",
    district: "",
    state: "",
    telNo: "",
    resNo: "",
    faxNo: "",
    mobileNo: "",
    email: "",
    website: "",
    firmType: "",
    gstn: "",
    cstNo: "",
    personnel: [
      { name: "", age: "", qualification: "" },
      { name: "", age: "", qualification: "" },
      { name: "", age: "", qualification: "" },
      { name: "", age: "", qualification: "" },
      { name: "", age: "", qualification: "" },
    ],
    ownerName: "",
    designation: "",
    signatureType: "draw",
    signatureText: "",
    signatureImage: "",
    date: new Date().toISOString().split("T")[0],
    agreedToTerms: false,
  });

  // Errors for validation
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});

  // Canvas ref for signature drawing
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const isDrawingRef = useRef<boolean>(false);

  // Initialize Canvas listeners
  useEffect(() => {
    if (form.signatureType === "draw" && canvasRef.current && step === 4) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.strokeStyle = "#0a2540";
        ctx.lineWidth = 3;
        ctx.lineCap = "round";
        ctx.lineJoin = "round";
      }

      // Resize handler to adjust visual/drawing size
      const resizeCanvas = () => {
        const rect = canvas.getBoundingClientRect();
        canvas.width = rect.width;
        canvas.height = rect.height;
        // Retain the stroke style on resize
        const newCtx = canvas.getContext("2d");
        if (newCtx) {
          newCtx.strokeStyle = "#0a2540";
          newCtx.lineWidth = 3;
          newCtx.lineCap = "round";
          newCtx.lineJoin = "round";
        }
      };

      resizeCanvas();
      window.addEventListener("resize", resizeCanvas);
      return () => window.removeEventListener("resize", resizeCanvas);
    }
  }, [form.signatureType, step]);

  // Drawing Handlers
  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    isDrawingRef.current = true;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const coords = getEventCoords(e, canvas);
    ctx.beginPath();
    ctx.moveTo(coords.x, coords.y);
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawingRef.current) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Prevent scrolling when drawing on mobile
    if (e.cancelable) e.preventDefault();

    const coords = getEventCoords(e, canvas);
    ctx.lineTo(coords.x, coords.y);
    ctx.stroke();
  };

  const stopDrawing = () => {
    isDrawingRef.current = false;
    saveSignatureFromCanvas();
  };

  const getEventCoords = (
    e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>,
    canvas: HTMLCanvasElement
  ) => {
    const rect = canvas.getBoundingClientRect();
    if ("touches" in e) {
      if (e.touches.length === 0) return { x: 0, y: 0 };
      return {
        x: e.touches[0].clientX - rect.left,
        y: e.touches[0].clientY - rect.top,
      };
    } else {
      return {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      };
    }
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    setForm(prev => ({ ...prev, signatureImage: "" }));
  };

  const saveSignatureFromCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    // Check if canvas is blank
    const blank = document.createElement("canvas");
    blank.width = canvas.width;
    blank.height = canvas.height;
    if (canvas.toDataURL() !== blank.toDataURL()) {
      const dataUrl = canvas.toDataURL();
      setForm(prev => ({ ...prev, signatureImage: dataUrl }));
    }
  };

  const handleTextSignatureChange = (val: string) => {
    setForm(prev => ({ ...prev, signatureText: val }));
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setForm(prev => ({ ...prev, signatureImage: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  // Text inputs handler
  const handleInputChange = (field: keyof FormState, value: any) => {
    setForm(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    }
  };

  // Personnel Table Handler
  const handlePersonnelChange = (index: number, field: keyof PersonnelRow, value: string) => {
    const list = [...form.personnel];
    list[index][field] = value;
    setForm(prev => ({ ...prev, personnel: list }));
  };

  const addPersonnelRow = () => {
    setForm(prev => ({
      ...prev,
      personnel: [...prev.personnel, { name: "", age: "", qualification: "" }],
    }));
  };

  const removePersonnelRow = (index: number) => {
    if (form.personnel.length <= 1) return;
    const list = [...form.personnel];
    list.splice(index, 1);
    setForm(prev => ({ ...prev, personnel: list }));
  };

  // Step Navigations & Validation
  const validateStep = (currentStep: number): boolean => {
    const newErrors: Partial<Record<keyof FormState, string>> = {};

    if (currentStep === 1) {
      if (!form.firmName.trim()) newErrors.firmName = "Firm Name is required";
      if (!form.address.trim()) newErrors.address = "Address is required";
      if (!form.city.trim()) newErrors.city = "City is required";
      if (!form.pinCode.trim()) newErrors.pinCode = "Pin Code is required";
      if (!form.district.trim()) newErrors.district = "District is required";
      if (!form.state.trim()) newErrors.state = "State is required";
      if (!form.mobileNo.trim()) newErrors.mobileNo = "Mobile Number is required";
      if (!form.email.trim()) {
        newErrors.email = "Email Address is required";
      } else if (!/\S+@\S+\.\S+/.test(form.email)) {
        newErrors.email = "Invalid email format";
      }
      if (!form.firmType) newErrors.firmType = "Please select Firm Type";
    }

    if (currentStep === 2) {
      // Validate at least one personnel row is partially filled
      const activeRows = form.personnel.filter(p => p.name.trim());
      if (activeRows.length === 0) {
        newErrors.personnel = "Please add at least one partner/director name";
      }
    }

    if (currentStep === 3) {
      if (!form.agreedToTerms) {
        newErrors.agreedToTerms = "You must agree to the confirmation declaration to proceed";
      }
    }

    if (currentStep === 4) {
      if (!form.ownerName.trim()) newErrors.ownerName = "Owner / Signatory Name is required";
      if (!form.designation.trim()) newErrors.designation = "Designation is required";

      if (form.signatureType === "draw" && !form.signatureImage) {
        newErrors.signatureImage = "Please draw your signature";
      }
      if (form.signatureType === "type" && !form.signatureText.trim()) {
        newErrors.signatureText = "Please type your signature name";
      }
      if (form.signatureType === "upload" && !form.signatureImage) {
        newErrors.signatureImage = "Please upload a signature image";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const nextStep = () => {
    if (validateStep(step)) {
      setStep(prev => prev + 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const prevStep = () => {
    setStep(prev => Math.max(1, prev - 1));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const copyToClipboard = (text: string, type: "acc" | "ifsc") => {
    navigator.clipboard.writeText(text);
    if (type === "acc") {
      setCopiedAccount(true);
      setTimeout(() => setCopiedAccount(false), 2000);
    } else {
      setCopiedIfsc(true);
      setTimeout(() => setCopiedIfsc(false), 2000);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateStep(4)) {
      setIsSubmitted(true);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handlePrint = () => {
    window.print();
  };

  // Distributor benefits list
  const benefits = [
    { code: "a", title: "Best Price", desc: "Highest-tier pricing discounts on solar products." },
    { code: "b", title: "Better Margin", desc: "Maximize profitability over wholesale distribution levels." },
    { code: "c", title: "Monthly Leads", desc: "Receive 30-40 targeted regional vendor leads monthly." },
    { code: "d", title: "Always Available", desc: "Priority stock allocation direct from the manufacturing lines." },
    { code: "e", title: "International Trip", desc: "Earn paid annual holiday trips for regional goal execution." },
    { code: "f", title: "15-Day Replacements", desc: "Hassle-free damage replacement policy within 15 days of dispatch." }
  ];

  return (
    <main className="min-h-screen bg-slate-50 text-primary">
      <Navbar />

      {/* Screen-only CSS for print stylesheet injection */}
      <style jsx global>{`
        @media print {
          /* Hide standard elements */
          nav, footer, .web-only, .btn-primary, .btn-secondary, button {
            display: none !important;
          }
          body, main {
            background: white !important;
            color: black !important;
            padding: 0 !important;
            margin: 0 !important;
          }
          .print-container {
            display: block !important;
            width: 100% !important;
            max-width: 800px !important;
            margin: 0 auto !important;
            padding: 20px !important;
            font-size: 11px !important;
            line-height: 1.4 !important;
            color: #000 !important;
          }
          .print-card {
            border: 1px solid #000 !important;
            box-shadow: none !important;
            border-radius: 0 !important;
            background: transparent !important;
            padding: 20px !important;
          }
          input, textarea, select {
            border-bottom: 1px solid #000 !important;
            border-top: none !important;
            border-left: none !important;
            border-right: none !important;
            background: transparent !important;
            color: black !important;
            padding: 2px !important;
          }
          .page-break {
            page-break-before: always;
          }
          .print-header {
            display: flex !important;
            justify-content: space-between;
            align-items: flex-start;
            border-bottom: 2px solid #000;
            padding-bottom: 15px;
            margin-bottom: 20px;
          }
          .print-table {
            width: 100% !important;
            border-collapse: collapse !important;
          }
          .print-table th, .print-table td {
            border: 1px solid #000 !important;
            padding: 6px !important;
            text-align: left !important;
          }
        }
      `}</style>

      {/* Hero Section */}
      <section className="web-only relative overflow-hidden bg-[#0a2540] text-white !pt-40 sm:!pt-48 md:!pt-56 !pb-20 md:!pb-24">
        <div className="absolute inset-0 opacity-15">
          <img
            src="/solar_part_1.png"
            alt="Solar PV background"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a2540]/80 via-[#0a2540]/95 to-[#0a2540]"></div>

        <div className="relative z-10 max-w-4xl !mx-auto !px-6 text-center">
          <span className="inline-block bg-[#f3a323]/20 text-[#f3a323] border border-[#f3a323]/30 !px-5 !py-1.5 rounded-full text-[0.7rem] font-black uppercase tracking-[0.2em] !mb-5">
            Official Distributor Program
          </span>
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-black uppercase tracking-tighter !mb-4 leading-none">
            Authorized Distributor <span className="text-[#f3a323]">Registration</span>
          </h1>
          <p className="text-white/70 text-lg max-w-2xl !mx-auto leading-relaxed font-medium">
            Scale GCS Solar distribution network in your region. Complete the registration fee transfer and document validation below.
          </p>
        </div>
      </section>

      {/* Main Interactive Form Block */}
      <section className="max-w-6xl !mx-auto !px-4 !py-12 relative z-20">
        {!isSubmitted ? (
          <div className="bg-white rounded-[2.5rem] shadow-[0_30px_80px_rgba(10,37,64,0.06)] border border-slate-100 overflow-hidden">
            {/* Header section of application - Ref No left, Date right */}
            <div className="!p-4 sm:!p-8 md:!p-12 border-b border-slate-100 bg-slate-50/50 flex flex-col !gap-4">
              <div className="flex justify-between items-center w-full !gap-2">
                {/* Ref No — Left */}
                <div className="flex !gap-1 sm:!gap-2 items-center min-w-0">
                  <span className="text-[10px] sm:text-xs uppercase tracking-wider font-black text-slate-400 whitespace-nowrap">Ref No:</span>
                  <span className="font-mono bg-slate-100 text-slate-700 !px-2 sm:!px-3 !py-1 rounded text-[10px] sm:text-xs font-bold truncate">{form.refNo}</span>
                </div>
                {/* Date — Right */}
                <div className="flex !gap-1 sm:!gap-2 items-center shrink-0">
                  <span className="text-[10px] sm:text-xs uppercase tracking-wider font-black text-slate-400 whitespace-nowrap">Date:</span>
                  <span className="text-slate-700 font-bold text-[10px] sm:text-xs whitespace-nowrap">{form.date}</span>
                </div>
              </div>

              <div className="flex justify-center">
                <button
                  onClick={handlePrint}
                  className="web-only flex items-center !gap-2 text-xs font-black bg-white hover:bg-[#0a2540] border-2 border-[#0a2540] text-[#0a2540] hover:text-white !px-4 !py-2 rounded-xl transition-all shadow-sm"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>PRINT / SAVE PDF</span>
                </button>
              </div>
            </div>

            {/* Stepper Indicators */}
            <div className="web-only !px-8 md:!px-12 !py-6 bg-slate-100/50 border-b border-slate-100 flex flex-wrap !gap-2 justify-between">
              {[
                { s: 1, label: "Firm Details" },
                { s: 2, label: "Key Personnel" },
                { s: 3, label: "Terms & Payment" },
                { s: 4, label: "Signature" }
              ].map((item) => (
                <button
                  key={item.s}
                  onClick={() => step > item.s && setStep(item.s)}
                  disabled={step < item.s}
                  className={`flex items-center !gap-2 !py-2 !px-4 rounded-xl text-xs font-black uppercase tracking-widest transition-all duration-300 ${step === item.s
                    ? "bg-[#f3a323] text-white shadow-md"
                    : step > item.s
                      ? "text-[#0a2540] bg-[#0a2540]/5 hover:bg-[#0a2540]/10"
                      : "text-slate-400 bg-transparent cursor-not-allowed"
                    }`}
                >
                  <span className="w-5 h-5 rounded-full bg-black/10 flex items-center justify-center text-[10px]">{item.s}</span>
                  <span>{item.label}</span>
                </button>
              ))}
            </div>

            {/* Form Content */}
            <form onSubmit={handleSubmit} className="!p-4 sm:!p-8 md:!p-12">
              <AnimatePresence mode="wait">
                <motion.div
                  key={step}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.2 }}
                  className="flex flex-col !gap-8"
                >

                  {/* STEP 1: DETAILS OF FIRM */}
                  {step === 1 && (
                    <div className="flex flex-col !gap-8">
                      <div>
                        <span className="text-[#f3a323] font-black uppercase tracking-widest text-xs block !mb-1">Section 01</span>
                        <h3 className="text-xl sm:text-3xl font-black text-primary uppercase tracking-tighter">Details of Firm</h3>
                        <p className="text-slate-400 text-sm !mt-1">Please provide the registered name, address, contact and tax information of the business.</p>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 !gap-8">
                        {/* Company Name */}
                        <div className="relative group/field">
                          <div className="absolute left-0 top-6 text-gray-400 group-focus-within/field:text-[#f3a323] transition-colors">
                            <Building2 className="w-5 h-5" />
                          </div>
                          <input
                            type="text"
                            className="peer w-full !pl-10 !pr-0 !py-3 sm:!py-6 bg-transparent border-b-2 border-slate-200 focus:border-[#f3a323] outline-none transition-all font-bold text-sm sm:text-base md:text-lg text-primary placeholder-transparent"
                            placeholder="Registered Firm Name"
                            id="firmName"
                            value={form.firmName}
                            onChange={(e) => handleInputChange("firmName", e.target.value)}
                          />
                          <label htmlFor="firmName" className="absolute left-10 -top-4 text-[10px] font-black uppercase tracking-widest text-muted-foreground peer-placeholder-shown:text-sm sm:peer-placeholder-shown:text-base peer-placeholder-shown:top-4 sm:peer-placeholder-shown:top-6 peer-focus:-top-4 peer-focus:text-[#f3a323] transition-all">
                            Registered Firm Name *
                          </label>
                          <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#f3a323] transition-all duration-500 group-focus-within/field:w-full shadow-[0_2px_10px_rgba(243,163,35,0.3)]"></div>
                          {errors.firmName && <span className="text-xs font-bold text-[#e11d48] !mt-1 block">{errors.firmName}</span>}
                        </div>

                        {/* Firm Type checkboxes */}
                        <div className="relative border-b-2 border-slate-200 !py-3 flex flex-col justify-end">
                          <label className="text-[10px] font-black uppercase tracking-widest text-[#f3a323] block !mb-2">Firm Type *</label>
                          <div className="flex flex-wrap !gap-x-3 sm:!gap-x-6 !gap-y-2">
                            {["Private Ltd.", "Partnership", "Proprietary"].map((type) => (
                              <label key={type} className="flex items-center !gap-1.5 cursor-pointer font-bold text-xs sm:text-sm text-slate-700 whitespace-nowrap">
                                <input
                                  type="radio"
                                  name="firmType"
                                  value={type}
                                  checked={form.firmType === type}
                                  onChange={() => handleInputChange("firmType", type)}
                                  className="accent-[#f3a323] w-3.5 h-3.5 sm:w-4 sm:h-4"
                                />
                                <span>{type}</span>
                              </label>
                            ))}
                          </div>
                          {errors.firmType && <span className="text-xs font-bold text-[#e11d48] !mt-1 block">{errors.firmType}</span>}
                        </div>
                      </div>

                      {/* Full Address */}
                      <div className="relative group/field">
                        <div className="absolute left-0 top-6 text-gray-400 group-focus-within/field:text-[#f3a323] transition-colors">
                          <MapPin className="w-5 h-5" />
                        </div>
                        <input
                          type="text"
                          className="peer w-full !pl-10 !pr-0 !py-3 sm:!py-6 bg-transparent border-b-2 border-slate-200 focus:border-[#f3a323] outline-none transition-all font-bold text-sm sm:text-base md:text-lg text-primary placeholder-transparent"
                          placeholder="Corporate Address"
                          id="address"
                          value={form.address}
                          onChange={(e) => handleInputChange("address", e.target.value)}
                        />
                        <label htmlFor="address" className="absolute left-10 -top-4 text-[10px] font-black uppercase tracking-widest text-muted-foreground peer-placeholder-shown:text-sm sm:peer-placeholder-shown:text-base peer-placeholder-shown:top-4 sm:peer-placeholder-shown:top-6 peer-focus:-top-4 peer-focus:text-[#f3a323] transition-all">
                          Corporate Address *
                        </label>
                        <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#f3a323] transition-all duration-500 group-focus-within/field:w-full shadow-[0_2px_10px_rgba(243,163,35,0.3)]"></div>
                        {errors.address && <span className="text-xs font-bold text-[#e11d48] !mt-1 block">{errors.address}</span>}
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-4 !gap-8">
                        {/* City */}
                        <div className="relative group/field">
                          <input
                            type="text"
                            className="peer w-full !pl-0 !pr-0 !py-3 sm:!py-6 bg-transparent border-b-2 border-slate-200 focus:border-[#f3a323] outline-none transition-all font-bold text-sm sm:text-base md:text-lg text-primary placeholder-transparent"
                            placeholder="City"
                            id="city"
                            value={form.city}
                            onChange={(e) => handleInputChange("city", e.target.value)}
                          />
                          <label htmlFor="city" className="absolute left-0 -top-4 text-[10px] font-black uppercase tracking-widest text-muted-foreground peer-placeholder-shown:text-sm sm:peer-placeholder-shown:text-base peer-placeholder-shown:top-4 sm:peer-placeholder-shown:top-6 peer-focus:-top-4 peer-focus:text-[#f3a323] transition-all">
                            City *
                          </label>
                          <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#f3a323] transition-all duration-500 group-focus-within/field:w-full"></div>
                          {errors.city && <span className="text-xs font-bold text-[#e11d48] !mt-1 block">{errors.city}</span>}
                        </div>

                        {/* Pin Code */}
                        <div className="relative group/field">
                          <input
                            type="text"
                            className="peer w-full !pl-0 !pr-0 !py-3 sm:!py-6 bg-transparent border-b-2 border-slate-200 focus:border-[#f3a323] outline-none transition-all font-bold text-sm sm:text-base md:text-lg text-primary placeholder-transparent"
                            placeholder="Pin No."
                            id="pinCode"
                            value={form.pinCode}
                            onChange={(e) => handleInputChange("pinCode", e.target.value)}
                          />
                          <label htmlFor="pinCode" className="absolute left-0 -top-4 text-[10px] font-black uppercase tracking-widest text-muted-foreground peer-placeholder-shown:text-sm sm:peer-placeholder-shown:text-base peer-placeholder-shown:top-4 sm:peer-placeholder-shown:top-6 peer-focus:-top-4 peer-focus:text-[#f3a323] transition-all">
                            Pin No. *
                          </label>
                          <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#f3a323] transition-all duration-500 group-focus-within/field:w-full"></div>
                          {errors.pinCode && <span className="text-xs font-bold text-[#e11d48] !mt-1 block">{errors.pinCode}</span>}
                        </div>

                        {/* District */}
                        <div className="relative group/field">
                          <input
                            type="text"
                            className="peer w-full !pl-0 !pr-0 !py-3 sm:!py-6 bg-transparent border-b-2 border-slate-200 focus:border-[#f3a323] outline-none transition-all font-bold text-sm sm:text-base md:text-lg text-primary placeholder-transparent"
                            placeholder="District"
                            id="district"
                            value={form.district}
                            onChange={(e) => handleInputChange("district", e.target.value)}
                          />
                          <label htmlFor="district" className="absolute left-0 -top-4 text-[10px] font-black uppercase tracking-widest text-muted-foreground peer-placeholder-shown:text-sm sm:peer-placeholder-shown:text-base peer-placeholder-shown:top-4 sm:peer-placeholder-shown:top-6 peer-focus:-top-4 peer-focus:text-[#f3a323] transition-all">
                            Dist. *
                          </label>
                          <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#f3a323] transition-all duration-500 group-focus-within/field:w-full"></div>
                          {errors.district && <span className="text-xs font-bold text-[#e11d48] !mt-1 block">{errors.district}</span>}
                        </div>

                        {/* State */}
                        <div className="relative group/field">
                          <input
                            type="text"
                            className="peer w-full !pl-0 !pr-0 !py-3 sm:!py-6 bg-transparent border-b-2 border-slate-200 focus:border-[#f3a323] outline-none transition-all font-bold text-sm sm:text-base md:text-lg text-primary placeholder-transparent"
                            placeholder="State"
                            id="state"
                            value={form.state}
                            onChange={(e) => handleInputChange("state", e.target.value)}
                          />
                          <label htmlFor="state" className="absolute left-0 -top-4 text-[10px] font-black uppercase tracking-widest text-muted-foreground peer-placeholder-shown:text-sm sm:peer-placeholder-shown:text-base peer-placeholder-shown:top-4 sm:peer-placeholder-shown:top-6 peer-focus:-top-4 peer-focus:text-[#f3a323] transition-all">
                            State *
                          </label>
                          <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#f3a323] transition-all duration-500 group-focus-within/field:w-full"></div>
                          {errors.state && <span className="text-xs font-bold text-[#e11d48] !mt-1 block">{errors.state}</span>}
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 !gap-8">
                        {/* Tel. No. */}
                        <div className="relative group/field">
                          <div className="absolute left-0 top-6 text-gray-400 group-focus-within/field:text-[#f3a323] transition-colors">
                            <Phone className="w-5 h-5" />
                          </div>
                          <input
                            type="text"
                            className="peer w-full !pl-10 !pr-0 !py-3 sm:!py-6 bg-transparent border-b-2 border-slate-200 focus:border-[#f3a323] outline-none transition-all font-bold text-sm sm:text-base md:text-lg text-primary placeholder-transparent"
                            placeholder="Office Telephone No."
                            id="telNo"
                            value={form.telNo}
                            onChange={(e) => handleInputChange("telNo", e.target.value)}
                          />
                          <label htmlFor="telNo" className="absolute left-10 -top-4 text-[10px] font-black uppercase tracking-widest text-muted-foreground peer-placeholder-shown:text-sm sm:peer-placeholder-shown:text-base peer-placeholder-shown:top-4 sm:peer-placeholder-shown:top-6 peer-focus:-top-4 peer-focus:text-[#f3a323] transition-all">
                            Telephone No.
                          </label>
                          <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#f3a323] transition-all duration-500 group-focus-within/field:w-full"></div>
                        </div>

                        {/* Res No. */}
                        <div className="relative group/field">
                          <div className="absolute left-0 top-6 text-gray-400 group-focus-within/field:text-[#f3a323] transition-colors">
                            <Phone className="w-5 h-5" />
                          </div>
                          <input
                            type="text"
                            className="peer w-full !pl-10 !pr-0 !py-3 sm:!py-6 bg-transparent border-b-2 border-slate-200 focus:border-[#f3a323] outline-none transition-all font-bold text-sm sm:text-base md:text-lg text-primary placeholder-transparent"
                            placeholder="Residential No."
                            id="resNo"
                            value={form.resNo}
                            onChange={(e) => handleInputChange("resNo", e.target.value)}
                          />
                          <label htmlFor="resNo" className="absolute left-10 -top-4 text-[10px] font-black uppercase tracking-widest text-muted-foreground peer-placeholder-shown:text-sm sm:peer-placeholder-shown:text-base peer-placeholder-shown:top-4 sm:peer-placeholder-shown:top-6 peer-focus:-top-4 peer-focus:text-[#f3a323] transition-all">
                            Residential No.
                          </label>
                          <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#f3a323] transition-all duration-500 group-focus-within/field:w-full"></div>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 !gap-8">
                        {/* Fax No */}
                        <div className="relative group/field">
                          <div className="absolute left-0 top-6 text-gray-400 group-focus-within/field:text-[#f3a323] transition-colors">
                            <Hash className="w-5 h-5" />
                          </div>
                          <input
                            type="text"
                            className="peer w-full !pl-10 !pr-0 !py-3 sm:!py-6 bg-transparent border-b-2 border-slate-200 focus:border-[#f3a323] outline-none transition-all font-bold text-sm sm:text-base md:text-lg text-primary placeholder-transparent"
                            placeholder="Fax No."
                            id="faxNo"
                            value={form.faxNo}
                            onChange={(e) => handleInputChange("faxNo", e.target.value)}
                          />
                          <label htmlFor="faxNo" className="absolute left-10 -top-4 text-[10px] font-black uppercase tracking-widest text-muted-foreground peer-placeholder-shown:text-sm sm:peer-placeholder-shown:text-base peer-placeholder-shown:top-4 sm:peer-placeholder-shown:top-6 peer-focus:-top-4 peer-focus:text-[#f3a323] transition-all">
                            Fax No.
                          </label>
                          <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#f3a323] transition-all duration-500 group-focus-within/field:w-full"></div>
                        </div>

                        {/* Mobile No. */}
                        <div className="relative group/field">
                          <div className="absolute left-0 top-6 text-gray-400 group-focus-within/field:text-[#f3a323] transition-colors">
                            <Phone className="w-5 h-5" />
                          </div>
                          <input
                            type="text"
                            className="peer w-full !pl-10 !pr-0 !py-3 sm:!py-6 bg-transparent border-b-2 border-slate-200 focus:border-[#f3a323] outline-none transition-all font-bold text-sm sm:text-base md:text-lg text-primary placeholder-transparent"
                            placeholder="Mobile Number"
                            id="mobileNo"
                            value={form.mobileNo}
                            onChange={(e) => handleInputChange("mobileNo", e.target.value)}
                          />
                          <label htmlFor="mobileNo" className="absolute left-10 -top-4 text-[10px] font-black uppercase tracking-widest text-muted-foreground peer-placeholder-shown:text-sm sm:peer-placeholder-shown:text-base peer-placeholder-shown:top-4 sm:peer-placeholder-shown:top-6 peer-focus:-top-4 peer-focus:text-[#f3a323] transition-all">
                            Mobile No. *
                          </label>
                          <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#f3a323] transition-all duration-500 group-focus-within/field:w-full shadow-[0_2px_10px_rgba(243,163,35,0.3)]"></div>
                          {errors.mobileNo && <span className="text-xs font-bold text-[#e11d48] !mt-1 block">{errors.mobileNo}</span>}
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 !gap-8">
                        {/* E-mail */}
                        <div className="relative group/field">
                          <div className="absolute left-0 top-6 text-gray-400 group-focus-within/field:text-[#f3a323] transition-colors">
                            <Mail className="w-5 h-5" />
                          </div>
                          <input
                            type="email"
                            className="peer w-full !pl-10 !pr-0 !py-3 sm:!py-6 bg-transparent border-b-2 border-slate-200 focus:border-[#f3a323] outline-none transition-all font-bold text-sm sm:text-base md:text-lg text-primary placeholder-transparent"
                            placeholder="Corporate Email Address"
                            id="email"
                            value={form.email}
                            onChange={(e) => handleInputChange("email", e.target.value)}
                          />
                          <label htmlFor="email" className="absolute left-10 -top-4 text-[10px] font-black uppercase tracking-widest text-muted-foreground peer-placeholder-shown:text-sm sm:peer-placeholder-shown:text-base peer-placeholder-shown:top-4 sm:peer-placeholder-shown:top-6 peer-focus:-top-4 peer-focus:text-[#f3a323] transition-all">
                            Email Address *
                          </label>
                          <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#f3a323] transition-all duration-500 group-focus-within/field:w-full shadow-[0_2px_10px_rgba(243,163,35,0.3)]"></div>
                          {errors.email && <span className="text-xs font-bold text-[#e11d48] !mt-1 block">{errors.email}</span>}
                        </div>

                        {/* Web Site */}
                        <div className="relative group/field">
                          <div className="absolute left-0 top-6 text-gray-400 group-focus-within/field:text-[#f3a323] transition-colors">
                            <Globe className="w-5 h-5" />
                          </div>
                          <input
                            type="text"
                            className="peer w-full !pl-10 !pr-0 !py-3 sm:!py-6 bg-transparent border-b-2 border-slate-200 focus:border-[#f3a323] outline-none transition-all font-bold text-sm sm:text-base md:text-lg text-primary placeholder-transparent"
                            placeholder="Website URL"
                            id="website"
                            value={form.website}
                            onChange={(e) => handleInputChange("website", e.target.value)}
                          />
                          <label htmlFor="website" className="absolute left-10 -top-4 text-[10px] font-black uppercase tracking-widest text-muted-foreground peer-placeholder-shown:text-sm sm:peer-placeholder-shown:text-base peer-placeholder-shown:top-4 sm:peer-placeholder-shown:top-6 peer-focus:-top-4 peer-focus:text-[#f3a323] transition-all">
                            Web Site
                          </label>
                          <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#f3a323] transition-all duration-500 group-focus-within/field:w-full"></div>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 !gap-8">
                        {/* GSTN */}
                        <div className="relative group/field">
                          <div className="absolute left-0 top-6 text-gray-400 group-focus-within/field:text-[#f3a323] transition-colors">
                            <Hash className="w-5 h-5" />
                          </div>
                          <input
                            type="text"
                            className="peer w-full !pl-10 !pr-0 !py-3 sm:!py-6 bg-transparent border-b-2 border-slate-200 focus:border-[#f3a323] outline-none transition-all font-bold text-sm sm:text-base md:text-lg text-primary placeholder-transparent"
                            placeholder="GSTN No."
                            id="gstn"
                            value={form.gstn}
                            onChange={(e) => handleInputChange("gstn", e.target.value)}
                          />
                          <label htmlFor="gstn" className="absolute left-10 -top-4 text-[10px] font-black uppercase tracking-widest text-muted-foreground peer-placeholder-shown:text-sm sm:peer-placeholder-shown:text-base peer-placeholder-shown:top-4 sm:peer-placeholder-shown:top-6 peer-focus:-top-4 peer-focus:text-[#f3a323] transition-all">
                            GSTN No.
                          </label>
                          <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#f3a323] transition-all duration-500 group-focus-within/field:w-full"></div>
                        </div>

                        {/* CST No. */}
                        <div className="relative group/field">
                          <div className="absolute left-0 top-6 text-gray-400 group-focus-within/field:text-[#f3a323] transition-colors">
                            <Hash className="w-5 h-5" />
                          </div>
                          <input
                            type="text"
                            className="peer w-full !pl-10 !pr-0 !py-3 sm:!py-6 bg-transparent border-b-2 border-slate-200 focus:border-[#f3a323] outline-none transition-all font-bold text-sm sm:text-base md:text-lg text-primary placeholder-transparent"
                            placeholder="CST No."
                            id="cstNo"
                            value={form.cstNo}
                            onChange={(e) => handleInputChange("cstNo", e.target.value)}
                          />
                          <label htmlFor="cstNo" className="absolute left-10 -top-4 text-[10px] font-black uppercase tracking-widest text-muted-foreground peer-placeholder-shown:text-sm sm:peer-placeholder-shown:text-base peer-placeholder-shown:top-4 sm:peer-placeholder-shown:top-6 peer-focus:-top-4 peer-focus:text-[#f3a323] transition-all">
                            CST No.
                          </label>
                          <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#f3a323] transition-all duration-500 group-focus-within/field:w-full"></div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* STEP 2: KEY PERSONNEL / PARTNERS TABLE */}
                  {step === 2 && (
                    <div className="flex flex-col !gap-8">
                      <div>
                        <span className="text-[#f3a323] font-black uppercase tracking-widest text-xs block !mb-1">Section 02</span>
                        <h3 className="text-lg sm:text-3xl font-black text-primary uppercase tracking-tighter">Partners / Directors Info</h3>
                        <p className="text-slate-400 text-sm !mt-1">Provide details of the key executives, partners or directors managing the business operations.</p>
                      </div>

                      {errors.personnel && (
                        <div className="bg-red-50 text-[#e11d48] !p-4 rounded-2xl flex items-center !gap-3 text-sm font-bold border border-red-100">
                          <AlertCircle className="w-5 h-5 flex-shrink-0" />
                          <span>{errors.personnel}</span>
                        </div>
                      )}

                      {/* Responsive Grid/Table for Personnel */}
                      <div className="border border-slate-200 rounded-[2rem] overflow-hidden bg-slate-50/50">
                        {/* Desktop Header */}
                        <div className="hidden md:grid grid-cols-12 !gap-4 !p-5 bg-slate-100 border-b border-slate-200 text-xs font-black uppercase tracking-widest text-slate-500">
                          <div className="col-span-1 text-center">Sl. No.</div>
                          <div className="col-span-6">Name of Partner / Director</div>
                          <div className="col-span-2">Age</div>
                          <div className="col-span-2">Educational Qualification</div>
                          <div className="col-span-1 text-center">Action</div>
                        </div>

                        {/* List of personnel */}
                        <div className="divide-y divide-slate-200">
                          {form.personnel.map((person, idx) => (
                            <div key={idx} className="grid grid-cols-1 md:grid-cols-12 !gap-4 !p-5 md:!py-4 items-center">
                              {/* Sl No */}
                              <div className="col-span-1 flex md:justify-center items-center !gap-2">
                                <span className="md:hidden text-xs uppercase tracking-widest text-slate-400 font-bold">Sl No:</span>
                                <span className="font-mono bg-white border border-slate-200 !px-3 !py-1.5 rounded-lg text-slate-700 font-bold text-xs">
                                  {idx + 1}
                                </span>
                              </div>

                              {/* Name */}
                              <div className="col-span-1 md:col-span-6">
                                <span className="md:hidden block text-xs uppercase tracking-widest text-[#f3a323] font-black !mb-1.5">Name</span>
                                <div className="relative">
                                  <input
                                    type="text"
                                    className="w-full bg-white border border-slate-200 rounded-xl !px-4 !py-3 text-sm font-bold text-slate-800 outline-none focus:border-[#f3a323] transition-colors"
                                    placeholder="Enter full name"
                                    value={person.name}
                                    onChange={(e) => handlePersonnelChange(idx, "name", e.target.value)}
                                  />
                                </div>
                              </div>

                              {/* Age */}
                              <div className="col-span-1 md:col-span-2">
                                <span className="md:hidden block text-xs uppercase tracking-widest text-slate-400 font-bold !mb-1.5">Age</span>
                                <input
                                  type="number"
                                  className="w-full bg-white border border-slate-200 rounded-xl !px-4 !py-3 text-sm font-bold text-slate-800 outline-none focus:border-[#f3a323] transition-colors"
                                  placeholder="Age"
                                  value={person.age}
                                  onChange={(e) => handlePersonnelChange(idx, "age", e.target.value)}
                                />
                              </div>

                              {/* Qualification */}
                              <div className="col-span-1 md:col-span-2">
                                <span className="md:hidden block text-xs uppercase tracking-widest text-slate-400 font-bold !mb-1.5">Qualification</span>
                                <input
                                  type="text"
                                  className="w-full bg-white border border-slate-200 rounded-xl !px-4 !py-3 text-sm font-bold text-slate-800 outline-none focus:border-[#f3a323] transition-colors"
                                  placeholder="e.g. MBA, B.Tech"
                                  value={person.qualification}
                                  onChange={(e) => handlePersonnelChange(idx, "qualification", e.target.value)}
                                />
                              </div>

                              {/* Action */}
                              <div className="col-span-1 flex md:justify-center items-center justify-end">
                                <button
                                  type="button"
                                  onClick={() => removePersonnelRow(idx)}
                                  disabled={form.personnel.length <= 1}
                                  className="text-slate-400 hover:text-red-500 disabled:opacity-30 disabled:hover:text-slate-400 !p-2.5 rounded-xl border border-dashed border-slate-200 hover:border-red-200 hover:bg-red-50 transition-all"
                                  title="Delete Row"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </button>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Add Row Button */}
                      <button
                        type="button"
                        onClick={addPersonnelRow}
                        className="flex items-center !gap-2 !px-6 !py-3.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-black text-xs uppercase tracking-widest rounded-2xl transition-colors shadow-sm"
                      >
                        <Plus className="w-4 h-4" />
                        <span>Add Partner / Director</span>
                      </button>
                    </div>
                  )}

                  {/* STEP 3: FINANCIALS, TERMS & BENEFITS */}
                  {step === 3 && (
                    <div className="flex flex-col !gap-8">
                      <div>
                        <span className="text-[#f3a323] font-black uppercase tracking-widest text-xs block !mb-1">Section 03</span>
                        <h3 className="text-lg sm:text-3xl font-black text-primary uppercase tracking-tighter">Distributorship Terms & Payment</h3>
                        <p className="text-slate-400 text-sm !mt-1">Review target commitments, distributor benefits, and make the registration fee transaction.</p>
                      </div>

                      {/* Dealership Requirements */}
                      <div className="grid grid-cols-1 md:grid-cols-2 !gap-8">
                        {/* Refundable fee card */}
                        <div className="bg-slate-50 border border-slate-200/60 rounded-[2rem] !p-8 flex flex-col !gap-4 relative overflow-hidden">
                          <div className="absolute right-0 top-0 w-24 h-24 bg-[#f3a323]/10 rounded-bl-[4rem] flex items-center justify-center text-[#f3a323]">
                            <Landmark className="w-7 h-7 -translate-x-1.5 translate-y-1.5" />
                          </div>
                          <div>
                            <span className="text-xs uppercase tracking-widest font-black text-slate-400">Security Deposit</span>
                            <h4 className="text-3xl font-black text-[#0a2540] !mt-1">₹ 25,000</h4>
                            <p className="text-xs font-bold text-[#f3a323] uppercase tracking-wider !mt-1">100% Refundable Deposit</p>
                          </div>
                          <p className="text-slate-500 text-xs leading-relaxed">
                            One-time distributor registration fee of Rs. 25,000/= is payable via NEFT transfer. The deposit is fully refundable at the termination of the distribution agreement.
                          </p>
                        </div>

                        {/* First order commitment */}
                        <div className="bg-slate-50 border border-slate-200/60 rounded-[2rem] !p-8 flex flex-col !gap-4 relative overflow-hidden">
                          <div className="absolute right-0 top-0 w-24 h-24 bg-[#e11d48]/10 rounded-bl-[4rem] flex items-center justify-center text-[#e11d48]">
                            <Award className="w-7 h-7 -translate-x-1.5 translate-y-1.5" />
                          </div>
                          <div>
                            <span className="text-xs uppercase tracking-widest font-black text-slate-400">Initial Business Commit</span>
                            <h4 className="text-3xl font-black text-[#0a2540] !mt-1">₹ 25,00,000</h4>
                            <p className="text-xs font-bold text-[#e11d48] uppercase tracking-wider !mt-1">First Order Threshold (25 Lakhs)</p>
                          </div>
                          <p className="text-slate-500 text-xs leading-relaxed">
                            To qualify as an active regional distributor, your initial purchase order of GCS Solar Kits and GCS panels must meet the minimum of Rs. 25 Lakhs.
                          </p>
                        </div>
                      </div>

                      {/* Bank Details Card with Copy buttons */}
                      <div className="bg-[#0a2540] text-white rounded-[2rem] !p-8 relative overflow-hidden shadow-xl border border-blue-950">
                        <div className="absolute -right-16 -bottom-16 w-60 h-60 bg-blue-500/10 rounded-full blur-3xl"></div>
                        <h4 className="text-lg font-black uppercase tracking-widest text-[#f3a323] !mb-6 flex items-center !gap-2">
                          <Landmark className="w-5 h-5 text-[#f3a323]" />
                          <span>NEFT Bank Transfer Details</span>
                        </h4>

                        <div className="grid grid-cols-1 md:grid-cols-3 !gap-6">
                          <div className="flex flex-col !gap-1.5">
                            <span className="text-[10px] uppercase tracking-wider text-slate-400 font-bold">Account Name</span>
                            <p className="text-base font-black tracking-tight text-white uppercase">GCS GROUP SOLAR</p>
                          </div>

                          <div className="flex flex-col !gap-1.5">
                            <span className="text-[10px] uppercase tracking-wider text-slate-400 font-bold">Bank Name</span>
                            <p className="text-base font-black tracking-tight text-white uppercase">HDFC Bank</p>
                          </div>

                          <div className="flex flex-col !gap-1.5">
                            <span className="text-[10px] uppercase tracking-wider text-slate-400 font-bold">Branch</span>
                            <p className="text-base font-black tracking-tight text-white uppercase">JMD Sector 48, Gurgaon</p>
                          </div>

                          <div className="flex flex-col !gap-1.5 col-span-1 md:col-span-2">
                            <span className="text-[10px] uppercase tracking-wider text-slate-400 font-bold">Account Number</span>
                            <div className="flex items-center !gap-3">
                              <span className="text-lg font-mono font-black text-white tracking-wide">50200087242872</span>
                              <button
                                type="button"
                                onClick={() => copyToClipboard("50200087242872", "acc")}
                                className="text-slate-400 hover:text-white bg-white/5 hover:bg-white/10 !p-2 rounded-lg transition-colors border border-white/10"
                                title="Copy Account Number"
                              >
                                {copiedAccount ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                              </button>
                            </div>
                          </div>

                          <div className="flex flex-col !gap-1.5">
                            <span className="text-[10px] uppercase tracking-wider text-slate-400 font-bold">IFS Code</span>
                            <div className="flex items-center !gap-3">
                              <span className="text-lg font-mono font-black text-white tracking-wide">HDFC0003648</span>
                              <button
                                type="button"
                                onClick={() => copyToClipboard("HDFC0003648", "ifsc")}
                                className="text-slate-400 hover:text-white bg-white/5 hover:bg-white/10 !p-2 rounded-lg transition-colors border border-white/10"
                                title="Copy IFS Code"
                              >
                                {copiedIfsc ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Benefits Section */}
                      <div className="flex flex-col !gap-4">
                        <h4 className="text-lg font-black text-primary uppercase tracking-tight">Authorized Distributor Benefits</h4>
                        <div className="grid grid-cols-1 md:grid-cols-3 !gap-6">
                          {benefits.map((b) => (
                            <div key={b.code} className="bg-white border border-slate-200/50 rounded-2xl !p-5 hover:shadow-md transition-shadow">
                              <div className="flex items-center !gap-3 !mb-2.5">
                                <span className="w-6 h-6 rounded-full bg-[#f3a323]/10 text-[#f3a323] flex items-center justify-center text-xs font-black uppercase">
                                  {b.code}
                                </span>
                                <h5 className="font-black text-slate-800 text-sm uppercase tracking-wider">{b.title}</h5>
                              </div>
                              <p className="text-xs text-slate-500 leading-relaxed font-medium">{b.desc}</p>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Declaration Checkbox */}
                      <div className="!pt-6 border-t border-slate-200 flex flex-col !gap-4">
                        <div className="bg-red-50/50 border border-[#f3a323]/10 rounded-2xl !p-6 flex !gap-4">
                          <button
                            type="button"
                            onClick={() => handleInputChange("agreedToTerms", !form.agreedToTerms)}
                            className="flex-shrink-0 text-[#f3a323] !mt-1 outline-none animate-pulse"
                          >
                            {form.agreedToTerms ? (
                              <CheckSquare className="w-6 h-6 fill-[#f3a323]/10" />
                            ) : (
                              <Square className="w-6 h-6 text-slate-400" />
                            )}
                          </button>
                          <div className="text-xs leading-relaxed text-slate-600 font-medium">
                            <span className="font-black text-[#0a2540] uppercase tracking-wide block !mb-1">Confirmation Declaration</span>
                            I/we hereby confirm that the information given above is true & correct to the best of my/our knowledge and GCS Group Solar will not be responsible for any loss (Actual or notional) and expenditure (capital or otherwise) that occurred by me/us in connection with this application, whether it is accepted or not.
                          </div>
                        </div>
                        {errors.agreedToTerms && <span className="text-xs font-bold text-[#e11d48] block">{errors.agreedToTerms}</span>}
                      </div>
                    </div>
                  )}

                  {/* STEP 4: SIGNATURES & OWNER DETAILS */}
                  {step === 4 && (
                    <div className="flex flex-col !gap-8">
                      <div>
                        <span className="text-[#f3a323] font-black uppercase tracking-widest text-xs block !mb-1">Section 04</span>
                        <h3 className="text-lg sm:text-3xl font-black text-primary uppercase tracking-tighter">Sign & Complete</h3>
                        <p className="text-slate-400 text-sm !mt-1">Please enter signatory name, designation, and execute your signature to submit the application.</p>
                      </div>

                      {/* Owner details */}
                      <div className="grid grid-cols-1 md:grid-cols-2 !gap-8">
                        {/* Owner Name */}
                        <div className="relative group/field">
                          <div className="absolute left-0 top-6 text-gray-400 group-focus-within/field:text-[#f3a323] transition-colors">
                            <User className="w-5 h-5" />
                          </div>
                          <input
                            type="text"
                            className="peer w-full !pl-10 !pr-0 !py-3 sm:!py-6 bg-transparent border-b-2 border-slate-200 focus:border-[#f3a323] outline-none transition-all font-bold text-sm sm:text-base md:text-lg text-primary placeholder-transparent"
                            placeholder="Signatory Owner Name"
                            id="ownerName"
                            value={form.ownerName}
                            onChange={(e) => handleInputChange("ownerName", e.target.value)}
                          />
                          <label htmlFor="ownerName" className="absolute left-10 -top-4 text-[10px] font-black uppercase tracking-widest text-muted-foreground peer-placeholder-shown:text-sm sm:peer-placeholder-shown:text-base peer-placeholder-shown:top-4 sm:peer-placeholder-shown:top-6 peer-focus:-top-4 peer-focus:text-[#f3a323] transition-all">
                            Owner / Signatory Name *
                          </label>
                          <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#f3a323] transition-all duration-500 group-focus-within/field:w-full shadow-[0_2px_10px_rgba(243,163,35,0.3)]"></div>
                          {errors.ownerName && <span className="text-xs font-bold text-[#e11d48] !mt-1 block">{errors.ownerName}</span>}
                        </div>

                        {/* Designation */}
                        <div className="relative group/field">
                          <div className="absolute left-0 top-6 text-gray-400 group-focus-within/field:text-[#f3a323] transition-colors">
                            <Award className="w-5 h-5" />
                          </div>
                          <input
                            type="text"
                            className="peer w-full !pl-10 !pr-0 !py-3 sm:!py-6 bg-transparent border-b-2 border-slate-200 focus:border-[#f3a323] outline-none transition-all font-bold text-sm sm:text-base md:text-lg text-primary placeholder-transparent"
                            placeholder="Designation"
                            id="designation"
                            value={form.designation}
                            onChange={(e) => handleInputChange("designation", e.target.value)}
                          />
                          <label htmlFor="designation" className="absolute left-10 -top-4 text-[10px] font-black uppercase tracking-widest text-muted-foreground peer-placeholder-shown:text-sm sm:peer-placeholder-shown:text-base peer-placeholder-shown:top-4 sm:peer-placeholder-shown:top-6 peer-focus:-top-4 peer-focus:text-[#f3a323] transition-all">
                            Designation / Role *
                          </label>
                          <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#f3a323] transition-all duration-500 group-focus-within/field:w-full shadow-[0_2px_10px_rgba(243,163,35,0.3)]"></div>
                          {errors.designation && <span className="text-xs font-bold text-[#e11d48] mt-1 block">{errors.designation}</span>}
                        </div>
                      </div>

                      {/* Signature Selection Tabs */}
                      <div className="flex flex-col !gap-4">
                        <label className="text-[10px] font-black uppercase tracking-widest text-[#f3a323] block">Signature Type *</label>
                        <div className="flex flex-wrap !gap-2 !p-1.5 bg-slate-100 rounded-2xl w-full">
                          {[
                            { id: "draw", label: "Draw Signature", icon: Edit2 },
                            { id: "type", label: "Type Signature", icon: FileText },
                            { id: "upload", label: "Upload Image", icon: Download }
                          ].map((t) => (
                            <button
                              key={t.id}
                              type="button"
                              onClick={() => handleInputChange("signatureType", t.id)}
                              className={`flex-1 sm:flex-none flex items-center justify-center !gap-2 !px-3 sm:!px-5 !py-3 rounded-xl text-[10px] sm:text-xs font-black uppercase tracking-widest transition-all ${form.signatureType === t.id
                                ? "bg-white text-[#0a2540] shadow-sm"
                                : "text-slate-500 hover:text-slate-800"
                                }`}
                            >
                              <t.icon className="w-3.5 h-3.5" />
                              <span>{t.label}</span>
                            </button>
                          ))}
                        </div>

                        {/* Signature content frames */}
                        <div className="border-2 border-slate-200 border-dashed rounded-3xl !p-6 bg-slate-50 relative min-h-[160px] flex items-center justify-center">

                          {/* DRAW canvas */}
                          {form.signatureType === "draw" && (
                            <div className="w-full max-w-lg flex flex-col !gap-4">
                              <canvas
                                ref={canvasRef}
                                onMouseDown={startDrawing}
                                onMouseMove={draw}
                                onMouseUp={stopDrawing}
                                onMouseLeave={stopDrawing}
                                onTouchStart={startDrawing}
                                onTouchMove={draw}
                                onTouchEnd={stopDrawing}
                                className="w-full h-36 bg-white border border-slate-200 rounded-2xl cursor-crosshair shadow-inner"
                              />
                              <div className="flex justify-between items-center text-xs">
                                <span className="text-slate-400 font-bold">Draw your signature in the frame above.</span>
                                <button
                                  type="button"
                                  onClick={clearCanvas}
                                  className="text-red-500 hover:text-red-600 font-black uppercase tracking-widest"
                                >
                                  Clear Canvas
                                </button>
                              </div>
                              {errors.signatureImage && <span className="text-xs font-bold text-[#e11d48]">{errors.signatureImage}</span>}
                            </div>
                          )}

                          {/* TYPE cursive generator */}
                          {form.signatureType === "type" && (
                            <div className="w-full max-w-lg flex flex-col !gap-4">
                              <input
                                type="text"
                                className="w-full bg-white border border-slate-200 rounded-2xl !px-5 !py-4 text-base font-bold text-slate-800 outline-none focus:border-[#f3a323]"
                                placeholder="Type your full name"
                                value={form.signatureText}
                                onChange={(e) => handleTextSignatureChange(e.target.value)}
                              />
                              {form.signatureText && (
                                <div className="!p-6 bg-white border border-slate-200 rounded-2xl text-center shadow-inner">
                                  <p className="text-4xl text-[#0a2540] font-medium" style={{ fontFamily: "'Brush Script MT', 'Dancing Script', cursive, sans-serif" }}>
                                    {form.signatureText}
                                  </p>
                                </div>
                              )}
                              <span className="text-xs text-slate-400 font-bold block">Generates a cursive script digital signature matching your name.</span>
                              {errors.signatureText && <span className="text-xs font-bold text-[#e11d48]">{errors.signatureText}</span>}
                            </div>
                          )}

                          {/* UPLOAD signature */}
                          {form.signatureType === "upload" && (
                            <div className="text-center flex flex-col !gap-4">
                              {form.signatureImage ? (
                                <div className="flex flex-col !gap-3">
                                  <img
                                    src={form.signatureImage}
                                    alt="Uploaded Signature"
                                    className="max-h-24 mx-auto border border-slate-200 rounded-xl bg-white !p-2"
                                  />
                                  <button
                                    type="button"
                                    onClick={() => setForm(prev => ({ ...prev, signatureImage: "" }))}
                                    className="text-red-500 hover:text-red-600 text-xs font-black uppercase tracking-widest"
                                  >
                                    Remove Image
                                  </button>
                                </div>
                              ) : (
                                <label className="cursor-pointer block !p-8 text-slate-400 hover:text-slate-600 transition-colors">
                                  <Download className="w-8 h-8 mx-auto !mb-2 text-slate-300" />
                                  <span className="text-xs font-black uppercase tracking-widest block">Choose Signature Image File</span>
                                  <span className="text-[10px] text-slate-400 block !mt-1">PNG, JPG formats supported</span>
                                  <input
                                    type="file"
                                    accept="image/*"
                                    className="hidden"
                                    onChange={handleFileUpload}
                                  />
                                </label>
                              )}
                              {errors.signatureImage && <span className="text-xs font-bold text-[#e11d48] block">{errors.signatureImage}</span>}
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Legal notice alert */}
                      <div className="bg-[#f3a323]/5 border border-[#f3a323]/10 rounded-2xl !p-6 flex !gap-4 text-slate-700 text-xs leading-relaxed font-semibold">
                        <ShieldAlert className="w-5 h-5 flex-shrink-0 text-[#f3a323]" />
                        <div>
                          <span className="font-black text-[#0a2540] uppercase tracking-wide block !mb-1">Legal Agreement Requirement</span>
                          After signing up and submitting this distributor form, you will be required to sign a formal legal agreement with us for the distributorship before products can be dispatched.
                        </div>
                      </div>
                    </div>
                  )}

                  {/* NAVIGATION BUTTONS */}
                  <div className="web-only flex justify-between items-center !pt-8 border-t border-slate-100 !mt-8">
                    {step > 1 ? (
                      <button
                        type="button"
                        onClick={prevStep}
                        className="flex items-center !gap-2 text-slate-600 hover:text-[#0a2540] font-black text-xs uppercase tracking-widest transition-colors !py-4 !px-6 rounded-2xl hover:bg-slate-100"
                      >
                        <ArrowLeft className="w-4 h-4" />
                        <span>Back</span>
                      </button>
                    ) : (
                      <Link
                        href="/dealers"
                        className="flex items-center !gap-2 text-slate-500 hover:text-[#0a2540] font-black text-xs uppercase tracking-widest transition-colors !py-4 !px-6 rounded-2xl hover:bg-slate-100"
                      >
                        <ArrowLeft className="w-4 h-4" />
                        <span>Cancel</span>
                      </Link>
                    )}

                    {step < 4 ? (
                      <button
                        type="button"
                        onClick={nextStep}
                        className="bg-[#f3a323] text-white hover:bg-[#d98b1b] font-black text-xs uppercase tracking-widest !px-8 !py-4.5 rounded-2xl transition-all shadow-[0_10px_20px_rgba(243,163,35,0.2)] hover:shadow-[0_15px_30px_rgba(243,163,35,0.4)] flex items-center justify-center !gap-2"
                      >
                        <span>Continue</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    ) : (
                      <button
                        type="submit"
                        className="bg-emerald-600 hover:bg-emerald-700 text-white !px-10 !py-4.5 rounded-2xl font-black uppercase tracking-[0.2em] text-xs transition-all shadow-[0_15px_30px_rgba(16,185,129,0.2)] hover:shadow-[0_20px_40px_rgba(16,185,129,0.4)] flex items-center justify-center !gap-2"
                      >
                        <Sparkles className="w-4 h-4" />
                        <span>Submit Application</span>
                      </button>
                    )}
                  </div>

                </motion.div>
              </AnimatePresence>
            </form>
          </div>
        ) : (
          /* SUCCESS STATE */
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-[2.5rem] !p-8 md:!p-16 text-center border border-slate-100 shadow-[0_30px_80px_rgba(10,37,64,0.08)] max-w-2xl mx-auto flex flex-col !gap-8"
          >
            <div className="w-20 h-20 bg-emerald-50 text-emerald-500 rounded-full flex items-center justify-center mx-auto border border-emerald-100">
              <Check className="w-10 h-10" />
            </div>

            <div className="flex flex-col !gap-3">
              <span className="text-emerald-600 font-black uppercase tracking-widest text-xs">Application Submitted</span>
              <h2 className="text-4xl font-black text-primary uppercase tracking-tighter">Welcome Aboard!</h2>
              <p className="text-slate-500 font-medium max-w-md mx-auto text-sm leading-relaxed">
                Your distributor application has been received and registered under Reference Number <span className="font-mono font-bold text-slate-700">{form.refNo}</span>.
              </p>
            </div>

            <div className="bg-slate-50 border border-slate-200/50 rounded-2xl !p-6 text-left flex flex-col !gap-4">
              <h4 className="text-xs font-black uppercase tracking-widest text-[#0a2540] border-b border-slate-200 !pb-2">Next Steps Checklist</h4>
              <ul className="flex flex-col !gap-3.5 text-xs text-slate-600 font-medium">
                <li className="flex !gap-3">
                  <div className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center text-[10px]">✓</div>
                  <div>
                    <span className="font-black text-slate-700">Digital Submission Complete</span>
                    <p className="text-slate-400 text-[10px] !mt-0.5">Firm details and signatures uploaded successfully.</p>
                  </div>
                </li>
                <li className="flex !gap-3">
                  <div className="w-5 h-5 rounded-full bg-[#f3a323]/10 text-[#f3a323] flex items-center justify-center text-[10px]">2</div>
                  <div>
                    <span className="font-black text-slate-700">NEFT Payment Review (1-2 Days)</span>
                    <p className="text-slate-400 text-[10px] !mt-0.5">We will match the ₹ 25,000 security deposit with HDFC bank logs.</p>
                  </div>
                </li>
                <li className="flex !gap-3">
                  <div className="w-5 h-5 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-[10px]">3</div>
                  <div>
                    <span className="font-black text-slate-700">Legal Agreement Execution</span>
                    <p className="text-slate-400 text-[10px] !mt-0.5">Our representative Deepak Jha will contact you to sign the hardcopy contract.</p>
                  </div>
                </li>
              </ul>
            </div>

            <div className="flex flex-col sm:flex-row !gap-4 justify-center !pt-4">
              <button
                onClick={handlePrint}
                className="btn-secondary !px-8 !py-4 !rounded-2xl text-xs flex items-center justify-center !gap-2"
              >
                <Printer className="w-4 h-4" />
                <span>Print Application Receipt</span>
              </button>
              <Link
                href="/dealers"
                className="btn-primary !px-8 !py-4 !rounded-2xl text-xs flex items-center justify-center !gap-2"
              >
                <span>Back to Dealers</span>
              </Link>
            </div>
          </motion.div>
        )}
      </section>

      {/* PRINT-ONLY LAYOUT (Fully optimized for Paper rendering) */}
      <div className="print-container hidden font-sans">
        <div className="print-card border border-black p-8 bg-white text-black space-y-6">
          {/* Header */}
          <div className="flex justify-between items-start border-b-2 border-black pb-4">
            <div>
              <h2 className="text-xl font-bold tracking-tight">GCS GROUP SOLAR</h2>
              <p className="text-xs font-semibold text-red-600 uppercase">EPC Solar</p>
              <p className="text-[10px] mt-1 max-w-sm">
                Unit-111-A, Vipul Business Park, Sector -48, Sohna Road, Gurgaon-122018<br />
                Email: info@gcsgroupsolar.com | Website: www.gcsgroupsolar.com<br />
                Mobile: 8800012625
              </p>
            </div>
            <div className="text-right text-xs">
              <div className="font-bold">DISTRIBUTOR APPLICATION FORM</div>
              <div className="text-[10px] mt-1 text-slate-600">GCS SOLAR KIT ( 3KW & 5KW ) & GCS PANEL</div>
              <div className="mt-2 text-left">
                <span className="font-bold">Ref. No: </span>
                <span className="font-mono">{form.refNo}</span>
              </div>
              <div>
                <span className="font-bold">Date: </span>
                <span>{form.date}</span>
              </div>
            </div>
          </div>

          {/* Section 1: Details of Firm */}
          <div>
            <h3 className="text-sm font-bold border-b border-black pb-1 mb-3 uppercase tracking-wider text-center bg-gray-100">DETAILS OF FIRM</h3>
            <div className="grid grid-cols-2 gap-x-6 gap-y-3 text-[11px]">
              <div><span className="font-bold">NAME: </span>{form.firmName || "______________________________________"}</div>
              <div><span className="font-bold">FIRM TYPE: </span>{form.firmType || "[ ] Private Ltd.  [ ] Partnership  [ ] Proprietary"}</div>
              <div className="col-span-2"><span className="font-bold">ADDRESS: </span>{form.address || "__________________________________________________________________"}</div>
              <div><span className="font-bold">CITY: </span>{form.city || "______________"} <span className="font-bold">Pin No: </span>{form.pinCode || "______________"}</div>
              <div><span className="font-bold">DISTRICT: </span>{form.district || "_______________"} <span className="font-bold">STATE: </span>{form.state || "_______________"}</div>
              <div><span className="font-bold">TEL NO: </span>{form.telNo || "____________"} <span className="font-bold">RESIDENCE: </span>{form.resNo || "____________"}</div>
              <div><span className="font-bold">FAX NO: </span>{form.faxNo || "____________"} <span className="font-bold">MOBILE: </span>{form.mobileNo || "____________"}</div>
              <div><span className="font-bold">EMAIL: </span>{form.email || "_______________________"} <span className="font-bold">WEBSITE: </span>{form.website || "_______________________"}</div>
              <div><span className="font-bold">GSTN NO: </span>{form.gstn || "_______________________"} <span className="font-bold">CST NO: </span>{form.cstNo || "_______________________"}</div>
            </div>
          </div>

          {/* Section 2: Key Personnel Table */}
          <div className="page-break pt-6">
            <h3 className="text-sm font-bold border-b border-black pb-1 mb-3 uppercase tracking-wider text-center bg-gray-100">PARTNERS / DIRECTORS DETAILS</h3>
            <table className="print-table text-[10px]">
              <thead>
                <tr className="bg-gray-100">
                  <th className="w-12 text-center">Sl. No.</th>
                  <th>Name</th>
                  <th className="w-16">Age</th>
                  <th>Educational Qualification</th>
                </tr>
              </thead>
              <tbody>
                {form.personnel.map((person, idx) => (
                  <tr key={idx}>
                    <td className="text-center font-mono">{idx + 1}</td>
                    <td>{person.name || ""}</td>
                    <td>{person.age || ""}</td>
                    <td>{person.qualification || ""}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Section 3: Terms and Payment */}
          <div className="space-y-2 text-[10px]">
            <p className="font-bold">If you are interested in Distributor, then:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Distributor Amount (100% Refundable) One time: <span className="font-bold">Rs. 25,000/= (Through NEFT)</span></li>
              <li>Bank Account Details: <span className="font-bold">GCS GROUP SOLAR, HDFC Bank, A/c: 50200087242872, IFSC: HDFC0003648, Branch: JMD Sector 48, Gurgaon</span></li>
              <li>First Order should be <span className="font-bold">Rs. 25 Lakhs</span></li>
            </ul>
            <div className="border border-black p-3 bg-gray-50/50 mt-3">
              <p className="font-semibold text-center italic text-[10px]">
                "I/we hereby confirm that the information given above is true & correct to the best of my/knowledge and GCS Group Solar will not be responsible for any loss (Actual or notional) and expenditure (capital or otherwise) that occurred by me/us in connection with this application, whether it is accepted or not."
              </p>
            </div>
          </div>

          {/* Signatures */}
          <div className="pt-6 border-t border-black grid grid-cols-2 gap-x-12 gap-y-4 text-[11px]">
            <div><span className="font-bold">Owner Name: </span>{form.ownerName || "________________________"}</div>
            <div><span className="font-bold">Designation: </span>{form.designation || "________________________"}</div>
            <div><span className="font-bold">Date: </span>{form.date || "________________________"}</div>

            {/* Signature rendering block */}
            <div className="flex flex-col justify-end">
              <span className="font-bold">Signature:</span>
              <div className="h-14 border-b border-black mt-1 flex items-center justify-center">
                {form.signatureType === "draw" && form.signatureImage && (
                  <img src={form.signatureImage} alt="Signature" className="max-h-12 object-contain" />
                )}
                {form.signatureType === "type" && form.signatureText && (
                  <span className="text-2xl" style={{ fontFamily: "'Brush Script MT', 'Dancing Script', cursive, sans-serif" }}>
                    {form.signatureText}
                  </span>
                )}
                {form.signatureType === "upload" && form.signatureImage && (
                  <img src={form.signatureImage} alt="Signature" className="max-h-12 object-contain" />
                )}
                {!form.signatureImage && !form.signatureText && (
                  <span className="text-slate-400 text-xs italic">Not Signed Digitally</span>
                )}
              </div>
            </div>
          </div>

          {/* Legal agreement disclaimer */}
          <div className="text-center font-bold text-red-600 italic text-[10px] mt-4">
            After signing up as a Distributor, you will be required to sign a legal agreement with us for the distributorship.
          </div>

          {/* Distributor Benefits */}
          <div>
            <h4 className="font-bold text-[11px] uppercase tracking-wider mb-2 bg-gray-100 p-1 text-center">Distributor Benefits:</h4>
            <div className="grid grid-cols-2 gap-2 text-[10px]">
              <div>a. Best price</div>
              <div>b. Better Margin</div>
              <div>c. Monthly vendors lead (30-40)</div>
              <div>d. Always Availability of Product</div>
              <div>e. Yearly International Trip</div>
              <div>f. Damage Replacement: Within 15 days for replacement (with proof & verification)</div>
            </div>
          </div>

          {/* Contact info footer */}
          <div className="text-center border-t border-black pt-4 text-[10px] space-y-1">
            <p className="font-bold uppercase">MARKETING & SALES DEPT.</p>
            <p>Channel Sales: Mr. Deepak Jha | Mob. 8800012625 (Gurgaon)</p>
            <p className="text-xs font-bold italic mt-2">Achieve your dream with GCS Group Solar</p>
            <p className="text-blue-600 underline">www.gcsgroupsolar.com</p>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
