import { LegalShell, LegalSection, ContactCard, type TocItem } from "../../../components/LegalShell";

export const metadata = {
  title: "Refund & Cancellation Policy | Infinitswap",
  description: "Infinitswap Technologies' policy on refunds, failed transactions, chargebacks and cancellations.",
};

const toc: TocItem[] = [
  { id: "overview", label: "1. Overview" },
  { id: "finality", label: "2. Transaction Finality" },
  { id: "failed", label: "3. Failed Transactions" },
  { id: "non-refundable", label: "4. Non-Refundable Scenarios" },
  { id: "chargebacks", label: "5. Chargeback Policy" },
  { id: "cancellation", label: "6. Cancellations" },
  { id: "contact", label: "7. Contact" },
];

export default function RefundPage() {
  return (
    <LegalShell
      eyebrow="Legal"
      title="Refund & Cancellation Policy"
      updated="February 11, 2026"
      updatedLabel="Effective date"
      toc={toc}
    >
      <LegalSection id="overview" index="1" title="Overview">
        <p>
          At <strong>Infinitswap Technologies</strong>, we provide a technology interface that routes instructions to
          licensed third-party Payment Service Providers (PSPs). Because our settlement partners utilize real-time payment
          networks — including <strong>NIP (Nigeria), RTC (South Africa), GIP (Ghana), and TIPS (Tanzania)</strong> — most
          transactions are processed instantly and cannot be reversed.
        </p>
      </LegalSection>

      <LegalSection id="finality" index="2" title="Transaction Finality (Non-Reversibility)" tone="warn">
        <p>
          <strong>
            Once an instruction has been broadcast to the settlement network and executed by our regulated partners, the
            transaction is irreversible.
          </strong>
        </p>
        <p>
          In accordance with the <strong>Electronic Transfers Act (Ghana)</strong>, the{" "}
          <strong>National Payment Systems Act (Nigeria &amp; Tanzania)</strong>, and{" "}
          <strong>SARB Regulations (South Africa)</strong>, once a payment has reached the beneficiary bank, the
          technology provider cannot unilaterally recall those funds. It is the User&apos;s sole responsibility to verify
          all destination details before confirming a transaction.
        </p>
      </LegalSection>

      <LegalSection id="failed" index="3" title="Failed & Error-State Transactions">
        <p>
          A "Failed Transaction" occurs when an instruction is rejected by the settlement network before reaching the
          beneficiary.
        </p>
        <ul>
          <li>
            <strong>Automated Reversals:</strong> If a transaction fails due to a system error within our technology
            layer, a reversal to the originating bank account is typically initiated within <strong>24 to 48 hours</strong>.
          </li>
          <li>
            <strong>Network Delays:</strong> Transactions marked as "Pending" due to partner bank maintenance are not
            eligible for refunds until a definitive "Failed" status is returned by the PSP.
          </li>
        </ul>
      </LegalSection>

      <LegalSection id="non-refundable" index="4" title="Non-Refundable Scenarios">
        <p>Refunds will not be issued for:</p>
        <ul>
          <li>
            <strong>User Error:</strong> Providing incorrect bank account numbers, SWIFT/IBAN codes, or recipient
            details.
          </li>
          <li>
            <strong>Rate Fluctuations:</strong> Any variation between the quoted rate and the final settlement rate caused
            by network latency or market volatility.
          </li>
          <li>
            <strong>AML Holds:</strong> Transactions flagged or frozen by regulated partners for compliance
            investigations under <strong>FICA (South Africa)</strong> or the <strong>AML Act (Nigeria)</strong>.
          </li>
        </ul>
      </LegalSection>

      <LegalSection id="chargebacks" index="5" title="Chargeback Policy & Fraud Prevention">
        <p>
          We maintain a <strong>Zero-Tolerance Policy</strong> for fraudulent chargebacks. If you initiate a chargeback
          through your bank for a completed and authorized service:
        </p>
        <ol>
          <li>Your Infinitswap account will be permanently blacklisted.</li>
          <li>
            We will provide transaction logs and KYC data to the licensed PSP and relevant fraud desks (e.g., EFCC in
            Nigeria or FIC in South Africa).
          </li>
          <li>You may be reported to regional credit bureaus.</li>
        </ol>
      </LegalSection>

      <LegalSection id="cancellation" index="6" title="Cancellation of Recurring Services">
        <p>
          Users may cancel automated subscription services at any time. Cancellations will take effect at the end of the
          current billing cycle. No partial refunds are provided for mid-cycle cancellations.
        </p>
      </LegalSection>

      <ContactCard
        heading="7. Dispute Resolution Desk"
        blurb="For refund requests or disputes, contact the Infinitswap support desk."
        note="Please include your Transaction ID in the subject line so we can resolve your request faster."
      />
    </LegalShell>
  );
}
