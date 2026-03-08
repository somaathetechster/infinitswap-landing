'use client';
import { motion, useAnimation, useInView } from 'framer-motion';
import { useEffect, useRef } from 'react';

// ==================== CHAT SEQUENCE DATA ====================
const chatSequence = [
  { id: 1, type: 'user', text: "Hey! I need to swap 50 USDT.", delay: 0.5 },
  { id: 2, type: 'bot', text: "Welcome back! The current rate is 1,520 NGN. You will receive 76,000 NGN.", delay: 1.5 },
  { id: 3, type: 'bot', text: "Please send exactly 50 USDT (TRC20) to this address:", delay: 2.5 },
  { id: 4, type: 'bot-address', text: "TXYZ1234567890abcdef", delay: 3.0 },
  { id: 5, type: 'user', text: "Done. Just sent it.", delay: 5.0 },
  { id: 6, type: 'bot-success', text: "✅ Payment Received! 76,000 NGN has been instantly credited to your Access Bank account.", delay: 6.5 }
];

export default function AssistantVisual() {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: false, amount: 0.5 });
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    } else {
      controls.start("hidden");
    }
  }, [isInView, controls]);

  return (
    <div className="w-full flex justify-center items-center py-10 perspective-[1000px]">
      
      {/* PHONE CONTAINER / MOCKUP */}
      <motion.div 
        ref={containerRef}
        initial={{ rotateX: 10, y: 50, opacity: 0, boxShadow: "0px 0px 0px rgba(0,0,0,0)" }}
        animate={{ rotateX: 0, y: 0, opacity: 1, boxShadow: "0px 25px 50px -12px rgba(8, 39, 220, 0.15)" }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="w-full max-w-[380px] bg-[#f0f2f5] rounded-[2.5rem] overflow-hidden border-[6px] border-white shadow-2xl relative"
      >
        
        {/* WHATSAPP HEADER */}
        <div className="bg-[#075e54] text-white px-6 py-4 flex items-center gap-4 z-10 relative shadow-sm">
          <div className="relative">
            <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center font-bold text-[#075e54]">
              IS
            </div>
            <span className="absolute bottom-0 right-0 w-3 h-3 bg-[#25d366] border-2 border-[#075e54] rounded-full animate-pulse"></span>
          </div>
          <div>
            <h3 className="font-display font-semibold text-lg leading-tight">Infinitswap Bot</h3>
            <p className="font-body text-xs text-white/80">Always online</p>
          </div>
        </div>

        {/* CHAT BACKGROUND PATTERN */}
        <div className="absolute inset-0 opacity-5 pointer-events-none mix-blend-multiply" 
             style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', backgroundSize: '20px 20px', top: '70px' }} />

        {/* CHAT AREA */}
        <div className="p-5 flex flex-col gap-3 h-[450px] overflow-hidden relative z-10">
          {chatSequence.map((msg, index) => {
            
            // Bubble Styles based on sender type
            const isUser = msg.type === 'user';
            const isAddress = msg.type === 'bot-address';
            const isSuccess = msg.type === 'bot-success';
            
            return (
              <motion.div
                key={msg.id}
                custom={msg.delay}
                initial="hidden"
                animate={controls}
                variants={{
                  hidden: { opacity: 0, y: 20, scale: 0.95, originX: isUser ? 1 : 0 },
                  visible: (delay) => ({
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    transition: { delay, duration: 0.4, type: "spring", stiffness: 200, damping: 20 }
                  })
                }}
                className={`max-w-[85%] rounded-2xl px-4 py-2 shadow-sm text-sm font-body ${
                  isUser 
                    ? 'self-end bg-[#dcf8c6] text-black rounded-tr-sm' 
                    : isAddress
                    ? 'self-start bg-white text-black font-mono text-[11px] rounded-tl-sm border-l-4 border-infinite-blue select-all'
                    : isSuccess
                    ? 'self-start bg-white text-black rounded-tl-sm border-l-4 border-[#25d366]'
                    : 'self-start bg-white text-black rounded-tl-sm'
                }`}
              >
                {/* Optional sender name for bot */}
                {!isUser && !isAddress && !isSuccess && index !== 2 && (
                  <span className="block text-xs font-bold text-[#075e54] mb-1">Infinitswap</span>
                )}
                
                <p className="leading-relaxed">
                  {msg.text}
                </p>
                
                {/* Fake timestamp */}
                <span className={`block text-[9px] mt-1 text-right ${isUser ? 'text-black/40' : 'text-black/30'}`}>
                  Just now
                </span>
              </motion.div>
            );
          })}
        </div>

        {/* FAKE INPUT AREA */}
        <div className="bg-white p-3 flex items-center gap-3 z-10 relative border-t border-black/5">
          <div className="w-8 h-8 rounded-full bg-black/5 flex items-center justify-center">
             <span className="text-lg">＋</span>
          </div>
          <div className="flex-1 bg-[#f0f2f5] rounded-full h-10 px-4 flex items-center">
            <span className="text-black/30 font-body text-sm animate-pulse">Type a message...</span>
          </div>
          <div className="w-10 h-10 rounded-full bg-[#075e54] flex items-center justify-center text-white">
             <svg className="w-4 h-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
             </svg>
          </div>
        </div>

      </motion.div>
    </div>
  );
}