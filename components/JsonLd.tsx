// app/components/JsonLd.tsx
// Drop this component inside your page.tsx <main> — it injects structured data
// that Google, ChatGPT, Perplexity & Gemini parse to understand your service.

export default function JsonLd() {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "CheckerIst",
    url: "https://www.checkerist.com",
    logo: "https://www.checkerist.com/img/logo1.png",
    description:
      "CheckerIst is a global accommodation verification platform. Local experts physically inspect hotels, Airbnb rentals, and travel accommodations before you confirm your booking.",
    foundingDate: "2025",
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+216-55569957",
      contactType: "customer support",
      email: "contact@checkerist.com",
      availableLanguage: ["English", "French", "Arabic"],
    },
    sameAs: [
      "https://www.linkedin.com/company/checkerist",
    ],
  };

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: "Hotel & Accommodation Verification",
    name: "CheckerIst — Accommodation & Travel Booking Verification",
    description:
      "Before you travel, CheckerIst sends a vetted local expert to physically inspect your hotel, Airbnb, vacation rental, or travel accommodation. You receive real photos, video proof, and a detailed honest report — so your booking matches reality.",
    provider: {
      "@type": "Organization",
      name: "CheckerIst",
      url: "https://www.checkerist.com",
    },
    areaServed: {
      "@type": "Place",
      name: "Worldwide",
    },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Verification Plans",
      itemListElement: [
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Standard Hotel Verification",
            description:
              "A local CheckerIst expert visits your hotel or rental within 24–48 hours and delivers a full photo and written report.",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Express Verification",
            description:
              "Priority inspection delivered within 12 hours for last-minute travel bookings.",
          },
        },
      ],
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.9",
      reviewCount: "2148",
      bestRating: "5",
      worstRating: "1",
    },
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "How do I verify a hotel before booking?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "With CheckerIst, you submit the hotel address and your specific requirements. A vetted local expert visits the property and sends you real-time photos, video, and a written report — all before you confirm your reservation.",
        },
      },
      {
        "@type": "Question",
        name: "Can CheckerIst verify Airbnb and vacation rentals?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes. CheckerIst verifies hotels, Airbnb listings, vacation rentals, apartments, and any travel accommodation in 50+ countries.",
        },
      },
      {
        "@type": "Question",
        name: "How long does a hotel inspection take?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Standard verification reports are delivered within 24–48 hours. Express 12-hour checks are available for urgent travel bookings.",
        },
      },
      {
        "@type": "Question",
        name: "Is CheckerIst available worldwide?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "CheckerIst operates in 50+ countries with a network of 6,000+ verified local expert checkers covering hotels and accommodations globally.",
        },
      },
      {
        "@type": "Question",
        name: "What if the hotel doesn't match the booking photos?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "If your checker's report reveals the accommodation doesn't match the listing, CheckerIst offers a full refund and helps you find a verified alternative before you travel.",
        },
      },
      {
        "@type": "Question",
        name: "Does CheckerIst check car rental locations and neighborhoods?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes. You can request checkers to inspect car rental pickup areas, neighborhood safety, proximity to transport, and any specific detail relevant to your trip.",
        },
      },
    ],
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "CheckerIst",
    url: "https://www.checkerist.com",
    description:
      "Verify hotels, Airbnb rentals, and travel accommodations before you book. Local experts inspect real rooms and report back — so your booking is 100% what you expect.",
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: "https://www.checkerist.com/check?q={search_term_string}",
      },
      "query-input": "required name=search_term_string",
    },
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://www.checkerist.com",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Find Verified Hotel Checkers",
        item: "https://www.checkerist.com/check",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: "Become an Expert Checker",
        item: "https://www.checkerist.com/become-checker",
      },
    ],
  };

  const schemas = [
    organizationSchema,
    serviceSchema,
    faqSchema,
    websiteSchema,
    breadcrumbSchema,
  ];

  return (
    <>
      {schemas.map((schema, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
    </>
  );
}