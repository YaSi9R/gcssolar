import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import MultiForm from "../components/MultiForm";
import Link from "next/link";

export default function DealersPage() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      <section className="min-h-[70vh] flex flex-col items-center justify-center relative overflow-hidden bg-[#0a2540] !pt-40 sm:!pt-48 md:!pt-56 !pb-20 md:!pb-32">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <img 
            src="/solar_part_1.png" 
            alt="Solar Background" 
            className="w-full h-full object-cover opacity-40 scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0a2540] via-[#0a2540]/80 to-[#0a2540]"></div>
        </div>

        {/* Animated Background Decoration */}
        <div className="absolute inset-0 opacity-30 pointer-events-none">
          <div className="absolute top-1/4 right-1/4 w-[500px] h-[500px] bg-[#e11d48] rounded-full blur-[180px] animate-pulse"></div>
          <div className="absolute bottom-1/4 left-1/4 w-[600px] h-[600px] bg-blue-600 rounded-full blur-[200px]"></div>
        </div>

        <div className="relative z-10 w-full max-w-5xl !px-6 text-center">
          <h1 className="text-4xl sm:text-6xl md:text-8xl font-black uppercase tracking-tighter !mb-6 md:!mb-10 drop-shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
            Dealers & <span className="text-[#e11d48]">Distributors</span>
          </h1>
          <p className="text-xl md:text-2xl text-white/80 font-medium leading-relaxed drop-shadow-lg !mx-auto ">
            Join our growing network of solar professionals and lead the green energy revolution across India.
          </p>
        </div>
      </section>

      <section className="section-spacing bg-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-12 !gap-10 lg:!gap-16 items-start">
            <div className="lg:col-span-5 !space-y-8">
              <h2 className="text-3xl sm:text-5xl font-black text-primary uppercase tracking-tighter">Become a <span className="text-[#e11d48]">Partner</span></h2>
              <p className="text-xl text-muted-foreground leading-relaxed font-medium">
                We are looking for dedicated partners across India to represent GCS Group Solar. Benefit from our technical expertise, marketing support, and high-performance products.
              </p>
              <div className="!space-y-4">
                {["Pan India Presence", "Technical Training", "Marketing Assets", "Dedicated Support"].map((item, i) => (
                  <div key={i} className="flex items-center !gap-4 text-primary font-bold">
                    <div className="w-6 h-6 rounded-full bg-[#e11d48]/10 text-[#e11d48] flex items-center justify-center text-xs">✓</div>
                    {item}
                  </div>
                ))}
              </div>

              <div className="!space-y-6 !mt-12">
                {/* Dealer CTA */}
                <div className="bg-slate-50 border border-slate-200/60 rounded-[2rem] !p-6 md:!p-8 relative overflow-hidden group shadow-sm">
                  <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-[#e11d48]/5 rounded-full blur-2xl group-hover:bg-[#e11d48]/10 transition-colors"></div>
                  <h3 className="text-2xl font-black text-primary uppercase tracking-tight !mb-2">Official Dealer Application</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed !mb-6 font-medium">
                    Ready to register as an authorized dealer? Access the official dealership application form. Fill, sign, and download your copy instantly.
                  </p>
                  <Link href="/dealers/apply" className="btn-primary w-full text-center !py-4 text-xs !rounded-2xl flex items-center justify-center !gap-2">
                    <span>Start Dealer Form</span>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </Link>
                </div>

                {/* Distributor CTA */}
                <div className="bg-slate-50 border border-slate-200/60 rounded-[2rem] !p-6 md:!p-8 relative overflow-hidden group shadow-sm">
                  <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-[#f3a323]/5 rounded-full blur-2xl group-hover:bg-[#f3a323]/10 transition-colors"></div>
                  <h3 className="text-2xl font-black text-primary uppercase tracking-tight !mb-2">Official Distributor Application</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed !mb-6 font-medium">
                    Looking to establish a regional distributorship? Complete the official distributor application, sign, and print your copy.
                  </p>
                  <Link href="/distributors/apply" className="bg-[#f3a323] text-white !px-8 !py-4 w-full text-center text-xs !rounded-2xl font-black uppercase tracking-[0.1em] transition-all duration-300 shadow-[0_10px_20px_rgba(243,163,35,0.2)] hover:shadow-[0_15px_30px_rgba(243,163,35,0.4)] hover:-translate-y-1 active:scale-95 flex items-center justify-center !gap-2">
                    <span>Start Distributor Form</span>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </Link>
                </div>
              </div>
            </div>
            <div className="lg:col-span-7">
              <MultiForm />
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}
