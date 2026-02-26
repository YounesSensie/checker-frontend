"use client";

import { MapPin, FileText, UserCheck, CheckCircle } from "lucide-react";

const steps = [
  {
    number: "01",
    icon: MapPin,
    title: "Choose Destination",
    description:
      "Search for the city where your potential accommodation is located.",
  },
  {
    number: "02",
    icon: FileText,
    title: "Fill Details",
    description:
      "Provide the address and specific things you want checked (WiFi, noise, etc).",
  },
  {
    number: "03",
    icon: UserCheck,
    title: "Connect",
    description:
      "Match with a local expert who accepts your request instantly.",
  },
  {
    number: "04",
    icon: CheckCircle,
    title: "Get Verified Stay",
    description:
      "Receive your detailed report and book with 100% confidence.",
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-24 bg-[#f8fafc]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <span className="inline-block py-1 px-3 rounded-full bg-[#2cc2a5]/10 text-[#2cc2a5] text-sm font-semibold mb-4">
            Simple Process
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            How it Works
          </h2>
          <p className="text-lg text-gray-500">
            Four simple steps to peace of mind.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative">
          {/* Connector line - desktop only */}
          <div className="hidden md:block absolute top-[52px] left-[calc(12.5%+32px)] right-[calc(12.5%+32px)] h-0.5">
            <div className="w-full h-full border-t-2 border-dashed border-[#2cc2a5]/30" />
          </div>

          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div
                key={step.number}
                className="flex flex-col items-center text-center relative"
              >
                {/* Step number badge */}
                <div className="text-5xl font-bold text-[#2cc2a5]/10 mb-3 select-none leading-none">
                  {step.number}
                </div>

                {/* Icon circle */}
                <div className="relative z-10 w-16 h-16 bg-white rounded-full shadow-md flex items-center justify-center mb-6 border-2 border-[#2cc2a5] ring-4 ring-[#2cc2a5]/10">
                  <Icon className="w-6 h-6 text-[#2cc2a5]" />
                </div>

                {/* Content */}
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  {step.title}
                </h3>
                <p className="text-sm text-gray-500 leading-relaxed max-w-[200px]">
                  {step.description}
                </p>

                {/* Mobile arrow */}
                {index < steps.length - 1 && (
                  <div className="md:hidden mt-6 text-[#2cc2a5]/40 text-2xl">↓</div>
                )}
              </div>
            );
          })}
        </div>

        {/* CTA Banner */}
        <div className="mt-16 bg-gradient-to-r from-[#2cc2a5] to-[#1f8a75] rounded-3xl p-10 text-center text-white">
          <h3 className="text-2xl font-bold mb-3">Ready to verify your next stay?</h3>
          <p className="text-white/80 mb-6">Join thousands of travellers who book with confidence.</p>
          <a
            href="#"
            className="inline-flex items-center px-8 py-3.5 bg-white text-[#2cc2a5] font-bold rounded-full hover:bg-gray-50 transition-all shadow-lg"
          >
            Start Your First Check
          </a>
        </div>
      </div>
    </section>
  );
}