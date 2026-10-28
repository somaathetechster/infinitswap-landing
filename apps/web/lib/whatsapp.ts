// Single source of truth for the WhatsApp deep-link CTA pattern.
// Previously duplicated across Hero, AccessBotButton, kyc/page and payment-complete/client.

export const WHATSAPP_NUMBER = '447860028474';

/**
 * Builds a wa.me deep link with a prefilled message.
 * Each product module passes its own prefill so the chat opens in context.
 */
export function waLink(message: string) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

/** Module-specific prefills, kept together so copy stays consistent site-wide. */
export const WA_PREFILL = {
  start: 'Hello, I want to get started',
  bills: 'Hi, I want to pay a bill',
} as const;
