// AccessBotButton.tsx

'use client';
import { motion } from 'framer-motion';

export default function AccessBotButton() {
  // Your WhatsApp Business Number
  const WHATSAPP_NUMBER = "447860028474"; 
  
  // A simple, human pre-filled message that users actually understand
  const INITIAL_INTENT = "Hi! I want to swap my crypto for cash.";
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
      {/* Keeping the pulse dot—it adds a great "live" feel */}
      <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
      
      Start on WhatsApp
      
      <svg 
        className="w-4 h-4 group-hover:translate-x-1 transition-transform" 
        fill="none" viewBox="0 0 24 24" stroke="currentColor"
      >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
      </svg>
    </motion.a>
  );
}