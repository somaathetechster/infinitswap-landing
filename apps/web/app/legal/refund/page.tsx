export default function RefundPage() {
  return (
    <div className="prose prose-sm md:prose-base max-w-none prose-headings:font-display leading-relaxed text-ink-black/80">
      <h1 className="text-3xl font-bold border-b pb-4 mb-8 text-ink-black">Refund & Cancellation Policy</h1>
      <p className="text-xs uppercase tracking-[0.2em] font-bold text-infinite-blue mb-8">
        Effective Date: February 11, 2026
      </p>

      <section className="mb-8">
        <h3 className="text-lg font-bold text-ink-black uppercase tracking-tight">1. Overview</h3>
        <p>
          At <strong>Infinitswap</strong>, we provide a technology interface that routes instructions to 
          licensed third-party Payment Service Providers (PSPs). Because our settlement partners utilize 
          real-time rails—including <strong>NIP (Nigeria), RTC (South Africa), GIP (Ghana), and TIPS (Tanzania)</strong>—most 
          transactions are processed instantly and cannot be reversed.
        </p>
      </section>

      <section className="mb-8 p-4 bg-red-50 border-l-4 border-red-500">
        <h3 className="text-lg font-bold text-red-700 uppercase tracking-tight">2. Transaction Finality (Non-Reversibility)</h3>
        <p className="font-semibold text-red-900">
          Once an instruction has been broadcast to the settlement network and executed by our 
          regulated partners, the transaction is IRREVERSIBLE.
        </p>
        <p>
          In accordance with the <strong>Electronic Transfers Act (Ghana)</strong>, the <strong>National Payment Systems Act (Nigeria & Tanzania)</strong>, 
          and <strong>SARB Regulations (South Africa)</strong>, once a payment has reached the beneficiary bank, the technology 
          provider cannot unilaterally recall those funds. It is the User's sole responsibility to verify all destination 
          details before confirming a transaction.
        </p>
      </section>

      <section className="mb-8">
        <h3 className="text-lg font-bold text-ink-black uppercase tracking-tight">3. Failed & Error-State Transactions</h3>
        <p>
          A "Failed Transaction" occurs when an instruction is rejected by the settlement network before 
          reaching the beneficiary.
        </p>
        <ul className="list-disc ml-6 space-y-2">
          <li><strong>Automated Reversals:</strong> If a transaction fails due to a system error within our technology layer, a reversal to the originating bank account or wallet is typically initiated within <strong>24 to 48 hours</strong>.</li>
          <li><strong>Network Delays:</strong> Transactions marked as "Pending" due to partner bank maintenance (common in cross-border corridors) are not eligible for refunds until a definitive "Failed" status is returned by the PSP.</li>
        </ul>
      </section>

      <section className="mb-8">
        <h3 className="text-lg font-bold text-ink-black uppercase tracking-tight">4. Non-Refundable Scenarios</h3>
        <p>Refunds will not be issued for:</p>
        <ul className="list-disc ml-6 space-y-2">
          <li><strong>User Error:</strong> Providing incorrect bank account numbers, SWIFT/IBAN codes, or wallet addresses.</li>
          <li><strong>Exchange Rate Fluctuations:</strong> Any variation between the quoted rate and the final settlement rate caused by network latency or market volatility.</li>
          <li><strong>AML Holds:</strong> Transactions flagged or frozen by regulated partners for compliance investigations under <strong>FICA (South Africa)</strong> or <strong>AML Act (Nigeria)</strong>.</li>
        </ul>
      </section>

      <section className="mb-8">
        <h3 className="text-lg font-bold text-ink-black uppercase tracking-tight">5. Chargeback Policy & Fraud Prevention</h3>
        <p>
          We maintain a <strong>Zero-Tolerance Policy</strong> for fraudulent chargebacks. If you initiate a 
          chargeback through your bank for a completed and authorized service:
        </p>
        <ol className="list-decimal ml-6 space-y-2 font-medium">
          <li>Your Infinitswap account will be permanently blacklisted.</li>
          <li>We will provide transaction logs and KYC data to the licensed PSP and relevant fraud desks (e.g., EFCC in Nigeria or FIC in South Africa).</li>
          <li>You may be reported to regional credit bureaus.</li>
        </ol>
      </section>

      <section className="mb-8 border-t pt-8">
        <h3 className="text-lg font-bold text-ink-black uppercase tracking-tight">6. Cancellation of Recurring Services</h3>
        <p>
          Users may cancel automated data-subscription services at any time. Cancellations will take 
          effect at the end of the current billing cycle. No partial refunds are provided for mid-month cancellations.
        </p>
      </section>

      <div className="mt-12 p-6 bg-infinite-blue text-white rounded-sm flex flex-col items-center text-center">
        <h4 className="text-white uppercase tracking-widest text-sm mb-4">Dispute Resolution Desk</h4>
        <p className="font-mono text-sm mb-2">support@infinitswap.ai</p>
        <p className="text-[10px] opacity-70">Please include your Transaction ID in the subject line.</p>
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