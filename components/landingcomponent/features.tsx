"use client";

import {
  ShieldCheck,
  Zap,
  Globe,
  Camera,
  Star,
  Handshake,
} from "lucide-react";
import { TruthSlider } from "../trush-sildes-filter";

const features = [
  {
    icon: ShieldCheck,
    color: "blue",
    bg: "bg-blue-50",
    iconColor: "text-blue-600",
    title: "Verified Experts",
    description:
      "Every checker is thoroughly vetted with ID verification and background checks to ensure your safety.",
  },
  {
    icon: Zap,
    color: "orange",
    bg: "bg-orange-50",
    iconColor: "text-orange-500",
    title: "Lightning Fast",
    description:
      "Get reports in as little as 24 hours. Our local network is always ready to mobilize.",
  },
  {
    icon: Globe,
    color: "teal",
    bg: "bg-[#2cc2a5]/10",
    iconColor: "text-[#2cc2a5]",
    title: "Global Coverage",
    description:
      "From Paris to Phuket, our network of checkers spans over 50 countries worldwide.",
  },
  {
    icon: Camera,
    color: "purple",
    bg: "bg-purple-50",
    iconColor: "text-purple-600",
    title: "Visual Proof",
    description:
      "Receive high-resolution photos and videos taken in real-time, just for you.",
  },
  {
    icon: Star,
    color: "rose",
    bg: "bg-rose-50",
    iconColor: "text-rose-500",
    title: "Quality Guarantee",
    description:
      "If the report doesn't match the reality of our standards, we offer a full refund guarantee.",
  },
  {
    icon: Handshake,
    color: "teal",
    bg: "bg-teal-50",
    iconColor: "text-teal-600",
    title: "Personal Touch",
    description:
      "Communicate directly with your checker. Ask specific questions and request specific angles.",
  },
];

export default function Features() {
  return (
    <section id="features" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="inline-block py-1 px-3 rounded-full bg-[#2cc2a5]/10 text-[#2cc2a5] text-sm font-semibold mb-4">
            Why Choose Us
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Why Choose Checkerist?
          </h2>
          <p className="text-lg text-gray-500 max-w-2xl mx-auto">
            We bridge the gap of trust between your booking and your arrival.
          </p>
        </div>
         <div className="grid lg:grid-cols-2 gap-16 items-center mb-10">
          {/* Right Side: Interactive Slider */}
                  <div className="relative">
                    <div className="absolute -inset-4 bg-indigo-500/5 blur-3xl rounded-full" />
                    <TruthSlider
                      filteredImage="/img/scam.png"
                      truthImage="/img/real.jpg"
                    />
                  </div>
                  {/* Left Side: Content */}
                  <div className="max-w-2xl">
                    
        
                    <h2 className="text-2xl md:text-5xl font-bold tracking-tight text-gray-600 leading-[1.1] mb-8">
                      Stop being a{" "}
                      <span className="text-transparent bg-clip-text font-extrabold bg-gradient-to-r from-teal-500 to-teal-300 italic">
                        captive customer
                      </span>{" "}
                      to filtered scams.
                    </h2>
        
                    <p className="text-lg md:text-xl text-slate-600 leading-relaxed mb-10 max-w-lg">
                      We give you the local eyes to find the comfort your soul actually deserves.
                    </p>            
                  </div>
        
                  
                </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <div
                key={feature.title}
                className="group p-8 rounded-2xl bg-[#f8fafc] border border-gray-100 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 cursor-default"
              >
                <div
                  className={`w-14 h-14 rounded-2xl ${feature.bg} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}
                >
                  <Icon className={`w-6 h-6 ${feature.iconColor}`} />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-500 leading-relaxed text-sm">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}