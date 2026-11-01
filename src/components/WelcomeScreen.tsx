import React, { useEffect } from 'react';
import { motion } from 'motion/react';

interface WelcomeScreenProps {
  onComplete: () => void;
  durationMs?: number;
}

export const WelcomeScreen: React.FC<WelcomeScreenProps> = ({
  onComplete,
  durationMs = 2000,
}) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onComplete();
    }, durationMs);

    return () => clearTimeout(timer);
  }, [onComplete, durationMs]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } }}
      onClick={onComplete}
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#FAF7F2] select-none cursor-pointer"
    >
      {/* Subtle Ambient Radial Warmth */}
      <div className="absolute w-[500px] h-[500px] rounded-full bg-[#760D24]/5 blur-3xl pointer-events-none animate-pulse" />

      {/* Centered Gallery Logo Lockup */}
      <motion.div
        initial={{ opacity: 0, scale: 0.88, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="flex flex-col items-center text-center space-y-6 px-6 relative z-10"
      >
        {/* Circular Emblem matching Reference Design */}
        <motion.div
          animate={{ rotate: [0, 1.5, -1.5, 0] }}
          transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }}
          className="relative w-28 h-28 sm:w-32 sm:h-32 rounded-full bg-[#111111] border-[3.5px] border-[#760D24] shadow-2xl flex items-center justify-center p-3 overflow-hidden"
        >
          {/* Inner gold circular accent */}
          <div className="absolute inset-1 rounded-full border border-[#E4C882]/30 pointer-events-none" />

          <div className="text-center">
            <span className="font-serif italic text-2xl sm:text-3xl font-bold text-[#E4C882] tracking-wide block leading-none">
              Dhruva’s
            </span>
            <span className="block text-[8px] sm:text-[9px] uppercase tracking-[0.25em] text-[#EFE7D2] font-sans font-medium mt-1.5">
              Art Studio N Gallery
            </span>
          </div>
        </motion.div>

        {/* Serif Wordmark & Location */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.25 }}
          className="space-y-1.5"
        >
          <h1 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight text-[#1C1917] leading-none">
            Dhruva’s
          </h1>
          <p className="text-[11px] sm:text-xs font-sans uppercase tracking-[0.3em] text-[#57534E] font-semibold">
            Art Studio N Gallery
          </p>
          <div className="pt-2 flex items-center justify-center gap-2 text-[10px] tracking-widest text-[#760D24] uppercase font-semibold">
            <span>Raipur</span>
            <span>•</span>
            <span>Chhattisgarh</span>
          </div>
        </motion.div>

        {/* Minimal progress pulse indicator */}
        <motion.div
          initial={{ width: 0, opacity: 0 }}
          animate={{ width: 64, opacity: 1 }}
          transition={{ duration: 1.8, ease: 'easeInOut' }}
          className="h-[1.5px] bg-[#760D24] rounded-full mt-4"
        />
      </motion.div>
    </motion.div>
  );
};
