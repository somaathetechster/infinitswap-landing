import { LegalShell, LegalSection, ContactCard, type TocItem } from "../../../components/LegalShell";

export const metadata = {
  title: "Terms of Service | Infinitswap",
  description: "The terms governing use of the Infinitswap Technologies AI payments platform.",
};

const toc: TocItem[] = [
  { id: "preamble", label: "1. Preamble & Acceptance" },
  { id: "regulatory", label: "2. Regulatory Disclosure" },
  { id: "eligibility", label: "3. Eligibility (AML/KYC)" },
  { id: "finality", label: "4. Transaction Finality" },
  { id: "privacy", label: "5. Data Protection" },
  { id: "liability", label: "6. Limitation of Liability" },
  { id: "governing-law", label: "7. Governing Law" },
  { id: "contact", label: "8. Contact" },
];

export default function TermsPage() {
  return (
    <LegalShell eyebrow="Legal" title="Terms of Service" updated="February 11, 2026" toc={toc}>
      <LegalSection id="preamble" index="1" title="Preamble and Acceptance">
        <p>
          These Terms of Service ("Terms") constitute a legally binding agreement between you ("User", "you") and{" "}
          <strong>
            Infinitswap Technologies (trading as Infinite 69Trading Services Limited, incorporated under the laws of the
            Federal Republic of Nigeria)
          </strong>{" "}
          ("Infinitswap", "we", "us").
        </p>
        <p>
          By accessing our platform, website, or APIs (collectively, "the Platform"), you acknowledge that you have read,
          understood, and agreed to be bound by these Terms across all operating jurisdictions, including but not limited
          to Nigeria, South Africa, Ghana, Tanzania, Kenya, Uganda, and Rwanda.
        </p>
      </LegalSection>

      <LegalSection id="regulatory" index="2" title="Regulatory Disclosure & Technology Status" tone="highlight">
        <p>
          <strong>Infinitswap is a technology platform and does not operate as a bank or a licensed financial intermediary.</strong>
        </p>
        <ul>
          <li>
            <strong>Non-Custodial:</strong> We do not hold, custody, or manage customer funds.
          </li>
          <li>
            <strong>Instruction Routing:</strong> We provide software that routes user instructions to licensed
            third-party Payment Service Providers (PSPs).
          </li>
          <li>
            <strong>Partner Compliance:</strong> All currency conversion and movement of value are performed by entities
            licensed by the relevant central banks across our operating markets.
          </li>
        </ul>
      </LegalSection>

      <LegalSection id="eligibility" index="3" title="User Eligibility (Regional AML/KYC)">
        <p>
          You agree to comply with regional Anti-Money Laundering (AML) and "Know Your Customer" (KYC) requirements as
          mandated by:
        </p>
        <ul>
          <li>
            <strong>Nigeria:</strong> Money Laundering (Prevention and Prohibition) Act, 2022.
          </li>
          <li>
            <strong>South Africa:</strong> Financial Intelligence Centre Act (FICA), 2001.
          </li>
          <li>
            <strong>Ghana:</strong> Anti-Money Laundering Act, 2020 (Act 1044).
          </li>
          <li>
            <strong>Tanzania:</strong> Anti-Money Laundering Act, Cap. 423.
          </li>
          <li>
            <strong>Kenya:</strong> Proceeds of Crime and Anti-Money Laundering Act (POCAMLA), 2009.
          </li>
          <li>
            <strong>Uganda:</strong> Anti-Money Laundering Act, 2013.
          </li>
          <li>
            <strong>Rwanda:</strong> Law No. 55/2018 on the Prevention and Punishment of Money Laundering and Terrorism
            Financing.
          </li>
        </ul>
      </LegalSection>

      <LegalSection id="finality" index="4" title="Transaction Finality">
        <p>
          Due to the real-time nature of the settlement networks used by our partners (including RTGS), once an
          instruction is confirmed, it is generally <strong>irreversible</strong>. Users are responsible for verifying
          recipient data before submission.
        </p>
      </LegalSection>

      <LegalSection id="privacy" index="5" title="Data Protection & Privacy">
        <p>
          We process personal data in accordance with the <strong>Nigeria Data Protection Act (NDPA) 2023</strong>, South
          Africa&apos;s <strong>POPIA</strong>, Ghana&apos;s <strong>Data Protection Act</strong>, Tanzania&apos;s{" "}
          <strong>Personal Data Protection Act</strong>, Kenya&apos;s <strong>Data Protection Act, 2019</strong>,
          Uganda&apos;s <strong>Data Protection and Privacy Act, 2019</strong>, and Rwanda&apos;s{" "}
          <strong>Law No. 058/2021</strong>. Please refer to our <a href="/legal/privacy">Privacy Policy</a> for details.
        </p>
      </LegalSection>

      <LegalSection id="liability" index="6" title="Limitation of Liability">
        <p>
          Infinitswap provides technology "AS IS". We shall not be liable for any losses arising from third-party banking
          failures, network outages in the countries of operation, or regulatory actions taken against your account by
          licensed partners.
        </p>
      </LegalSection>

      <LegalSection id="governing-law" index="7" title="Governing Law and Dispute Resolution">
        <p>
          These Terms are governed by the laws of the Federal Republic of Nigeria. However, for users resident in South
          Africa, Ghana, Tanzania, Kenya, Uganda, or Rwanda, we acknowledge your mandatory consumer protection rights
          under local laws.
        </p>
        <p>
          Any dispute shall first be settled via <strong>binding mediation</strong>. If unresolved, the seat of
          arbitration or litigation shall be Enugu State, Nigeria, unless prohibited by the mandatory laws of your
          resident jurisdiction.
        </p>
      </LegalSection>

      <ContactCard
        heading="8. Compliance & Dispute Resolution"
        blurb="For compliance inquiries or to raise a dispute, reach the Infinitswap support desk."
      />
    </LegalShell>
  );
}
