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
  start: 'Hi, I want to get started',
  savings: 'Hi, I want to start a savings goal',
  bills: 'Hi, I want to pay a bill',
  rewards: 'Hi, I want to know about rewards and referrals',
  swapSell: 'Hi, I want to sell USDT for local currency',
  swapBuy: 'Hi, I want to buy USDT with local currency',
} as const;
