import Nav from "../components/Nav";
import Hero from "../components/Hero";
import HowItWorks from "../components/HowItWorks";
import Features from "../components/Features";
import ChatDemo from "../components/ChatDemo";
import CountriesSection from "../components/CountriesSection";
import TrustSafety from "../components/TrustSafety";
import FinalCTA from "../components/FinalCTA";
import Footer from "../components/Footer";

export default function Home() {
  return (
    <div id="top" className="min-h-screen bg-[#0A0A0A] text-white">
      <Nav />
      <main>
        <Hero />
        <HowItWorks />
        <Features />
        <ChatDemo />
        <CountriesSection />
        <TrustSafety />
        <FinalCTA />
      </main>
      <Footer />
    </div>
  );
}
