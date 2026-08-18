"use client";

/**
 * apps/web/app/kyc/bvn/page.tsx
 *
 * BVN/NIN enrichment form for existing Nigerian users who already completed
 * Tier 1 KYC with a Driver's License or Voter's Card. Those documents don't
 * carry enough identity data for our provider to issue a dedicated virtual
 * account, so this page collects a BVN or NIN and, on success, returns the
 * permanent NGN account number the user can fund their wallet from.
 *
 * Visual style, card chrome and the masked ID input all mirror kyc/page.tsx.
 */

import { useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "https://infinitswap-api.onrender.com";
const WA_BUSINESS_NUMBER = "447860028474";

const ID_TYPES: Array<{ value: string; label: string; hint: string }> = [
  {
    value: "BVN",
    label: "BVN (Bank Verification Number) ⭐ Recommended",
    hint:  "11 digits — find yours via your bank app or dial *565*0#",
  },
  {
    value: "NIN",
    label: "NIN (National Identification Number)",
    hint:  "11 digits — dial *346# to retrieve it",
  },
];

function validateIdClientSide(docType: string, idNumber: string): string | null {
  const clean = idNumber.trim().replace(/\s/g, "").toUpperCase();
  if (!clean) return "Please enter your ID number.";

  const isAllSameDigit = /^(\d)\1+$/.test(clean);

  switch (docType) {

    case "BVN": {
      if (!/^\d+$/.test(clean)) return "BVN must contain digits only.";
      if (clean.length !== 11)  return `BVN must be 11 digits. You entered ${clean.length}.`;
      if (isAllSameDigit)       return "BVN appears to be a placeholder number.";
      return null;
    }

    case "NIN": {
      if (!/^\d+$/.test(clean)) return "NIN must contain digits only.";
      if (clean.length !== 11)  return `NIN must be 11 digits. You entered ${clean.length} — check your NIN slip, NIMC card, or dial *346# to retrieve it.`;
      if (isAllSameDigit)       return "NIN appears to be a placeholder number.";
      return null;
    }

    default:
      return null;
  }
}

function KycCard({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#f0f4f8] flex items-center justify-center p-4">
      <div className="w-full max-w-[440px] bg-white rounded-2xl shadow-[0_4px_32px_rgba(0,0,0,0.10)] p-8">
        <div className="mb-6">
          <p className="text-[22px] font-bold text-[#1a1a2e] leading-none">Infinitswap</p>
          <p className="text-[13px] text-gray-400 mt-1">Secure Identity Verification</p>
        </div>
        {children}
      </div>
    </div>
  );
}

function ErrorScreen({ message }: { message: string }) {
  return (
    <div className="text-center py-6">
      <div className="text-5xl mb-4">⚠️</div>
      <h3 className="text-[18px] font-semibold text-[#1a1a2e] mb-2">Link Unavailable</h3>
      <p className="text-[14px] text-gray-500 leading-relaxed">{message}</p>
    </div>
  );
}

type AccountDetails = {
  accountNumber: string;
  bankName:      string;
  accountName:   string;
};

function AccountReadyScreen({ account, waLink }: { account: AccountDetails; waLink: string }) {
  return (
    <div className="text-center py-6">
      <div className="text-5xl mb-4">✅</div>
      <h3 className="text-[18px] font-semibold text-emerald-600 mb-2">Account Ready</h3>
      <p className="text-[14px] text-gray-500 mb-5 leading-relaxed">
        Your personal Infinitswap bank account:
      </p>

      <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4 text-left space-y-3 mb-5">
        <div>
          <p className="text-[12px] text-emerald-700/70">🏦 Bank</p>
          <p className="text-[15px] font-medium text-[#1a1a2e]">{account.bankName}</p>
        </div>
        <div>
          <p className="text-[12px] text-emerald-700/70">🔢 Account Number</p>
          <p className="text-[28px] font-bold text-[#1a1a2e] tracking-wider select-all leading-tight">
            {account.accountNumber}
          </p>
        </div>
        <div>
          <p className="text-[12px] text-emerald-700/70">👤 Account Name</p>
          <p className="text-[15px] font-medium text-[#1a1a2e]">{account.accountName}</p>
        </div>
      </div>

      <p className="text-[13px] text-gray-500 mb-6 leading-relaxed">
        Send NGN to this account number from any Nigerian bank to fund your
        Infinitswap wallet instantly.
      </p>

      <a href={waLink} className="inline-block w-full bg-[#25D366] text-white text-[15px] font-semibold rounded-xl py-3.5 text-center hover:bg-[#1fba58] transition-colors">
        Return to WhatsApp →
      </a>
      <p className="text-[12px] text-gray-400 mt-3">You can close this page after tapping above.</p>
    </div>
  );
}

function BvnForm({ token }: { token: string }) {
  const waLink = `https://wa.me/${WA_BUSINESS_NUMBER}?text=${encodeURIComponent("I just linked my BVN/NIN.")}`;

  const [docType,  setDocType]  = useState("");
  const [idNumber, setIdNumber] = useState("");
  const [state,    setState]    = useState<"idle"|"submitting">("idle");
  const [error,    setError]    = useState("");
  const [showId,   setShowId]   = useState(false);
  const [account,  setAccount]  = useState<AccountDetails | null>(null);

  const selectedHint = ID_TYPES.find(t => t.value === docType)?.hint ?? "";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (state === "submitting") return;
    if (!docType) { setError("Please select an ID type."); return; }

    const clientError = validateIdClientSide(docType, idNumber);
    if (clientError) { setError(clientError); return; }

    setState("submitting");
    setError("");

    const body = new URLSearchParams({
      token,
      docType,
      idNumber: idNumber.trim(),
    });

    try {
      const res  = await fetch(`${API_BASE}/kyc/submit-bvn`, {
        method:  "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body:    body.toString(),
      });
      const data = await res.json();
      if (data.success) {
        setAccount({
          accountNumber: data.accountNumber,
          bankName:      data.bankName,
          accountName:   data.accountName,
        });
      } else {
        setError(data.message || "We couldn't verify that number. Please check it and try again.");
        setState("idle");
      }
    } catch {
      setError("Network error — please check your connection and try again.");
      setState("idle");
    }
  };

  if (account) return <AccountReadyScreen account={account} waLink={waLink} />;

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h2 className="text-[18px] font-semibold text-[#1a1a2e]">Link Your BVN or NIN</h2>

      <div className="bg-blue-50 border border-blue-100 rounded-xl p-3.5 text-[13px] text-blue-700 leading-relaxed">
        🏦 This gives you a permanent Infinitswap bank account number.
        Send NGN from any Nigerian bank — your balance updates in seconds.
      </div>

      <div>
        <label className="block text-[13px] font-medium text-gray-600 mb-1.5">ID Type</label>
        <select required value={docType} onChange={e => { setDocType(e.target.value); setIdNumber(""); setError(""); }}
          className="w-full px-3.5 py-3 border-[1.5px] border-gray-200 rounded-xl text-[15px] text-gray-900 outline-none focus:border-indigo-500 transition-colors bg-white">
          <option value="">Select document type</option>
          {ID_TYPES.map(t => (
            <option key={t.value} value={t.value}>{t.label}</option>
          ))}
        </select>
        {selectedHint && (
          <p className="text-[11px] text-gray-400 mt-1.5 pl-1">💡 {selectedHint}</p>
        )}
      </div>

      <div>
        <label className="block text-[13px] font-medium text-gray-600 mb-1.5">ID Number</label>
        <div className="relative">
          <input
            type={showId ? "text" : "password"}
            required
            value={idNumber}
            onChange={e => { setIdNumber(e.target.value); setError(""); }}
            placeholder="Enter your BVN or NIN"
            autoComplete="off"
            spellCheck={false}
            inputMode="numeric"
            className="w-full px-3.5 py-3 pr-14 border-[1.5px] border-gray-200 rounded-xl text-[15px] text-gray-900 outline-none focus:border-indigo-500 transition-colors tracking-wider"
          />
          <button
            type="button"
            onClick={() => setShowId(s => !s)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-[12px] font-medium text-indigo-500 hover:text-indigo-700"
            tabIndex={-1}
          >
            {showId ? "Hide" : "Show"}
          </button>
        </div>
        <p className="text-[11px] text-gray-400 mt-1.5 pl-1">
          🔒 Masked by default — tap "Show" only if you need to double-check what you typed.
        </p>
      </div>

      {error && (
        <p className="text-[13px] text-red-600 bg-red-50 border border-red-200 rounded-xl p-3 leading-relaxed">
          ⚠️ {error}
        </p>
      )}

      <button type="submit" disabled={state === "submitting"}
        className="w-full bg-indigo-500 hover:bg-indigo-600 disabled:bg-indigo-300 disabled:cursor-not-allowed text-white font-semibold text-[16px] rounded-xl py-3.5 transition-colors mt-1">
        {state === "submitting" ? "Setting up your account…" : "Link & Create My Account"}
      </button>

      <p className="text-[12px] text-gray-400 text-center">🔐 256-bit encrypted · ID not stored after verification</p>
    </form>
  );
}

function BvnPageInner() {
  const params = useSearchParams();
  const token  = params.get("token") || "";

  if (!token) {
    return <KycCard><ErrorScreen message="Missing link. Return to WhatsApp and type *account number* to get a new link." /></KycCard>;
  }

  return (
    <KycCard>
      <BvnForm token={token} />
    </KycCard>
  );
}

export default function BvnPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-[#f0f4f8] flex items-center justify-center">
        <p className="text-gray-400 text-sm">Loading…</p>
      </div>
    }>
      <BvnPageInner />
    </Suspense>
  );
}
