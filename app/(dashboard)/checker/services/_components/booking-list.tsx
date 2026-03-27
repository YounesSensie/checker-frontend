"use client";

import { useState, useTransition } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { Booking, BookingFilter } from "./types-services";
import { BookingCard, EmptyBookings } from "./booking-card";


interface BookingsListProps {
  bookings: Booking[];
  activeFilter: BookingFilter;
}

const TABS: { label: string; value: BookingFilter }[] = [
  { label: "All",       value: "ALL"       },
  { label: "Pending",   value: "PENDING"   },
  { label: "Confirmed", value: "CONFIRMED" },
];

export function BookingsList({ bookings, activeFilter }: BookingsListProps) {
  const router     = useRouter();
  const pathname   = usePathname();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  function handleFilter(f: BookingFilter) {
    const params = new URLSearchParams(searchParams.toString());
    if (f === "ALL") params.delete("filter");
    else params.set("filter", f);
    startTransition(() => router.push(`${pathname}?${params.toString()}`));
  }

  return (
    <section className="flex flex-col gap-5">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Active Bookings</h2>
          <p className="text-slate-500 text-sm mt-1">
            Track your upcoming appointments and earnings.
          </p>
        </div>

        {/* Filter tabs */}
        <div className="flex p-1 bg-slate-100 rounded-lg self-start sm:self-auto">
          {TABS.map((tab) => (
            <button
              key={tab.value}
              onClick={() => handleFilter(tab.value)}
              disabled={isPending}
              className={`px-4 py-2 text-sm rounded-md font-medium transition-all ${
                activeFilter === tab.value
                  ? "bg-white text-slate-900 font-semibold shadow-sm"
                  : "text-slate-500 hover:text-slate-700"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      <div
        className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 transition-opacity duration-200 ${isPending ? "opacity-50 pointer-events-none" : ""}`}
      >
        {bookings.length === 0 ? (
          <EmptyBookings filter={activeFilter} />
        ) : (
          bookings.map((booking) => (
            <BookingCard key={booking.id} booking={booking} />
          ))
        )}
      </div>
    </section>
  );
}

/* ─── Skeleton loader ────────────────────────────────────────────────────── */
export function BookingsListSkeleton() {
  return (
    <section className="flex flex-col gap-5">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-2">
          <div className="h-7 w-48 rounded-lg bg-gradient-to-r from-slate-200 via-slate-100 to-slate-200 animate-pulse" />
          <div className="h-4 w-64 rounded-lg bg-gradient-to-r from-slate-200 via-slate-100 to-slate-200 animate-pulse" />
        </div>
        <div className="h-10 w-52 rounded-lg bg-gradient-to-r from-slate-200 via-slate-100 to-slate-200 animate-pulse" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className="h-[370px] rounded-xl bg-gradient-to-br from-slate-100 via-slate-50 to-slate-100 animate-pulse border border-slate-100"
          />
        ))}
      </div>
    </section>
  );
}