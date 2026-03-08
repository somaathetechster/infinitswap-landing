'use client';

export default function CompliancePage() {
  return (
    <div className="pt-48 pb-32 px-6 max-w-5xl mx-auto font-body min-h-screen">
      
      {/* Header with a focus on Trust */}
      <div className="mb-20">
        <span className="font-mono text-[10px] text-infinite-blue uppercase tracking-[0.6em] mb-4 block font-bold">
          Security // Protocol
        </span>
        <h1 className="font-display text-5xl md:text-8xl uppercase leading-none text-ink-black tracking-tighter">
          Trust & <br /> <span className="text-infinite-magenta italic">Compliance.</span>
        </h1>
      </div>
      
      <div className="space-y-16 text-ink-black/80 leading-relaxed">
        
        {/* Main Regulatory Block */}
        <section>
          <h2 className="text-sm font-bold mb-6 uppercase text-infinite-blue tracking-widest border-l-2 border-infinite-blue pl-4">
            Regulatory Framework
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
            <div className="md:col-span-7">
              <p className="text-xl md:text-2xl text-ink-black/70 mb-6 leading-snug">
                Infinitswap is a financial technology infrastructure provider. 
                We build the intelligent layer that connects your digital assets 
                to local bank accounts across Africa.
              </p>
              <p className="text-base text-ink-black/50">
                Our technology acts as a non-custodial instruction-routing interface. 
                We do not hold, custody, or settle funds directly. All monetary value 
                is managed by our licensed and regulated financial partners.
              </p>
            </div>
            
            <div className="md:col-span-5 bg-black/[0.02] p-8 border border-black/5 rounded-sm">
              <h3 className="font-mono text-[10px] uppercase font-bold mb-6 opacity-40">Regulated By</h3>
              <ul className="space-y-4 font-display text-lg uppercase italic">
                <li className="flex justify-between border-b border-black/5 pb-2">Central Bank of Nigeria <span className="text-[10px] font-mono not-italic opacity-40">CBN</span></li>
                <li className="flex justify-between border-b border-black/5 pb-2">South African Reserve Bank <span className="text-[10px] font-mono not-italic opacity-40">SARB</span></li>
                <li className="flex justify-between border-b border-black/5 pb-2">Bank of Ghana <span className="text-[10px] font-mono not-italic opacity-40">BOG</span></li>
                <li className="flex justify-between border-b border-black/5 pb-2">Bank of Tanzania <span className="text-[10px] font-mono not-italic opacity-40">BOT</span></li>
              </ul>
            </div>
          </div>
        </section>

        {/* The Three Pillars of Safety */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-12 border-t border-black/10 pt-16">
          <div>
            <h3 className="font-bold uppercase text-xs mb-4 text-infinite-blue">Identity & Safety</h3>
            <p className="text-sm text-ink-black/60">
              Identity verification (KYC) is conducted in real-time through our licensed 
              partners. We ensure all transactions meet local Anti-Money Laundering (AML) 
              requirements without slowing down your experience.
            </p>
          </div>
          
          <div>
            <h3 className="font-bold uppercase text-xs mb-4 text-infinite-blue">Non-Custodial</h3>
            <p className="text-sm text-ink-black/60">
              Infinitswap never touches your keys or holds your cash. 
              Funds move directly from your wallet to a licensed payment 
              provider, ensuring your money is always in safe, regulated hands.
            </p>
          </div>

          <div>
            <h3 className="font-bold uppercase text-xs mb-4 text-infinite-blue">Data Privacy</h3>
            <p className="text-sm text-ink-black/60">
              Your conversations are your business. Our WhatsApp interface uses 
              end-to-end encryption, and our internal systems enforce TLS 1.3 standards 
              to keep your transaction data private and secure.
            </p>
          </div>
        </section>

        {/* Contact CTA for Compliance officers */}
        <div className="bg-parchment border border-black/5 p-8 text-center rounded-sm">
          <p className="font-mono text-[10px] uppercase tracking-widest opacity-40 mb-2">Inquiries</p>
          <p className="text-sm">For regulatory or partnership inquiries, please contact <a href="mailto:compliance@infinitswap.ai" className="text-infinite-blue font-bold underline">compliance@infinitswap.ai</a></p>
        </div>

      </div>
    </div>
  );
}