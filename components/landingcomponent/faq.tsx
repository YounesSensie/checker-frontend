"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    question: "How long does a check take?",
    answer:
      "Typically, a standard check is completed within 24-48 hours. Express options are available for checks within 12 hours.",
  },
  {
    question: "What if the report is negative?",
    answer:
      "If your checker finds significant discrepancies between the listing and reality, you'll receive a full, honest report so you can decide whether to proceed. We also offer a full refund if our service doesn't meet our quality standards.",
  },
  {
    question: "How are checkers vetted?",
    answer:
      "All checkers go through a thorough onboarding process including government ID verification, background checks, and a trial period where their reports are reviewed by our quality team before going live.",
  },
  {
    question: "Is my payment secure?",
    answer:
      "Absolutely. We use industry-standard encryption and your payment is held in escrow until you've confirmed receipt of your report. We partner with trusted payment processors to keep your details safe.",
  },
  {
    question: "Can I request specific photos?",
    answer:
      "Yes! When filling in your request details, you can specify exactly what you want checked — water pressure, noise levels, view from the window, proximity to amenities, and more. You communicate directly with your checker.",
  },
];

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="py-24 bg-white">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <span className="inline-block py-1 px-3 rounded-full bg-[#2cc2a5]/10 text-[#2cc2a5] text-sm font-semibold mb-4">
            FAQ
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-gray-500">Everything you need to know about CheckerIst.</p>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className={`border rounded-xl overflow-hidden transition-all duration-200 ${
                open === index
                  ? "border-[#2cc2a5]/40 shadow-sm"
                  : "border-gray-200"
              }`}
            >
              <button
                className="w-full flex justify-between items-center p-6 text-left bg-[#f8fafc] hover:bg-[#2cc2a5]/5 focus:outline-none transition-colors"
                onClick={() => setOpen(open === index ? null : index)}
              >
                <span className="font-semibold text-gray-900 pr-4">{faq.question}</span>
                <ChevronDown
                  className={`w-5 h-5 text-[#2cc2a5] flex-shrink-0 transition-transform duration-200 ${
                    open === index ? "rotate-180" : ""
                  }`}
                />
              </button>
              {open === index && (
                <div className="px-6 py-5 bg-white text-gray-500 leading-relaxed text-sm border-t border-gray-100">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}