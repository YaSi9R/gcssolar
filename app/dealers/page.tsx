import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function DealersPage() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      <section className="pt-48 pb-32 bg-premium-gradient text-white">
        <div className="container-custom text-center">
          <h1 className="text-6xl md:text-7xl font-black uppercase tracking-tighter mb-8">Dealers & Distributors</h1>
          <p className="text-xl md:text-2xl text-white/70 max-w-3xl mx-auto font-medium leading-relaxed">
            Join our growing network of solar professionals and lead the green energy revolution across India.
          </p>
        </div>
      </section>

      <section className="section-spacing">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto bg-muted/50 p-16 rounded-[4rem] border border-border shadow-2xl">
            <h2 className="text-5xl font-black text-primary mb-8 text-center uppercase tracking-tighter">Become a Partner</h2>
            <p className="text-xl text-muted-foreground mb-16 text-center leading-relaxed">
              We are looking for dedicated partners across India to represent GCS Group Solar. Benefit from our technical expertise, marketing support, and high-performance products.
            </p>
            <form className="space-y-10">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                <input type="text" placeholder="Full Name" className="w-full p-6 rounded-3xl bg-white border-none focus:ring-2 focus:ring-[#e11d48] outline-none shadow-xl transition-all" />
                <input type="email" placeholder="Email Address" className="w-full p-6 rounded-3xl bg-white border-none focus:ring-2 focus:ring-[#e11d48] outline-none shadow-xl transition-all" />
              </div>
              <input type="text" placeholder="Company Name" className="w-full p-6 rounded-3xl bg-white border-none focus:ring-2 focus:ring-[#e11d48] outline-none shadow-xl transition-all" />
              <textarea placeholder="Tell us about your business" rows={5} className="w-full p-6 rounded-3xl bg-white border-none focus:ring-2 focus:ring-[#e11d48] outline-none shadow-xl transition-all"></textarea>
              <button className="w-full bg-[#e11d48] text-white py-6 rounded-3xl font-black text-2xl uppercase tracking-widest hover:shadow-[0_20px_50px_rgba(225,29,72,0.4)] transition-all hover:-translate-y-2">Submit Application</button>
            </form>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}
