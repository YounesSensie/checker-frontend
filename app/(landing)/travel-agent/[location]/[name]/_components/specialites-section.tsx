"use client";

import React, { useState } from "react";
import { CheckerProfile } from "./types-checker";

// Category → accent color + icon mapping
const CATEGORY_META: Record<
  string,
  { color: string; bg: string; border: string; dot: string; emoji: string }
> = {
  "Transportation & Mobility": {
    color: "text-sky-700",
    bg: "bg-sky-50",
    border: "border-sky-200",
    dot: "bg-sky-400",
    emoji: "✈️",
  },
  "Accommodation & Rentals": {
    color: "text-indigo-700",
    bg: "bg-indigo-50",
    border: "border-indigo-200",
    dot: "bg-indigo-400",
    emoji: "🏨",
  },
  "Documentation & Admin": {
    color: "text-amber-700",
    bg: "bg-amber-50",
    border: "border-amber-200",
    dot: "bg-amber-400",
    emoji: "📋",
  },
  "Travel Insurance & Safety": {
    color: "text-rose-700",
    bg: "bg-rose-50",
    border: "border-rose-200",
    dot: "bg-rose-400",
    emoji: "🛡️",
  },
  "Experiences & Activities": {
    color: "text-orange-700",
    bg: "bg-orange-50",
    border: "border-orange-200",
    dot: "bg-orange-400",
    emoji: "🎯",
  },
  "Gear & Travel Essentials": {
    color: "text-teal-700",
    bg: "bg-teal-50",
    border: "border-teal-200",
    dot: "bg-teal-400",
    emoji: "🎒",
  },
  "Booking & Planning": {
    color: "text-violet-700",
    bg: "bg-violet-50",
    border: "border-violet-200",
    dot: "bg-violet-400",
    emoji: "🗓️",
  },
  "Wellness & Lifestyle": {
    color: "text-emerald-700",
    bg: "bg-emerald-50",
    border: "border-emerald-200",
    dot: "bg-emerald-400",
    emoji: "🧘",
  },
  "Finance & Rewards": {
    color: "text-yellow-700",
    bg: "bg-yellow-50",
    border: "border-yellow-200",
    dot: "bg-yellow-400",
    emoji: "💳",
  },
  "Special-Interest Travel": {
    color: "text-pink-700",
    bg: "bg-pink-50",
    border: "border-pink-200",
    dot: "bg-pink-400",
    emoji: "🌍",
  },
};

const DEFAULT_META = {
  color: "text-slate-700",
  bg: "bg-slate-50",
  border: "border-slate-200",
  dot: "bg-slate-400",
  emoji: "⭐",
};

interface Specialty {
  id: string;
  category: string;
  subcategory?: string | null;
  level?: string | null;
}

interface Props {
  specialties: Specialty[];
}

export function SpecialtiesSection({ specialties }: Props) {
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);

  if (!specialties || specialties.length === 0) return null;

  // Group specialties by category
  const grouped = specialties.reduce<Record<string, Specialty[]>>((acc, sp) => {
    const key = sp.category || "Other";
    if (!acc[key]) acc[key] = [];
    acc[key].push(sp);
    return acc;
  }, {});

  const categories = Object.entries(grouped);
  const totalSubs = specialties.filter((s) => s.subcategory).length;

  return (
    <section className="rounded-2xl " style={{ backgroundColor: "#ffffff", border: "1px solid #e8e8ed" }}>
      {/* Header */}
      <div className="px-6 pt-6 pb-5 border-b border-gray-100">
        <div className="flex items-start justify-between gap-4">
          <div>
            <div className="flex items-center gap-2.5 mb-1">
              {/* Stacked category dots preview */}
              <div className="flex -space-x-1">
                {categories.slice(0, 4).map(([cat]) => {
                  const meta = CATEGORY_META[cat] ?? DEFAULT_META;
                  return (
                    <span
                      key={cat}
                      className={`w-3.5 h-3.5 rounded-full border-2 border-white ${meta.dot}`}
                    />
                  );
                })}
                {categories.length > 4 && (
                  <span className="w-3.5 h-3.5 rounded-full border-2 border-white bg-gray-300 flex items-center justify-center" />
                )}
              </div>
              <h2 className="text-lg font-bold text-gray-900" style={{ fontFamily: "'Public Sans', sans-serif" }}>
                Specialties
              </h2>
            </div>
            <p className="text-sm text-gray-500">
              {categories.length} {categories.length === 1 ? "domain" : "domains"} · {totalSubs} skills
            </p>
          </div>

          {/* Compact legend */}
          <div className="hidden sm:flex flex-wrap gap-1.5 justify-end max-w-[240px]">
            {categories.slice(0, 3).map(([cat]) => {
              const meta = CATEGORY_META[cat] ?? DEFAULT_META;
              return (
                <span
                  key={cat}
                  className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-semibold ${meta.bg} ${meta.color} ${meta.border} border`}
                >
                  <span>{meta.emoji}</span>
                  <span className="truncate max-w-[90px]">{cat.split(" & ")[0]}</span>
                </span>
              );
            })}
            {categories.length > 3 && (
              <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-semibold bg-gray-100 text-gray-500 border border-gray-200">
                +{categories.length - 3} more
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Category cards */}
      <div className="p-5 flex flex-col gap-3">
        {categories.map(([category, items]) => {
          const meta = CATEGORY_META[category] ?? DEFAULT_META;
          const subs = items.flatMap((sp) =>
            sp.subcategory ? sp.subcategory.split("||").filter(Boolean) : []
          );
          const isExpanded = expandedCategory === category;
          const VISIBLE = 5;
          const visibleSubs = isExpanded ? subs : subs.slice(0, VISIBLE);
          const hiddenCount = subs.length - VISIBLE;

          return (
            <div
              key={category}
              className={`rounded-xl border transition-all duration-200 ${meta.border} ${meta.bg}`}
            >
              {/* Category header row */}
              <div className="flex items-center gap-3 px-4 py-3">
                {/* Emoji badge */}
                <div className="w-9 h-9 rounded-xl flex items-center justify-center bg-white shadow-sm border border-white/80 text-lg flex-shrink-0">
                  {meta.emoji}
                </div>

                <div className="flex-1 min-w-0">
                  <p className={`text-sm font-bold truncate ${meta.color}`}>{category}</p>
                  {subs.length > 0 && (
                    <p className="text-xs text-gray-500 mt-0.5">
                      {subs.length} {subs.length === 1 ? "specialty" : "specialties"}
                    </p>
                  )}
                </div>

                {/* Sub count badge */}
                {subs.length > 0 && (
                  <span
                    className={`flex-shrink-0 text-xs font-bold px-2 py-0.5 rounded-full ${meta.bg} ${meta.color} border ${meta.border}`}
                  >
                    {subs.length}
                  </span>
                )}
              </div>

              {/* Subcategory tags */}
              {subs.length > 0 && (
                <div className="px-4 pb-3">
                  <div
                    className="h-px mb-3 opacity-40"
                    style={{ background: `linear-gradient(90deg, currentColor, transparent)` }}
                  />
                  <div className="flex flex-wrap gap-1.5">
                    {visibleSubs.map((sub) => (
                      <span
                        key={sub}
                        className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-white border border-white/80 shadow-[0_1px_3px_rgba(0,0,0,0.07)] text-gray-700"
                      >
                        <span className={`w-1.5 h-1.5 rounded-full ${meta.dot} flex-shrink-0`} />
                        {sub}
                      </span>
                    ))}

                    {/* Show more / less toggle */}
                    {subs.length > VISIBLE && (
                      <button
                        onClick={() => setExpandedCategory(isExpanded ? null : category)}
                        className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold border transition-colors ${meta.color} ${meta.border} bg-white/70 hover:bg-white`}
                      >
                        {isExpanded ? (
                          <>
                            <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" />
                            </svg>
                            Show less
                          </>
                        ) : (
                          <>
                            +{hiddenCount} more
                          </>
                        )}
                      </button>
                    )}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Footer summary bar */}
      {totalSubs > 0 && (
        <div className="px-5 py-3 border-t border-gray-100 bg-gray-50/60 flex items-center gap-2">
          <svg className="w-3.5 h-3.5 text-gray-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
          </svg>
          <p className="text-xs text-gray-500 font-medium">
            {totalSubs} verified {totalSubs === 1 ? "specialty" : "specialties"} across {categories.length} {categories.length === 1 ? "domain" : "domains"}
          </p>
        </div>
      )}
    </section>
  );
}