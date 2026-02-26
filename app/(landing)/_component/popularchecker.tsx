"use client";

import { useEffect, useState } from "react";
import {
  Star,
  MapPin,
  BadgeCheck,
  ChevronLeft,
  ChevronRight,
  Compass,
  ArrowUpRight,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { slugify } from "../travel-agent/[location]/[name]/_components/types-checker";

// ─── Types ────────────────────────────────────────────────────────────────────

interface CheckerCardData {
  id: string;
  userId: string;
  professionalTitle: string;
  description: string;
  businessCity?: string | null;
  businessCountry?: string | null;
  averageRating: number;
  totalReviews: number;
  status: string;
  user: {
    firstName: string;
    lastName: string;
    avatar?: string | null;
  };
}

interface PopularCheckersProps {
  checkers: CheckerCardData[];
}

// ─── Badge Helper ─────────────────────────────────────────────────────────────

function getBadge(idx: number) {
  const badges = [
    { label: "EXPERT", color: "from-teal-600 to-teal-300"},
    { label: "EXPERT", color: "from-teal-600 to-teal-300" },
    { label: "EXPERT", color: "from-teal-600 to-teal-300" },
    { label: "EXPERT", color: "from-teal-600 to-teal-300" },
  ];
  return badges[idx % badges.length];
}

function getRingColor(idx: number) {
  const rings = [
    "from-emerald-400 via-teal-400 to-cyan-500",
    "from-rose-400 via-pink-400 to-purple-500",
    "from-amber-400 via-orange-400 to-red-500",
    "from-blue-400 via-cyan-400 to-teal-500",
  ];
  return rings[idx % rings.length];
}

// ─── Card Component ───────────────────────────────────────────────────────────

function CheckerCard({
  checker,
  index,
}: {
  checker: CheckerCardData;
  index: number;
}) {
  const badge = getBadge(index);
  const ring = getRingColor(index);
  const location = [checker.businessCity, checker.businessCountry]
    .filter(Boolean)
    .join(", ");
  const initials = `${checker.user.firstName[0]}${checker.user.lastName[0]}`.toUpperCase();
  const router = useRouter()
   const HandelClick = ()=>{
      if (!checker.businessCountry) return;
      router.push(`/travel-agent/${slugify(checker.businessCountry)}/${slugify(checker.user.firstName + "-" + checker.user.lastName)}?id=${checker.id}`)
    }
  return (
    <div className="group relative flex flex-col rounded-2xl bg-white p-5 shadow-lg ring-1 ring-slate-200 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl cursor-pointer overflow-hidden">
      {/* Elegant gradient background on hover */}
      <div className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-5 transition-opacity duration-300 bg-gradient-to-br from-slate-900 to-transparent" />

      {/* Badge */}
      <div className="absolute top-3 right-3 z-10">
        <span
          className={`inline-flex items-center rounded-full bg-gradient-to-r ${badge.color} px-2.5 py-1 text-[9px] font-bold text-white tracking-wider shadow-md`}
        >
          {badge.label}
        </span>
      </div>

      {/* Avatar Section */}
      <div className="relative mb-4 flex flex-col items-center pt-2">
        <div className={`p-[2px] rounded-full bg-gradient-to-tr ${ring} shadow-md`}>
          <div className="h-20 w-20 rounded-full border-3 border-white bg-slate-50 overflow-hidden flex items-center justify-center">
            {checker.user.avatar ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={checker.user.avatar}
                alt={`${checker.user.firstName} ${checker.user.lastName}`}
                className="h-full w-full object-cover"
              />
            ) : (
              <span className="text-lg font-black text-slate-300 select-none">
                {initials}
              </span>
            )}
          </div>
        </div>

        <div className="mt-3 flex items-center justify-center gap-1">
          <h3 className="text-base font-bold text-slate-900 text-center leading-tight">
            {checker.user.firstName} {checker.user.lastName}
          </h3>
          <BadgeCheck className="w-4 h-4 text-emerald-500 fill-emerald-500 flex-shrink-0" />
        </div>
        <p className="mt-1 text-xs font-medium text-slate-500 text-center line-clamp-1">
          {checker.professionalTitle}
        </p>
      </div>

      {/* Info Section */}
      <div className="flex flex-col gap-2.5 flex-1">
        <div className="flex items-center justify-center gap-3">
          {/*<div className="flex items-center gap-0.5 px-2.5 py-1 rounded-lg bg-amber-50">
            <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
            <span className="font-bold text-slate-900 text-xs">
              {Number(checker.averageRating).toFixed(1)}
            </span>
          </div>*/}
          {location && (
            <div className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-100">
              <MapPin className="w-3 h-3 text-slate-500" />
              <span className="text-xs font-medium text-slate-600 line-clamp-1">
                {location}
              </span>
            </div>
          )}
        </div>

        <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed text-center flex-1">
          {checker.description}
        </p>

        <button onClick={HandelClick} className="mt-2 w-full rounded-lg bg-gradient-to-r from-teal-600 to-teal-300 py-2 text-xs font-bold text-white transition-all duration-300 hover:shadow-lg hover:shadow-emerald-500/25 active:scale-95 flex items-center justify-center gap-1">
          View Profile
          <ArrowUpRight className="w-3 h-3" />
        </button>
      </div>
    </div>
  );
}

// ─── Main Section ─────────────────────────────────────────────────────────────

export default function PopularCheckers({ checkers }: PopularCheckersProps) {
  const [currentPage, setCurrentPage] = useState(0);
  const CARDS_PER_PAGE = 4;
  const totalPages = Math.ceil(checkers.length / CARDS_PER_PAGE);
  
  const startIndex = currentPage * CARDS_PER_PAGE;
  const endIndex = startIndex + CARDS_PER_PAGE;
  const visibleCheckers = checkers.slice(startIndex, endIndex);

  const canGoLeft = currentPage > 0;
  const canGoRight = currentPage < totalPages - 1;

  const goToPage = (direction: "left" | "right") => {
    if (direction === "left" && canGoLeft) {
      setCurrentPage(currentPage - 1);
    } else if (direction === "right" && canGoRight) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <section id="checkers" className="relative py-24 px-4 sm:px-6 lg:px-8 overflow-hidden bg-gradient-to-b from-white via-slate-50 to-white">
      {/* ── Elegant background elements ── */}
      <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 right-1/3 w-96 h-96 rounded-full bg-emerald-200/20 blur-3xl" />
        <div className="absolute -bottom-40 left-1/4 w-96 h-96 rounded-full bg-teal-200/15 blur-3xl" />
        <div className="absolute top-1/2 right-0 w-80 h-80 rounded-full bg-rose-200/10 blur-3xl" />
      </div>

      <div className="mx-auto max-w-7xl relative">
        {/* ── Header ── */}
        <div className="mb-16 flex flex-col sm:flex-row sm:items-center justify-between gap-8">
          <div className="max-w-2xl">
          

            <h2 className="text-4xl sm:text-5xl font-black tracking-tight text-slate-900 leading-tight mb-4">
              Meet Our{" "}
              <span className="relative inline-block">
                <span className="relative z-10 text-transparent bg-clip-text bg-gradient-to-r from-teal-600 to-teal-300">
                  Premium
                </span>
                <span
                  aria-hidden
                  className="absolute -bottom-2 left-0 right-0 h-1 rounded-full bg-gradient-to-r from-teal-600 to-teal-300"
                />
              </span>{" "}
              Checkers
            </h2>
            <p className="text-slate-600 text-base leading-relaxed max-w-lg">
              Verified local experts trusted by thousands for on-the-ground support — from rental verification to neighborhood walkthroughs.
            </p>
          </div>

          {/* Navigation Arrows */}
          <div className="flex items-center gap-2 sm:gap-3">
            <button
              onClick={() => goToPage("left")}
              disabled={!canGoLeft}
              className="flex h-12 w-12 items-center justify-center rounded-full bg-white border-2 border-slate-200 shadow-md transition-all duration-300 hover:border-emerald-400 hover:shadow-lg hover:shadow-emerald-200 disabled:opacity-40 disabled:cursor-not-allowed active:scale-95"
              aria-label="Previous page"
              title="Previous"
            >
              <ChevronLeft className="w-5 h-5 text-slate-700 transition-colors" />
            </button>
            <div className="text-sm font-semibold text-slate-600 min-w-fit px-3">
              {currentPage + 1} / {totalPages}
            </div>
            <button
              onClick={() => goToPage("right")}
              disabled={!canGoRight}
              className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-emerald-500 to-teal-500 shadow-lg shadow-emerald-500/30 transition-all duration-300 hover:shadow-xl hover:shadow-emerald-500/40 disabled:opacity-40 disabled:cursor-not-allowed active:scale-95"
              aria-label="Next page"
              title="Next"
            >
              <ChevronRight className="w-5 h-5 text-white" />
            </button>
          </div>
        </div>

        {/* ── Grid Layout ── */}
        {checkers.length === 0 ? (
          <div className="flex items-center justify-center py-32">
            <p className="text-slate-400 text-lg font-medium">
              No verified checkers yet. Check back soon!
            </p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
              {visibleCheckers.map((checker, i) => (
                <CheckerCard 
                  key={checker.id} 
                  checker={checker} 
                  index={startIndex + i} 
                />
              ))}
            </div>

            {/* ── Pagination Dots ── */}
            {totalPages > 1 && (
              <div className="flex justify-center gap-2">
                {Array.from({ length: totalPages }).map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentPage(i)}
                    className={`rounded-full transition-all duration-300 ${
                      currentPage === i
                        ? "bg-gradient-to-r from-emerald-500 to-teal-500 w-8 h-2.5"
                        : "bg-slate-300 w-2.5 h-2.5 hover:bg-slate-400"
                    }`}
                    aria-label={`Go to page ${i + 1}`}
                    aria-current={currentPage === i ? "page" : undefined}
                  />
                ))}
              </div>
            )}
          </>
        )}

        
      </div>
    </section>
  )
}
