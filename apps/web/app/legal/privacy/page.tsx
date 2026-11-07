import { LegalShell, LegalSection, ContactCard, type TocItem } from "../../../components/LegalShell";

export const metadata = {
  title: "Privacy Policy | Infinitswap",
  description:
    "How Infinitswap Technologies collects, uses, protects and shares personal data across its operating markets.",
};

const toc: TocItem[] = [
  { id: "introduction", label: "1. Introduction" },
  { id: "information", label: "2. Information We Collect" },
  { id: "legal-basis", label: "3. Legal Basis for Processing" },
  { id: "sharing", label: "4. Data Sharing & Transfers" },
  { id: "retention", label: "5. Data Retention" },
  { id: "security", label: "6. Data Security" },
  { id: "rights", label: "7. Your Rights" },
  { id: "contact", label: "8. Contact" },
];

export default function PrivacyPage() {
  return (
    <LegalShell eyebrow="Legal" title="Privacy Policy" updated="February 11, 2026" updatedLabel="Effective date" toc={toc}>
      <LegalSection id="introduction" index="1" title="Introduction">
        <p>
          <strong>
            Infinitswap Technologies (trading as Infinite 69Trading Services Limited, incorporated under the laws of the
            Federal Republic of Nigeria)
          </strong>{" "}
          ("Infinitswap", "we", "us") operates an AI-powered payments platform with a focus on African financial
          infrastructure. We are committed to protecting your privacy and processing your personal data in strict
          accordance with the following regulatory frameworks:
        </p>
        <ul>
          <li>Nigeria: Nigeria Data Protection Act (NDPA) 2023</li>
          <li>South Africa: Protection of Personal Information Act (POPIA) 2013</li>
          <li>Ghana: Data Protection Act, 2012 (Act 843)</li>
          <li>Tanzania: Personal Data Protection Act, 2022</li>
          <li>Kenya: Data Protection Act, 2019</li>
          <li>Uganda: Data Protection and Privacy Act, 2019</li>
          <li>Rwanda: Law No. 058/2021 on the Protection of Personal Data</li>
        </ul>
      </LegalSection>

      <LegalSection id="information" index="2" title="Information We Collect">
        <p>To provide a secure and efficient technology interface, we collect the following categories of information:</p>
        <ul>
          <li>
            <strong>Identity Data:</strong> Full name, date of birth, gender, and government-issued identification (BVN,
            NIN, Passport, or National ID) required for regional KYC verification.
          </li>
          <li>
            <strong>Contact Data:</strong> Email address, physical billing address, and verified telephone number.
          </li>
          <li>
            <strong>Financial Instruction Data:</strong> Bank account details, recipient details, and transaction
            amounts. We do not store full card primary account numbers (PAN) or CVV codes.
          </li>
          <li>
            <strong>Technical Data:</strong> IP address, device telemetry, browser metadata, and usage patterns
            collected via secure cookies.
          </li>
        </ul>
      </LegalSection>

      <LegalSection id="legal-basis" index="3" title="Legal Basis for Processing" tone="highlight">
        <p>We process your data based on the following legal grounds recognized across our jurisdictions:</p>
        <ul>
          <li>
            <strong>Contractual Necessity:</strong> To route instructions to our licensed settlement partners.
          </li>
          <li>
            <strong>Legal Obligation:</strong> To comply with regional Anti-Money Laundering (AML) and Counter-Terrorism
            Financing (CTF) mandates.
          </li>
          <li>
            <strong>Legitimate Interest:</strong> For fraud detection, system security, and infrastructure optimization.
          </li>
          <li>
            <strong>Consent:</strong> For any processing activities where you have provided explicit opt-in
            authorization.
          </li>
        </ul>
      </LegalSection>

      <LegalSection id="sharing" index="4" title="Data Sharing and Overseas Data Transfers">
        <p>As a technology layer, we do not settle funds. Consequently, your data must be shared with:</p>
        <ul>
          <li>
            <strong>Licensed Financial Partners:</strong> Regulated Payment Service Providers (PSPs) and banks regulated
            by the relevant central banks in our markets.
          </li>
          <li>
            <strong>Regulatory Authorities:</strong> Law enforcement or government bodies across Nigeria, South Africa,
            Ghana, Tanzania, Kenya, Uganda, and Rwanda when required by law.
          </li>
        </ul>
        <p>
          <strong>Overseas Data Transfers:</strong> We ensure that any data moved across national borders is protected
          by Standard Contractual Clauses (SCCs) and robust encryption, ensuring a level of protection equivalent to the
          data&apos;s country of origin.
        </p>
      </LegalSection>

      <LegalSection id="retention" index="5" title="Data Retention">
        <p>
          In accordance with financial industry standards in our operating regions, we are legally obligated to retain
          KYC and transaction instruction data for a minimum of <strong>five (5) to seven (7) years</strong> following
          the termination of a user relationship or the last successful transaction.
        </p>
      </LegalSection>

      <LegalSection id="security" index="6" title="Data Security">
        <p>We implement industry-leading technical measures, including:</p>
        <ul>
          <li>
            <strong>Encryption:</strong> TLS 1.3 for data in transit and AES-256 for data at rest.
          </li>
          <li>
            <strong>Access Control:</strong> Strict multi-factor authentication (MFA) for all internal infrastructure
            access.
          </li>
          <li>
            <strong>Audits:</strong> Regular third-party penetration testing and vulnerability assessments.
          </li>
        </ul>
      </LegalSection>

      <LegalSection id="rights" index="7" title="Regional Data Subject Rights">
        <p>Depending on your jurisdiction, you hold specific rights over your data:</p>
        <ul>
          <li>
            <strong>Access &amp; Correction:</strong> The right to see and correct your data.
          </li>
          <li>
            <strong>Objection:</strong> The right to object to processing for direct marketing.
          </li>
          <li>
            <strong>Erasure:</strong> The right to request data deletion, subject to mandatory financial retention laws.
          </li>
          <li>
            <strong>Portability:</strong> The right to receive your data in a structured, machine-readable format.
          </li>
        </ul>
      </LegalSection>

      <ContactCard
        heading="8. Contact Our Data Protection Officer"
        blurb="For inquiries or to exercise your rights across any of our jurisdictions, contact our Data Protection Officer (DPO)."
        note="Authorized Data Controller: Infinitswap Technologies (trading as Infinite 69Trading Services Limited)."
      />
    </LegalShell>
  );
}
