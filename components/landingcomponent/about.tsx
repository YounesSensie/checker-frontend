"use client";

import { ArrowRight } from "lucide-react";
import Image from "next/image";

export default function About() {
  return (
    <section id="about" className="py-24 bg-[#f8fafc]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">

          {/* ── LEFT — 9:16 portrait image ── */}
          <div className="relative mx-auto w-full max-w-[360px] lg:max-w-none order-2 lg:order-1">

            {/* Decorative ring */}
            <div className="absolute -inset-3 rounded-3xl border-2 border-[#2cc2a5]/20 pointer-events-none z-0" />

            {/* Ambient glow blobs */}
            <div className="absolute -bottom-8 -right-8 w-52 h-52 bg-[#2cc2a5]/15 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -top-8 -left-8 w-40 h-40 bg-blue-100/40 rounded-full blur-2xl pointer-events-none" />

            {/* 9:16 ratio wrapper */}
            <div
              className="relative w-full rounded-3xl overflow-hidden shadow-2xl shadow-[#2cc2a5]/15 z-10"
              style={{ aspectRatio: "9 / 16" }}
            >
              {/* Bottom gradient for badge legibility */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/5 to-transparent z-10" />

              <Image
                src="/img/santorini.jpg"
                alt="Santorini clifftop hotel at sunset — CheckerIst verifies hotels"
                fill
                sizes="(max-width: 640px) 90vw, (max-width: 1024px) 45vw, 360px"
                className="object-cover"
                quality={85}
              />

              {/* Verified badge overlay */}
              <div className="absolute bottom-5 left-5 right-5 z-20">
                <div className="bg-white/95 backdrop-blur-sm rounded-2xl px-4 py-3 shadow-lg">
                  <p className="text-xs text-[#2cc2a5] font-semibold uppercase tracking-wide mb-1">
                    ✓ Verified by CheckerIst
                  </p>
                  <p className="text-sm font-bold text-gray-900 leading-tight">
                    Oia Cliffside Hotel, Santorini
                  </p>
                  <p className="text-xs text-gray-500 mt-0.5">
                    Inspected before your booking · Greece
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* ── RIGHT — Text content ── */}
          <div className="order-1 lg:order-2">
            <span className="text-[#2cc2a5] font-semibold tracking-wider uppercase text-sm">
              About Checkerist
            </span>

            <h2 className="mt-4 text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Making Every Accommodation Booking &amp; Travel Experience a Success
            </h2>

            <p className="text-lg text-gray-500 mb-6 leading-relaxed">
              We built CheckerIst because great travel starts with the truth. Too many travelers
              confirm a hotel booking, book their flights, and arrange a car rental — only to
              arrive and find a room that looks nothing like the photos. A single misleading
              listing can turn a dream trip into a nightmare.
            </p>

            <p className="text-lg text-gray-500 mb-8 leading-relaxed">
              Our local expert checkers physically visit hotels and accommodations before you
              finalize your reservation. Whether you are planning a luxury travel getaway, a
              family holiday, or a business trip — we guarantee your booking matches reality,
              so every journey is exactly the experience you deserve.
            </p>

            <a
              href="#"
              className="inline-flex items-center gap-2 text-[#2cc2a5] font-semibold hover:text-[#1f8a75] transition group"
            >
              Read our full story
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
          </div>

        </div>
      </div>
    </section>
  );
}