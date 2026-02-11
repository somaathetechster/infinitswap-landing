export default function PrivacyPage() {
  return (
    <div className="prose prose-sm md:prose-base max-w-none prose-headings:font-display leading-relaxed text-ink-black/80">
      <h1 className="text-3xl font-bold border-b pb-4 mb-8 text-ink-black">Privacy Policy</h1>
      <p className="text-xs uppercase tracking-[0.2em] font-bold text-infinite-blue mb-8">
        Effective Date: February 11, 2026
      </p>

      <section className="mb-8">
        <h3 className="text-lg font-bold text-ink-black uppercase tracking-tight">1. Introduction</h3>
        <p>
          At <strong>Infinite 69Trading Services Limited</strong> ("Infinitswap"), we operate as a global 
          technology platform with a focus on African financial infrastructure. We are committed to protecting 
          your privacy and processing your personal data in strict accordance with the following regulatory frameworks:
        </p>
        <ul className="list-disc ml-6 mt-4 space-y-1 text-sm font-semibold text-ink-black/70">
          <li>Nigeria: Nigeria Data Protection Act (NDPA) 2023</li>
          <li>South Africa: Protection of Personal Information Act (POPIA) 2013</li>
          <li>Ghana: Data Protection Act, 2012 (Act 843)</li>
          <li>Tanzania: Personal Data Protection Act, 2022</li>
        </ul>
      </section>

      <section className="mb-8">
        <h3 className="text-lg font-bold text-ink-black uppercase tracking-tight">2. Information We Collect</h3>
        <p>To provide a secure and efficient technology interface, we collect the following categories of information:</p>
        <ul className="list-disc ml-6 space-y-2">
          <li><strong>Identity Data:</strong> Full name, date of birth, gender, and government-issued identification (BVN, NIN, Passport, or National ID) required for regional KYC verification.</li>
          <li><strong>Contact Data:</strong> Email address, physical billing address, and verified telephone number.</li>
          <li><strong>Financial Instruction Data:</strong> Bank account details, digital wallet addresses, and transaction amounts. 
              <span className="italic font-semibold text-infinite-blue ml-1">
                Note: We do not store full card primary account numbers (PAN) or CVV codes.
              </span>
          </li>
          <li><strong>Technical Data:</strong> IP address, device telemetry, browser metadata, and usage patterns collected via secure cookies.</li>
        </ul>
      </section>

      <section className="mb-8 p-4 bg-infinite-blue/5 border border-infinite-blue/10 rounded-sm">
        <h3 className="text-lg font-bold text-ink-black uppercase tracking-tight">3. Legal Basis for Processing</h3>
        <p>We process your data based on the following legal grounds recognized across our jurisdictions:</p>
        <ul className="list-disc ml-6 space-y-2">
          <li><strong>Contractual Necessity:</strong> To route instructions to our licensed settlement partners.</li>
          <li><strong>Legal Obligation:</strong> To comply with regional Anti-Money Laundering (AML) and Counter-Terrorism Financing (CTF) mandates.</li>
          <li><strong>Legitimate Interest:</strong> For fraud detection, system security, and infrastructure optimization.</li>
          <li><strong>Consent:</strong> For any processing activities where you have provided explicit opt-in authorization.</li>
        </ul>
      </section>

      <section className="mb-8">
        <h3 className="text-lg font-bold text-ink-black uppercase tracking-tight">4. Data Sharing and Cross-Border Transfers</h3>
        <p>
          As a technology layer, we do not settle funds. Consequently, your data must be shared with:
        </p>
        <ul className="list-disc ml-6 space-y-2">
          <li><strong>Licensed Financial Partners:</strong> Regulated Payment Service Providers (PSPs) and banks (e.g., partners regulated by CBN, SARB, BoG, or BoT).</li>
          <li><strong>Regulatory Authorities:</strong> Law enforcement or government bodies across Nigeria, Ghana, Tanzania, and South Africa when required by law.</li>
        </ul>
        <p className="mt-4 italic">
          <strong>Cross-Border Transfers:</strong> We ensure that any data moved across national borders is protected by Standard Contractual Clauses (SCCs) and robust encryption, ensuring a level of protection equivalent to the data's country of origin.
        </p>
      </section>

      <section className="mb-8 border-l-4 border-black/10 pl-4">
        <h3 className="text-lg font-bold text-ink-black uppercase tracking-tight">5. Data Retention</h3>
        <p>
          In accordance with financial industry standards in our operating regions, we are legally obligated to retain KYC 
          and transaction instruction data for a minimum of <strong>five (5) to seven (7) years</strong> following 
          the termination of a user relationship or the last successful transaction.
        </p>
      </section>

      <section className="mb-8">
        <h3 className="text-lg font-bold text-ink-black uppercase tracking-tight">6. Data Security</h3>
        <p>We implement industry-leading technical measures, including:</p>
        <ul className="list-disc ml-6 space-y-2">
          <li><strong>Encryption:</strong> TLS 1.3 for data in transit and AES-256 for data at rest.</li>
          <li><strong>Access Control:</strong> Strict multi-factor authentication (MFA) for all internal infrastructure access.</li>
          <li><strong>Audits:</strong> Regular third-party penetration testing and vulnerability assessments.</li>
        </ul>
      </section>

      <section className="mb-8">
        <h3 className="text-lg font-bold text-ink-black uppercase tracking-tight">7. Regional Data Subject Rights</h3>
        <p>Depending on your jurisdiction, you hold specific rights over your data (e.g., NDPA Section 34, POPIA Section 23):</p>
        <ul className="list-disc ml-6 space-y-2">
          <li><strong>Access & Correction:</strong> The right to see and correct your data.</li>
          <li><strong>Objection:</strong> The right to object to processing for direct marketing.</li>
          <li><strong>Erasure:</strong> The right to request data deletion, subject to mandatory financial retention laws.</li>
          <li><strong>Portability:</strong> The right to receive your data in a structured, machine-readable format.</li>
        </ul>
      </section>

      <section className="mb-8 border-t pt-8">
        <h3 className="text-lg font-bold text-ink-black uppercase tracking-tight">8. Contact Our Data Protection Officer</h3>
        <p>
          For inquiries or to exercise your rights across any of our jurisdictions, please contact our 
          Data Protection Officer (DPO):
        </p>
        <div className="mt-4 font-mono text-sm bg-black text-white p-6 rounded-sm shadow-xl">
          <p className="mb-1"><strong>Email:</strong> privacy@infinitswap.ai</p>
          <p className="mb-1"><strong>Global Headquarters:</strong> 17, Onyeneke Chukwu Street, Achara Layout, Enugu, Nigeria.</p>
          <p className="text-[10px] uppercase tracking-widest text-white/40 mt-4">
            Authorized Data Controller: Infinite 69Trading Services Ltd.
          </p>
        </div>
        <div className="mt-12 p-6 bg-infinite-blue text-white rounded-sm flex flex-col items-center text-center">
        <h4 className="text-white uppercase tracking-widest text-sm mb-4">Dispute Resolution Desk</h4>
        <p className="font-mono text-sm mb-1">infinitswap@gmail.com</p>
        <p className="font-mono text-sm mb-2">+234 907 960 7916</p>
        <p className="text-[10px] opacity-70">Mon-Fri: 9am - 5pm WAT</p>
    </div>
      </section>
    </div>
  );
}