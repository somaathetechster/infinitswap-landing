// apps/web/app/page.tsx
import Hero from "../components/Hero";
import Pillars from "../components/Pillars";
import Infrastructure from "../components/Infrastructure";
import ModuleTeaser from "../components/ModuleTeaser";
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

      {/* SCENE 01.5: THE ACCOUNT — five modules, one chat.
          Reframes everything below it as one capability among several. */}
      <section id="modules">
        <Pillars />
      </section>

      {/* SCENE 02: THE NARRATIVE */}
      <Infrastructure />

      {/* SCENE 02.5: SAVINGS — light, against the dark narrative above it. */}
      <section id="savings">
        <ModuleTeaser
          eyebrow="Savings / module 02"
          titleTop="Money That Grows"
          titleBottom="While You Sleep."
          body="Round-up savings, fixed goals, or a locked balance earning real interest — pick what fits, and Infinitswap does the disciplined part for you. From soft savings you can pull anytime to hard-locked plans built for long-term goals."
          ctaLabel="See how savings works"
          ctaHref="/savings"
          tone="light"
          accent="blue"
          stats={[
            { label: "Plan types", value: "Round-up · Goal · Soft · Locked" },
            { label: "Interest", value: "Accrues daily on locked balances" },
            { label: "Setup", value: "One chat message" },
          ]}
        />
      </section>

      {/* SCENE 02.6: BILLS */}
      <section id="bills">
        <ModuleTeaser
          eyebrow="Bills / module 03"
          titleTop="Never Miss"
          titleBottom="A Bill Again."
          body="Airtime, data, electricity, water, cable, betting — paid in a chat message, or automated so it happens without you. Across Nigeria, Ghana, South Africa, Tanzania, Kenya, Uganda, and Rwanda."
          ctaLabel="See what you can pay"
          ctaHref="/pay"
          tone="dark"
          accent="magenta"
          stats={[
            { label: "Categories", value: "Airtime · Data · Power · Cable · Betting" },
            { label: "Countries", value: "7 across Africa" },
            { label: "Autopay", value: "Reminder, charge, retry" },
          ]}
        />
      </section>

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

      {/* SCENE 06.4: REWARDS — light, breaking the run of dark sections
          before the FAQ. */}
      <section id="rewards">
        <ModuleTeaser
          eyebrow="Rewards / module 05"
          titleTop="You Already Use It."
          titleBottom="Get Paid For It."
          body="Earn points on deposits, savings, and swaps. Invite a friend and earn when they transact. Redeem points for fee discounts, cashback, or bonus USDT — no separate loyalty app, it's just part of your balance."
          ctaLabel="See rewards"
          ctaHref="/rewards"
          tone="light"
          accent="magenta"
          stats={[
            { label: "Earn on", value: "Deposits · Savings · Swaps" },
            { label: "Referrals", value: "Paid when your invite transacts" },
            { label: "Redeem for", value: "Fee discounts · Cashback · USDT" },
          ]}
        />
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