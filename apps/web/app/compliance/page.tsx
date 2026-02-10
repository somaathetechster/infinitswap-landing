export default function CompliancePage() {
  return (
    <div className="pt-32 pb-20 px-6 max-w-4xl mx-auto font-body">
      <h1 className="font-display text-5xl uppercase mb-12">Compliance & Legal</h1>
      
      <div className="space-y-12 text-ink-black/80 leading-relaxed">
        <section>
          <h2 className="text-xl font-bold mb-4 uppercase text-infinite-blue tracking-widest">Regulatory Status</h2>
          <p className="mb-4">
            Infinitswap is a financial technology platform and does not provide banking, lending, 
            or financial advisory services directly. We are a technology-first orchestration layer 
            designed to simplify financial interactions.
          </p>
          <div className="bg-infinite-azure/5 p-6 border-l-4 border-infinite-blue italic">
            "Payments are processed through licensed third-party payment service providers. 
            Infinitswap partners with PSPs regulated by the Bank of Tanzania (BOT), 
            South African Reserve Bank (SARB), and Bank of Ghana (BOG)."
          </div>
        </section>

        <section className="grid grid-cols-1 md:grid-cols-2 gap-8 border-t border-black/10 pt-12">
          <div>
            <h3 className="font-bold uppercase text-xs mb-4 opacity-50">KYC & AML</h3>
            <p className="text-sm">
              Identity verification is conducted in partnership with licensed payment providers 
              in accordance with local regulations in each operating jurisdiction.
            </p>
          </div>
          <div>
            <h3 className="font-bold uppercase text-xs mb-4 opacity-50">Custody</h3>
            <p className="text-sm">
              Infinitswap does not custody user funds. All monetary value is held by our 
              regulated financial institution partners.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}