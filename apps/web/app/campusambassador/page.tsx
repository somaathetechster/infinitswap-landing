"use client";

/**
 * apps/web/app/campusambassador/page.tsx
 *
 * Public Campus Ambassador application form.
 *
 * Mirrors app/account-recovery/page.tsx — same card shell, same field,
 * label, error and success treatment — so every public form on the site
 * behaves identically. The questions themselves live in
 * lib/campus-ambassador.ts, shared with the mail route so the email is
 * labelled with the exact questions asked here.
 */

import { useState } from "react";
import {
  SECTIONS,
  firstMissingField,
  isVisible,
  type Application,
  type Field,
} from "../../lib/campus-ambassador";

const INPUT_CLASS =
  "w-full px-3.5 py-3 border-[1.5px] border-gray-200 rounded-xl text-[15px] text-gray-900 outline-none focus:border-[#0827dc] transition-colors";

function ApplicationCard({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#f0f4f8] flex items-start justify-center p-4 py-12">
      <div className="w-full max-w-[560px] bg-white rounded-2xl shadow-[0_4px_32px_rgba(0,0,0,0.10)] p-8">
        <div className="mb-6">
          <p className="text-[22px] font-bold text-[#1a1a2e] leading-none">Infinitswap</p>
          <p className="text-[13px] text-gray-400 mt-1">Campus Ambassador Programme</p>
        </div>
        {children}
      </div>
    </div>
  );
}

function SuccessScreen() {
  return (
    <div className="text-center py-6">
      <div className="text-5xl mb-4">🎓</div>
      <h3 className="text-[18px] font-semibold text-emerald-600 mb-2">Application Received</h3>
      <p className="text-[14px] text-gray-500 mb-6 leading-relaxed">
        Thanks for applying to the Infinitswap Campus Ambassador Programme. Our team reviews every
        application — if you're a fit, we'll reach out on the number you gave us.
      </p>
      <a
        href="/"
        className="inline-block w-full bg-[#0827dc] text-white text-[15px] font-semibold rounded-xl py-3.5 text-center hover:bg-[#0620b4] transition-colors"
      >
        Back to Infinitswap →
      </a>
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

function FieldRow({
  field,
  value,
  onChange,
}: {
  field: Field;
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div>
      <label className="block text-[13px] font-medium text-gray-600 mb-1.5">
        {field.label}{" "}
        {field.required ? (
          <span className="text-red-400">*</span>
        ) : (
          <span className="text-gray-400">(optional)</span>
        )}
      </label>

      {field.kind === "textarea" && (
        <textarea
          rows={4}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={field.placeholder}
          className={`${INPUT_CLASS} resize-none`}
        />
      )}

      {field.kind === "radio" && (
        <div className="space-y-2 mt-2">
          {field.options?.map((option) => (
            <label key={option} className="flex items-center gap-2.5 cursor-pointer">
              <input
                type="radio"
                name={field.name}
                value={option}
                checked={value === option}
                onChange={() => onChange(option)}
                className="w-4 h-4 accent-[#0827dc]"
              />
              <span className="text-[14px] text-gray-700 leading-relaxed">{option}</span>
            </label>
          ))}
        </div>
      )}

      {(field.kind === "text" || field.kind === "tel") && (
        <input
          type={field.kind}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={field.placeholder}
          autoComplete={field.name === "fullName" ? "name" : field.kind === "tel" ? "tel" : "off"}
          className={INPUT_CLASS}
        />
      )}

      {field.hint && <p className="text-[11px] text-gray-400 mt-1.5 pl-1">💡 {field.hint}</p>}
    </div>
  );
}

export default function CampusAmbassadorPage() {
  const [values, setValues] = useState<Application>({});
  const [state, setState] = useState<"idle" | "submitting" | "success">("idle");
  const [error, setError] = useState("");

  const setValue = (name: string, value: string) => {
    setValues((prev) => ({ ...prev, [name]: value }));
    setError("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (state === "submitting") return;

    const missing = firstMissingField(values);
    if (missing) return setError(`Please answer: ${missing.label}`);

    setState("submitting");
    setError("");

    try {
      const res = await fetch("/api/contact/campus-ambassador", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      const data = await res.json();
      if (data.success) {
        setState("success");
      } else {
        setError(data.message || "Submission failed. Please check your answers and try again.");
        setState("idle");
      }
    } catch {
      setError("Network error — please check your connection and try again.");
      setState("idle");
    }
  };

  if (state === "success")
    return (
      <ApplicationCard>
        <SuccessScreen />
      </ApplicationCard>
    );

  return (
    <ApplicationCard>
      <form onSubmit={handleSubmit} noValidate className="space-y-4">
        <div>
          <span className="inline-block bg-[#0827dc]/8 border border-[#0827dc]/20 text-[#0827dc] text-[12px] font-semibold rounded-md px-2.5 py-1 mb-3">
            Applications Open
          </span>
          <h2 className="text-[18px] font-semibold text-[#1a1a2e]">Become a Campus Ambassador 🎓</h2>
          <p className="text-[13px] text-gray-500 mt-1.5 leading-relaxed">
            Represent Infinitswap on your campus — run events, grow a community, and help students
            hold, save, spend, and swap money from one WhatsApp chat.
          </p>
        </div>

        {SECTIONS.map((section, index) => (
          <div key={section.title} className={index === 0 ? "" : "border-t border-gray-100 pt-4"}>
            <p className="text-[13px] font-semibold text-[#1a1a2e] mb-3">{section.title}</p>
            <div className="space-y-4">
              {section.fields
                .filter((field) => isVisible(field, values))
                .map((field) => (
                  <FieldRow
                    key={field.name}
                    field={field}
                    value={values[field.name] ?? ""}
                    onChange={(v) => setValue(field.name, v)}
                  />
                ))}
            </div>
          </div>
        ))}

        <ErrorBanner message={error} />

        <button
          type="submit"
          disabled={state === "submitting"}
          className="w-full bg-[#0827dc] hover:bg-[#0620b4] disabled:bg-[#0827dc]/40 disabled:cursor-not-allowed text-white font-semibold text-[16px] rounded-xl py-3.5 transition-colors mt-1"
        >
          {state === "submitting" ? "Submitting…" : "Submit Application"}
        </button>

        <p className="text-[12px] text-gray-400 text-center">
          Reviewed by the Infinitswap team · We only contact shortlisted applicants
        </p>
      </form>
    </ApplicationCard>
  );
}
