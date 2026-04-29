import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import MultiForm from "../components/MultiForm";

export default function DealersPage() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      <section className="min-h-[70vh] flex flex-col items-center justify-center relative overflow-hidden bg-[#0a2540] !pt-32 pb-32">
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

        <div className="relative z-10 w-full max-w-5xl px-6 text-center">
          <h1 className="text-6xl md:text-8xl font-black uppercase tracking-tighter mb-10 drop-shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
            Dealers & <span className="text-[#e11d48]">Distributors</span>
          </h1>
          <p className="text-xl md:text-2xl text-white/80 font-medium leading-relaxed drop-shadow-lg mx-auto ">
            Join our growing network of solar professionals and lead the green energy revolution across India.
          </p>
        </div>
      </section>

      <section className="section-spacing bg-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
            <div className="lg:col-span-5 space-y-8">
              <h2 className="text-5xl font-black text-primary uppercase tracking-tighter">Become a <span className="text-[#e11d48]">Partner</span></h2>
              <p className="text-xl text-muted-foreground leading-relaxed font-medium">
                We are looking for dedicated partners across India to represent GCS Group Solar. Benefit from our technical expertise, marketing support, and high-performance products.
              </p>
              <div className="space-y-4">
                {["Pan India Presence", "Technical Training", "Marketing Assets", "Dedicated Support"].map((item, i) => (
                  <div key={i} className="flex items-center gap-4 text-primary font-bold">
                    <div className="w-6 h-6 rounded-full bg-[#e11d48]/10 text-[#e11d48] flex items-center justify-center text-xs">✓</div>
                    {item}
                  </div>
                ))}
              </div>
            </div>
            <div className="lg:col-span-7">
              <MultiForm defaultTab="distributor" />
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}
