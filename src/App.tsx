import { useState, useEffect, type MouseEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Mail, Heart, Sparkles, X, HeartHandshake, Music, VolumeX, Volume2, Sparkle } from 'lucide-react';
import { musicBox } from './utils/musicBox';

const RECIPIENT = "Nini";
const LETTER_DATE = "September 3, 2026";
const NOTE_TEXT =
  "Dearest Nini, I just wanted to send a little sunshine your way today. You make every moment brighter just by being you. Thank you for the laughs, the late-night talks, and for always knowing how to make me smile. You are truly special to me.";

export default function App() {
  const [isOpen, setIsOpen] = useState(false);
  const [showHugPopup, setShowHugPopup] = useState(false);
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);
  const [isHoveredSeal, setIsHoveredSeal] = useState(false);
  const [floatingHearts, setFloatingHearts] = useState<{ id: number; x: number; size: number; duration: number; delay: number }[]>([]);

  // Generate subtle background ambient floating elements
  useEffect(() => {
    const hearts = Array.from({ length: 9 }, (_, i) => ({
      id: i,
      x: Math.floor(Math.random() * 90) + 5,
      size: Math.floor(Math.random() * 10) + 12,
      duration: Math.floor(Math.random() * 6) + 8,
      delay: Math.random() * 3,
    }));
    setFloatingHearts(hearts);

    return () => {
      musicBox.pause();
    };
  }, []);

  const handleOpenLetter = () => {
    setIsOpen(true);
    musicBox.play();
    setIsMusicPlaying(true);
  };

  const handleCloseLetter = () => {
    setIsOpen(false);
    setShowHugPopup(false);
  };

  const toggleMusic = (e: MouseEvent) => {
    e.stopPropagation();
    const playing = musicBox.toggle();
    setIsMusicPlaying(playing);
  };

  return (
    <div 
      id="love-letter-app" 
      className="min-h-screen w-full vintage-letter-bg flex flex-col items-center justify-center p-4 sm:p-8 relative overflow-hidden selection:bg-[#ffe4e6] selection:text-[#881337]"
    >
      {/* Background Decorative Vintage Postal Markings */}
      <div className="absolute top-6 left-6 pointer-events-none opacity-40 select-none hidden sm:block">
        <div className="border border-[#fb7185]/40 rounded-full w-24 h-24 flex flex-col items-center justify-center text-[#fb7185] rotate-[-12deg]">
          <span className="text-[9px] uppercase tracking-widest font-bold font-nunito">AIR MAIL</span>
          <span className="text-xs font-artistic-serif italic">Special Delivery</span>
          <span className="text-[8px] tracking-wider text-[#881337]">SEPTEMBER 3</span>
        </div>
      </div>

      <div className="absolute bottom-6 right-6 pointer-events-none opacity-30 select-none hidden sm:block">
        <div className="border-2 border-dashed border-[#fb7185]/40 rounded-2xl w-28 h-20 flex flex-col items-center justify-center text-[#fb7185] rotate-[8deg]">
          <Heart size={16} fill="currentColor" className="text-[#fb7185]/60 mb-1" />
          <span className="text-[8px] uppercase tracking-widest font-bold font-nunito">PAR AVION</span>
          <span className="text-[8px] font-artistic-serif italic">With Love & Care</span>
        </div>
      </div>

      {/* Floating Music Box Toggle Button */}
      <motion.button
        id="music-toggle-button"
        type="button"
        onClick={toggleMusic}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.92 }}
        className="fixed top-4 right-4 z-40 bg-white/90 backdrop-blur-sm border border-[#ffe4e6] px-3.5 py-2 rounded-full shadow-md text-[#fb7185] hover:text-[#e11d48] flex items-center gap-2 text-xs sm:text-sm font-medium transition-colors cursor-pointer"
        title={isMusicPlaying ? 'Mute romantic background music' : 'Play romantic background music'}
      >
        {isMusicPlaying ? (
          <>
            <div className="flex items-end gap-0.5 h-3.5">
              <motion.span
                animate={{ height: ['40%', '100%', '60%'] }}
                transition={{ duration: 0.8, repeat: Infinity, ease: 'easeInOut' }}
                className="w-0.5 bg-[#fb7185] rounded-full"
              />
              <motion.span
                animate={{ height: ['80%', '30%', '90%'] }}
                transition={{ duration: 0.7, repeat: Infinity, ease: 'easeInOut', delay: 0.2 }}
                className="w-0.5 bg-[#fb7185] rounded-full"
              />
              <motion.span
                animate={{ height: ['50%', '90%', '40%'] }}
                transition={{ duration: 0.9, repeat: Infinity, ease: 'easeInOut', delay: 0.4 }}
                className="w-0.5 bg-[#fb7185] rounded-full"
              />
            </div>
            <span>Music Playing</span>
            <Volume2 size={15} />
          </>
        ) : (
          <>
            <Music size={15} />
            <span>Music Off</span>
            <VolumeX size={15} className="text-stone-400" />
          </>
        )}
      </motion.button>

      {/* Subtle Ambient Floating Hearts */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
        {floatingHearts.map((heart) => (
          <motion.div
            key={heart.id}
            initial={{ y: '110vh', opacity: 0 }}
            animate={{ 
              y: '-10vh', 
              opacity: [0, 0.35, 0.35, 0],
              x: [`${heart.x}vw`, `${heart.x + (heart.id % 2 === 0 ? 2 : -2)}vw`]
            }}
            transition={{
              duration: heart.duration,
              delay: heart.delay,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            className="absolute text-[#fecdd3]/60"
            style={{ left: `${heart.x}%` }}
          >
            <Heart size={heart.size} fill="currentColor" />
          </motion.div>
        ))}
      </div>

      <AnimatePresence mode="wait">
        {!isOpen ? (
          /* ========================================================================= */
          /* UNOPENED STATE: Interactive Closed Love Letter Envelope with Wax Seal */
          /* ========================================================================= */
          <motion.div
            key="unopened-envelope"
            id="envelope-wrapper"
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.85, y: -25 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="w-full max-w-[460px] flex flex-col items-center z-10"
          >
            {/* Top Prompt Banner */}
            <motion.div 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
              className="mb-5 text-center"
            >
              <span className="inline-flex items-center gap-1.5 px-3.5 py-1 bg-white/90 rounded-full border border-[#ffe4e6] text-xs font-semibold tracking-wider uppercase text-[#fb7185] shadow-xs">
                <Sparkles size={12} />
                Special Delivery
              </span>
              <h2 className="font-artistic-serif text-3xl sm:text-4xl italic text-[#e11d48] mt-2 mb-1">
                You've Received a Letter
              </h2>
              <p className="text-xs sm:text-sm text-[#881337]/75 font-nunito">
                Tap the wax seal or button below to open your note
              </p>
            </motion.div>

            {/* Interactive Envelope Graphic Card */}
            <motion.div
              id="envelope-container"
              onClick={handleOpenLetter}
              onHoverStart={() => setIsHoveredSeal(true)}
              onHoverEnd={() => setIsHoveredSeal(false)}
              whileHover={{ 
                y: -6, 
                scale: 1.02,
                rotate: [0, -1.5, 1.5, -1, 1, -0.5, 0.5, 0],
                transition: {
                  rotate: {
                    duration: 0.6,
                    repeat: Infinity,
                    repeatDelay: 0.15,
                    ease: "easeInOut"
                  },
                  y: { duration: 0.25 },
                  scale: { duration: 0.25 }
                }
              }}
              whileTap={{ scale: 0.97 }}
              className="w-full bg-white rounded-[40px] shadow-[0_22px_50px_rgba(251,113,133,0.18)] border border-[#ffe4e6] p-8 sm:p-10 flex flex-col items-center text-center cursor-pointer relative overflow-hidden group"
            >
              {/* Envelope flap visual lines & textures */}
              <div className="absolute top-0 left-0 right-0 h-28 bg-[#fff5f6] border-b border-[#fecdd3]/60 rounded-b-[36px] flex items-center justify-center -z-0">
                <div className="w-full h-full border-dashed border-b border-[#fecdd3]/40" />
              </div>

              {/* Decorative Postage Stamp on Envelope Corner */}
              <div className="absolute top-4 right-5 w-10 h-12 bg-[#fff1f2] border-2 border-dashed border-[#fb7185]/50 rounded flex flex-col items-center justify-center text-[#fb7185] rotate-3 shadow-xs">
                <Heart size={14} fill="currentColor" />
                <span className="text-[7px] font-bold tracking-tighter mt-0.5">LOVE</span>
              </div>

              {/* Wax Seal Heart Button (Center of Envelope) */}
              <div className="relative z-10 my-4">
                <motion.div
                  animate={{
                    scale: isHoveredSeal ? 1.12 : [1, 1.06, 1],
                    boxShadow: [
                      '0 8px 20px rgba(225,29,72,0.25)',
                      '0 12px 28px rgba(225,29,72,0.4)',
                      '0 8px 20px rgba(225,29,72,0.25)',
                    ],
                  }}
                  transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
                  className="w-20 h-20 sm:w-22 sm:h-22 rounded-full bg-gradient-to-br from-[#f43f5e] via-[#e11d48] to-[#be123c] border-4 border-white flex flex-col items-center justify-center text-white shadow-lg relative"
                >
                  <Heart size={32} fill="currentColor" className="drop-shadow-sm" />
                  <span className="text-[9px] font-bold tracking-widest uppercase mt-0.5 text-rose-100">
                    OPEN
                  </span>

                  {/* Sparkle badge */}
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
                    className="absolute -top-1 -right-1 text-amber-200"
                  >
                    <Sparkle size={16} fill="currentColor" />
                  </motion.div>
                </motion.div>
              </div>

              {/* Recipient Label inside Envelope */}
              <div className="relative z-10 mt-2 space-y-1">
                <p className="font-artistic-serif text-2xl sm:text-3xl italic text-[#881337]">
                  To: {RECIPIENT} ♡
                </p>
                <p className="text-xs text-[#fb7185] font-nunito font-medium">
                  for my favorite person in the whole world
                </p>
              </div>

              {/* Action Button */}
              <div className="relative z-10 mt-6 w-full">
                <motion.button
                  id="open-letter-button"
                  type="button"
                  onClick={handleOpenLetter}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="w-full bg-[#fb7185] hover:bg-[#f43f5e] text-white py-3.5 px-6 rounded-full font-medium text-base shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Mail size={18} />
                  <span>Click to Open Letter 💌</span>
                </motion.button>
              </div>

              {/* Decorative Envelope Corner Stamps */}
              <div className="mt-5 flex items-center gap-2 text-xs text-[#fb7185]/60">
                <div className="w-1.5 h-1.5 rounded-full bg-[#fecdd3]" />
                <span className="italic font-artistic-serif text-sm">sealed with eternal love</span>
                <div className="w-1.5 h-1.5 rounded-full bg-[#fecdd3]" />
              </div>
            </motion.div>
          </motion.div>
        ) : (
          /* ========================================================================= */
          /* OPENED STATE: Full Love Letter View with Authentic Stationery Paper Theme */
          /* ========================================================================= */
          <motion.main
            key="opened-letter"
            id="love-letter-card"
            initial={{ opacity: 0, scale: 0.92, y: 25 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="w-full max-w-[520px] bg-white rounded-[44px] shadow-[0_24px_55px_rgba(251,113,133,0.16)] border border-[#ffe4e6] p-7 sm:p-10 flex flex-col items-center text-center relative z-10 overflow-hidden"
          >
            {/* Top Postage Stamp Decoration */}
            <div className="absolute top-5 right-6 w-11 h-14 bg-[#fff1f2] border-2 border-dashed border-[#fb7185]/60 rounded-md p-1 flex flex-col items-center justify-between text-[#fb7185] rotate-2 shadow-xs hidden sm:flex">
              <span className="text-[6.5px] font-bold tracking-widest uppercase text-[#e11d48]">FIRST CLASS</span>
              <Heart size={16} fill="currentColor" className="text-[#fb7185]" />
              <span className="text-[6.5px] font-medium text-[#881337]">SEP 3</span>
            </div>

            {/* Floating Envelope Icon Header */}
            <motion.div
              id="floating-envelope"
              animate={{
                y: [0, -7, 0],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.95 }}
              className="mt-1 bg-[#fff5f6] p-3.5 rounded-full shadow-xs border border-[#ffe4e6] cursor-pointer"
              title="A special letter for you"
            >
              <Mail className="w-8 h-8 sm:w-9 sm:h-9 text-[#fb7185] stroke-[1.75]" />
            </motion.div>

            {/* Handwritten / Serif Italic Style Heading */}
            <motion.h1
              id="letter-heading"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="font-artistic-serif text-3xl sm:text-4xl italic text-[#e11d48] mb-5 sm:mb-6 mt-3 select-none tracking-wide"
            >
              for my favorite person, {RECIPIENT.toLowerCase()}
            </motion.h1>

            {/* Authentic Lined Stationery Letter Note Paper */}
            <motion.div
              id="main-note-box"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="w-full bg-[#fffbfb] rounded-2xl p-6 sm:p-7 border border-[#fecdd3] mb-6 text-left relative shadow-xs"
            >
              {/* Subtle stationery red margin line */}
              <div className="absolute top-0 bottom-0 left-6 sm:left-7 w-px bg-[#fecdd3]/40" />

              <div className="pl-4 sm:pl-5 space-y-3 text-[#881337] font-artistic-serif text-lg sm:text-xl leading-[32px] italic whitespace-pre-wrap stationery-lines">
                <p>
                  "{NOTE_TEXT}"
                </p>
              </div>

              {/* Date stamp & Sign off */}
              <div className="mt-5 pt-3 border-t border-[#fecdd3]/50 flex flex-col sm:flex-row sm:items-center justify-between gap-2 pl-4 sm:pl-5">
                <p className="text-xs sm:text-sm text-[#fb7185] font-artistic-serif italic tracking-wider flex items-center gap-1.5 select-none">
                  <span>✦</span>
                  <span>{LETTER_DATE}</span>
                </p>
                <p className="text-[#fb7185] font-medium font-artistic-serif text-lg italic tracking-wide sm:text-right">
                  — with all my love, always ♡
                </p>
              </div>
            </motion.div>

            {/* Interactive Button: Click for a tiny hug */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="relative group w-full flex justify-center"
            >
              <motion.button
                id="hug-button"
                type="button"
                onClick={() => setShowHugPopup(true)}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.96 }}
                className="bg-[#fb7185] hover:bg-[#f43f5e] text-white px-8 py-3.5 rounded-full font-medium text-base sm:text-lg transition-all shadow-md active:scale-95 cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-[#fb7185] focus-visible:ring-offset-2 flex items-center justify-center gap-2"
              >
                <span>Click for a tiny hug 🤍</span>
              </motion.button>
            </motion.div>

            {/* Decorative Accent Dots & Re-fold letter action */}
            <div className="mt-5 flex flex-col items-center gap-2.5">
              <div className="flex space-x-2 items-center justify-center" aria-hidden="true">
                <div className="w-1.5 h-1.5 rounded-full bg-[#fecdd3]" />
                <div className="w-1.5 h-1.5 rounded-full bg-[#fb7185]" />
                <div className="w-1.5 h-1.5 rounded-full bg-[#fecdd3]" />
              </div>

              {/* Re-fold / Seal back button */}
              <button
                id="close-letter-button"
                type="button"
                onClick={handleCloseLetter}
                className="text-xs text-[#fb7185] hover:text-[#e11d48] underline underline-offset-4 decoration-rose-200 hover:decoration-[#fb7185] transition-colors cursor-pointer pt-0.5"
              >
                Close & fold letter 💌
              </button>
            </div>
          </motion.main>
        )}
      </AnimatePresence>

      {/* Aesthetic footer */}
      <footer className="mt-5 text-center text-xs text-[#fb7185]/70 font-nunito select-none">
        made with all my love & care
      </footer>

      {/* Pop-up Hug Reveal Modal */}
      <AnimatePresence>
        {showHugPopup && (
          <div
            id="hug-modal-container"
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#881337]/20 backdrop-blur-xs"
            onClick={() => setShowHugPopup(false)}
          >
            <motion.div
              id="hug-popup-card"
              initial={{ opacity: 0, scale: 0.85, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 10 }}
              transition={{ type: "spring", stiffness: 380, damping: 26 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-sm bg-white rounded-3xl p-6 sm:p-8 border border-[#ffe4e6] shadow-[0_20px_50px_rgba(251,113,133,0.22)] text-center overflow-hidden"
            >
              {/* Decorative close button */}
              <button
                id="close-hug-popup"
                type="button"
                onClick={() => setShowHugPopup(false)}
                className="absolute top-4 right-4 p-1.5 rounded-full text-[#fb7185]/60 hover:text-[#e11d48] hover:bg-[#fff1f2] transition-colors cursor-pointer"
                aria-label="Close"
              >
                <X size={18} />
              </button>

              {/* Animated Warm Hug Graphic */}
              <div className="flex justify-center mb-4 mt-1">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', delay: 0.1, bounce: 0.5 }}
                  className="w-16 h-16 rounded-full bg-[#fff1f2] text-[#fb7185] flex items-center justify-center border border-[#ffe4e6] shadow-xs"
                >
                  <HeartHandshake className="w-8 h-8 stroke-[1.75]" />
                </motion.div>
              </div>

              {/* Pop-up reveal text */}
              <motion.div
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 }}
                className="mb-6 space-y-2"
              >
                <h3 className="font-artistic-serif italic text-2xl sm:text-3xl text-[#e11d48] font-normal">
                  Sending You A Warm Hug, {RECIPIENT}
                </h3>
                <p 
                  id="hug-message-text" 
                  className="text-[#e11d48] font-nunito text-base sm:text-lg font-semibold leading-relaxed px-2"
                >
                  Consider yourself squeezed super tight, {RECIPIENT}! I love you! ✨
                </p>
              </motion.div>

              {/* Interactive acknowledge button */}
              <motion.button
                id="hug-confirm-button"
                type="button"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setShowHugPopup(false)}
                className="w-full py-3 bg-[#fff1f2] hover:bg-[#ffe4e6] text-[#e11d48] font-nunito font-semibold text-sm rounded-full border border-[#ffe4e6] transition-colors cursor-pointer"
              >
                Aww, hug received! 💖
              </motion.button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
