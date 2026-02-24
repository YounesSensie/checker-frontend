// Mirrors your Prisma schema exactly — no invented fields

export interface CheckerProfileUser {
  id: string;
  firstName: string;
  lastName: string;
  avatar: string | null;
  city: string | null;
  country: string | null;
  languages: string[];
}

export interface CheckerService {
  id: string;
  name: string;
  description: string;
  price: number;          // converted from Prisma Decimal
  duration: number;       // minutes
  includes: string[];
  isActive: boolean;
}

export interface CheckerCertification {
  id: string;
  name: string;
  issuer: string;
  isVerified: boolean;
}

export interface CheckerSpecialty {
  id: string;
  category: string;
  subcategory: string | null;
  level: string;
}

export interface CheckerReview {
  id: string;
  rating: number;
  title: string | null;
  comment: string;
  communication: number | null;
  punctuality: number | null;
  quality: number | null;
  value: number | null;
  isPublic: boolean;
  isVerified: boolean;
  response: string | null;
  createdAt: string;            // ISO string (serializable for client)
  serviceType: string | null;   // from booking.serviceTitle
  reviewer: {
    firstName: string;
    lastName: string;
    avatar: string | null;
  };
}

export interface CheckerProfile {
  id: string;
  userId: string;
  // Professional Info
  businessName: string | null;
  professionalTitle: string;
  description: string;
  yearsOfExperience: number;
  // Verification
  status: "PENDING" | "APPROVED" | "REJECTED" | "SUSPENDED";
  verificationStatus: "PENDING" | "VERIFIED" | "REJECTED";
  // Service Areas
  serviceRadius: number | null;
  coverageAreas: string[];
  // Availability
  isAvailable: boolean;
  responseTime: string | null;
  // Pricing
  basePrice: number;
  currency: string;
  pricePerHour: number | null;
  // Statistics
  totalBookings: number;
  completedBookings: number;
  averageRating: number;
  totalReviews: number;
  // Relations
  user: CheckerProfileUser;
  services: CheckerService[];
  certifications: CheckerCertification[];
  specialties: CheckerSpecialty[];
  reviews: CheckerReview[];
}
export const LANGUAGE_MAP: Record<string, { label: string; flag: string }> = {
  fr: { label: "French", flag: "🇫🇷" },
  en: { label: "English", flag: "🇬🇧" },
  es: { label: "Spanish", flag: "🇪🇸" },
  de: { label: "German", flag: "🇩🇪" },
  ar: { label: "Arabic", flag: "🇸🇦" },
  zh: { label: "Chinese", flag: "🇨🇳" },
  pt: { label: "Portuguese", flag: "🇵🇹" },
  it: { label: "Italian", flag: "🇮🇹" },
};

export const LANGUAGE_LEVEL: Record<string, string> = {
  fr: "Native",
  en: "Fluent",
  es: "Conversational",
};
export function slugify(text: string): string {
  return text
    .normalize("NFD")                    // decompose accents: "é" → "e" + combining accent
    .replace(/[\u0300-\u036f]/g, "")     // strip the combining accent characters
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")       // remove anything not alphanumeric, space, or hyphen
    .replace(/\s+/g, "-")               // spaces → hyphens
    .replace(/-+/g, "-");               // collapse multiple hyphens into one
}

/**
 * Reverses a slug back to a readable display label
 * "paris-france"    → "Paris France"
 * "ile-de-france"   → "Ile De France"  (best effort — accents can't be recovered)
 */
export function unslugify(slug: string): string {
  return slug
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}