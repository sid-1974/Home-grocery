"use client";

import Link from "next/link";
import { ShoppingCart } from "lucide-react";

export default function HomeFooter() {
  return (
    <footer className="bg-white border-t border-emerald-100/40 py-12 relative z-10">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-2">
          <div className="bg-white/10 rounded-lg overflow-hidden shadow-sm border border-gray-100/50 shrink-0">
            <img src="/icon.png" alt="Home Grocery Logo" className="w-8 h-8 object-cover" />
          </div>
          <span className="text-lg font-black tracking-tighter text-green-700">
            Home Grocery
          </span>
        </div>

        <p className="text-xs text-gray-400 font-bold text-center md:text-left">
          © {new Date().getFullYear()} Home Grocery. All rights reserved. Created with 💚 and performance in mind.
        </p>

        <div className="flex gap-6 text-xs font-bold text-gray-500">
          <Link href="/login" className="hover:text-emerald-600 transition-colors">
            Sign In
          </Link>
          <Link href="/register" className="hover:text-emerald-600 transition-colors">
            Register
          </Link>
        </div>
      </div>
    </footer>
  );
}
