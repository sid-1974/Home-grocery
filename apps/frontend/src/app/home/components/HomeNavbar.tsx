"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

export default function HomeNavbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <header className="sticky top-0 z-50 w-full backdrop-blur-md bg-white/70 border-b border-emerald-100/40 px-4 sm:px-6 py-4 transition-all">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link href="/home" className="flex items-center gap-2 group shrink-0">
          <motion.div
            whileHover={{ rotate: 10, scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
            className="bg-white/10 rounded-xl overflow-hidden shadow-sm border border-gray-100/50 shrink-0"
          >
            <img src="/icon.png" alt="Home Grocery Logo" className="w-9 h-9 sm:w-10 sm:h-10 object-cover" />
          </motion.div>
          <span className="text-xl sm:text-2xl font-black tracking-tighter text-green-700 select-none">
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

        {/* Right Action buttons desktop */}
        <div className="hidden md:flex items-center gap-4">
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

        {/* Hamburger Menu Toggle Mobile */}
        <div className="flex md:hidden">
          <button
            onClick={toggleMenu}
            className="p-2 text-gray-600 hover:text-emerald-600 focus:outline-none transition-colors"
            aria-label="Toggle Menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="md:hidden overflow-hidden bg-white/95 backdrop-blur-md"
          >
            <div className="flex flex-col gap-4 py-6 border-t border-emerald-50 mt-4">
              <a
                href="#features"
                onClick={() => setIsOpen(false)}
                className="text-base font-bold text-gray-600 hover:text-emerald-600 px-2 py-1 transition-colors"
              >
                Features
              </a>
              <a
                href="#interactive"
                onClick={() => setIsOpen(false)}
                className="text-base font-bold text-gray-600 hover:text-emerald-600 px-2 py-1 transition-colors"
              >
                Try Interactive
              </a>
              <a
                href="#testimonials"
                onClick={() => setIsOpen(false)}
                className="text-base font-bold text-gray-600 hover:text-emerald-600 px-2 py-1 transition-colors"
              >
                Reviews
              </a>
              <div className="h-[1px] bg-emerald-50 my-2" />
              <div className="flex flex-col gap-3">
                <Link
                  href="/login"
                  onClick={() => setIsOpen(false)}
                  className="flex justify-center items-center text-sm font-black text-gray-700 hover:text-emerald-600 py-3.5 rounded-2xl border border-gray-100 hover:bg-emerald-50/30 transition-all"
                >
                  Sign In
                </Link>
                <Link
                  href="/register"
                  onClick={() => setIsOpen(false)}
                  className="flex justify-center items-center bg-emerald-600 text-white font-black text-sm py-3.5 rounded-2xl hover:bg-emerald-700 transition-all shadow-md shadow-emerald-100"
                >
                  Get Started
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

