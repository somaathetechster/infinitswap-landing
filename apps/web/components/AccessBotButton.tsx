'use client';
import { motion } from 'framer-motion';

export default function AccessBotButton() {
  // Replace with your actual WhatsApp Business Number (international format, no + or 00)
  const WHATSAPP_NUMBER = "447860028474"; 
  
  // High-standard pre-filled message to trigger the AI Intelligence layer
  const INITIAL_INTENT = "Hello Infinitswap. Activate my gateway; let’s begin the smooth exchange journey between crypto and fiat.";
  const encodedMessage = encodeURIComponent(INITIAL_INTENT);
  
  const botUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`;

  return (
    <motion.a
      href={botUrl}
      target="_blank"
      rel="noopener noreferrer"
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className="inline-flex items-center gap-3 px-8 py-4 bg-ink-black text-parchment font-display text-sm uppercase tracking-widest hover:bg-infinite-blue transition-all duration-300 group"
    >
      <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
      |Launch Interface|
      <svg 
        className="w-4 h-4 group-hover:translate-x-1 transition-transform" 
        fill="none" viewBox="0 0 24 24" stroke="currentColor"
      >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
      </svg>
    </motion.a>
  );
}