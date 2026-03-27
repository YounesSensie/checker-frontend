"use client";

import { DialogServiceAdd } from "./DialogServiceadd";
import { AddServiceCard, EmptyServices, ServiceCard } from "./serviceCard";
import { CheckerService } from "./types-services";



interface ServicesListProps {
  services: CheckerService[];
  checkerId: string;
}
 
export function ServicesList({ services, checkerId }: ServicesListProps) {
  return (
    <section className="flex flex-col gap-5">
      {/* Section header */}
      <div className="flex items-end justify-between">
        <div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
            Service Management
          </h1>
          <p className="text-slate-500 mt-1 text-sm">
            Manage your inspection offerings and service details.
          </p>
        </div>
        <a
          href="#"
          className="hidden md:flex items-center gap-1 text-sm font-semibold text-[#1313ec] hover:text-[#1313ec]/80 transition-colors"
        >
          View Analytics
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </a>
      </div>
 
      {/* Cards or empty state */}
      {services.length === 0 ? (
        // Empty state: show illustration + the add-new card below it
        <div className="flex flex-col gap-6">
          <EmptyServices />
          <div className="w-full overflow-x-auto no-scrollbar pb-4">
            <div className="flex gap-5 w-max">
              <DialogServiceAdd checkerId={checkerId} />
            </div>
          </div>
        </div>
      ) : (
        <div className="w-full overflow-x-auto no-scrollbar pb-4 -mx-4 px-4 md:mx-0 md:px-0">
          <div className="flex gap-5 w-max">
            {services.map((svc) => (
              <ServiceCard key={svc.id} service={svc} />
            ))}
            {/* Add-new trigger sits inline in the card row */}
            <DialogServiceAdd checkerId={checkerId} />
          </div>
        </div>
      )}
    </section>
  );
}
 
/* ─── Skeleton loader ────────────────────────────────────────────────────── */
export function ServicesListSkeleton() {
  return (
    <section className="flex flex-col gap-5">
      <div className="flex items-end justify-between">
        <div className="space-y-2">
          <div className="h-8 w-64 rounded-lg bg-gradient-to-r from-slate-200 via-slate-100 to-slate-200 animate-pulse" />
          <div className="h-4 w-44 rounded-lg bg-gradient-to-r from-slate-200 via-slate-100 to-slate-200 animate-pulse" />
        </div>
      </div>
      <div className="flex gap-5 overflow-hidden pb-4">
        {[0, 1].map((i) => (
          <div
            key={i}
            className="w-[320px] flex-shrink-0 h-[340px] rounded-xl bg-gradient-to-br from-slate-100 via-slate-50 to-slate-100 animate-pulse border border-slate-100"
          />
        ))}
      </div>
    </section>
  );
}