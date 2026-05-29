"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ShoppingCart } from "lucide-react";

export default function HomeNavbar() {
  return (
    <header className="sticky top-0 z-50 w-full backdrop-blur-md bg-white/70 border-b border-emerald-100/40 px-6 py-4 transition-all">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link href="/home" className="flex items-center gap-2 group">
          <motion.div
            whileHover={{ rotate: 10, scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
            className="bg-white/10 rounded-xl overflow-hidden shadow-sm border border-gray-100/50 shrink-0"
          >
            <img src="/icon.png" alt="Home Grocery Logo" className="w-9 h-9 sm:w-10 sm:h-10 object-cover" />
          </motion.div>
          <span className="text-xl sm:text-2xl font-black tracking-tighter text-green-700">
            Home Grocery
          </span>
        </Link>

        {/* Nav links desktop */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-bold text-gray-500">
          <a href="#features" className="hover:text-emerald-600 transition-colors">
            Features
          </a>
          <a href="#interactive" className="hover:text-emerald-600 transition-colors">
            Try Interactive
          </a>
          <a href="#testimonials" className="hover:text-emerald-600 transition-colors">
            Reviews
          </a>
        </nav>

        {/* Right Action buttons */}
        <div className="flex items-center gap-4">
          <Link
            href="/login"
            className="text-sm font-black text-gray-700 hover:text-emerald-600 px-4 py-2.5 rounded-xl transition-all"
          >
            Sign In
          </Link>
          <Link
            href="/register"
            className="bg-emerald-600 text-white font-black text-sm px-6 py-3 rounded-2xl hover:bg-emerald-700 transition-all hover:scale-105 active:scale-95 shadow-md shadow-emerald-100"
          >
            Get Started
          </Link>
        </div>
      </div>
    </header>
  );
}
