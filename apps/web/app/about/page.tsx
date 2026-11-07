import { LegalShell, LegalSection, ContactCard, type TocItem } from "../../components/LegalShell";

export const metadata = {
  title: "About Us | Infinitswap",
  description:
    "Infinitswap Technologies is an AI-powered payments platform that lets people send money, pay bills and get paid through a conversation — no app required.",
};

const toc: TocItem[] = [
  { id: "who-we-are", label: "Who we are" },
  { id: "how-it-works", label: "How it works" },
  { id: "where-we-operate", label: "Where we operate" },
  { id: "legal-entity", label: "Legal entity" },
  { id: "contact", label: "Contact" },
];

export default function AboutPage() {
  return (
    <LegalShell
      eyebrow="About us"
      title="About Infinitswap"
      intro="An AI-powered payments platform that lets individuals and businesses move money through a conversation — with no app to download."
      toc={toc}
    >
      <LegalSection id="who-we-are" title="Who we are">
        <p>
          <strong>Infinitswap Technologies</strong> is an AI-powered payments platform that enables individuals and
          businesses to send money, pay bills, and receive payments through a conversational interface — with no app
          download required.
        </p>
      </LegalSection>

      <LegalSection id="how-it-works" title="How it works">
        <p>
          Users interact through WhatsApp. The platform&apos;s AI agent handles intent, verification, routing, and
          execution of payment instructions through licensed third-party payment infrastructure. Infinitswap itself is a
          non-custodial technology layer — settlement and the regulated movement of funds are carried out by our licensed
          partners.
        </p>
      </LegalSection>

      <LegalSection id="where-we-operate" title="Where we operate">
        <p>We operate across seven markets:</p>
        <ul>
          <li>Nigeria</li>
          <li>Ghana</li>
          <li>Tanzania</li>
          <li>South Africa</li>
          <li>Kenya</li>
          <li>Uganda</li>
          <li>Rwanda</li>
        </ul>
      </LegalSection>

      <LegalSection id="legal-entity" title="Legal entity" tone="highlight">
        <p>
          Infinitswap is registered in Nigeria as <strong>Infinite 69Trading Services Limited</strong>.
        </p>
        <p>
          <strong>Registered address:</strong> 17, Onyeneke Chukwu Street, Achara Layout, Enugu, Nigeria.
        </p>
      </LegalSection>

      <ContactCard
        heading="Contact"
        blurb="Questions, support, or partnership enquiries — our team is reachable around the clock."
      />
    </LegalShell>
  );
}
