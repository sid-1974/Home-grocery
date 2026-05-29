import React from "react";

// Apple SVG Component
export const AppleSvg = ({ size = 64, className = "" }: { size?: number; className?: string }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 64 64"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <defs>
      <radialGradient id="appleGrad" cx="35%" cy="30%" r="70%">
        <stop offset="0%" stopColor="#ff5e62" />
        <stop offset="70%" stopColor="#ff2a3a" />
        <stop offset="100%" stopColor="#b3001b" />
      </radialGradient>
      <linearGradient id="leafGrad" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#a8ff78" />
        <stop offset="100%" stopColor="#78ffd6" />
      </linearGradient>
    </defs>
    {/* Stem */}
    <path
      d="M32 16C32 12 35 10 37 8"
      stroke="#5d4037"
      strokeWidth="3"
      strokeLinecap="round"
    />
    {/* Leaf */}
    <path
      d="M32 12C36 8 44 8 46 12C46 16 38 18 32 12Z"
      fill="url(#leafGrad)"
    />
    {/* Apple Body */}
    <path
      d="M32 18C28 15 14 16 12 28C10 40 20 54 32 54C44 54 54 40 52 28C50 16 36 15 32 18Z"
      fill="url(#appleGrad)"
      filter="drop-shadow(0px 4px 6px rgba(0, 0, 0, 0.15))"
    />
    {/* Highlight */}
    <ellipse cx="24" cy="26" rx="4" ry="7" transform="rotate(-15 24 26)" fill="white" fillOpacity="0.4" />
  </svg>
);

// Orange SVG Component
export const OrangeSvg = ({ size = 64, className = "" }: { size?: number; className?: string }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 64 64"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <defs>
      <radialGradient id="orangeGrad" cx="35%" cy="30%" r="70%">
        <stop offset="0%" stopColor="#ffb347" />
        <stop offset="80%" stopColor="#ff8c00" />
        <stop offset="100%" stopColor="#e05300" />
      </radialGradient>
    </defs>
    {/* Stem */}
    <path
      d="M32 14C32 10 34 8 35 7"
      stroke="#5d4037"
      strokeWidth="2.5"
      strokeLinecap="round"
    />
    {/* Leaf */}
    <path
      d="M32 11C28 8 22 8 20 11C20 14 26 15 32 11Z"
      fill="#4caf50"
    />
    {/* Orange Body */}
    <circle
      cx="32"
      cy="34"
      r="20"
      fill="url(#orangeGrad)"
      filter="drop-shadow(0px 4px 6px rgba(0, 0, 0, 0.15))"
    />
    {/* Texture Dots */}
    <circle cx="24" cy="26" r="0.75" fill="#e05300" opacity="0.6" />
    <circle cx="28" cy="38" r="0.75" fill="#e05300" opacity="0.6" />
    <circle cx="40" cy="30" r="0.75" fill="#e05300" opacity="0.6" />
    <circle cx="36" cy="42" r="0.75" fill="#e05300" opacity="0.6" />
    <circle cx="20" cy="34" r="0.75" fill="#e05300" opacity="0.6" />
    <circle cx="42" cy="38" r="0.75" fill="#e05300" opacity="0.6" />
    {/* Highlight */}
    <ellipse cx="26" cy="26" rx="3" ry="5" transform="rotate(-30 26 26)" fill="white" fillOpacity="0.35" />
  </svg>
);

// Banana SVG Component
export const BananaSvg = ({ size = 64, className = "" }: { size?: number; className?: string }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 64 64"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <defs>
      <linearGradient id="bananaGrad" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#ffee55" />
        <stop offset="80%" stopColor="#ffd600" />
        <stop offset="100%" stopColor="#ffb300" />
      </linearGradient>
    </defs>
    {/* Stem/Top */}
    <path
      d="M48 10C47 11 44 14 43 16"
      stroke="#4e342e"
      strokeWidth="4"
      strokeLinecap="round"
    />
    {/* Banana Body */}
    <path
      d="M44 15C38 22 28 26 18 26C13 26 9 24 6 22C9 30 18 42 32 42C41 42 46 32 49 24C50 20 48 16 44 15Z"
      fill="url(#bananaGrad)"
      filter="drop-shadow(0px 4px 6px rgba(0, 0, 0, 0.12))"
    />
    {/* Tip */}
    <path
      d="M6 22C5.5 22.5 4.5 24 5 25C5.5 26 7 25 7.5 24.5C8 24 7.5 22.5 6 22Z"
      fill="#4e342e"
    />
    {/* Stripe/Detail */}
    <path
      d="M41 18C35.5 26 26.5 31.5 16 31"
      stroke="#b2a300"
      strokeWidth="1.5"
      strokeLinecap="round"
      opacity="0.4"
    />
  </svg>
);

// Grapes SVG Component
export const GrapesSvg = ({ size = 64, className = "" }: { size?: number; className?: string }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 64 64"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <defs>
      <radialGradient id="grapeGrad" cx="35%" cy="30%" r="70%">
        <stop offset="0%" stopColor="#b388ff" />
        <stop offset="85%" stopColor="#7c4dff" />
        <stop offset="100%" stopColor="#6200ea" />
      </radialGradient>
    </defs>
    {/* Stem */}
    <path
      d="M32 15C32 9 37 8 40 6"
      stroke="#5d4037"
      strokeWidth="2.5"
      strokeLinecap="round"
    />
    {/* Leaf */}
    <path
      d="M26 12C22 10 16 11 14 14C14 17 20 18 26 12Z"
      fill="#2e7d32"
    />
    {/* Grape cluster group */}
    <g filter="drop-shadow(0px 4px 6px rgba(0, 0, 0, 0.15))">
      {/* Row 1 */}
      <circle cx="25" cy="22" r="6" fill="url(#grapeGrad)" />
      <circle cx="39" cy="22" r="6" fill="url(#grapeGrad)" />
      <circle cx="32" cy="20" r="6.5" fill="url(#grapeGrad)" />
      
      {/* Row 2 */}
      <circle cx="21" cy="30" r="6" fill="url(#grapeGrad)" />
      <circle cx="43" cy="30" r="6" fill="url(#grapeGrad)" />
      <circle cx="29" cy="30" r="6" fill="url(#grapeGrad)" />
      <circle cx="35" cy="30" r="6" fill="url(#grapeGrad)" />
      
      {/* Row 3 */}
      <circle cx="26" cy="38" r="6" fill="url(#grapeGrad)" />
      <circle cx="38" cy="38" r="6" fill="url(#grapeGrad)" />
      <circle cx="32" cy="38" r="6" fill="url(#grapeGrad)" />
      
      {/* Row 4 */}
      <circle cx="29" cy="46" r="6" fill="url(#grapeGrad)" />
      <circle cx="35" cy="46" r="6" fill="url(#grapeGrad)" />
      
      {/* Row 5 */}
      <circle cx="32" cy="52" r="5.5" fill="url(#grapeGrad)" />
    </g>
  </svg>
);

// Carrot SVG Component
export const CarrotSvg = ({ size = 64, className = "" }: { size?: number; className?: string }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 64 64"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <defs>
      <linearGradient id="carrotGrad" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#ffb300" />
        <stop offset="30%" stopColor="#ff6f00" />
        <stop offset="100%" stopColor="#e65100" />
      </linearGradient>
    </defs>
    {/* Greens */}
    <path d="M42 22C42 12 36 6 36 6C36 6 42 12 44 14" stroke="#2e7d32" strokeWidth="2.5" strokeLinecap="round" />
    <path d="M46 20C48 10 46 4 46 4C46 4 48 10 49 13" stroke="#4caf50" strokeWidth="2.5" strokeLinecap="round" />
    <path d="M38 24C34 16 28 12 28 12C28 12 34 16 36 19" stroke="#1b5e20" strokeWidth="2.5" strokeLinecap="round" />
    
    {/* Carrot Body */}
    <path
      d="M41 21C43 23 43 27 39 31C32 38 18 52 10 58C9 59 7 57 8 56C14 48 28 34 35 27C39 23 39 19 41 21Z"
      fill="url(#carrotGrad)"
      filter="drop-shadow(0px 4px 6px rgba(0, 0, 0, 0.12))"
    />
    
    {/* Texture Lines */}
    <path d="M33 33C31 32 30 32 29 33" stroke="#d84315" strokeWidth="1.5" strokeLinecap="round" opacity="0.6" />
    <path d="M26 40C24 39 23 39 22 40" stroke="#d84315" strokeWidth="1.5" strokeLinecap="round" opacity="0.6" />
    <path d="M19 47C17 46 16 46 15 47" stroke="#d84315" strokeWidth="1.5" strokeLinecap="round" opacity="0.6" />
  </svg>
);

// Broccoli SVG Component
export const BroccoliSvg = ({ size = 64, className = "" }: { size?: number; className?: string }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 64 64"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <defs>
      <linearGradient id="stalkGrad" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#a8e063" />
        <stop offset="100%" stopColor="#56ab2f" />
      </linearGradient>
      <radialGradient id="broccoliGrad" cx="50%" cy="30%" r="50%">
        <stop offset="0%" stopColor="#2e7d32" />
        <stop offset="70%" stopColor="#1b5e20" />
        <stop offset="100%" stopColor="#0d3c0f" />
      </radialGradient>
    </defs>
    {/* Stalk */}
    <path
      d="M26 36L22 52C22 55 26 57 32 57C38 57 42 55 42 52L38 36H26Z"
      fill="url(#stalkGrad)"
    />
    {/* Little stalk branches */}
    <path d="M24 40C20 40 18 43 18 45" stroke="#56ab2f" strokeWidth="3" strokeLinecap="round" />
    <path d="M40 40C44 40 46 43 46 45" stroke="#56ab2f" strokeWidth="3" strokeLinecap="round" />
    
    {/* Broccoli Crowns (Top) */}
    <g filter="drop-shadow(0px 4px 6px rgba(0, 0, 0, 0.15))">
      <circle cx="21" cy="27" r="10" fill="url(#broccoliGrad)" />
      <circle cx="43" cy="27" r="10" fill="url(#broccoliGrad)" />
      <circle cx="32" cy="22" r="12" fill="url(#broccoliGrad)" />
      <circle cx="16" cy="34" r="8" fill="url(#broccoliGrad)" />
      <circle cx="48" cy="34" r="8" fill="url(#broccoliGrad)" />
      <circle cx="28" cy="32" r="9" fill="url(#broccoliGrad)" />
      <circle cx="36" cy="32" r="9" fill="url(#broccoliGrad)" />
    </g>
  </svg>
);

// Avocado SVG Component
export const AvocadoSvg = ({ size = 64, className = "" }: { size?: number; className?: string }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 64 64"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <defs>
      <linearGradient id="avoSkin" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#1b4d3e" />
        <stop offset="100%" stopColor="#0a2a1b" />
      </linearGradient>
      <linearGradient id="avoFlesh" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#c5e1a5" />
        <stop offset="60%" stopColor="#d4e157" />
        <stop offset="100%" stopColor="#afb42b" />
      </linearGradient>
      <radialGradient id="avoSeed" cx="35%" cy="30%" r="70%">
        <stop offset="0%" stopColor="#8d6e63" />
        <stop offset="70%" stopColor="#4e342e" />
        <stop offset="100%" stopColor="#27130e" />
      </radialGradient>
    </defs>
    
    {/* Outer Skin */}
    <path
      d="M32 12C22 12 16 22 16 36C16 46 22 54 32 54C42 54 48 46 48 36C48 22 42 12 32 12Z"
      fill="url(#avoSkin)"
      filter="drop-shadow(0px 4px 6px rgba(0, 0, 0, 0.15))"
    />
    
    {/* Inner Flesh */}
    <path
      d="M32 15C24 15 19 24 19 36C19 44 24 51 32 51C40 51 45 44 45 36C45 24 40 15 32 15Z"
      fill="url(#avoFlesh)"
    />
    
    {/* Seed */}
    <circle
      cx="32"
      cy="38"
      r="8"
      fill="url(#avoSeed)"
      filter="drop-shadow(0px 2px 4px rgba(0, 0, 0, 0.25))"
    />
  </svg>
);

// Watermelon SVG Component
export const WatermelonSvg = ({ size = 64, className = "" }: { size?: number; className?: string }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 64 64"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <defs>
      <linearGradient id="rindGrad" x1="0" y1="1" x2="1" y2="0">
        <stop offset="0%" stopColor="#1b5e20" />
        <stop offset="100%" stopColor="#4caf50" />
      </linearGradient>
      <radialGradient id="melonGrad" cx="30%" cy="70%" r="70%">
        <stop offset="0%" stopColor="#ff5252" />
        <stop offset="85%" stopColor="#ff1744" />
        <stop offset="100%" stopColor="#d50000" />
      </radialGradient>
    </defs>
    
    {/* Outer Green Rind */}
    <path
      d="M10 24C10 24 14 48 32 48C50 48 54 24 54 24C54 24 48 52 32 52C16 52 10 24 10 24Z"
      fill="url(#rindGrad)"
      filter="drop-shadow(0px 4px 6px rgba(0, 0, 0, 0.15))"
    />
    
    {/* Inner White layer */}
    <path
      d="M12 24C12 24 15 45 32 45C49 45 52 24 52 24C52 24 47 48 32 48C17 48 12 24 12 24Z"
      fill="#f1f8e9"
    />
    
    {/* Red Flesh */}
    <path
      d="M14 24C14 24 17 42 32 42C47 42 50 24 50 24H14Z"
      fill="url(#melonGrad)"
    />
    
    {/* Seeds */}
    <circle cx="22" cy="29" r="1.5" fill="#212121" />
    <circle cx="32" cy="33" r="1.5" fill="#212121" />
    <circle cx="42" cy="29" r="1.5" fill="#212121" />
    <circle cx="28" cy="27" r="1.5" fill="#212121" />
    <circle cx="36" cy="27" r="1.5" fill="#212121" />
  </svg>
);

// Basket SVG Component
export const BasketSvg = ({ width = 180, height = 110, className = "" }: { width?: number; height?: number; className?: string }) => (
  <svg
    width={width}
    height={height}
    viewBox="0 0 200 120"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <defs>
      <linearGradient id="basketGrad" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#d7ccc8" />
        <stop offset="20%" stopColor="#8d6e63" />
        <stop offset="100%" stopColor="#4e342e" />
      </linearGradient>
      <linearGradient id="basketRim" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0%" stopColor="#a1887f" />
        <stop offset="50%" stopColor="#d7ccc8" />
        <stop offset="100%" stopColor="#8d6e63" />
      </linearGradient>
    </defs>
    
    {/* Basket Body */}
    <path
      d="M20 30L35 105C37 112 43 117 50 117H150C157 117 163 112 165 105L180 30H20Z"
      fill="url(#basketGrad)"
      filter="drop-shadow(0px 8px 16px rgba(0, 0, 0, 0.25))"
    />
    
    {/* Woven Textures (horizontal ribs) */}
    <path d="M23 45H177" stroke="#3e2723" strokeWidth="2.5" opacity="0.4" />
    <path d="M26 60H174" stroke="#3e2723" strokeWidth="2.5" opacity="0.4" />
    <path d="M29 75H171" stroke="#3e2723" strokeWidth="2.5" opacity="0.4" />
    <path d="M32 90H168" stroke="#3e2723" strokeWidth="2.5" opacity="0.4" />
    <path d="M35 105H165" stroke="#3e2723" strokeWidth="2.5" opacity="0.4" />
    
    {/* Woven Textures (vertical ribs) */}
    <path d="M50 30L60 117" stroke="#3e2723" strokeWidth="1.5" opacity="0.3" />
    <path d="M80 30L85 117" stroke="#3e2723" strokeWidth="1.5" opacity="0.3" />
    <path d="M110 30L112 117" stroke="#3e2723" strokeWidth="1.5" opacity="0.3" />
    <path d="M140 30L138 117" stroke="#3e2723" strokeWidth="1.5" opacity="0.3" />
    <path d="M170 30L160 117" stroke="#3e2723" strokeWidth="1.5" opacity="0.3" />

    {/* Basket Rim (Lip) */}
    <rect
      x="10"
      y="20"
      width="180"
      height="12"
      rx="6"
      fill="url(#basketRim)"
      stroke="#5d4037"
      strokeWidth="2"
      filter="drop-shadow(0px 4px 6px rgba(0, 0, 0, 0.15))"
    />
    
    {/* Basket Handles */}
    <path
      d="M10 26C-5 26 -5 45 10 45"
      stroke="url(#basketRim)"
      strokeWidth="6"
      strokeLinecap="round"
      filter="drop-shadow(-4px 4px 4px rgba(0, 0, 0, 0.15))"
    />
    <path
      d="M190 26C205 26 205 45 190 45"
      stroke="url(#basketRim)"
      strokeWidth="6"
      strokeLinecap="round"
      filter="drop-shadow(4px 4px 4px rgba(0, 0, 0, 0.15))"
    />
  </svg>
);

// Map of items for dynamic use
export const FRUITS_MAP = {
  apple: AppleSvg,
  orange: OrangeSvg,
  banana: BananaSvg,
  grapes: GrapesSvg,
  carrot: CarrotSvg,
  broccoli: BroccoliSvg,
  avocado: AvocadoSvg,
  watermelon: WatermelonSvg,
};

export const FRUIT_ITEMS = [
  { id: "apple", label: "Apple", Svg: AppleSvg, color: "#ff2a3a" },
  { id: "orange", label: "Orange", Svg: OrangeSvg, color: "#ff8c00" },
  { id: "banana", label: "Banana", Svg: BananaSvg, color: "#ffd600" },
  { id: "grapes", label: "Grapes", Svg: GrapesSvg, color: "#7c4dff" },
  { id: "carrot", label: "Carrot", Svg: CarrotSvg, color: "#ff6f00" },
  { id: "broccoli", label: "Broccoli", Svg: BroccoliSvg, color: "#2e7d32" },
  { id: "avocado", label: "Avocado", Svg: AvocadoSvg, color: "#1b4d3e" },
  { id: "watermelon", label: "Watermelon", Svg: WatermelonSvg, color: "#ff1744" },
];
