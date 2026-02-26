"use client";

import { Search, PlayCircle, ShieldCheck, Zap, Globe, Star } from "lucide-react";
import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";



export default function Hero() {
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = textRef.current;
    if (!el) return;
    const children = Array.from(el.children) as HTMLElement[];
    children.forEach((child, i) => {
      child.style.opacity = "0";
      child.style.transform = "translateY(20px)";
      setTimeout(() => {
        child.style.transition = "opacity 0.6s ease, transform 0.6s ease";
        child.style.opacity = "1";
        child.style.transform = "translateY(0)";
      }, 100 + i * 100);
    });
  }, []);

  return (
    <section className="relative min-h-screen flex items-center pt-20 pb-16 overflow-hidden bg-[#f8fafc]">

      {/* ── Preserved background pattern ── */}
      <div
        className="absolute inset-0 opacity-40"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, #2cc2a5 1px, transparent 0)`,
          backgroundSize: "32px 32px",
        }}
      />

      {/* ── Preserved gradient blobs ── */}
      <div className="absolute top-1/2 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-[#2cc2a5]/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-20 right-10 w-[300px] h-[300px] bg-blue-200/20 rounded-full blur-[80px] pointer-events-none" />
      {/* Extra blob on image side */}
      <div className="absolute bottom-10 right-1/4 w-[250px] h-[250px] bg-[#2cc2a5]/8 rounded-full blur-[90px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-2 md:px-3 relative z-10 w-full">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">

          {/* ── LEFT — Text content ── */}
          <div ref={textRef} className="text-left">

            {/* Badge */}
            

            {/* H1 — keyword-rich */}
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold tracking-tight text-gray-900 mb-6 leading-[1.1]">
              Book Places to Travel{" "}
              <span className="relative inline-block">
                <span className="relative z-10 text-[#2cc2a5]">With 100% Confidence</span>
                <span className="absolute bottom-1 left-0 right-0 h-3 bg-[#2cc2a5]/10 -z-0 rounded" />
              </span>
            </h1>

            {/* P — keyword-rich, brand identity preserved */}
            <p className="text-base md:text-lg text-gray-600 mb-8 max-w-lg leading-relaxed">
              Before you confirm your next hotel booking, flight, or car rental — let our local
              experts physically visit and verify your accommodation. Get real photos, honest
              reports, and travel with the certainty that your reservation matches reality.
            </p>

            {/* Trust pills */}
            <div className="flex flex-wrap gap-2 mb-8">
              {[
                "✈️ Flights & Hotels",
                "🏨 Real Room Photos",
                "🚗 Car Rental Areas",
                "✅ Verified Bookings",
              ].map((tag) => (
                <span
                  key={tag}
                  className="text-xs font-medium text-gray-600 bg-white border border-gray-200 rounded-full px-3 py-1 shadow-sm"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 mb-10">
              <Link
                href="/check"
                className="inline-flex justify-center items-center px-8 py-4 text-base font-semibold rounded-full shadow-lg shadow-[#2cc2a5]/30 text-white bg-[#2cc2a5] hover:bg-[#1f8a75] transition-all transform hover:-translate-y-1 gap-2"
              >
                Check Your Booking
                <Search className="w-5 h-5" />
              </Link>
              <a
                href="#how-it-works"
                className="inline-flex justify-center items-center px-8 py-4 text-base font-semibold rounded-full text-gray-700 bg-white border border-gray-200 hover:bg-gray-50 transition-all gap-2 shadow-sm"
              >
                How it Works
                <PlayCircle className="w-5 h-5" />
              </a>
            </div>

            {/* Social proof */}
           
          </div>

          {/* ── RIGHT — Image ── */}
          <div className="relative">

            {/* Decorative blobs behind image */}
            <div className="absolute -top-8 -right-8 w-32 h-32 bg-yellow-100 rounded-full mix-blend-multiply blur-2xl opacity-60 pointer-events-none" />
            <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-[#2cc2a5]/20 rounded-full mix-blend-multiply blur-2xl opacity-60 pointer-events-none" />
            <div className="absolute top-1/2 -right-10 w-24 h-24 bg-purple-100 rounded-full mix-blend-multiply blur-2xl opacity-50 pointer-events-none" />

            {/* Main image card */}
            <div className="relative rounded-3xl overflow-hidden shadow-2xl shadow-[#2cc2a5]/15 aspect-[4/3] group">
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent z-10" />

              <Image
                src="/img/back.avif"
                alt="Luxury hotel room verified by local CheckerIst expert — real accommodation inspection before booking"
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 600px"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                priority
                quality={85}
              />

              {/* Verified badge overlay */}
              <div className="absolute bottom-6 left-6 right-6 z-20">
                <div className="flex items-center gap-2 mb-2">
                  <span className="px-2.5 py-1 bg-[#2cc2a5]/90 rounded-lg text-xs font-bold uppercase tracking-wider text-white">
                    ✓ Verified
                  </span>
                  <div className="flex items-center gap-0.5">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                </div>
                <p className="font-semibold text-white text-base leading-tight">
                  Villa Serenity, Mallorca
                </p>
                <p className="text-sm text-white/75 mt-0.5">
                  Hotel verified by Sarah J. · Yesterday
                </p>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}