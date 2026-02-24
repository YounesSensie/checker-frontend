import {  CheckCheck, MapPin } from "lucide-react";


// We'll inline the icon since CheckerCircle doesn't exist
import { CheckCircle } from "lucide-react";
import { CheckerProfile } from "./types-checker";

interface PricingCoverageProps {
  checker: CheckerProfile;
}

const currencySymbol: Record<string, string> = {
  EUR: "€",
  USD: "$",
  GBP: "£",
};

export function PricingCoverage({ checker }: PricingCoverageProps) {
  const primaryService = checker.services.find((s) => s.isActive) ?? checker.services[0];
  const symbol = currencySymbol[checker.currency] ?? checker.currency;
  if (!primaryService) {
    return (
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 flex items-center justify-center h-full">
        <span className="text-slate-500 text-sm">No active services available</span>
      </div>
    );
  }
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Pricing Card */}
      <section className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 flex flex-col h-full">
        <div className="mb-4">
          <h2 className="text-lg font-bold text-slate-900">{primaryService.name ?? ""}</h2>
          <p className="text-slate-500 text-sm">{primaryService.description ?? ""}</p>
        </div>

        <div className="mb-6">
          <span className="text-4xl font-extrabold text-primary">
            {symbol}
            {primaryService.price}
          </span>
          <span className="text-slate-400 font-medium"> / visit</span>
        </div>

        <ul className="space-y-3 mb-8 flex-grow">
          {primaryService.includes.map((item, i) => (
            <li key={i} className="flex items-start gap-3 text-sm text-slate-600">
              <CheckCircle className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
              <span>{item}</span>
            </li>
          ))}
        </ul>

        <button className="w-full bg-slate-50 hover:bg-slate-100 text-primary font-bold py-3 px-4 rounded-xl border border-slate-200 transition-colors text-sm">
          View All Pricing
        </button>
      </section>

      {/* Coverage Area */}
      <section className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 flex flex-col h-full">
        <h2 className="text-lg font-bold text-slate-900 mb-4">Coverage Area</h2>

        <div className="relative flex-grow min-h-[200px] rounded-xl overflow-hidden bg-slate-100 group">
          <img
            src={`https://maps.googleapis.com/maps/api/staticmap?center=${checker.user.city},${checker.user.country}&zoom=10&size=600x300&style=feature:all|element:labels|visibility:simplified&style=feature:road|color:0xffffff&style=feature:landscape|color:0xf0f0f0`}
            alt={`Map showing ${checker.user.city} service area`}
            className="w-full h-full object-cover opacity-70 group-hover:scale-105 transition-transform duration-500"
            onError={(e) => {
              // Fallback to a static map image if API fails
              (e.target as HTMLImageElement).src =
                "https://lh3.googleusercontent.com/aida-public/AB6AXuDWo6mTOlf4G_2Ds425PZ9R4aS0cIehcuESNDQ662f77Wh7EhyFBQ-3XqEirnDed2VLEa41V9xF2iBzMFgVrOXdIpmrF6kx0xRTJVwrw_Cw9dTO8_i2lvytA63_wo5aR_d8Y7-Cw62JPo33H2gu2YjixPjOodX0CUkBiTyAMe2zPoxnpyyI1nKVLa7FDGMjkLQ3b7cI5Mbzw6UOyT4g6iGLOYuuKydmo20044ZEmoKJolCw0cng_qn94GxfEZisMsQGR0nlSf7FODQ";
            }}
          />
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
            <div className="bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg flex items-center gap-2">
              <MapPin className="w-4 h-4 text-primary" />
              <span className="text-sm font-bold text-slate-800">
                {checker.user.city} & Suburbs
              </span>
            </div>
          </div>
        </div>

        {/* Coverage tags */}
        <div className="flex flex-wrap gap-2 mt-4">
          {checker.coverageAreas.map((area) => (
            <span
              key={area}
              className="text-xs px-2.5 py-1 bg-slate-50 text-slate-600 rounded-full border border-slate-100 font-medium"
            >
              {area}
            </span>
          ))}
          {checker.serviceRadius && (
            <span className="text-xs px-2.5 py-1 bg-primary/5 text-primary rounded-full border border-primary/10 font-medium">
              Within {checker.serviceRadius}km
            </span>
          )}
        </div>
      </section>
    </div>
  );
}