/**
 * apps/web/lib/campus-ambassador.ts
 *
 * Single source of truth for the Campus Ambassador application shape.
 * Shared by the form page (app/campusambassador/page.tsx) and the mail
 * route (app/api/contact/campus-ambassador/route.ts) so the labels in the
 * email are always the exact questions the applicant answered.
 */

export type FieldKind = "text" | "email" | "tel" | "textarea" | "radio";

export type Field = {
  /** Key in the submitted payload. */
  name: string;
  label: string;
  kind: FieldKind;
  required?: boolean;
  placeholder?: string;
  hint?: string;
  options?: string[];
  /** Only rendered / required when the named field equals this value. */
  showWhen?: { field: string; equals: string };
};

export type Section = {
  title: string;
  blurb?: string;
  fields: Field[];
};

export const SECTIONS: Section[] = [
  {
    title: "Personal Info",
    fields: [
      {
        name: "fullName",
        label: "Full Name",
        kind: "text",
        required: true,
        placeholder: "Your full name",
      },
      {
        name: "university",
        label: "University, Course/Department, and Current Level",
        kind: "text",
        required: true,
        placeholder: "e.g. University of Lagos — Economics, 300 Level",
      },
      {
        name: "email",
        label: "Email Address",
        kind: "email",
        required: true,
        placeholder: "you@example.com",
      },
      {
        name: "phone",
        label: "Phone / WhatsApp Number",
        kind: "tel",
        required: true,
        placeholder: "e.g. +234 801 234 5678",
      },
      {
        name: "socials",
        label: "Social handles — Instagram, X, LinkedIn, TikTok",
        kind: "text",
        placeholder: "@yourhandle, @yourhandle, linkedin.com/in/you …",
        hint: "Optional, but it helps us see how you show up online.",
      },
    ],
  },
  {
    title: "Web3 & Industry Knowledge",
    fields: [
      {
        name: "experience",
        label: "How long have you been involved in Web3/crypto/fintech/blockchain?",
        kind: "radio",
        required: true,
        options: [
          "Less than 6 months",
          "6–12 months",
          "1–2 years",
          "2+ years",
          "I am completely new to Web3",
        ],
      },
      {
        name: "communities",
        label:
          "Which Web3/crypto/fintech communities or student organizations are you currently in?",
        kind: "textarea",
        required: true,
      },
      {
        name: "web3Understanding",
        label: "In your own words, what is Web3 and what do you understand about the ecosystem?",
        kind: "textarea",
        required: true,
      },
      {
        name: "aboutInfinitswap",
        label: "What do you know about Infinitswap, and what interests you about becoming an ambassador?",
        kind: "textarea",
        required: true,
      },
    ],
  },
  {
    title: "Campus Network & Community Experience",
    fields: [
      {
        name: "whyGoodRep",
        label: "Why would you be a good representative of Infinitswap on your campus?",
        kind: "textarea",
        required: true,
      },
      {
        name: "campusNetworks",
        label:
          "What student communities, clubs, or networks can you connect Infinitswap with on your campus?",
        kind: "textarea",
        required: true,
      },
      {
        name: "hasOrganized",
        label:
          "Have you ever organized, promoted, or participated in a campus event or community activity?",
        kind: "radio",
        required: true,
        options: ["Yes", "No"],
      },
      {
        name: "eventDetails",
        label: "Describe the event, your role, and the outcome",
        kind: "textarea",
        required: true,
        showWhen: { field: "hasOrganized", equals: "Yes" },
      },
    ],
  },
  {
    title: "Strategy, Events & Execution",
    fields: [
      {
        name: "introPitch",
        label: "How would you introduce Infinitswap to students who've never heard of it?",
        kind: "textarea",
        required: true,
      },
      {
        name: "eventPlan",
        label: "How would you organize a local Infinitswap campus event?",
        kind: "textarea",
        required: true,
        hint: "Venue, promotion, student orgs, execution.",
      },
      {
        name: "creativeIdea",
        label: "Share one creative idea for an Infinitswap campus activation",
        kind: "textarea",
        required: true,
      },
      {
        name: "thirtyDayPlan",
        label:
          "If given one month as an ambassador, what specific actions would you take and what results would you aim for?",
        kind: "textarea",
        required: true,
      },
    ],
  },
  {
    title: "Final Section",
    fields: [
      {
        name: "whyYou",
        label: "Why should we choose YOU?",
        kind: "textarea",
        required: true,
        hint: "Tell us about your network, experience, creativity, Web3 knowledge, and leadership.",
      },
    ],
  },
];

export const ALL_FIELDS: Field[] = SECTIONS.flatMap((s) => s.fields);

export type Application = Record<string, string>;

/** True when a conditional field's controlling answer is currently satisfied. */
export function isVisible(field: Field, values: Application): boolean {
  if (!field.showWhen) return true;
  return values[field.showWhen.field] === field.showWhen.equals;
}

/**
 * Shared validation — the form calls it before submitting, the route calls it
 * again so the API can't be used to drop half-empty applications on the team.
 * Returns the name of the first missing required field, or null.
 */
export function firstMissingField(values: Application): Field | null {
  for (const field of ALL_FIELDS) {
    if (!field.required || !isVisible(field, values)) continue;
    if (!(values[field.name] ?? "").trim()) return field;
  }
  return null;
}

/** Loose shape check — enough to catch typos without rejecting valid addresses. */
export function isValidEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
}
