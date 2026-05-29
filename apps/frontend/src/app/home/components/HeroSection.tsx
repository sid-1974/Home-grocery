"use client";

import Link from "next/link";
import dynamic from "next/dynamic";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import {
  AppleSvg,
  OrangeSvg,
  BananaSvg,
  CarrotSvg,
  GrapesSvg,
  WatermelonSvg,
} from "@/components/fruitSvg";

// Dynamically import the heavy physics canvas to optimize bundle size and hydration
const PhysicsCanvas = dynamic(() => import("./PhysicsCanvas"), { ssr: false });

export default function HeroSection() {
  // Parallax Scroll values using Framer Motion
  const { scrollY } = useScroll();
  const yParallaxLeft = useTransform(scrollY, [0, 1000], [0, -200]);
  const yParallaxRight = useTransform(scrollY, [0, 1000], [0, -350]);
  const rotateParallaxLeft = useTransform(scrollY, [0, 1000], [0, 180]);
  const rotateParallaxRight = useTransform(scrollY, [0, 1000], [0, -120]);

  return (
    <section className="max-w-7xl mx-auto px-6 pt-10 pb-20 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
      {/* Floating background decorations */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        {/* Left Side Floating Fruits */}
        <motion.div
          style={{ y: yParallaxLeft, rotate: rotateParallaxLeft }}
          className="absolute top-[20%] left-[-40px] md:left-[5%] opacity-30 md:opacity-60"
        >
          <AppleSvg size={100} className="drop-shadow-2xl" />
        </motion.div>
        <motion.div
          style={{ y: yParallaxRight, rotate: rotateParallaxRight }}
          className="absolute top-[60%] left-[-50px] md:left-[8%] opacity-20 md:opacity-50"
        >
          <BananaSvg size={120} className="drop-shadow-2xl" />
        </motion.div>
        <motion.div
          style={{ y: yParallaxLeft, rotate: rotateParallaxRight }}
          className="absolute top-[90%] left-[2%] opacity-30 md:opacity-50"
        >
          <CarrotSvg size={110} className="drop-shadow-2xl" />
        </motion.div>

        {/* Right Side Floating Fruits */}
        <motion.div
          style={{ y: yParallaxRight, rotate: rotateParallaxRight }}
          className="absolute top-[12%] right-[-30px] md:right-[5%] opacity-30 md:opacity-60"
        >
          <OrangeSvg size={110} className="drop-shadow-2xl" />
        </motion.div>
        <motion.div
          style={{ y: yParallaxLeft, rotate: rotateParallaxLeft }}
          className="absolute top-[48%] right-[-40px] md:right-[7%] opacity-20 md:opacity-50"
        >
          <GrapesSvg size={130} className="drop-shadow-2xl" />
        </motion.div>
        <motion.div
          style={{ y: yParallaxRight, rotate: rotateParallaxLeft }}
          className="absolute top-[78%] right-[3%] opacity-30 md:opacity-60"
        >
          <WatermelonSvg size={120} className="drop-shadow-2xl" />
        </motion.div>
      </div>

      {/* Content Column */}
      <div className="lg:col-span-6 space-y-8 text-center lg:text-left relative z-10">
        {/* Welcome Pill */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-1.5 px-4 py-2 bg-emerald-50 rounded-full border border-emerald-100 text-emerald-700 text-xs font-black tracking-wider uppercase"
        >
          <Sparkles size={14} className="animate-spin text-emerald-500" />
          Supercharged Shared Grocery List
        </motion.div>

        {/* Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-gray-900 leading-tight"
        >
          Smart shopping lists,{" "}
          <span className="bg-gradient-to-r from-emerald-600 to-green-500 bg-clip-text text-transparent">
            shared in real-time
          </span>
        </motion.h1>

        {/* Subheading */}
        <motion.p
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-base sm:text-lg text-gray-500 max-w-xl mx-auto lg:mx-0 font-medium leading-relaxed"
        >
          The easiest way to design, manage, and complete your family shopping lists.
          Translate items instantly to Kannada, add using smart voice detection, and share directly
          via WhatsApp.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4"
        >
          <Link
            href="/register"
            className="w-full sm:w-auto bg-emerald-600 text-white font-black text-lg py-4 px-8 rounded-2.5rem hover:bg-emerald-700 transition-all hover:scale-105 active:scale-95 shadow-xl shadow-emerald-150 flex items-center justify-center gap-2 group"
          >
            <span>Create Free List</span>
            <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
          </Link>
          <a
            href="#interactive"
            className="w-full sm:w-auto bg-white border border-gray-100 text-gray-700 font-bold text-lg py-4 px-8 rounded-2.5rem hover:bg-gray-50 transition-all hover:scale-103 active:scale-97 shadow-sm text-center"
          >
            Try Interactive Demo
          </a>
        </motion.div>

        {/* Features checkmarks list */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="grid grid-cols-2 gap-4 max-w-md mx-auto lg:mx-0 text-left pt-4 border-t border-emerald-100/40"
        >
          {[
            "Real-time Auto Sync",
            "Kannada Translation",
            "Smart Voice Search",
            "100% Free - No Ads",
          ].map((text, i) => (
            <div key={i} className="flex items-center gap-2 text-sm font-bold text-gray-600">
              <span className="flex h-5 w-5 items-center justify-center rounded-md bg-emerald-100 text-emerald-600 text-xs font-black">✓</span>
              <span>{text}</span>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Physics Canvas Column */}
      <div className="lg:col-span-6 flex flex-col items-center justify-center relative z-10">
        <PhysicsCanvas />

        <div className="mt-4 flex gap-2 justify-center text-xs font-bold text-emerald-700/80 bg-emerald-50/50 px-4 py-2 rounded-full border border-emerald-100/30 shadow-xs">
          <span>🍊 Orange</span>
          <span>•</span>
          <span>🥑 Avocado</span>
          <span>•</span>
          <span>🥦 Broccoli</span>
          <span>•</span>
          <span>🍎 Apple</span>
          <span>•</span>
          <span>🥕 Carrot</span>
        </div>
      </div>
    </section>
  );
}
