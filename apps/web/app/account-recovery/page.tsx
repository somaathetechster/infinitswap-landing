"use client";

/**
 * apps/web/app/account-recovery/page.tsx
 *
 * Public account recovery request form.
 *
 * Two entry points:
 *  1. FAQ / "Lost access to WhatsApp?" link on the marketing site — no
 *     query params, user fills in everything manually.
 *  2. A deep link sent by the WhatsApp bot from the *new* number, e.g.
 *     /account-recovery?token=...&newNumber=234801234567&country=NG
 *     which prefills the new number and country so the user only has to
 *     confirm their old number and identity.
 *
 * This intentionally mirrors app/kyc/page.tsx (same card shell, same
 * COUNTRY_CONFIG-driven ID type + validateIdClientSide) so identity
 * verification behaves identically everywhere in the product, and reuses
 * the same masked-input pattern for sensitive ID numbers.
 */

import { useRef, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { COUNTRY_CONFIG, validateIdClientSide } from "../../lib/identity-verification";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "https://infinitswap-api.onrender.com";
const WA_BUSINESS_NUMBER = "447860028474";

const REASONS = [
  { value: "LOST_SIM", label: "Lost SIM" },
  { value: "CHANGED_NUMBER", label: "Changed Phone Number" },
  { value: "STOLEN_PHONE", label: "Stolen Phone" },
  { value: "DAMAGED_PHONE", label: "Damaged Phone" },
  { value: "WHATSAPP_LOST", label: "WhatsApp Account Lost" },
  { value: "OTHER", label: "Other" },
];

function RecoveryCard({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#f0f4f8] flex items-center justify-center p-4">
      <div className="w-full max-w-[480px] bg-white rounded-2xl shadow-[0_4px_32px_rgba(0,0,0,0.10)] p-8">
        <div className="mb-6">
          <p className="text-[22px] font-bold text-[#1a1a2e] leading-none">Infinitswap</p>
          <p className="text-[13px] text-gray-400 mt-1">Account Recovery</p>
        </div>
        {children}
      </div>
    </div>
  );
}

function SuccessScreen({ reference, waLink }: { reference: string; waLink: string }) {
  return (
    <div className="text-center py-6">
      <div className="text-5xl mb-4">✅</div>
      <h3 className="text-[18px] font-semibold text-emerald-600 mb-2">Recovery Request Received</h3>
      <p className="text-[14px] text-gray-500 mb-1 leading-relaxed">
        Our team will review your request and contact you if additional verification is required.
      </p>
      <div className="bg-gray-50 border border-gray-200 rounded-xl py-3 my-4">
        <p className="text-[11px] text-gray-400 uppercase tracking-wide">Reference ID</p>
        <p className="text-[16px] font-semibold text-[#1a1a2e] tracking-wide">{reference}</p>
      </div>
      <p className="text-[13px] text-gray-500 mb-6 leading-relaxed">
        Once approved, message us again on your <strong>new</strong> WhatsApp number and we'll reconnect your
        account automatically.
      </p>
      <a
        href={waLink}
        className="inline-block w-full bg-[#25D366] text-white text-[15px] font-semibold rounded-xl py-3.5 text-center hover:bg-[#1fba58] transition-colors"
      >
        Return to WhatsApp →
      </a>
      <p className="text-[12px] text-gray-400 mt-3">Keep your reference ID — you can save this page too.</p>
    </div>
  );
}

function ErrorBanner({ message }: { message: string }) {
  if (!message) return null;
  return (
    <p className="text-[13px] text-red-600 bg-red-50 border border-red-200 rounded-xl p-3 leading-relaxed">
      ⚠️ {message}
    </p>
  );
}

function FileDrop({
  label,
  hint,
  required,
  file,
  onChange,
}: {
  label: string;
  hint?: string;
  required?: boolean;
  file: File | null;
  onChange: (f: File | null) => void;
}) {
  const ref = useRef<HTMLInputElement>(null);
  return (
    <div>
      <label className="block text-[13px] font-medium text-gray-600 mb-1.5">
        {label} {required && <span className="text-red-400">*</span>}
      </label>
      <div
        onClick={() => ref.current?.click()}
        className="w-full px-3.5 py-3 border-[1.5px] border-dashed border-gray-300 rounded-xl bg-gray-50 cursor-pointer hover:bg-gray-100 transition-colors"
      >
        <p className="text-[14px] text-gray-500 text-center">{file ? `✅ ${file.name}` : "Tap to select file"}</p>
      </div>
      {hint && <p className="text-[11px] text-gray-400 mt-1.5 pl-1">💡 {hint}</p>}
      <input
        ref={ref}
        type="file"
        className="hidden"
        accept=".pdf,.jpg,.jpeg,.png"
        onChange={(e) => onChange(e.target.files?.[0] ?? null)}
      />
    </div>
  );
}

function RecoveryForm({
  token,
  prefillNewNumber,
  prefillCountry,
}: {
  token: string;
  prefillNewNumber: string;
  prefillCountry: string;
}) {
  const waLink = `https://wa.me/${WA_BUSINESS_NUMBER}?text=${encodeURIComponent(
    "I just submitted an account recovery request."
  )}`;

  const [fullName, setFullName] = useState("");
  const [oldNumber, setOldNumber] = useState("");
  const [newNumber, setNewNumber] = useState(prefillNewNumber);
  const [email, setEmail] = useState("");
  const [countryCode, setCountryCode] = useState(prefillCountry || "NG");
  const [reason, setReason] = useState("");
  const [description, setDescription] = useState("");

  const [docType, setDocType] = useState("");
  const [idNumber, setIdNumber] = useState("");
  const [showId, setShowId] = useState(false);

  const [govIdFile, setGovIdFile] = useState<File | null>(null);
  const [selfieFile, setSelfieFile] = useState<File | null>(null);
  const [extraFile, setExtraFile] = useState<File | null>(null);

  const [confirmed, setConfirmed] = useState(false);
  const [state, setState] = useState<"idle" | "submitting" | "success">("idle");
  const [error, setError] = useState("");
  const [reference, setReference] = useState("");

  const config = COUNTRY_CONFIG[countryCode] ?? COUNTRY_CONFIG["NG"]!;
  const idTypes = config.tier1;
  const selectedHint = idTypes.find((t) => t.value === docType)?.hint ?? "";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (state === "submitting") return;

    if (!oldNumber.trim()) return setError("Please enter the WhatsApp number your account is currently linked to.");
    if (!newNumber.trim()) return setError("Please enter the new WhatsApp number you want to use.");
    if (oldNumber.trim() === newNumber.trim())
      return setError("Old and new numbers can't be the same. If you still have access to this number, no recovery is needed.");
    if (!docType) return setError("Please select an ID type.");

    const clientError = validateIdClientSide(docType, idNumber);
    if (clientError) return setError(clientError);
    if (!govIdFile) return setError("Please upload a photo or scan of your government ID.");
    if (!confirmed) return setError("Please confirm that the information provided is accurate.");

    setState("submitting");
    setError("");

    const formData = new FormData();
    formData.append("token", token);
    formData.append("fullName", fullName.trim());
    formData.append("oldWhatsapp", oldNumber.trim());
    formData.append("newWhatsapp", newNumber.trim());
    formData.append("email", email.trim());
    formData.append("country", countryCode);
    formData.append("reason", reason);
    formData.append("description", description.trim());
    formData.append("docType", docType);
    formData.append("idNumber", idNumber.trim());
    formData.append("governmentId", govIdFile);
    if (selfieFile) formData.append("selfie", selfieFile);
    if (extraFile) formData.append("extraDocument", extraFile);

    try {
      const res = await fetch(`${API_BASE}/recovery/submit`, { method: "POST", body: formData });
      const data = await res.json();
      if (data.success) {
        setReference(data.referenceNumber);
        setState("success");
      } else {
        setError(data.message || "Submission failed. Please check your details and try again.");
        setState("idle");
      }
    } catch {
      setError("Network error — please check your connection and try again.");
      setState("idle");
    }
  };

  if (state === "success") return <SuccessScreen reference={reference} waLink={waLink} />;

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <span className="inline-block bg-amber-50 border border-amber-200 text-amber-700 text-[12px] font-semibold rounded-md px-2.5 py-1 mb-3">
          Lost Access to WhatsApp?
        </span>
        <h2 className="text-[18px] font-semibold text-[#1a1a2e]">Recover Your Account 🔐</h2>
        <p className="text-[13px] text-gray-500 mt-1.5 leading-relaxed">
          Your balances, savings, and history stay exactly as they are. We're only reconnecting your account to a
          new WhatsApp number, after verifying it's really you.
        </p>
      </div>

      <div className="bg-blue-50 border border-blue-100 rounded-xl p-3.5 text-[13px] text-blue-700 leading-relaxed">
        🔒 This is reviewed by a human before anything changes. No account is transferred automatically.
      </div>

      <div>
        <label className="block text-[13px] font-medium text-gray-600 mb-1.5">Full Legal Name</label>
        <input
          type="text"
          required
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          placeholder="As on your ID"
          autoComplete="name"
          className="w-full px-3.5 py-3 border-[1.5px] border-gray-200 rounded-xl text-[15px] text-gray-900 outline-none focus:border-indigo-500 transition-colors"
        />
      </div>

      <div className="grid grid-cols-1 gap-3">
        <div>
          <label className="block text-[13px] font-medium text-gray-600 mb-1.5">
            Previous WhatsApp Number <span className="text-red-400">*</span>
          </label>
          <input
            type="tel"
            required
            value={oldNumber}
            onChange={(e) => setOldNumber(e.target.value)}
            placeholder="e.g. +234 801 234 5678"
            className="w-full px-3.5 py-3 border-[1.5px] border-gray-200 rounded-xl text-[15px] text-gray-900 outline-none focus:border-indigo-500 transition-colors"
          />
          <p className="text-[11px] text-gray-400 mt-1.5 pl-1">The number your Infinitswap account is currently linked to.</p>
        </div>
        <div>
          <label className="block text-[13px] font-medium text-gray-600 mb-1.5">
            New WhatsApp Number <span className="text-red-400">*</span>
          </label>
          <input
            type="tel"
            required
            value={newNumber}
            onChange={(e) => setNewNumber(e.target.value)}
            placeholder="e.g. +234 809 876 5432"
            className="w-full px-3.5 py-3 border-[1.5px] border-gray-200 rounded-xl text-[15px] text-gray-900 outline-none focus:border-indigo-500 transition-colors"
          />
          <p className="text-[11px] text-gray-400 mt-1.5 pl-1">The number you want to use going forward.</p>
        </div>
      </div>

      <div>
        <label className="block text-[13px] font-medium text-gray-600 mb-1.5">
          Email Address <span className="text-gray-400">(optional but recommended)</span>
        </label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@example.com"
          autoComplete="email"
          className="w-full px-3.5 py-3 border-[1.5px] border-gray-200 rounded-xl text-[15px] text-gray-900 outline-none focus:border-indigo-500 transition-colors"
        />
        <p className="text-[11px] text-gray-400 mt-1.5 pl-1">We'll use this to update you if we can't reach you on WhatsApp.</p>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-[13px] font-medium text-gray-600 mb-1.5">Country</label>
          <select
            required
            value={countryCode}
            onChange={(e) => {
              setCountryCode(e.target.value);
              setDocType("");
              setIdNumber("");
            }}
            className="w-full px-3.5 py-3 border-[1.5px] border-gray-200 rounded-xl text-[15px] text-gray-900 outline-none focus:border-indigo-500 transition-colors bg-white"
          >
            {(Object.entries(COUNTRY_CONFIG) as [string, { label: string }][]).map(([code, c]) => (
              <option key={code} value={code}>
                {c.label}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-[13px] font-medium text-gray-600 mb-1.5">Reason</label>
          <select
            required
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            className="w-full px-3.5 py-3 border-[1.5px] border-gray-200 rounded-xl text-[15px] text-gray-900 outline-none focus:border-indigo-500 transition-colors bg-white"
          >
            <option value="">Select a reason</option>
            {REASONS.map((r) => (
              <option key={r.value} value={r.value}>
                {r.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label className="block text-[13px] font-medium text-gray-600 mb-1.5">Describe what happened</label>
        <textarea
          required
          rows={3}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="e.g. My phone was stolen on 3 August and I've since replaced my SIM with a new number."
          className="w-full px-3.5 py-3 border-[1.5px] border-gray-200 rounded-xl text-[15px] text-gray-900 outline-none focus:border-indigo-500 transition-colors resize-none"
        />
      </div>

      <div className="border-t border-gray-100 pt-4">
        <p className="text-[13px] font-semibold text-[#1a1a2e] mb-3">Confirm your identity</p>

        <div className="mb-3">
          <label className="block text-[13px] font-medium text-gray-600 mb-1.5">ID Type</label>
          <select
            required
            value={docType}
            onChange={(e) => {
              setDocType(e.target.value);
              setIdNumber("");
              setError("");
            }}
            className="w-full px-3.5 py-3 border-[1.5px] border-gray-200 rounded-xl text-[15px] text-gray-900 outline-none focus:border-indigo-500 transition-colors bg-white"
          >
            <option value="">Select document type</option>
            {idTypes.map((t: { value: string; label: string }) => (
              <option key={t.value} value={t.value}>
                {t.label}
              </option>
            ))}
          </select>
          {selectedHint && <p className="text-[11px] text-gray-400 mt-1.5 pl-1">💡 {selectedHint}</p>}
        </div>

        <div className="mb-3">
          <label className="block text-[13px] font-medium text-gray-600 mb-1.5">ID Number</label>
          <div className="relative">
            <input
              type={showId ? "text" : "password"}
              required
              value={idNumber}
              onChange={(e) => {
                setIdNumber(e.target.value);
                setError("");
              }}
              placeholder="Enter your ID number"
              autoComplete="off"
              spellCheck={false}
              inputMode={docType === "BVN" || docType === "NIN" || docType === "SSNIT" ? "numeric" : "text"}
              className="w-full px-3.5 py-3 pr-14 border-[1.5px] border-gray-200 rounded-xl text-[15px] text-gray-900 outline-none focus:border-indigo-500 transition-colors tracking-wider"
            />
            <button
              type="button"
              onClick={() => setShowId((s) => !s)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-[12px] font-medium text-indigo-500 hover:text-indigo-700"
              tabIndex={-1}
            >
              {showId ? "Hide" : "Show"}
            </button>
          </div>
          <p className="text-[11px] text-gray-400 mt-1.5 pl-1">🔒 Masked by default — must match the ID on file for your account.</p>
        </div>

        <div className="space-y-3">
          <FileDrop
            label="Government ID Upload"
            hint="Passport, National ID, or Driver's License"
            required
            file={govIdFile}
            onChange={setGovIdFile}
          />
          <FileDrop label="Selfie" hint="Optional — a clear photo of your face" file={selfieFile} onChange={setSelfieFile} />
          <FileDrop
            label="Additional Supporting Documents"
            hint="Optional — police report, proof of ownership, etc."
            file={extraFile}
            onChange={setExtraFile}
          />
        </div>
      </div>

      <label className="flex items-start gap-2.5 pt-1 cursor-pointer">
        <input
          type="checkbox"
          checked={confirmed}
          onChange={(e) => setConfirmed(e.target.checked)}
          className="mt-0.5 w-4 h-4 accent-indigo-500"
        />
        <span className="text-[13px] text-gray-600 leading-relaxed">I confirm that the information provided is accurate.</span>
      </label>

      <ErrorBanner message={error} />

      <button
        type="submit"
        disabled={state === "submitting"}
        className="w-full bg-indigo-500 hover:bg-indigo-600 disabled:bg-indigo-300 disabled:cursor-not-allowed text-white font-semibold text-[16px] rounded-xl py-3.5 transition-colors mt-1"
      >
        {state === "submitting" ? "Submitting…" : "Submit Recovery Request"}
      </button>

      <p className="text-[12px] text-gray-400 text-center">🔐 256-bit encrypted · Reviewed by a human before any transfer</p>
    </form>
  );
}

function AccountRecoveryInner() {
  const params = useSearchParams();
  const token = params.get("token") || "";
  const newNumber = params.get("newNumber") || "";
  const country = (params.get("country") || "NG").toUpperCase();

  return (
    <RecoveryCard>
      <RecoveryForm token={token} prefillNewNumber={newNumber} prefillCountry={country} />
    </RecoveryCard>
  );
}

export default function AccountRecoveryPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#f0f4f8] flex items-center justify-center">
          <p className="text-gray-400 text-sm">Loading…</p>
        </div>
      }
    >
      <AccountRecoveryInner />
    </Suspense>
  );
} 

// redeploy