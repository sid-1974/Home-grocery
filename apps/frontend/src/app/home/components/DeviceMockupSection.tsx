"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Smartphone, Tablet, Laptop, Mic, Check } from "lucide-react";

export default function DeviceMockupSection() {
  const [activeDevice, setActiveDevice] = useState<"mobile" | "tablet" | "laptop">("mobile");

  return (
    <section className="py-24 bg-gradient-to-b from-white to-emerald-50/40 relative z-10">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          {/* Description */}
          <div className="lg:col-span-5 space-y-6">
            <h2 className="text-xs font-black tracking-widest text-emerald-600 uppercase">
              Device Mockups
            </h2>
            <h3 className="text-3xl sm:text-4xl font-black text-gray-900 leading-tight">
              Designed to run smooth on every screen.
            </h3>
            <p className="text-gray-500 font-semibold text-base leading-relaxed">
              Whether you're shopping with your mobile in the grocery aisle, checking ingredients on your tablet in the kitchen, or planning on your laptop at home, the interface adjusts flawlessly without lag.
            </p>

            {/* Selector buttons */}
            <div className="flex gap-2 p-1.5 bg-emerald-50 rounded-2xl w-fit border border-emerald-100/50">
              <button
                onClick={() => setActiveDevice("mobile")}
                className={`flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-black tracking-wide cursor-pointer transition-all ${
                  activeDevice === "mobile"
                    ? "bg-emerald-600 text-white shadow-md shadow-emerald-150"
                    : "text-gray-500 hover:text-emerald-600"
                }`}
              >
                <Smartphone size={16} />
                <span>Mobile</span>
              </button>
              <button
                onClick={() => setActiveDevice("tablet")}
                className={`flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-black tracking-wide cursor-pointer transition-all ${
                  activeDevice === "tablet"
                    ? "bg-emerald-600 text-white shadow-md shadow-emerald-150"
                    : "text-gray-500 hover:text-emerald-600"
                }`}
              >
                <Tablet size={16} />
                <span>Tablet</span>
              </button>
              <button
                onClick={() => setActiveDevice("laptop")}
                className={`flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-black tracking-wide cursor-pointer transition-all ${
                  activeDevice === "laptop"
                    ? "bg-emerald-600 text-white shadow-md shadow-emerald-150"
                    : "text-gray-500 hover:text-emerald-600"
                }`}
              >
                <Laptop size={16} />
                <span>Laptop</span>
              </button>
            </div>
          </div>

          {/* Simulated Device Frame Container */}
          <div className="lg:col-span-7 flex justify-center items-center">
            <div className="w-full max-w-[500px] flex justify-center">
              {/* Mobile Device Frame */}
              {activeDevice === "mobile" && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="w-[280px] h-[550px] bg-gray-900 rounded-[3rem] p-3 shadow-2xl border-4 border-gray-800 relative"
                >
                  {/* Speaker ear slit */}
                  <div className="absolute top-4 left-1/2 -translate-x-1/2 w-20 h-4 bg-gray-900 rounded-full z-20 flex items-center justify-center">
                    <div className="w-8 h-1 bg-gray-800 rounded-full" />
                  </div>

                  {/* App Mockup screen */}
                  <div className="w-full h-full bg-[#f8f9fa] rounded-[2.5rem] overflow-hidden flex flex-col border border-gray-100">
                    {/* Header */}
                    <div className="bg-white border-b border-gray-100 px-4 pt-8 pb-3 flex justify-between items-center shrink-0">
                      <span className="font-black text-xs text-gray-900">My List</span>
                      <div className="bg-emerald-100 px-2.5 py-1 rounded-full text-emerald-700 text-[9px] font-black">
                        4 Items
                      </div>
                    </div>

                    {/* Mockup checklist items */}
                    <div className="p-4 space-y-3 flex-1 overflow-y-auto">
                      {[
                        { name: "Organic Milk (ಹಾಲು)", qty: "2 ltr", icon: "🥛" },
                        { name: "Fresh Apples (ಸೇಬು)", qty: "1.5 kg", icon: "🍎" },
                        { name: "Bananas (ಬಾಳೆಹಣ್ಣು)", qty: "6 pcs", icon: "🍌" },
                        { name: "Carrots (ಕ್ಯಾರೆಟ್)", qty: "500 g", icon: "🥕" },
                      ].map((item, idx) => (
                        <div key={idx} className="bg-white border border-gray-100 p-3 rounded-2xl flex items-center justify-between shadow-xs">
                          <div className="flex items-center gap-2.5">
                            <span className="text-lg">{item.icon}</span>
                            <div>
                              <h4 className="font-black text-gray-900 text-xs leading-tight">{item.name}</h4>
                              <span className="text-[10px] text-gray-400 font-bold">{item.qty}</span>
                            </div>
                          </div>
                          <div className="w-5 h-5 border border-emerald-500 rounded-full flex items-center justify-center">
                            <div className="w-2.5 h-2.5 bg-emerald-500 rounded-full" />
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Mockup footer input */}
                    <div className="p-3 bg-white border-t border-gray-100 flex items-center gap-2 shrink-0">
                      <input
                        disabled
                        placeholder="Speak or type item..."
                        className="flex-1 bg-gray-50 text-[10px] font-semibold py-2.5 px-3 rounded-xl border border-gray-100"
                      />
                      <div className="bg-emerald-600 text-white p-2 rounded-xl">
                        <Mic size={14} />
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Tablet Device Frame */}
              {activeDevice === "tablet" && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="w-[440px] h-[330px] bg-gray-900 rounded-[2.5rem] p-3.5 shadow-2xl border-4 border-gray-800 relative"
                >
                  {/* App Mockup screen */}
                  <div className="w-full h-full bg-[#f8f9fa] rounded-[1.8rem] overflow-hidden flex flex-col border border-gray-100">
                    {/* Header */}
                    <div className="bg-white border-b border-gray-100 px-6 py-4 flex justify-between items-center shrink-0">
                      <span className="font-black text-sm text-gray-900">Grocery List Dashboard</span>
                      <div className="flex gap-2">
                        <div className="bg-emerald-100 px-3 py-1 rounded-full text-emerald-700 text-xs font-black">
                          Total Weight: 3.5 kg
                        </div>
                      </div>
                    </div>

                    {/* Two-column layout dashboard */}
                    <div className="p-4 grid grid-cols-12 gap-4 flex-1 overflow-hidden">
                      {/* List column */}
                      <div className="col-span-7 bg-white rounded-2xl border border-gray-100 p-4 space-y-2 overflow-y-auto">
                        {[
                          { name: "Almond Milk", qty: "3 ltr", icon: "🥛" },
                          { name: "Avocado", qty: "4 pcs", icon: "🥑" },
                          { name: "Organic Spinach", qty: "1 kg", icon: "🥬" },
                        ].map((item, idx) => (
                          <div key={idx} className="bg-gray-50/50 p-2.5 rounded-xl flex items-center justify-between border border-gray-100">
                            <div className="flex items-center gap-2">
                              <span>{item.icon}</span>
                              <span className="font-bold text-xs text-gray-800">{item.name}</span>
                            </div>
                            <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md">
                              {item.qty}
                            </span>
                          </div>
                        ))}
                      </div>

                      {/* Actions column */}
                      <div className="col-span-5 flex flex-col gap-3 justify-center">
                        <div className="bg-emerald-600 text-white p-3 rounded-2xl text-center shadow-md">
                          <span className="text-xs font-black uppercase tracking-wider block">
                            Share With Family
                          </span>
                          <span className="text-[9px] font-bold opacity-80 mt-1 block">
                            Syncs across all devices
                          </span>
                        </div>
                        <div className="bg-white border border-gray-100 p-3 rounded-2xl text-center">
                          <span className="text-xs font-black text-gray-900 block">
                            Voice Search
                          </span>
                          <span className="text-[9px] text-gray-400 font-bold mt-1 block">
                            English & Kannada support
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Laptop Device Frame */}
              {activeDevice === "laptop" && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="w-full flex flex-col items-center"
                >
                  {/* Screen part */}
                  <div className="w-[460px] h-[280px] bg-gray-900 rounded-t-2xl p-3 shadow-xl border-t-4 border-l-4 border-r-4 border-gray-800 relative">
                    <div className="w-full h-full bg-[#f8f9fa] rounded-lg overflow-hidden flex flex-col border border-gray-200">
                      {/* Navbar */}
                      <div className="bg-white border-b border-gray-100 px-4 py-2.5 flex justify-between items-center shrink-0">
                        <span className="font-black text-xs text-emerald-600">Home Grocery List Editor</span>
                        <span className="text-[10px] text-gray-400 font-semibold">User: Siddu</span>
                      </div>
                      {/* Main window details */}
                      <div className="p-4 grid grid-cols-12 gap-3 flex-1 overflow-hidden">
                        {/* Sidebar catalog */}
                        <div className="col-span-4 bg-white border border-gray-100 rounded-xl p-3 space-y-1.5 overflow-y-auto">
                          <span className="text-[9px] font-black text-gray-400 uppercase tracking-widest block mb-1">
                            Catalog
                          </span>
                          {["Apple", "Banana", "Orange", "Carrot"].map((item, i) => (
                            <div key={i} className="text-[10px] font-bold text-gray-700 p-1 hover:bg-emerald-50 rounded cursor-pointer flex justify-between items-center">
                              <span>{item}</span>
                              <span className="text-[8px] text-emerald-600 font-black">+ ADD</span>
                            </div>
                          ))}
                        </div>
                        {/* Current list editor */}
                        <div className="col-span-8 bg-white border border-gray-100 rounded-xl p-3 space-y-2 overflow-y-auto">
                          <span className="text-[9px] font-black text-gray-400 uppercase tracking-widest block">
                            Active Shopping List
                          </span>
                          <div className="space-y-1">
                            {[
                              { name: "Red Apples (ಸೇಬು)", qty: "1 kg" },
                              { name: "Orange Fruit (ಕಿತ್ತಳೆ)", qty: "2 kg" },
                            ].map((item, i) => (
                              <div key={i} className="text-[10px] font-bold text-gray-700 flex justify-between border-b border-gray-50 pb-1">
                                <span>{item.name}</span>
                                <span className="text-emerald-600">{item.qty}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* Keyboard base part */}
                  <div className="w-[500px] h-[12px] bg-gray-800 rounded-b-xl relative shadow-lg" />
                  <div className="w-[100px] h-[4px] bg-gray-700 mx-auto rounded-b-md" />
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
