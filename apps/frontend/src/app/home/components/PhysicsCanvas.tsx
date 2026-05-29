"use client";

import { useEffect, useRef, useState } from "react";
import { BasketSvg, FRUIT_ITEMS } from "@/components/fruitSvg";

interface PhysicsFruit {
  id: string;
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  rotation: number;
  angularVelocity: number;
  color: string;
  type: string;
  scale: number;
}

export default function PhysicsCanvas() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isMobileDevice, setIsMobileDevice] = useState(false);

  useEffect(() => {
    setIsMobileDevice(window.innerWidth < 768);
    const handleResizeDevice = () => {
      setIsMobileDevice(window.innerWidth < 768);
    };
    window.addEventListener("resize", handleResizeDevice);
    return () => window.removeEventListener("resize", handleResizeDevice);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let fruits: PhysicsFruit[] = [];
    const gravity = 0.45;
    const bounce = 0.55;
    const friction = 0.992;

    // Define responsive dimensions
    let width = (canvas.width = canvas.parentElement?.clientWidth || 500);
    let height = (canvas.height = 500);

    let isMobile = window.innerWidth < 768;
    let defaultRadius = isMobile ? 18 : 25;
    let basketWidth = isMobile ? 150 : 200;
    let basketHeight = 90;
    const basketY = height - basketHeight + 15;

    const handleResize = () => {
      if (!canvas || !canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      isMobile = window.innerWidth < 768;
      defaultRadius = isMobile ? 18 : 25;
      basketWidth = isMobile ? 150 : 200;
    };

    window.addEventListener("resize", handleResize);

    // Drawing functions for Canvas fruits
    const drawApple = (c: CanvasRenderingContext2D, r: number) => {
      let grad = c.createRadialGradient(-r * 0.15, -r * 0.15, r * 0.2, 0, 0, r);
      grad.addColorStop(0, "#ff5e62");
      grad.addColorStop(0.7, "#ff2a3a");
      grad.addColorStop(1, "#b3001b");
      c.fillStyle = grad;

      c.beginPath();
      c.arc(-r * 0.25, 0, r * 0.75, 0, Math.PI * 2);
      c.arc(r * 0.25, 0, r * 0.75, 0, Math.PI * 2);
      c.arc(0, r * 0.35, r * 0.6, 0, Math.PI * 2);
      c.fill();

      // Stem
      c.beginPath();
      c.moveTo(0, -r * 0.5);
      c.quadraticCurveTo(r * 0.15, -r * 0.9, r * 0.3, -r * 0.9);
      c.strokeStyle = "#5d4037";
      c.lineWidth = r * 0.1;
      c.stroke();

      // Leaf
      c.beginPath();
      c.ellipse(r * 0.25, -r * 0.75, r * 0.4, r * 0.2, -Math.PI / 6, 0, Math.PI * 2);
      c.fillStyle = "#81c784";
      c.fill();

      // Highlight
      c.beginPath();
      c.ellipse(-r * 0.25, -r * 0.25, r * 0.15, r * 0.3, -Math.PI / 6, 0, Math.PI * 2);
      c.fillStyle = "rgba(255, 255, 255, 0.4)";
      c.fill();
    };

    const drawOrange = (c: CanvasRenderingContext2D, r: number) => {
      let grad = c.createRadialGradient(-r * 0.15, -r * 0.15, r * 0.2, 0, 0, r);
      grad.addColorStop(0, "#ffb347");
      grad.addColorStop(0.8, "#ff8c00");
      grad.addColorStop(1, "#e05300");
      c.fillStyle = grad;

      c.beginPath();
      c.arc(0, 0, r, 0, Math.PI * 2);
      c.fill();

      // Stem
      c.beginPath();
      c.moveTo(0, -r * 0.85);
      c.lineTo(0, -r * 1.05);
      c.strokeStyle = "#5d4037";
      c.lineWidth = r * 0.08;
      c.stroke();

      // Leaf
      c.beginPath();
      c.ellipse(-r * 0.2, -r * 0.9, r * 0.3, r * 0.15, -Math.PI / 4, 0, Math.PI * 2);
      c.fillStyle = "#2e7d32";
      c.fill();

      // Highlights
      c.beginPath();
      c.ellipse(-r * 0.3, -r * 0.3, r * 0.12, r * 0.22, -Math.PI / 4, 0, Math.PI * 2);
      c.fillStyle = "rgba(255, 255, 255, 0.35)";
      c.fill();
    };

    const drawBanana = (c: CanvasRenderingContext2D, r: number) => {
      c.beginPath();
      c.arc(-r * 0.3, -r * 0.3, r * 1.1, 0.15 * Math.PI, 0.65 * Math.PI, false);
      c.strokeStyle = "#ffd600";
      c.lineWidth = r * 0.45;
      c.lineCap = "round";
      c.stroke();

      c.beginPath();
      c.arc(-r * 0.3, -r * 0.3, r * 1.1, 0.18 * Math.PI, 0.62 * Math.PI, false);
      c.strokeStyle = "#ffee55";
      c.lineWidth = r * 0.2;
      c.lineCap = "round";
      c.stroke();

      c.beginPath();
      c.arc(-r * 0.3, -r * 0.3, r * 1.1, 0.65 * Math.PI, 0.68 * Math.PI, false);
      c.strokeStyle = "#4e342e";
      c.lineWidth = r * 0.35;
      c.lineCap = "round";
      c.stroke();

      c.beginPath();
      c.arc(-r * 0.3, -r * 0.3, r * 1.1, 0.12 * Math.PI, 0.15 * Math.PI, false);
      c.strokeStyle = "#4e342e";
      c.lineWidth = r * 0.25;
      c.lineCap = "round";
      c.stroke();
    };

    const drawGrapes = (c: CanvasRenderingContext2D, r: number) => {
      let grad = c.createRadialGradient(-r * 0.1, -r * 0.1, 1, 0, 0, r * 0.35);
      grad.addColorStop(0, "#b388ff");
      grad.addColorStop(0.85, "#7c4dff");
      grad.addColorStop(1, "#6200ea");
      c.fillStyle = grad;

      const grapeOffsets = [
        { dx: 0, dy: -r * 0.5 },
        { dx: -r * 0.35, dy: -r * 0.2 },
        { dx: r * 0.35, dy: -r * 0.2 },
        { dx: -r * 0.5, dy: r * 0.15 },
        { dx: 0, dy: r * 0.15 },
        { dx: r * 0.5, dy: r * 0.15 },
        { dx: -r * 0.25, dy: r * 0.5 },
        { dx: r * 0.25, dy: r * 0.5 },
        { dx: 0, dy: r * 0.8 },
      ];

      grapeOffsets.forEach((pt) => {
        c.save();
        c.translate(pt.dx, pt.dy);
        c.beginPath();
        c.arc(0, 0, r * 0.32, 0, Math.PI * 2);
        c.fill();
        c.beginPath();
        c.arc(-r * 0.08, -r * 0.08, r * 0.08, 0, Math.PI * 2);
        c.fillStyle = "rgba(255, 255, 255, 0.4)";
        c.fill();
        c.restore();
      });

      c.beginPath();
      c.moveTo(0, -r * 0.5);
      c.quadraticCurveTo(-r * 0.15, -r * 0.9, -r * 0.3, -r * 0.9);
      c.strokeStyle = "#5d4037";
      c.lineWidth = r * 0.06;
      c.stroke();
    };

    const drawCarrot = (c: CanvasRenderingContext2D, r: number) => {
      c.beginPath();
      c.moveTo(0, -r * 0.4);
      c.quadraticCurveTo(r * 0.15, -r * 0.9, r * 0.2, -r * 1.1);
      c.moveTo(-r * 0.1, -r * 0.4);
      c.quadraticCurveTo(-r * 0.3, -r * 0.8, -r * 0.3, -r * 1.0);
      c.strokeStyle = "#2e7d32";
      c.lineWidth = r * 0.08;
      c.stroke();

      let grad = c.createLinearGradient(0, -r * 0.4, 0, r * 0.9);
      grad.addColorStop(0, "#ffb300");
      grad.addColorStop(0.3, "#ff6f00");
      grad.addColorStop(1, "#e65100");
      c.fillStyle = grad;

      c.beginPath();
      c.moveTo(-r * 0.35, -r * 0.4);
      c.lineTo(r * 0.35, -r * 0.4);
      c.lineTo(0, r * 0.95);
      c.closePath();
      c.fill();

      c.strokeStyle = "#d84315";
      c.lineWidth = 1.5;
      c.beginPath();
      c.moveTo(-r * 0.2, -r * 0.1);
      c.lineTo(r * 0.15, -r * 0.1);
      c.moveTo(-r * 0.1, r * 0.3);
      c.lineTo(r * 0.1, r * 0.3);
      c.stroke();
    };

    const drawBroccoli = (c: CanvasRenderingContext2D, r: number) => {
      c.fillStyle = "#a8e063";
      c.beginPath();
      c.moveTo(-r * 0.25, 0);
      c.lineTo(r * 0.25, 0);
      c.lineTo(r * 0.3, r * 0.8);
      c.lineTo(-r * 0.3, r * 0.8);
      c.closePath();
      c.fill();

      c.fillStyle = "#1b5e20";
      const crowns = [
        { dx: 0, dy: -r * 0.35, cr: r * 0.45 },
        { dx: -r * 0.35, dy: -r * 0.15, cr: r * 0.4 },
        { dx: r * 0.35, dy: -r * 0.15, cr: r * 0.4 },
        { dx: -r * 0.45, dy: r * 0.2, cr: r * 0.3 },
        { dx: r * 0.45, dy: r * 0.2, cr: r * 0.3 },
        { dx: -r * 0.18, dy: r * 0.1, cr: r * 0.35 },
        { dx: r * 0.18, dy: r * 0.1, cr: r * 0.35 },
      ];
      crowns.forEach((cr) => {
        c.beginPath();
        c.arc(cr.dx, cr.dy, cr.cr, 0, Math.PI * 2);
        c.fill();
      });
    };

    const drawAvocado = (c: CanvasRenderingContext2D, r: number) => {
      c.fillStyle = "#1b4d3e";
      c.beginPath();
      c.ellipse(0, 0, r * 0.72, r, 0, 0, Math.PI * 2);
      c.fill();

      c.fillStyle = "#d4e157";
      c.beginPath();
      c.ellipse(0, 0, r * 0.62, r * 0.88, 0, 0, Math.PI * 2);
      c.fill();

      c.fillStyle = "#4e342e";
      c.beginPath();
      c.arc(0, r * 0.22, r * 0.34, 0, Math.PI * 2);
      c.fill();

      c.beginPath();
      c.arc(-r * 0.1, r * 0.12, r * 0.08, 0, Math.PI * 2);
      c.fillStyle = "rgba(255, 255, 255, 0.35)";
      c.fill();
    };

    const drawWatermelon = (c: CanvasRenderingContext2D, r: number) => {
      c.fillStyle = "#1b5e20";
      c.beginPath();
      c.arc(0, -r * 0.2, r, 0, Math.PI, false);
      c.fill();

      c.fillStyle = "#f1f8e9";
      c.beginPath();
      c.arc(0, -r * 0.2, r * 0.9, 0, Math.PI, false);
      c.fill();

      c.fillStyle = "#ff1744";
      c.beginPath();
      c.arc(0, -r * 0.2, r * 0.8, 0, Math.PI, false);
      c.fill();

      c.fillStyle = "#212121";
      c.beginPath();
      c.arc(-r * 0.3, r * 0.2, r * 0.06, 0, Math.PI * 2);
      c.arc(0, r * 0.35, r * 0.06, 0, Math.PI * 2);
      c.arc(r * 0.3, r * 0.2, r * 0.06, 0, Math.PI * 2);
      c.fill();
    };

    const spawnFruit = (x: number, y: number, itemType?: string) => {
      const typeList = ["apple", "orange", "banana", "grapes", "carrot", "broccoli", "avocado", "watermelon"];
      const finalType = itemType || typeList[Math.floor(Math.random() * typeList.length)];
      const itemConfig = FRUIT_ITEMS.find((f) => f.id === finalType) || FRUIT_ITEMS[0];

      const newFruit: PhysicsFruit = {
        id: Math.random().toString(36).substring(2, 9),
        x: x,
        y: y,
        vx: (Math.random() - 0.5) * 5,
        vy: -2 - Math.random() * 4,
        radius: defaultRadius,
        rotation: 0,
        angularVelocity: 0,
        color: itemConfig.color,
        type: finalType,
        scale: 1,
      };

      fruits.push(newFruit);

      if (fruits.length > 55) {
        fruits.shift();
      }
    };

    setTimeout(() => {
      const startSpawns = [
        { offset: -100, delay: 100, type: "apple" },
        { offset: -50, delay: 300, type: "orange" },
        { offset: 0, delay: 500, type: "banana" },
        { offset: 50, delay: 700, type: "grapes" },
        { offset: 100, delay: 900, type: "carrot" },
        { offset: -80, delay: 1100, type: "broccoli" },
        { offset: 80, delay: 1300, type: "avocado" },
        { offset: 120, delay: 1500, type: "watermelon" },
      ];

      startSpawns.forEach((spawn) => {
        setTimeout(() => {
          if (canvasRef.current) {
            spawnFruit(width / 2 + spawn.offset, -40, spawn.type);
          }
        }, spawn.delay);
      });
    }, 500);

    const handleCanvasClick = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const clickX = e.clientX - rect.left;
      const clickY = e.clientY - rect.top;
      spawnFruit(clickX, clickY - 20);
    };

    const handleCanvasTouch = (e: TouchEvent) => {
      if (e.touches.length === 0) return;
      e.preventDefault();
      const rect = canvas.getBoundingClientRect();
      const touchX = e.touches[0].clientX - rect.left;
      const touchY = e.touches[0].clientY - rect.top;
      spawnFruit(touchX, touchY - 20);
    };

    canvas.addEventListener("mousedown", handleCanvasClick);
    canvas.addEventListener("touchstart", handleCanvasTouch, { passive: false });

    const update = () => {
      ctx.clearRect(0, 0, width, height);

      const basketX = width / 2;
      const basketLeft = basketX - basketWidth / 2;
      const basketRight = basketX + basketWidth / 2;

      // 1. Solve circle collisions
      for (let i = 0; i < fruits.length; i++) {
        for (let j = i + 1; j < fruits.length; j++) {
          const f1 = fruits[i];
          const f2 = fruits[j];

          const dx = f2.x - f1.x;
          const dy = f2.y - f1.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const minDist = f1.radius + f2.radius;

          if (dist < minDist) {
            const overlap = minDist - dist;
            const nx = dx / dist;
            const ny = dy / dist;

            f1.x -= nx * overlap * 0.5;
            f1.y -= ny * overlap * 0.5;
            f2.x += nx * overlap * 0.5;
            f2.y += ny * overlap * 0.5;

            const kx = f1.vx - f2.vx;
            const ky = f1.vy - f2.vy;
            const p = (2 * (nx * kx + ny * ky)) / 2;

            f1.vx -= p * nx * 0.45;
            f1.vy -= p * ny * 0.45;
            f2.vx += p * nx * 0.45;
            f2.vy += p * ny * 0.45;
          }
        }
      }

      // 2. Update boundary checks
      fruits.forEach((f) => {
        f.vy += gravity;
        f.vx *= friction;
        f.vy *= friction;

        f.x += f.vx;
        f.y += f.vy;

        // Wall collisions
        if (f.x - f.radius < 0) {
          f.x = f.radius;
          f.vx = -f.vx * bounce;
        } else if (f.x + f.radius > width) {
          f.x = width - f.radius;
          f.vx = -f.vx * bounce;
        }

        const insideBasketHorizontally = f.x > basketLeft + 10 && f.x < basketRight - 10;
        const basketBottomLimit = height - 25;

        if (insideBasketHorizontally) {
          if (f.y + f.radius > basketBottomLimit) {
            f.y = basketBottomLimit - f.radius;
            f.vy = -f.vy * 0.25;
            f.vx *= 0.75;
          }
          if (f.x - f.radius < basketLeft + 15 && f.y > basketY) {
            f.x = basketLeft + 15 + f.radius;
            f.vx = -f.vx * 0.3;
          }
          if (f.x + f.radius > basketRight - 15 && f.y > basketY) {
            f.x = basketRight - 15 - f.radius;
            f.vx = -f.vx * 0.3;
          }
        } else {
          if (f.y + f.radius > height - 10) {
            f.y = height - 10 - f.radius;
            f.vy = -f.vy * bounce;
            f.vx *= 0.8;
          }
        }

        ctx.save();
        ctx.translate(f.x, f.y);

        switch (f.type) {
          case "apple":
            drawApple(ctx, f.radius);
            break;
          case "orange":
            drawOrange(ctx, f.radius);
            break;
          case "banana":
            drawBanana(ctx, f.radius);
            break;
          case "grapes":
            drawGrapes(ctx, f.radius);
            break;
          case "carrot":
            drawCarrot(ctx, f.radius);
            break;
          case "broccoli":
            drawBroccoli(ctx, f.radius);
            break;
          case "avocado":
            drawAvocado(ctx, f.radius);
            break;
          case "watermelon":
            drawWatermelon(ctx, f.radius);
            break;
          default:
            drawApple(ctx, f.radius);
        }

        ctx.restore();
      });

      animationFrameId = requestAnimationFrame(update);
    };

    update();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
      if (canvas) {
        canvas.removeEventListener("mousedown", handleCanvasClick);
        canvas.removeEventListener("touchstart", handleCanvasTouch);
      }
    };
  }, []);

  return (
    <div className="w-full max-w-[460px] bg-white/70 backdrop-blur-md rounded-3rem p-3 shadow-2xl border border-white/50 relative overflow-hidden group">
      <div className="absolute top-4 left-0 right-0 text-center pointer-events-none z-20">
        <span className="px-4 py-1.5 bg-emerald-600/90 text-white text-[11px] font-black tracking-widest uppercase rounded-full shadow-md backdrop-blur-xs animate-pulse">
          👇 Click / Tap Canvas to drop food!
        </span>
      </div>

      <canvas
        ref={canvasRef}
        className="w-full h-[380px] sm:h-[450px] bg-gradient-to-b from-emerald-50/20 to-white/90 rounded-2.5rem border border-emerald-100/30 cursor-pointer block relative z-10"
      />

      <div className="absolute bottom-[20px] left-1/2 -translate-x-1/2 z-20 pointer-events-none">
        <BasketSvg width={isMobileDevice ? 160 : 220} height={100} />
      </div>
    </div>
  );
}
