import Nav from "../components/Nav";
import Hero from "../components/Hero";
import TrustBar from "../components/TrustBar";
import Features from "../components/Features";
import ChatDemo from "../components/ChatDemo";
import HowItWorks from "../components/HowItWorks";
import CountriesSection from "../components/CountriesSection";
import TrustSafety from "../components/TrustSafety";
import FAQ from "../components/FAQ";
import FinalCTA from "../components/FinalCTA";
import Footer from "../components/Footer";

export default function Home() {
  return (
    <div id="top" className="min-h-screen overflow-hidden bg-[#F5F0FF] text-[#0F0A1E]">
      <Nav /><main><Hero /><TrustBar /><Features /><ChatDemo /><HowItWorks /><CountriesSection /><TrustSafety /><FAQ /><FinalCTA /></main><Footer />
    </div>
  );
}
