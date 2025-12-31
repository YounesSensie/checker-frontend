import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Script from "next/script";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: 'swap', // Add this
  preload: true,    // Add this
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: 'swap', // Add this
  preload: true,    // Add this
});
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <head>
      <meta property="og:type" content="website" />
          <meta property="og:site_name" content="Checkerist" />
         <meta property="og:title" content="Verify Before You Travel — CheckerIst"/>

         <meta property="og:description" content="Get properties verified by trusted local inspectors. Avoid rental scams — book a verification before you arrive."/>

          <meta
            property="og:image"
            content="https://www.checkerist.com/logo-2.png"
             // Replace with your default image URL
          />
          <meta property="og:url" content="https://www.checkerist.com" />
          <link rel="canonical" href="https://www.checkerist.com/" />
        
        <Script
         id=""
         type="application/ld+json"
         dangerouslySetInnerHTML={{
           __html: JSON.stringify({
             "@context": "https://schema.org",
             "@type": "WebSite",
             "name": "Checkerist",
             "alternateName": ["Checkerist", "Checkerist"],
             "url": "https://www.checkerist.com/",
             
           }),
         }}
        />
      </head>
        <main>
        {children}
        </main>
      </body>
    </html>
  );
}
