"use client";

import { MapPin } from "lucide-react";

const footerLinks = {
  Company: [{"About":"#about"}, {"Contact":"#contact"}, {"Blog":"/blog"}],
  Support: [{"Help Center":"#faq"}, {"Safety":"/safety"}],
 // Legal: ["Terms of Service", "Privacy Policy"],
};

export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-100 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          {/* Brand */}
            <div className="col-span-2 md:col-span-1">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-[#2cc2a5] rounded-lg flex items-center justify-center">
                  <MapPin className="w-4 h-4 text-white" strokeWidth={2.5} />
                </div>
                <span className="font-bold text-xl text-gray-900">CheckerIst</span>
              </div>
              <p className="text-gray-400 text-sm leading-relaxed">
                Verify real estate and accommodation worldwide with trusted local experts.
              </p>
            </div>

            {/* Links */}
            {Object.entries(footerLinks).map(([category, links]) => (
              <div key={category}>
                <h4 className="font-bold text-gray-900 mb-4 text-sm uppercase tracking-wide">
                  {category}
                </h4>
                <ul className="space-y-2.5">
                  {links.map((link) => (
                    <li key={Object.keys(link)[0]}>
                      <a
                        href={Object.values(link)[0]}
                        className="text-sm text-gray-500 hover:text-[#2cc2a5] transition-colors"
                      >
                        {Object.keys(link)[0]}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
          ))}
        </div>

        <div className="border-t border-gray-100 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-gray-400">
            © 2026 CheckerIst Inc. All rights reserved.
          </p>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-[#2cc2a5] rounded-full animate-pulse" />
            <span className="text-sm text-gray-400">All systems operational</span>
          </div>
        </div>
      </div>
    </footer>
  );
}