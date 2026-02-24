"use client";

import Image from "next/image";
import {
  MapPin,
  Shield,
  BadgeCheck,
  ShieldCheck,
  Share2,
  Link,
  MessageCircle,
  Linkedin,
  AtSign,
  CalendarDays,
} from "lucide-react";

import { useState } from "react";
import { CheckerProfile } from "./types-checker";

interface ProfileHeaderProps {
  checker: CheckerProfile;
}

export function ProfileHeader({ checker }: ProfileHeaderProps) {
  const [copied, setCopied] = useState(false);
  const fullName = `${checker.user.firstName} ${checker.user.lastName}`;
  const location = `${checker.user.city}, ${checker.user.country}`;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <aside className="lg:col-span-4 xl:col-span-3">
      <div className="lg:sticky lg:top-24 flex flex-col gap-4">
        {/* Profile Card */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 flex flex-col items-center text-center relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-28 bg-gradient-to-b from-indigo-50/60 to-white z-0" />

          {/* Avatar */}
          <div className="relative z-10 mb-4">
            <div className="w-28 h-28 rounded-full p-1 bg-white shadow-md ring-2 ring-slate-100">
              {checker.user.avatar ? (
                <img
                  src={checker.user.avatar}
                  alt={`Professional headshot of ${fullName}`}
                  width={112}
                  height={112}
                  className="w-full h-full object-cover rounded-full"
                  
                />
              ) : (
                <div className="w-full h-full rounded-full bg-indigo-100 flex items-center justify-center text-2xl font-bold text-primary">
                  {checker.user.firstName[0]}
                  {checker.user.lastName[0]}
                </div>
              )}
            </div>
            {checker.verificationStatus === "VERIFIED" && (
              <div
                className="absolute bottom-0 right-0 bg-white rounded-full p-1 shadow-sm"
                title="Verified Expert"
              >
                <BadgeCheck className="w-6 h-6 text-emerald-500 fill-emerald-100" />
              </div>
            )}
          </div>

          {/* Name & Title */}
          <div className="z-10 mb-5">
            <h1 className="text-2xl font-bold text-slate-900 leading-tight mb-1">{fullName}</h1>
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-widest mb-2">
              {checker.professionalTitle}
            </p>
            <div className="flex items-center justify-center gap-1 text-sm text-slate-500">
              <MapPin className="w-4 h-4 shrink-0" />
              <span>{checker.coverageAreas.join(' , ')}</span>
            </div>
          </div>

          {/* Primary CTA */}
          <button className="w-full bg-gradient-to-r from-blue-600 to-sky-500 hover:opacity-90 text-white font-bold py-3.5 px-6 rounded-xl shadow-lg shadow-primary/25 transition-all hover:-translate-y-0.5 mb-5 flex items-center justify-center gap-2">
            <CalendarDays className="w-5 h-5" />
            Book Inspection
          </button>

          <div className="w-full h-px bg-slate-100 mb-5" />

          {/* Social Share */}
          <div className="w-full">
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">
              Share Profile
            </p>
            <div className="grid grid-cols-4 gap-2">
              <a
                href="#"
                title="WhatsApp"
                className="flex items-center justify-center aspect-square rounded-lg bg-slate-50 hover:bg-green-50 text-slate-500 hover:text-green-600 transition-colors"
              >
                <MessageCircle className="w-5 h-5" />
              </a>
              <a
                href="#"
                title="LinkedIn"
                className="flex items-center justify-center aspect-square rounded-lg bg-slate-50 hover:bg-blue-50 text-slate-500 hover:text-blue-600 transition-colors"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a
                href="#"
                title="X / Twitter"
                className="flex items-center justify-center aspect-square rounded-lg bg-slate-50 hover:bg-slate-100 text-slate-500 hover:text-slate-900 transition-colors"
              >
                <AtSign className="w-5 h-5" />
              </a>
              <button
                onClick={handleCopyLink}
                title="Copy Link"
                className="flex items-center justify-center aspect-square rounded-lg bg-slate-50 hover:bg-primary/10 text-slate-500 hover:text-primary transition-colors"
              >
                {copied ? (
                  <BadgeCheck className="w-5 h-5 text-emerald-500" />
                ) : (
                  <Link className="w-5 h-5" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Trust Badges */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-4 flex items-center justify-center gap-6">
          <div className="flex flex-col items-center gap-1">
            <Shield className="w-5 h-5 text-slate-400" />
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
              Insured
            </span>
          </div>
          <div className="w-px h-8 bg-slate-100" />
          <div className="flex flex-col items-center gap-1">
            <BadgeCheck className="w-5 h-5 text-slate-400" />
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
              Licensed
            </span>
          </div>
          <div className="w-px h-8 bg-slate-100" />
          <div className="flex flex-col items-center gap-1">
            <ShieldCheck className="w-5 h-5 text-slate-400" />
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
              Vetted
            </span>
          </div>
        </div>
      </div>
    </aside>
  );
}