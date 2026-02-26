"use client";

import { CalendarDays } from "lucide-react";

interface MobileCTAProps {
  price: number;
  currency: string;
  checkerName: string;
}

const currencySymbol: Record<string, string> = {
  EUR: "€",
  USD: "$",
  GBP: "£",
};

export function MobileCTA({ price, currency, checkerName }: MobileCTAProps) {
  const symbol = currencySymbol[currency] ?? currency;

  return (
    <div className="fixed bottom-0 left-0 w-full bg-white border-t border-slate-200 p-4 lg:hidden z-40 shadow-[0_-4px_16px_rgba(0,0,0,0.06)]">
      <div className="flex items-center gap-4 max-w-lg mx-auto">
        <div className="flex flex-col">
          <span className="text-xs text-slate-500 font-medium">Starting from</span>
          <span className="text-lg font-bold text-slate-900">
            {symbol}
            {price}
          </span>
        </div>
        <button className="flex-1 bg-primary hover:bg-primary-light text-white font-bold py-3 px-4 rounded-xl shadow-lg shadow-primary/25 flex items-center justify-center gap-2 transition-colors">
          <CalendarDays className="w-5 h-5" />
          Book {checkerName}
        </button>
      </div>
    </div>
  );
}