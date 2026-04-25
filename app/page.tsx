import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Stats from "./components/Stats";
import CreativeAbout from "./components/CreativeAbout";
import ProductGrid from "./components/ProductGrid";
import Services from "./components/Services";
import WhyChooseUs from "./components/WhyChooseUs";
import ClientsSlider from "./components/ClientsSlider";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      <Hero />
      
      {/* 
        Manual control is back. 
        You can now use mt- and py- inside each component 
        and it will be accepted perfectly.
      */}
      
      <Stats />
      
      <CreativeAbout />
      
      <ProductGrid />
      
      <Services />
      
      <WhyChooseUs />
      
      <ClientsSlider />
      
      <Footer />
      
      {/* Floating Appointment Button for Mobile */}
      <div className="fixed bottom-6 right-6 z-50 lg:hidden">
        <a
          href="/contact"
          className="bg-[#e11d48] text-white w-16 h-16 rounded-full flex items-center justify-center shadow-[0_10px_30px_rgba(225,29,72,0.4)] animate-bounce"
        >
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.827-1.213L3 21l1.33-4.345A7.95 7.95 0 014 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
        </a>
      </div>
    </main>
  );
}
