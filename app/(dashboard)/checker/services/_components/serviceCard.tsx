"use client";

import { useState } from "react";
import {
  CheckCircle,
  AlertTriangle,
  Info,
  Clock,
  Pencil,
  Home,
  Building2,
} from "lucide-react";
import { CheckerService } from "./types-services";


interface ServiceCardProps {
  service: CheckerService;
}

function ServiceIcon({ name }: { name: string }) {
  const lower = name.toLowerCase();
  if (lower.includes("villa") || lower.includes("luxury"))
    return <Home className="w-5 h-5" />;
  return <Building2 className="w-5 h-5" />;
}

export function ServiceCard({ service }: ServiceCardProps) {
  const [isActive, setIsActive] = useState(service.isActive);

  const durationLabel = () => {
    const h = Math.floor(service.duration / 60);
    const m = service.duration % 60;
    const parts = [];
    if (h) parts.push(`${h}h`);
    if (m) parts.push(`${m}m`);
    return parts.join(" ") + " duration";
  };

  return (
    <div
      className={`group relative flex w-[320px] flex-shrink-0 flex-col rounded-xl bg-white p-5
        shadow-[0_4px_20px_-4px_rgba(0,0,0,0.07)] border border-slate-100
        hover:shadow-lg transition-all duration-200 ${!isActive ? "opacity-80 hover:opacity-100" : ""}`}
    >
      {/* Top row */}
      <div className="flex justify-between items-start mb-4">
        <div
          className={`rounded-lg p-2 ${isActive ? "bg-[#1313ec]/10 text-[#1313ec]" : "bg-indigo-50 text-indigo-500"}`}
        >
          <ServiceIcon name={service.name} />
        </div>

        {/* Toggle */}
        <label className="inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            className="sr-only peer"
            checked={isActive}
            onChange={() => setIsActive((v) => !v)}
          />
          <div
            className="relative w-11 h-6 bg-slate-200 rounded-full
            peer-checked:bg-[#1313ec]
            after:content-[''] after:absolute after:top-[2px] after:start-[2px]
            after:bg-white after:border after:border-gray-300 after:rounded-full
            after:h-5 after:w-5 after:transition-all
            peer-checked:after:translate-x-full peer-checked:after:border-white"
          />
        </label>
      </div>

      {/* Title */}
      <h3 className="text-lg font-bold text-slate-900 mb-1">{service.name}</h3>

      {/* Duration */}
      <div className="flex items-center gap-2 text-slate-500 text-sm mb-4">
        <Clock className="w-4 h-4" />
        <span>{durationLabel()}</span>
      </div>

      <div className="my-3 border-t border-dashed border-slate-100" />

      {/* Features */}
      <div className="flex flex-col gap-2 mb-6">
        {service.includes.map((item) => (
          <div key={item} className="flex items-start gap-2 text-sm text-slate-600">
            <CheckCircle className="w-4 h-4 text-emerald-500 mt-0.5 flex-shrink-0" />
            <span>Includes: {item}</span>
          </div>
        ))}
        {service.requirements.map((req) => (
          <div key={req} className="flex items-start gap-2 text-sm text-slate-600">
            <AlertTriangle className="w-4 h-4 text-amber-500 mt-0.5 flex-shrink-0" />
            <span>Requires: {req}</span>
          </div>
        ))}
        {service.requirements.length === 0 && (
          <div className="flex items-start gap-2 text-sm text-slate-400 italic">
            <Info className="w-4 h-4 mt-0.5 flex-shrink-0" />
            <span>No specialized gear needed</span>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="mt-auto flex items-end justify-between">
        <div>
          <p className="text-xs font-medium text-slate-400 uppercase tracking-wider">
            Price
          </p>
          <p className="text-2xl font-bold text-slate-900">
            ${service.price.toFixed(0)}
          </p>
        </div>
        <button
          className="rounded-lg bg-slate-50 px-3 py-2 text-sm font-semibold text-slate-700
            hover:bg-slate-100 transition-colors flex items-center gap-1.5"
        >
          <Pencil className="w-3.5 h-3.5" />
          Edit
        </button>
      </div>
    </div>
  );
}

/* ─── Add-new placeholder ─────────────────────────────────────────────────── */
export function AddServiceCard() {
  return (
    <button
      className="flex w-[320px] flex-shrink-0 flex-col items-center justify-center gap-4
        rounded-xl border-2 border-dashed border-slate-300 bg-transparent p-5
        hover:border-[#1313ec] hover:bg-[#1313ec]/5 transition-all group min-h-[340px]"
    >
      <div
        className="flex h-16 w-16 items-center justify-center rounded-full bg-slate-100
          text-slate-400 group-hover:bg-[#1313ec] group-hover:text-white transition-colors"
      >
        <svg
          className="w-7 h-7"
          fill="none"
          stroke="currentColor"
          strokeWidth={2.5}
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
        </svg>
      </div>
      <div className="text-center">
        <p className="text-lg font-bold text-slate-900 group-hover:text-[#1313ec] transition-colors">
          Add New Service
        </p>
        <p className="text-sm text-slate-500 mt-1">
          Create a custom inspection offering
        </p>
      </div>
    </button>
  );
}

/* ─── Empty state ─────────────────────────────────────────────────────────── */
export function EmptyServices() {
  return (
    <div className="flex flex-col items-center justify-center py-20 px-6 text-center">
      <div className="w-20 h-20 rounded-2xl bg-[#1313ec]/10 flex items-center justify-center mb-5">
        <Home className="w-9 h-9 text-[#1313ec]" />
      </div>
      <h3 className="text-xl font-bold text-slate-900 mb-2">No services yet</h3>
      <p className="text-slate-500 max-w-sm mb-6 text-sm leading-relaxed">
        You haven&apos;t created any inspection services. Add your first service to
        start receiving booking requests.
      </p>
      <button
        className="inline-flex items-center gap-2 rounded-lg bg-[#1313ec] px-5 py-2.5
          text-sm font-bold text-white shadow-sm hover:bg-[#1313ec]/90 transition-colors"
      >
        <svg
          className="w-4 h-4"
          fill="none"
          stroke="currentColor"
          strokeWidth={2.5}
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
        </svg>
        Create First Service
      </button>
    </div>
  );
}