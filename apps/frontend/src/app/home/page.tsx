"use client";

import dynamic from "next/dynamic";
import HomeNavbar from "./components/HomeNavbar";
import HeroSection from "./components/HeroSection";
import FeaturesSection from "./components/FeaturesSection";
import DeviceMockupSection from "./components/DeviceMockupSection";
import TestimonialsSection from "./components/TestimonialsSection";
import CallToAction from "./components/CallToAction";
import HomeFooter from "./components/HomeFooter";

// Load Drag & Drop interactive showcase dynamically to reduce initial bundle load
const DragDropShowcase = dynamic(() => import("./components/DragDropShowcase"), {
  ssr: false,
});

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-50/60 via-white to-emerald-50/20 text-gray-800 font-sans overflow-x-hidden selection:bg-emerald-100 relative">
      {/* Top Navbar */}
      <HomeNavbar />

      {/* Hero Section with Physics Canvas */}
      <HeroSection />

      {/* App Features Grid */}
      <FeaturesSection />

      {/* Interactive Drag & Drop Mini-Game (client-only dynamic loading) */}
      <DragDropShowcase />

      {/* Device Mockups showing responsive views */}
      <DeviceMockupSection />

      {/* Client Testimonials */}
      <TestimonialsSection />

      {/* Final Call To Action Banner */}
      <CallToAction />

      {/* Page Footer */}
      <HomeFooter />
    </div>
  );
}
