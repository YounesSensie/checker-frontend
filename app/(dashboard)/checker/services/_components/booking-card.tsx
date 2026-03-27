"use client";

import { Calendar, MapPin, MessageSquare, ChevronRight } from "lucide-react";
import { Booking, BookingStatus } from "./types-services";


// ── helpers ───────────────────────────────────────────────────────────────
 
function formatDate(iso: Date | string, time: string) {
  const d = new Date(iso);
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);
 
  const dateStr =
    d.toDateString() === tomorrow.toDateString()
      ? "Tomorrow"
      : d.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" });
 
  return `${dateStr}, ${time}`;
}
 
function endTime(startTime: string, durationMin: number) {
  const [h, m] = startTime.split(":").map(Number);
  const total = h * 60 + m + durationMin;
  const eh = Math.floor(total / 60) % 24;
  const em = total % 60;
  return `${String(eh).padStart(2, "0")}:${String(em).padStart(2, "0")} ${eh >= 12 ? "PM" : "AM"}`;
}
 
function formatAMPM(time: string) {
  const [h, m] = time.split(":").map(Number);
  const suffix = h >= 12 ? "PM" : "AM";
  const display = h % 12 || 12;
  return `${display}:${String(m).padStart(2, "0")} ${suffix}`;
}
 
// ── Status badge ─────────────────────────────────────────────────────────
 
const STATUS_STYLES: Record<BookingStatus, { pill: string; dot: string; label: string }> = {
  CONFIRMED:   { pill: "bg-blue-50 text-blue-600",   dot: "bg-blue-500",   label: "Confirmed"    },
  PENDING:     { pill: "bg-orange-50 text-orange-500", dot: "bg-orange-400", label: "Pending"    },
  IN_PROGRESS: { pill: "bg-violet-50 text-violet-600", dot: "bg-violet-500", label: "In Progress" },
  COMPLETED:   { pill: "bg-emerald-50 text-emerald-600", dot: "bg-emerald-500", label: "Completed" },
  CANCELLED:   { pill: "bg-red-50 text-red-500",     dot: "bg-red-400",    label: "Cancelled"   },
  DISPUTED:    { pill: "bg-yellow-50 text-yellow-600", dot: "bg-yellow-500", label: "Disputed"   },
};
 
function StatusBadge({ status }: { status: BookingStatus }) {
  const s = STATUS_STYLES[status] ?? STATUS_STYLES.PENDING;
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold ${s.pill}`}>
      <span className={`size-1.5 rounded-full ${s.dot}`} />
      {s.label}
    </span>
  );
}
 
// ── Card ─────────────────────────────────────────────────────────────────
 
interface BookingCardProps {
  booking: Booking;
}
 
export function BookingCard({ booking }: BookingCardProps) {
  const isConfirmed = booking.status === "CONFIRMED" || booking.status === "IN_PROGRESS";
  const isPending   = booking.status === "PENDING";
 
  const clientName = booking.user
    ? [booking.user.firstName, booking.user.lastName].filter(Boolean).join(" ") || booking.user.email || "Unknown Client"
    : "Unknown Client";
  const dateLabel  = formatDate(booking.scheduledDate, booking.scheduledTime);
  const start      = formatAMPM(booking.scheduledTime);
  const end        = endTime(booking.scheduledTime, booking.duration);
 
  return (
    <div className="flex flex-col rounded-xl bg-white shadow-[0_4px_20px_-4px_rgba(0,0,0,0.06)] border border-slate-100 overflow-hidden">
      {/* Header */}
      <div className="p-5 pb-4 border-b border-slate-50 flex justify-between items-start">
        <div className="flex flex-col">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">
            Booking #{booking.bookingNumber}
          </span>
          <h3 className="text-lg font-bold text-slate-900">{clientName}</h3>
        </div>
        <StatusBadge status={booking.status} />
      </div>
 
      {/* Body */}
      <div className="p-5 flex flex-col gap-4">
        {/* Logistics */}
        <div className="space-y-3">
          {/* Date / Time */}
          <div className="flex items-start gap-3">
            <div
              className={`mt-0.5 rounded p-1 ${isConfirmed ? "bg-[#1313ec]/10 text-[#1313ec]" : "bg-slate-100 text-slate-500"}`}
            >
              <Calendar className="w-4 h-4" />
            </div>
            <div>
              <p className="text-sm font-bold text-slate-900">{dateLabel}</p>
              <p className="text-xs text-slate-500">
                {start} – {end}
              </p>
            </div>
          </div>
 
          {/* Location */}
          <div className="flex items-start gap-3">
            <div
              className={`mt-0.5 rounded p-1 ${isConfirmed ? "bg-[#1313ec]/10 text-[#1313ec]" : "bg-slate-100 text-slate-500"}`}
            >
              <MapPin className="w-4 h-4" />
            </div>
            <div>
              <p className="text-sm font-medium text-slate-900">{booking.location}</p>
              <a href="#" className="text-xs text-[#1313ec] hover:underline">
                View on Map
              </a>
            </div>
          </div>
        </div>
 
        {/* Financials */}
        <div className="mt-2 flex items-center justify-between rounded-lg bg-slate-50 p-3">
          <div className="flex flex-col">
            <span className="text-xs text-slate-500">Total</span>
            <span className="font-bold text-slate-900">
              ${booking.totalAmount.toFixed(2)}
            </span>
          </div>
          <div className="flex items-center gap-2 rounded-full bg-green-100 px-3 py-1.5 border border-green-200">
            <span className="text-xs font-medium text-green-800">You Earn</span>
            <span className="text-sm font-bold text-emerald-600">
              ${booking.checkerEarnings.toFixed(2)}
            </span>
          </div>
        </div>
      </div>
 
      {/* Actions */}
      <div className="mt-auto p-5 pt-0 grid grid-cols-2 gap-3">
        {isConfirmed ? (
          <button
            className="col-span-2 flex items-center justify-center gap-2 rounded-lg bg-[#1313ec]
              px-4 py-2.5 text-sm font-bold text-white shadow-sm hover:bg-[#1313ec]/90 transition-colors"
          >
            Start Inspection
          </button>
        ) : isPending ? (
          <button
            disabled
            className="col-span-2 flex items-center justify-center gap-2 rounded-lg
              bg-slate-200 px-4 py-2.5 text-sm font-bold text-slate-400 cursor-not-allowed"
          >
            Awaiting Confirmation
          </button>
        ) : null}
 
        <button
          className="flex items-center justify-center gap-2 rounded-lg border border-slate-200
            bg-white px-3 py-2 text-sm font-medium text-slate-700
            hover:bg-slate-50 transition-colors"
        >
          <MessageSquare className="w-4 h-4" />
          Message
        </button>
 
        <button
          className="flex items-center justify-center gap-2 rounded-lg border border-slate-200
            bg-white px-3 py-2 text-sm font-medium text-slate-700
            hover:bg-slate-50 transition-colors"
        >
          Details
          <ChevronRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}
 
/* ─── Empty state ─────────────────────────────────────────────────────────── */
export function EmptyBookings({ filter }: { filter: string }) {
  const label =
    filter === "PENDING"
      ? "pending"
      : filter === "CONFIRMED"
      ? "confirmed"
      : "active";
 
  return (
    <div className="col-span-full flex flex-col items-center justify-center py-16 px-6 text-center">
      <div className="w-20 h-20 rounded-2xl bg-slate-100 flex items-center justify-center mb-5">
        <Calendar className="w-9 h-9 text-slate-400" />
      </div>
      <h3 className="text-xl font-bold text-slate-900 mb-2">No {label} bookings</h3>
      <p className="text-slate-500 max-w-sm text-sm leading-relaxed">
        {filter === "ALL"
          ? "You don't have any active bookings right now. They'll appear here once clients book your services."
          : `No ${label} bookings at the moment. Check the other tabs or wait for new requests.`}
      </p>
    </div>
  );
}