import Hero from "../components/Hero";
import Infrastructure from "../components/Infrastructure";
import Protocol from "../components/Protocol";
import TechnicalFlow from "../components/TechnicalFlow";
import ConnectivityMap from "../components/ConnectivityMap";
import AssistantVisual from "../components/AssistantVisual";

/**
 * Infinitswap Digital Flagship // v4.0
 * * Strategic Sequence:
 * 01. Hero: Immediate "World-Standard" authority.
 * 02. Infrastructure: Demonstrating the "Last Mile" engineering.
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

      {/* SCENE 02: THE NARRATIVE 
          Establishing the "Engineering" baseline.
      */}
      <Infrastructure />

      {/* SCENE 03: THE PROTOCOL 
          Deep technical breakdown for institutional trust.
      */}
      <Protocol />

      {/* SCENE 04: THE SMART COMPANION 
          Depicting the AI Decision Engine.
      */}
      <section className="min-h-screen py-32 flex flex-col items-center justify-center bg-transparent relative border-t border-black/5">
        <AssistantVisual />
        <div className="max-w-3xl text-center px-6 mt-16 z-10">
          <span className="font-mono text-[10px] text-infinite-blue uppercase tracking-[0.5em] mb-6 block font-bold">
            Interface // Conversational NLP
          </span>
          <h2 className="font-display text-5xl md:text-8xl uppercase mb-8 text-ink-black leading-[0.85]">
            Intelligence <br /> <span className="text-infinite-magenta italic">By Design.</span>
          </h2>
          <p className="font-body text-ink-black/60 text-xl md:text-2xl max-w-2xl mx-auto leading-relaxed">
            Infinitswap bridges the gap between digital assets and legacy bank rails 
            through an intent-based AI layer. Speak to your assets; we handle the orchestration.
          </p>
        </div>
      </section>

      {/* SCENE 05: THE SETTLEMENT PIPELINE
          Step-by-step visual of the internal bot logic.
      */}
      <TechnicalFlow />

      {/* SCENE 06: THE SCALE 
          Global reach, local precision.
      */}
      <ConnectivityMap />

      {/* SCENE 07: INSTITUTIONAL FOOTER / COMPLIANCE
          Satisfying Section 7.1-7.4 of the Regulatory Framework.
      */}
      <section className="py-24 bg-transparent border-t border-black/10 flex flex-col items-center justify-center text-center px-10">
         <div className="mb-12 flex gap-8 opacity-20 grayscale">
            {/* Placeholder for Partner Logos: BOT, SARB, BOG */}
            <span className="font-display text-sm uppercase italic tracking-widest">Bank of Tanzania</span>
            <span className="font-display text-sm uppercase italic tracking-widest">SARB</span>
            <span className="font-display text-sm uppercase italic tracking-widest">Bank of Ghana</span>
         </div>
         
         <div className="max-w-3xl space-y-6">
            <p className="font-mono text-[10px] text-infinite-blue uppercase tracking-[0.6em] font-bold">
              Infinitswap Technology Group // Architecture v4.0.2
            </p>
            <p className="font-body text-[11px] text-ink-black/40 uppercase tracking-tight leading-loose">
              Infinitswap is a financial technology platform and does not provide banking, 
              lending, or investment advisory services. All monetary value is held by 
              licensed third-party payment service providers (PSPs) regulated within their 
              respective jurisdictions. Use of this platform constitutes acceptance of 
              our institutional protocol standards.
            </p>
         </div>
      </section>
    </div>
  );
}