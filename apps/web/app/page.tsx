// apps/web/app/page.tsx

import Hero from "../components/Hero";
import Infrastructure from "../components/Infrastructure";
import Protocol from "../components/Protocol";
import TechnicalFlow from "../components/TechnicalFlow";
import ConnectivityMap from "../components/ConnectivityMap";
import AssistantVisual from "../components/AssistantVisual";

/**
 * Infinitswap Digital Flagship // v4.0
 * * Strategic Sequence:
 * 01. Hero: Immediate clear value proposition.
 * 02. Infrastructure: Demonstrating speed and reliability.
 * 03. Protocol: Layer-by-layer technical audit.
 * 04. AI Intelligence: The Smart Companion (Bot interface).
 * 05. Technical Flow: Visualizing the Crypto-to-Fiat pipeline.
 * 06. Connectivity: The Pan-African network scale.
 */
export default function Home() {
  return (
    <div className="flex flex-col w-full bg-transparent overflow-hidden">
      
      {/* SCENE 01: THE STATEMENT */}
      <Hero />

      {/* SCENE 02: THE NARRATIVE */}
      <Infrastructure />

      {/* SCENE 03: THE PROTOCOL */}
      <Protocol />

      {/* SCENE 04: THE SMART COMPANION */}
      <section className="min-h-screen pt-32 pb-20 flex flex-col justify-center bg-transparent relative border-t border-black/5">
        
        {/* Massive Full-Page Typography */}
        <div className="w-full px-6 md:px-10 z-10 flex flex-col mb-12">
          <span className="font-mono text-[10px] text-infinite-blue uppercase tracking-[0.5em] mb-6 block font-bold border-l-2 border-infinite-blue pl-4">
            WhatsApp // AI Assistant
          </span>
          <h2 className="font-display text-[15vw] md:text-[11vw] uppercase text-ink-black leading-[0.8] tracking-tighter w-full flex flex-col">
            <span>Crypto to Fiat.</span>
            <span className="text-infinite-magenta italic md:self-end">In your Chats.</span>
          </h2>
        </div>

        {/* Editorial Grid: Text on the left, Visual on the right for desktop */}
        <div className="w-full grid grid-cols-1 md:grid-cols-12 gap-10 px-6 md:px-10 items-center z-10 relative">
          
          <div className="md:col-span-5 md:col-start-1">
            <p className="font-body text-ink-black/60 text-2xl md:text-3xl leading-snug md:leading-relaxed max-w-lg">
              Send USDT and get paid directly into your local bank account instantly. 
              No new apps to download, no complex trading charts—if you know how to send a text, you know how to use Infinitswap.
            </p>
          </div>

          <div className="md:col-span-7 relative h-[50vh] md:h-[80vh] w-full -mt-10 md:mt-0 z-0">
            {/* The 3D scene will now fill this large right-side container */}
            <AssistantVisual />
          </div>

        </div>
      </section>

      {/* SCENE 05: THE SETTLEMENT PIPELINE */}
      <TechnicalFlow />

      {/* SCENE 06: THE SCALE */}
      <ConnectivityMap />

      {/* FOOTER IS NOW HANDLED IN layout.tsx */}
    </div>
  );
}