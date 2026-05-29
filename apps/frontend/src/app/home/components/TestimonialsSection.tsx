"use client";

import { Quote, Star } from "lucide-react";

export default function TestimonialsSection() {
  const reviews = [
    {
      text: "The real-time synchronization is fantastic! I was at the supermarket and my wife was adding items from home. The items appeared on my screen instantly.",
      author: "Ananth K.",
      role: "Parent of 3",
      stars: 5,
    },
    {
      text: "The Kannada translation helper is a lifesaver. My parents speak Kannada and they are able to easily add items to the list because of the multilingual support.",
      author: "Preethi M.",
      role: "Software Engineer",
      stars: 5,
    },
    {
      text: "Highly recommend using the Voice recognition search. I just dictate while checking my fridge and it fills the list instantly. Smooth transitions and no lag.",
      author: "Rohan D.",
      role: "Home Baker",
      stars: 5,
    },
  ];

  return (
    <section id="testimonials" className="bg-emerald-50/30 py-24 border-t border-emerald-100/40 relative z-10">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center space-y-4 mb-20">
          <h2 className="text-xs font-black tracking-widest text-emerald-600 uppercase">
            Loved By Households
          </h2>
          <p className="text-3xl sm:text-4xl font-black text-gray-900 tracking-tight">
            See what our active users are saying
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reviews.map((t, idx) => (
            <div
              key={idx}
              className="bg-white border border-gray-100/50 p-8 rounded-3rem shadow-sm hover:shadow-lg transition-all flex flex-col gap-6 relative"
            >
              <div className="absolute top-6 right-8 text-emerald-600/10">
                <Quote size={48} className="rotate-180" />
              </div>
              {/* Rating stars */}
              <div className="flex gap-1">
                {[...Array(t.stars)].map((_, i) => (
                  <Star key={i} size={16} className="fill-amber-400 stroke-amber-400" />
                ))}
              </div>
              <p className="text-gray-600 font-semibold text-sm leading-relaxed flex-1">
                "{t.text}"
              </p>
              <div>
                <h4 className="font-black text-gray-900 text-sm">{t.author}</h4>
                <span className="text-xs text-gray-400 font-bold">{t.role}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
