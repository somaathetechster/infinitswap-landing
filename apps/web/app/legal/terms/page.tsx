export default function TermsPage() {
  return (
    <div className="prose prose-sm md:prose-base max-w-none prose-headings:font-display leading-relaxed text-ink-black/80">
      <h1 className="text-3xl font-bold border-b pb-4 mb-8 text-ink-black">Terms of Service</h1>
      <p className="text-xs uppercase tracking-[0.2em] font-bold text-infinite-blue mb-8">
        Last Updated: February 11, 2026
      </p>

      <section className="mb-8">
        <h3 className="text-lg font-bold text-ink-black uppercase tracking-tight">1. Preamble and Acceptance</h3>
        <p>
          These Terms of Service ("Terms") constitute a legally binding agreement between you ("User", "you") and 
          <strong> Infinite 69Trading Services Limited</strong> ("Infinitswap", "we", "us"), a company incorporated 
          under the laws of the Federal Republic of Nigeria. 
        </p>
        <p>
          By accessing our platform, website, or APIs (collectively, "the Platform"), 
          you acknowledge that you have read, understood, and agreed to be bound by these Terms across all 
          operating jurisdictions, including but not limited to Nigeria, South Africa, Ghana, and Tanzania.
        </p>
      </section>

      <section className="mb-8 p-4 bg-infinite-blue/5 border-l-4 border-infinite-blue">
        <h3 className="text-lg font-bold text-infinite-blue uppercase tracking-tight">2. Regulatory Disclosure & Technology Status</h3>
        <p className="font-semibold underline">
          Infinitswap is a technology platform and DOES NOT operate as a bank or a licensed financial intermediary.
        </p>
        <ul className="list-disc ml-6 space-y-2">
          <li><strong>Non-Custodial:</strong> We do not hold, custody, or manage customer funds.</li>
          <li><strong>Instruction Routing:</strong> We provide software that routes user instructions to licensed third-party Payment Service Providers (PSPs).</li>
          <li><strong>Partner Compliance:</strong> All currency conversion and movement of value are performed by entities licensed by the Central Bank of Nigeria (CBN), South African Reserve Bank (SARB), Bank of Ghana (BoG), and Bank of Tanzania (BoT).</li>
        </ul>
      </section>

      <section className="mb-8">
        <h3 className="text-lg font-bold text-ink-black uppercase tracking-tight">3. User Eligibility (Regional AML/KYC)</h3>
        <p>
          You agree to comply with regional Anti-Money Laundering (AML) and "Know Your Customer" (KYC) requirements 
          as mandated by:
        </p>
        <ul className="list-disc ml-6 space-y-1">
          <li><strong>Nigeria:</strong> Money Laundering (Prevention and Prohibition) Act, 2022.</li>
          <li><strong>South Africa:</strong> Financial Intelligence Centre Act (FICA), 2001.</li>
          <li><strong>Ghana:</strong> Anti-Money Laundering Act, 2020 (Act 1044).</li>
          <li><strong>Tanzania:</strong> Anti-Money Laundering Act, Cap. 423.</li>
        </ul>
      </section>

      <section className="mb-8">
        <h3 className="text-lg font-bold text-ink-black uppercase tracking-tight">4. Transaction Finality</h3>
        <p>
          Due to the real-time nature of the settlement rails used by our partners (including RTGS and blockchain), 
          once an instruction is confirmed, it is generally <strong>irreversible</strong>. Users are responsible 
          for verifying recipient data before submission.
        </p>
      </section>

      <section className="mb-8">
        <h3 className="text-lg font-bold text-ink-black uppercase tracking-tight">5. Data Protection & Privacy</h3>
        <p>
          We process personal data in accordance with the <strong>Nigeria Data Protection Act (NDPA) 2023</strong>, 
          South Africa's <strong>POPIA</strong>, Ghana's <strong>Data Protection Act</strong>, and Tanzania's 
          <strong>Personal Data Protection Act</strong>. Please refer to our Privacy Policy for details.
        </p>
      </section>

      <section className="mb-8 border-t pt-8">
        <h3 className="text-lg font-bold text-ink-black uppercase tracking-tight">6. Limitation of Liability</h3>
        <p>
          Infinitswap provides technology "AS IS". We shall not be liable for any losses arising from 
          third-party banking failures, network outages in the countries of operation, or regulatory 
          actions taken against your account by licensed partners.
        </p>
      </section>

      <section className="mb-8">
        <h3 className="text-lg font-bold text-ink-black uppercase tracking-tight">7. Governing Law and Dispute Resolution</h3>
        <p>
          These Terms are governed by the laws of the Federal Republic of Nigeria. However, for users 
          resident in South Africa, Ghana, or Tanzania, we acknowledge your mandatory consumer protection 
          rights under local laws.
        </p>
        <p>
          Any dispute shall first be settled via <strong>binding mediation</strong>. If unresolved, the 
          seat of arbitration or litigation shall be Enugu State, Nigeria, unless prohibited by the 
          mandatory laws of your resident jurisdiction.
        </p>
      </section>

      <div className="mt-12 p-6 bg-black text-white rounded-sm text-center">
        <p className="text-xs uppercase tracking-widest mb-2 font-bold text-infinite-blue">Compliance Inquiry</p>
        <p className="font-mono text-sm">legal@infinitswap.ai</p>
      </div>

      <div className="mt-12 p-6 bg-infinite-blue text-white rounded-sm flex flex-col items-center text-center">
        <h4 className="text-white uppercase tracking-widest text-sm mb-4">Dispute Resolution Desk</h4>
        <p className="font-mono text-sm mb-1">infinitswap@gmail.com</p>
        <p className="font-mono text-sm mb-2">+234 907 960 7916</p>
        <p className="text-[10px] opacity-70">Mon-Fri: 9am - 5pm WAT</p>
    </div>
    </div>
  );
}