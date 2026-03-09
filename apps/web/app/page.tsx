// apps/web/app/page.tsx
import Hero from "../components/Hero";
import Infrastructure from "../components/Infrastructure";
import Protocol from "../components/Protocol";
import TechnicalFlow from "../components/TechnicalFlow";
import EverydayUseCases from "../components/EverydayUseCases";  
import ConnectivityMap from "../components/ConnectivityMap";
import AssistantVisual from "../components/AssistantVisual";
import FAQ from "../components/FAQ"; // Import the new FAQ component

export default function Home() {
  return (
    <div className="flex flex-col w-full bg-transparent overflow-hidden">
      
      {/* SCENE 01: THE STATEMENT */}
      <section id="hero" className="relative bg-white">
        <Hero />
      </section>

      {/* SCENE 02: THE NARRATIVE */}
      <Infrastructure />

      {/* SCENE 03: THE BLUEPRINT */}
      <section id="how-it-works">
        <Protocol />
      </section>

      {/* SCENE 04: THE INTERFACE (WhatsApp) */}
      <section className="min-h-screen py-32 flex flex-col justify-center bg-[#050505] relative border-y border-white/5">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#25d366_1px,transparent_1px)] [background-size:40px_40px]" />
        {/* ... existing Assistant content ... */}
        <div className="md:col-span-7 relative h-[60vh] md:h-[90vh] w-full">
          <AssistantVisual />
        </div>
      </section>

      {/* SCENE 05: THE SIMPLE SWAP */}
      <section className="bg-white">
        <TechnicalFlow />
      </section>

      {/* SCENE 06: HUMAN IMPACT */}
      <section id="experience" className="bg-[#020410]">
        <EverydayUseCases />
      </section>

      {/* SCENE 06.5: THE KNOWLEDGE BASE (FAQ) 
          Placed here to resolve friction before the final CTA
      */}
      <section id="faq">
        <FAQ />
      </section>

      {/* SCENE 07: GLOBAL NETWORK */}
      <section id="countries" className="bg-[#010208]">
        <ConnectivityMap />
      </section>

    </div>
  );
}