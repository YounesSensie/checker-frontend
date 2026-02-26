{/*import React from 'react'
import MainHero from './_component/hero'
import FeaturesComp from './_component/feautures'
import AddBanner from './_component/add-banner'
import Footer from './_component/footer'
import ContactForm from './_component/contact/new-contcatfile'
import { getSession } from '@/auth'
import { redirect } from 'next/navigation'
import FeaturesSection from './_component/recomanded-hotel'
import AboutUsSection from './_component/aboutus/about-us'
import { Metadata } from 'next'
import prisma from '@/lib/db'
import PopularCheckers from './_component/popularchecker'

export const metadata: Metadata = {
  title: "Is Airbnb Legit? Verified Rentals by Local Experts | CheckerIst",
  description: "Avoid rental scams! Get your Airbnb or vacation rental verified by local experts before you book. Safe, secure, and trusted by travelers worldwide.",
  icons:{
    icon: [
      {
        url:"/img/logo1.png",
        href:"/img/logo1.png",
        sizes: "32x32" 
      }
    ]
  }
};
const HomePage = async() => {
  const session = await getSession()
    if(session && session.user.id && session.user.role){
      redirect(`/${session.user.role.toLocaleLowerCase()}`)
    }
    // Fetch top-rated, approved checkers for the popular section
  const checkerList = await prisma.checkerProfile.findMany({
    where: {
      status: "APPROVED",
      
    },
    orderBy: [
      { averageRating: "desc" },
      { totalReviews: "desc" },
    ],
    take: 12,
    select: {
      id: true,
      userId: true,
      professionalTitle: true,
      description: true,
      businessCity: true,
      businessCountry: true,
      averageRating: true,
      totalReviews: true,
      status: true,
      user: {
        select: {
          firstName: true,
          lastName: true,
          avatar: true,
        },
      },
    },
  })

  // Serialize Decimal fields to plain numbers for client component
  const serializedCheckers = checkerList.map((c) => ({
    ...c,
    averageRating: Number(c.averageRating),
  }))

  return (
    <div className=' h-full'>
   
      <MainHero/>
      
      <FeaturesComp/>
     
       <PopularCheckers checkers={serializedCheckers} />

      <AddBanner />
      <FeaturesSection/>
      <AboutUsSection/>
      <ContactForm/>
      <Footer />
    </div>
  )
}

export default HomePage */}
import Features from "@/components/landingcomponent/features";
import Hero from "@/components/landingcomponent/hero";
import HowItWorks from "@/components/landingcomponent/howit-work";
import type { Metadata } from "next";
import PopularCheckers from "./_component/popularchecker";
import { getSession } from "@/auth";
import { redirect } from "next/navigation";
import prisma from "@/lib/db";
import About from "@/components/landingcomponent/about";
import FAQ from "@/components/landingcomponent/faq";
import Contact from "@/components/landingcomponent/contact";
import Footer from "@/components/landingcomponent/footer";



export const metadata: Metadata = {
  // ── Primary title — brand + main keyword + value prop (≤60 chars recommended)
  title: "Verify Accommodation & Travel Bookings Before You Arrive | CheckerIst",

  // ── Meta description — natural, action-driven, ≤160 chars, includes top keywords
  description:
    "CheckerIst sends local experts to inspect your hotel, Airbnb, or rental before you travel. Secure your booking, verify real room photos, and make every flight & trip 100% worth it.",

  // ── Keyword set — long-tail + commercial-intent phrases Google users actually type
  keywords: [
    // Core service
    "verify hotel before booking",
    "hotel room verification service",
    "accommodation verification",
    "is my Airbnb legit",
    "rental property inspection",
    // Travel intent
    "travel booking verification",
    "safe hotel booking",
    "verified travel accommodation",
    "hotel booking scam prevention",
    "real hotel room photos",
    // Destination + product verticals
    "hotel reservation check",
    "car rental area inspection",
    "flight destination hotel check",
    "verify vacation rental",
    "Airbnb inspection service",
    // Brand
    "CheckerIst",
    "local hotel inspector",
    "trusted travel experts",
    // Long-tail high-intent
    "how to verify hotel before travel",
    "check hotel room before booking",
    "is hotel listing real",
    "travel accommodation inspector",
    "verify booking before flying",
  ],

  // ── Canonical & locale
  metadataBase: new URL("https://www.checkerist.com"),
  alternates: {
    canonical: "/",
    languages: {
      "en-US": "/",
      "en-GB": "/en-gb",
    },
  },

  // ── Authorship & publisher
  authors: [{ name: "CheckerIst Inc.", url: "https://www.checkerist.com" }],
  creator: "CheckerIst Inc.",
  publisher: "CheckerIst Inc.",

  // ── Open Graph — social sharing (Facebook, LinkedIn, WhatsApp)
  openGraph: {
    title: "Book with Confidence — Get Real Photos of Places Before You Reserve",
    description:
      "Don't let a misleading hotel listing ruin your trip. CheckerIst local experts physically inspect hotels, rentals & accommodations so your booking is 100% real. Trusted by 2,000+ travelers monthly across 50+ countries.",
    url: "https://www.checkerist.com",
    siteName: "CheckerIst",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "/img/back.avif",
        width: 900,
        height: 630,
        alt: "CheckerIst — Verified hotel and travel accommodation inspection service",
      },
    ],
  },

  // ── Twitter / X card
  twitter: {
    card: "summary_large_image",
    site: "@checkerist",
    creator: "@checkerist",
    title: "Book with Confidence — Get Real Photos of Places Before You Reserve",
    description:
      "Local experts inspect your hotel, Airbnb or rental before you confirm your booking. Real photos, honest reports, zero surprises. 31k+ verified properties.",
    images: ["/img/back.avif"],
  },

  // ── Robots — full crawl and indexing
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  // ── App / PWA
  applicationName: "CheckerIst",
  category: "Travel & Accommodations",

  // ── Verification placeholders (fill in from Google Search Console / Bing Webmaster)
  verification: {
    google: "REPLACE_WITH_GOOGLE_SITE_VERIFICATION_TOKEN",
    yandex: "REPLACE_WITH_YANDEX_TOKEN",
    other: {
      "msvalidate.01": "REPLACE_WITH_BING_VERIFICATION_TOKEN",
    },
  },
};

export  default async function Page() {
  const session = await getSession()
    if(session && session.user.id && session.user.role){
      redirect(`/${session.user.role.toLocaleLowerCase()}`)
    }
    // Fetch top-rated, approved checkers for the popular section
  const checkerList = await prisma.checkerProfile.findMany({
    where: {
      status: "APPROVED",
      
    },
    orderBy: [
      { averageRating: "desc" },
      { totalReviews: "desc" },
    ],
    take: 12,
    select: {
      id: true,
      userId: true,
      professionalTitle: true,
      description: true,
      businessCity: true,
      businessCountry: true,
      averageRating: true,
      totalReviews: true,
      status: true,
      user: {
        select: {
          firstName: true,
          lastName: true,
          avatar: true,
        },
      },
    },
  })

  // Serialize Decimal fields to plain numbers for client component
  const serializedCheckers = checkerList.map((c) => ({
    ...c,
    averageRating: Number(c.averageRating),
  }))
  return (
    <main className="min-h-screen bg-[#f8fafc]">
      <Hero />
      <Features />
      <HowItWorks />
      <PopularCheckers checkers={serializedCheckers} />
      <About />
      <FAQ />
      <Contact />
      <Footer />
    </main>
  );
}