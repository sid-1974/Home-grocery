import React from "react";
import { Mic } from "lucide-react";

interface VoiceListeningModalProps {
  isOpen: boolean;
  searchLang: "en-IN" | "kn-IN";
  onCancel: () => void;
}

export function VoiceListeningModal({
  isOpen,
  searchLang,
  onCancel,
}: VoiceListeningModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[110] flex flex-col items-center justify-center bg-black/60 backdrop-blur-md animate-in fade-in duration-300">
      <style
        dangerouslySetInnerHTML={{
          __html: `
            @keyframes soundwave {
              0% { height: 12px; }
              100% { height: 48px; }
            }
            .sound-bar {
              animation: soundwave 0.8s ease-in-out infinite alternate;
            }
          `,
        }}
      />
      <div className="bg-white/10 border border-white/20 rounded-[2.5rem] p-8 sm:p-12 max-w-sm w-full mx-4 shadow-2xl flex flex-col items-center text-white backdrop-blur-xl animate-in zoom-in-95 duration-300">
        {/* Pulsing microphone icon wrapper */}
        <div className="relative flex items-center justify-center w-32 h-32 mb-8">
          {/* Outer pulsing ring 3 */}
          <div className="absolute inset-0 rounded-full bg-green-500/20 animate-ping" />
          {/* Outer pulsing ring 2 */}
          <div className="absolute inset-4 rounded-full bg-green-500/30 animate-pulse" />
          {/* Center circle with Mic icon */}
          <div className="absolute inset-8 rounded-full bg-green-600 flex items-center justify-center shadow-lg shadow-green-600/50">
            <Mic size={40} className="text-white animate-pulse" />
          </div>
        </div>

        <h3 className="text-2xl font-black tracking-tight mb-2 text-center animate-pulse">
          Listening...
        </h3>
        <p className="text-sm font-semibold text-gray-300 text-center mb-8">
          {searchLang === "en-IN"
            ? "Speak now in English"
            : "ಕನ್ನಡದಲ್ಲಿ ಮಾತನಾಡಿ (Speak in Kannada)"}
        </p>

        {/* Simulated smooth sound wave visualization bars */}
        <div className="flex items-center justify-center gap-2 h-16 mb-8 w-full">
          <div className="w-1.5 bg-green-400 rounded-full sound-bar" style={{ animationDelay: "0.1s" }} />
          <div className="w-1.5 bg-green-300 rounded-full sound-bar" style={{ animationDelay: "0.3s" }} />
          <div className="w-1.5 bg-green-500 rounded-full sound-bar" style={{ animationDelay: "0.5s" }} />
          <div className="w-1.5 bg-green-200 rounded-full sound-bar" style={{ animationDelay: "0.7s" }} />
          <div className="w-1.5 bg-green-400 rounded-full sound-bar" style={{ animationDelay: "0.2s" }} />
          <div className="w-1.5 bg-green-300 rounded-full sound-bar" style={{ animationDelay: "0.4s" }} />
        </div>

        <button
          onClick={onCancel}
          className="px-6 py-3 bg-white/10 hover:bg-white/20 border border-white/10 hover:border-white/20 rounded-2xl text-sm font-black tracking-wider uppercase transition-all duration-300"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
