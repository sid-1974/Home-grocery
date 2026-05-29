"use client";

import { motion } from "framer-motion";
import { Users, Languages, Mic, Lightbulb } from "lucide-react";

export default function FeaturesSection() {
  const features = [
    {
      icon: <Users size={24} />,
      title: "Family Sharing",
      desc: "Send lists instantly via WhatsApp or direct link. Family members can view and update the checklist without registering.",
    },
    {
      icon: <Languages size={24} />,
      title: "Kannada Translation",
      desc: "Perfect for households that use multiple languages. Automatically translate items to Kannada at the click of a button!",
    },
    {
      icon: <Mic size={24} />,
      title: "Voice Recognition",
      desc: "Busy kitchen? Simply speak your grocery items (supports both English and Kannada accents) and watch them instantly match to items.",
    },
    {
      icon: <Lightbulb size={24} />,
      title: "Item Suggestions",
      desc: "Missing an item? Suggest any product using our built-in tool, and admins will add it to the catalog within 24 hours!",
    },
  ];

  return (
    <section id="features" className="bg-white/80 py-24 relative z-10">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center space-y-4 mb-20">
          <h2 className="text-xs font-black tracking-widest text-emerald-600 uppercase">
            Designed For Better Shopping
          </h2>
          <p className="text-3xl sm:text-4xl font-black text-gray-900 tracking-tight">
            Simple features. Massive convenience.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feat, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -8 }}
              className="bg-gradient-to-br from-emerald-50/40 to-white border border-emerald-100/50 p-8 rounded-3rem shadow-sm hover:shadow-xl hover:border-emerald-200 transition-all flex flex-col gap-6"
            >
              <div className="bg-emerald-600 text-white p-4 rounded-2.5rem w-fit shadow-md shadow-emerald-150 flex items-center justify-center">
                {feat.icon}
              </div>
              <h3 className="text-xl font-black text-gray-900">{feat.title}</h3>
              <p className="text-gray-500 font-semibold text-sm leading-relaxed">
                {feat.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
