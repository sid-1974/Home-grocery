import React from "react";
import { motion, AnimatePresence } from "framer-motion";

interface CongratsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onShare: () => void;
}

const PetalSvg = ({ size = 16, color = "#ffa726" }: { size?: number; color?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="opacity-80">
    <path
      d="M12 2C12 2 17 8 17 12C17 14.76 14.76 17 12 17C9.24 17 7 14.76 7 12C7 8 12 2 12 2Z"
      fill={color}
    />
  </svg>
);

export function CongratsModal({ isOpen, onClose, onShare }: CongratsModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 z-[60] bg-emerald-950/85 backdrop-blur-md rounded-3xl flex items-center justify-center p-6"
        >
          {/* Confetti, Firecrackers & Falling Flowers */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-3xl z-10">
            <style dangerouslySetInnerHTML={{__html: `
              /* Firecracker explosion animation */
              @keyframes drift-lu {
                0% { transform: translate(0, 0) scale(1.2) rotate(0deg); opacity: 1; }
                100% { transform: translate(-140px, -140px) scale(0.1) rotate(270deg); opacity: 0; }
              }
              @keyframes drift-ru {
                0% { transform: translate(0, 0) scale(1.2) rotate(0deg); opacity: 1; }
                100% { transform: translate(140px, -140px) scale(0.1) rotate(-270deg); opacity: 0; }
              }
              @keyframes drift-ld {
                0% { transform: translate(0, 0) scale(1.2) rotate(0deg); opacity: 1; }
                100% { transform: translate(-140px, 140px) scale(0.1) rotate(180deg); opacity: 0; }
              }
              @keyframes drift-rd {
                0% { transform: translate(0, 0) scale(1.2) rotate(0deg); opacity: 1; }
                100% { transform: translate(140px, 140px) scale(0.1) rotate(-180deg); opacity: 0; }
              }
              @keyframes drift-u {
                0% { transform: translate(0, 0) scale(1.3) rotate(0deg); opacity: 1; }
                100% { transform: translate(0, -200px) scale(0.15) rotate(360deg); opacity: 0; }
              }
              @keyframes drift-d {
                0% { transform: translate(0, 0) scale(1.3) rotate(0deg); opacity: 1; }
                100% { transform: translate(0, 200px) scale(0.15) rotate(-360deg); opacity: 0; }
              }
              
              /* Falling flower petals animation */
              @keyframes flower-rain {
                0% { transform: translateY(-10%) rotate(0deg) translateX(0); opacity: 0; }
                10% { opacity: 0.8; }
                90% { opacity: 0.8; }
                100% { transform: translateY(110%) rotate(360deg) translateX(40px); opacity: 0; }
              }

              .spark-lu { animation: drift-lu 1.8s cubic-bezier(0.1, 0.8, 0.3, 1) infinite; }
              .spark-ru { animation: drift-ru 1.8s cubic-bezier(0.1, 0.8, 0.3, 1) infinite; }
              .spark-ld { animation: drift-ld 1.8s cubic-bezier(0.1, 0.8, 0.3, 1) infinite; }
              .spark-rd { animation: drift-rd 1.8s cubic-bezier(0.1, 0.8, 0.3, 1) infinite; }
              .spark-u  { animation: drift-u 2s cubic-bezier(0.1, 0.8, 0.3, 1) infinite; }
              .spark-d  { animation: drift-d 2s cubic-bezier(0.1, 0.8, 0.3, 1) infinite; }
              
              .petal {
                position: absolute;
                top: -20px;
                animation: flower-rain 5s linear infinite;
              }
            `}} />

            {/* Falling Flower Petals (Flower Rain) */}
            <div className="absolute inset-0 z-0">
              <div className="petal" style={{ left: "10%", animationDelay: "0s", animationDuration: "5.5s" }}><PetalSvg size={14} color="#f48fb1" /></div>
              <div className="petal" style={{ left: "25%", animationDelay: "1.5s", animationDuration: "6s" }}><PetalSvg size={18} color="#f8bbd0" /></div>
              <div className="petal" style={{ left: "40%", animationDelay: "0.5s", animationDuration: "5s" }}><PetalSvg size={16} color="#ffb74d" /></div>
              <div className="petal" style={{ left: "55%", animationDelay: "2.2s", animationDuration: "7s" }}><PetalSvg size={12} color="#ffe082" /></div>
              <div className="petal" style={{ left: "70%", animationDelay: "0.8s", animationDuration: "5.8s" }}><PetalSvg size={15} color="#f48fb1" /></div>
              <div className="petal" style={{ left: "85%", animationDelay: "3s", animationDuration: "6.5s" }}><PetalSvg size={18} color="#f8bbd0" /></div>
              <div className="petal" style={{ left: "95%", animationDelay: "1.2s", animationDuration: "5.2s" }}><PetalSvg size={13} color="#ffe082" /></div>
              
              <div className="petal" style={{ left: "18%", animationDelay: "2.7s", animationDuration: "6.2s" }}><PetalSvg size={15} color="#ffb74d" /></div>
              <div className="petal" style={{ left: "33%", animationDelay: "0.2s", animationDuration: "5.4s" }}><PetalSvg size={12} color="#f48fb1" /></div>
              <div className="petal" style={{ left: "48%", animationDelay: "3.5s", animationDuration: "6.8s" }}><PetalSvg size={16} color="#f8bbd0" /></div>
              <div className="petal" style={{ left: "63%", animationDelay: "1.8s", animationDuration: "5.9s" }}><PetalSvg size={14} color="#ffe082" /></div>
              <div className="petal" style={{ left: "78%", animationDelay: "4.1s", animationDuration: "7.2s" }}><PetalSvg size={17} color="#ffb74d" /></div>
            </div>

            {/* Firecracker Spark Emitters */}
            {/* Emitter 1: Top Left */}
            <div className="absolute left-[15%] top-[20%] z-10">
              <span className="absolute w-2.5 h-2.5 rounded-full bg-red-400 spark-lu" style={{ animationDelay: '0s' }} />
              <span className="absolute w-2 h-2 rounded-full bg-yellow-300 spark-lu" style={{ animationDelay: '0.4s' }} />
              <span className="absolute w-3 h-3 rounded-full bg-pink-400 spark-lu" style={{ animationDelay: '0.8s' }} />
              <span className="absolute w-1.5 h-1.5 rounded-full bg-blue-300 spark-lu" style={{ animationDelay: '1.2s' }} />
            </div>
            {/* Emitter 2: Top Right */}
            <div className="absolute right-[15%] top-[20%] z-10">
              <span className="absolute w-2.5 h-2.5 rounded-full bg-emerald-400 spark-ru" style={{ animationDelay: '0.2s' }} />
              <span className="absolute w-3 h-3 rounded-full bg-purple-400 spark-ru" style={{ animationDelay: '0.6s' }} />
              <span className="absolute w-1.5 h-1.5 rounded-full bg-amber-300 spark-ru" style={{ animationDelay: '1.0s' }} />
              <span className="absolute w-2 h-2 rounded-full bg-cyan-400 spark-ru" style={{ animationDelay: '1.4s' }} />
            </div>
            {/* Emitter 3: Bottom Left */}
            <div className="absolute left-[15%] bottom-[20%] z-10">
              <span className="absolute w-3 h-3 rounded-full bg-pink-400 spark-ld" style={{ animationDelay: '0.1s' }} />
              <span className="absolute w-2 h-2 rounded-full bg-orange-400 spark-ld" style={{ animationDelay: '0.5s' }} />
              <span className="absolute w-2.5 h-2.5 rounded-full bg-yellow-300 spark-ld" style={{ animationDelay: '0.9s' }} />
              <span className="absolute w-1.5 h-1.5 rounded-full bg-rose-400 spark-ld" style={{ animationDelay: '1.3s' }} />
            </div>
            {/* Emitter 4: Bottom Right */}
            <div className="absolute right-[15%] bottom-[20%] z-10">
              <span className="absolute w-2 h-2 rounded-full bg-teal-300 spark-rd" style={{ animationDelay: '0.3s' }} />
              <span className="absolute w-3 h-3 rounded-full bg-red-400 spark-rd" style={{ animationDelay: '0.7s' }} />
              <span className="absolute w-2.5 h-2.5 rounded-full bg-blue-400 spark-rd" style={{ animationDelay: '1.1s' }} />
              <span className="absolute w-1.5 h-1.5 rounded-full bg-yellow-400 spark-rd" style={{ animationDelay: '1.5s' }} />
            </div>
            {/* Emitter 5: Center Left */}
            <div className="absolute left-[10%] top-[50%] z-10">
              <span className="absolute w-3 h-3 rounded-full bg-amber-400 spark-lu" style={{ animationDelay: '0.05s' }} />
              <span className="absolute w-2 h-2 rounded-full bg-pink-400 spark-ld" style={{ animationDelay: '0.45s' }} />
              <span className="absolute w-2.5 h-2.5 rounded-full bg-indigo-400 spark-lu" style={{ animationDelay: '0.85s' }} />
              <span className="absolute w-1.5 h-1.5 rounded-full bg-emerald-400 spark-ld" style={{ animationDelay: '1.25s' }} />
            </div>
            {/* Emitter 6: Center Right */}
            <div className="absolute right-[10%] top-[50%] z-10">
              <span className="absolute w-2.5 h-2.5 rounded-full bg-rose-400 spark-ru" style={{ animationDelay: '0.15s' }} />
              <span className="absolute w-3 h-3 rounded-full bg-purple-400 spark-rd" style={{ animationDelay: '0.55s' }} />
              <span className="absolute w-1.5 h-1.5 rounded-full bg-yellow-300 spark-ru" style={{ animationDelay: '0.95s' }} />
              <span className="absolute w-2 h-2 rounded-full bg-orange-400 spark-rd" style={{ animationDelay: '1.35s' }} />
            </div>
            {/* Emitter 7: Upper Center */}
            <div className="absolute left-[50%] top-[15%] -translate-x-1/2 z-10">
              <span className="absolute w-3 h-3 rounded-full bg-yellow-400 spark-u" style={{ animationDelay: '0.0s' }} />
              <span className="absolute w-2 h-2 rounded-full bg-red-400 spark-u" style={{ animationDelay: '0.5s' }} />
              <span className="absolute w-2.5 h-2.5 rounded-full bg-pink-400 spark-u" style={{ animationDelay: '1.0s' }} />
              <span className="absolute w-1.5 h-1.5 rounded-full bg-white spark-u" style={{ animationDelay: '1.5s' }} />
            </div>
            {/* Emitter 8: Lower Center */}
            <div className="absolute left-[50%] bottom-[15%] -translate-x-1/2 z-10">
              <span className="absolute w-3 h-3 rounded-full bg-teal-400 spark-d" style={{ animationDelay: '0.25s' }} />
              <span className="absolute w-2 h-2 rounded-full bg-blue-400 spark-d" style={{ animationDelay: '0.75s' }} />
              <span className="absolute w-2.5 h-2.5 rounded-full bg-amber-400 spark-d" style={{ animationDelay: '1.25s' }} />
              <span className="absolute w-1.5 h-1.5 rounded-full bg-purple-400 spark-d" style={{ animationDelay: '1.75s' }} />
            </div>
          </div>

          <motion.div
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, y: 20 }}
            transition={{ type: "spring", damping: 20, stiffness: 200 }}
            className="bg-white/10 border border-white/20 text-white rounded-[2rem] p-6 max-w-[280px] w-full text-center shadow-2xl relative z-20 backdrop-blur-xl flex flex-col items-center"
          >
            <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mb-4 shadow-inner relative animate-bounce">
              <span className="absolute inset-0 rounded-full border border-dashed border-emerald-400/40 animate-[spin_10s_linear_infinite]" />
              <span className="text-3xl">🎉</span>
            </div>

            <h3 className="text-xl font-black text-white mb-2 leading-tight tracking-tight">
              Congratulations!
            </h3>
            <p className="text-xs font-semibold text-emerald-200/80 mb-6 leading-relaxed">
              You tossed all items successfully! Now, you can share grocery lists freely with your family.
            </p>

            <div className="w-full flex flex-col gap-2">
              <button
                onClick={onShare}
                className="w-full py-3 bg-emerald-500 hover:bg-emerald-600 text-white font-black text-xs rounded-xl transition-all hover:scale-[1.02] active:scale-95 shadow-md shadow-emerald-950/50 flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>SHARE LIST FREE</span>
              </button>
              <button
                onClick={onClose}
                className="w-full py-2.5 bg-white/10 hover:bg-white/20 text-white font-bold text-[10px] rounded-xl transition-all border border-white/10 cursor-pointer"
              >
                Play Again
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
