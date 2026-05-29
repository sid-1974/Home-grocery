"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, ShoppingCart } from "lucide-react";
import { AppleSvg, BasketSvg, FRUITS_MAP, FRUIT_ITEMS } from "@/components/fruitSvg";

export default function DragDropShowcase() {
  const shelfRef = useRef<HTMLDivElement | null>(null);
  const dropTargetRef = useRef<HTMLDivElement | null>(null);

  // Cart counts and triggers
  const [cartCount, setCartCount] = useState(0);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [isBasketBouncing, setIsBasketBouncing] = useState(false);
  const [addedFruits, setAddedFruits] = useState<string[]>([]);
  const [fallingItems, setFallingItems] = useState<Array<{ id: string; type: string; x: number; y: number }>>([]);

  // Handle Drag End coordinates and updates
  const handleDragEnd = (event: any, info: any, itemType: string) => {
    if (!dropTargetRef.current) return;

    const targetRect = dropTargetRef.current.getBoundingClientRect();
    const pointerX = info.point.x - window.scrollX;
    const pointerY = info.point.y - window.scrollY;

    const isInside =
      pointerX >= targetRect.left &&
      pointerX <= targetRect.right &&
      pointerY >= targetRect.top &&
      pointerY <= targetRect.bottom;

    if (isInside) {
      setCartCount((prev) => prev + 1);
      setIsBasketBouncing(true);
      setSuccessMessage(`Added delicious ${itemType.toUpperCase()}! 🌟`);

      // Add to added list to swap with placeholder on shelf
      setAddedFruits((prev) => {
        if (prev.includes(itemType)) return prev;
        return [...prev, itemType];
      });

      // Spawn falling overlay element
      const dropZoneElement = dropTargetRef.current;
      if (dropZoneElement) {
        const dropZoneRect = dropZoneElement.getBoundingClientRect();
        const relativeX = pointerX - dropZoneRect.left;
        const relativeY = pointerY - dropZoneRect.top;

        const newFallingItem = {
          id: Math.random().toString(),
          type: itemType,
          x: relativeX,
          y: relativeY,
        };

        setFallingItems((prev) => [...prev, newFallingItem]);

        setTimeout(() => {
          setFallingItems((prev) => prev.filter((item) => item.id !== newFallingItem.id));
        }, 800);
      }

      setTimeout(() => setIsBasketBouncing(false), 500);
      setTimeout(() => setSuccessMessage(null), 3000);
    }
  };

  return (
    <section id="interactive" className="py-24 max-w-7xl mx-auto px-6 relative z-10">
      <div className="bg-gradient-to-br from-emerald-900 to-emerald-950 text-white rounded-3xl p-8 sm:p-12 shadow-2xl relative overflow-hidden">
        {/* Subtle background decoration */}
        <div className="absolute right-0 bottom-0 top-0 w-1/3 bg-radial-gradient from-emerald-800/40 to-transparent pointer-events-none" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Text description */}
          <div className="lg:col-span-5 space-y-6">
            <span className="px-3.5 py-1.5 bg-emerald-500/25 border border-emerald-500/30 rounded-full text-emerald-400 text-xs font-black tracking-widest uppercase">
              Interactive Mini-Game
            </span>
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight leading-tight">
              Toss groceries into the cart!
            </h2>
            <p className="text-emerald-200/80 font-medium text-base leading-relaxed">
              Test the physics right here. Drag any fruit from the wooden shelf on the right and drop it directly into the shopping cart below.
            </p>

            {/* Status Alert Banner */}
            <AnimatePresence mode="wait">
              {successMessage && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="p-4 bg-emerald-800/60 border border-emerald-600/40 rounded-2xl flex items-center gap-3"
                >
                  <div className="bg-emerald-500 p-1.5 rounded-full text-white shrink-0">
                    <Check size={14} className="stroke-[3]" />
                  </div>
                  <span className="text-sm font-bold text-emerald-100">{successMessage}</span>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Counter Display */}
            <div className="flex items-center gap-4 pt-4 border-t border-emerald-800/50">
              <div>
                <span className="text-xs font-black text-emerald-400 uppercase tracking-widest block">
                  Demo Cart Count
                </span>
                <span className="text-3xl font-black text-white">{cartCount} items</span>
              </div>
              {cartCount > 0 && (
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    setCartCount(0);
                    setAddedFruits([]);
                    setFallingItems([]);
                  }}
                  className="px-4 py-2 bg-emerald-800 hover:bg-emerald-700 border border-emerald-700/50 text-xs font-bold text-emerald-300 rounded-xl transition-colors cursor-pointer"
                >
                  Reset Cart
                </motion.button>
              )}
            </div>
          </div>

          {/* Game interaction block */}
          <div className="lg:col-span-7 flex flex-col sm:flex-row gap-8 items-center justify-center">
            {/* Shopping basket target */}
            <div
              ref={dropTargetRef}
              className="w-full max-w-[280px] bg-emerald-950/60 border-2 border-dashed border-emerald-700/50 rounded-3rem p-6 flex flex-col items-center justify-center min-h-[220px] transition-all relative overflow-hidden group"
            >
              <div className="absolute top-3 right-3">
                <span className="px-2 py-1 bg-emerald-500/20 text-emerald-400 text-[9px] font-black uppercase rounded">
                  Drop Zone
                </span>
              </div>

              {/* Falling Fruits Animation Overlay */}
              <div className="absolute inset-0 pointer-events-none z-20">
                <AnimatePresence>
                  {fallingItems.map((item) => {
                    const FruitComponent = FRUITS_MAP[item.type as keyof typeof FRUITS_MAP] || AppleSvg;
                    return (
                      <motion.div
                        key={item.id}
                        initial={{ x: item.x - 24, y: item.y - 24, scale: 1.1, opacity: 1, rotate: 0 }}
                        animate={{
                          y: 110, // falls into basket
                          scale: 0.1, // shrinks
                          opacity: 0, // fades out
                          rotate: 180 + Math.random() * 180,
                        }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.7, ease: [0.25, 1, 0.5, 1] }}
                        className="absolute"
                      >
                        <FruitComponent size={48} />
                      </motion.div>
                    );
                  })}
                </AnimatePresence>
              </div>

              <motion.div
                animate={isBasketBouncing ? { scale: [1, 1.15, 0.95, 1], rotate: [0, 5, -5, 0] } : {}}
                transition={{ duration: 0.5 }}
                className="relative z-10"
              >
                <BasketSvg width={180} height={100} />
              </motion.div>

              <div className="text-center mt-4">
                <span className="text-xs font-black text-emerald-300 uppercase tracking-widest block mb-1">
                  Shopping Cart
                </span>
                <span className="text-[11px] font-bold text-emerald-400/70">
                  Release items here
                </span>
              </div>
            </div>

            {/* Wooden Shelf containing draggable fruits */}
            <div
              ref={shelfRef}
              className="w-full max-w-[320px] bg-[#6d4c41]/35 border border-[#8d6e63]/30 rounded-3rem p-6 relative shadow-inner flex flex-col gap-6"
            >
              {/* Shelf labels */}
              <div className="text-center border-b border-[#8d6e63]/20 pb-3">
                <span className="text-xs font-black text-[#d7ccc8] uppercase tracking-widest">
                  Draggable Shelf
                </span>
              </div>

              {/* Fruit grid items */}
              <div className="grid grid-cols-2 gap-4">
                {FRUIT_ITEMS.slice(0, 4).map((fruit) => {
                  const isAdded = addedFruits.includes(fruit.id);
                  const FruitIcon = fruit.Svg;

                  if (isAdded) {
                    return (
                      <div
                        key={fruit.id}
                        className="bg-emerald-950/10 border border-emerald-900/10 rounded-2xl p-4 flex flex-col items-center justify-center min-h-[96px] opacity-40 select-none"
                      >
                        <div className="w-10 h-10 flex items-center justify-center border border-dashed border-emerald-700/20 rounded-full text-emerald-400 bg-emerald-950/15">
                          <Check size={16} className="stroke-[3]" />
                        </div>
                        <span className="text-[9px] font-black uppercase text-emerald-400 mt-2 block tracking-wider">
                          In Cart
                        </span>
                      </div>
                    );
                  }

                  return (
                    <div
                      key={fruit.id}
                      className="bg-emerald-950/40 hover:bg-emerald-950/60 border border-emerald-800/30 rounded-2xl p-4 flex flex-col items-center justify-center cursor-grab relative z-10 hover:shadow-lg transition-colors group"
                    >
                      <motion.div
                        drag
                        dragSnapToOrigin={true}
                        whileDrag={{
                          scale: 1.25,
                          zIndex: 100,
                          cursor: "grabbing",
                          filter: "drop-shadow(0px 10px 15px rgba(0,0,0,0.3))",
                        }}
                        onDragEnd={(e, info) => handleDragEnd(e, info, fruit.id)}
                        className="w-fit h-fit active:cursor-grabbing relative z-20"
                      >
                        <FruitIcon size={48} className="transition-transform group-hover:scale-105" />
                      </motion.div>
                      <span className="text-[10px] font-black uppercase text-emerald-300 mt-2 block tracking-wider">
                        Drag Me
                      </span>
                    </div>
                  );
                })}
              </div>

              {/* Shelf wood plank texture accent */}
              <div className="absolute -bottom-2 left-0 right-0 h-4 bg-[#4e342e] rounded-b-xl shadow-md border-t border-[#8d6e63]/30" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
