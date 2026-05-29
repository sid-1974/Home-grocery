"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function CallToAction() {
  return (
    <section className="py-24 max-w-7xl mx-auto px-6 relative z-10">
      <div className="bg-gradient-to-br from-emerald-600 to-green-500 rounded-3rem p-8 sm:p-16 text-white text-center shadow-xl shadow-emerald-100 relative overflow-hidden flex flex-col items-center gap-8">
        <div className="space-y-4 max-w-2xl">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight">
            Organize your kitchen shopping list today.
          </h2>
          <p className="text-emerald-50 font-medium text-base sm:text-lg leading-relaxed">
            Create lists, translate, search by voice, and share. Fully optimized, lightning-fast web experience.
          </p>
        </div>
        <Link
          href="/register"
          className="bg-white text-emerald-700 font-black text-lg py-4.5 px-10 rounded-2.5rem hover:bg-emerald-50 transition-all hover:scale-105 active:scale-95 shadow-xl shadow-emerald-900/10 flex items-center gap-2 shrink-0 cursor-pointer"
        >
          <span>Start Your List For Free</span>
          <ArrowRight size={20} className="stroke-[2.5]" />
        </Link>
      </div>
    </section>
  );
}
