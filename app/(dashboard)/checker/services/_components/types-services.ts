// ============================================================================
// TYPES — derived from Prisma schema
// ============================================================================

import z from "zod";

export type BookingStatus =
  | "PENDING"
  | "CONFIRMED"
  | "IN_PROGRESS"
  | "COMPLETED"
  | "CANCELLED"
  | "DISPUTED";

export type PaymentStatus =
  | "PENDING"
  | "PROCESSING"
  | "COMPLETED"
  | "FAILED"
  | "REFUNDED"
  | "PARTIALLY_REFUNDED";

// Prisma returns Date objects; server actions serialise them to ISO strings.
// Accepting both makes the type compatible with both raw Prisma rows and
// serialised network responses without a cast.
type DateOrString = Date | string;

export interface CheckerService {
  id: string;
  checkerId: string;
  name: string;
  description: string;
  /** Serialised from Prisma Decimal — always a plain number after mapping */
  price: number;
  duration: number; // minutes
  isActive: boolean;
  includes: string[];
  requirements: string[];
  createdAt: DateOrString;
  updatedAt: DateOrString;
}

export interface Booking {
  id: string;
  bookingNumber: string;
  userId: string;
  checkerId: string;
  serviceId?: string | null;
  status: BookingStatus;
  scheduledDate: DateOrString;
  scheduledTime: string; // "14:00"
  duration: number;
  location: string;
  coordinates?: { lat: number; lng: number } | null;
  basePrice: number;
  additionalFees?: { name: string; amount: number }[] | null;
  discountAmount: number;
  totalAmount: number;
  currency: string;
  platformFee: number;
  checkerEarnings: number;
  serviceTitle: string;
  serviceDescription: string;
  specialRequests?: string | null;
  confirmedAt?: DateOrString | null;
  startedAt?: DateOrString | null;
  completedAt?: DateOrString | null;
  cancelledAt?: DateOrString | null;
  cancellationReason?: string | null;
  notes?: string | null;
  createdAt: DateOrString;
  updatedAt: DateOrString;
  // Populated relation — matches the Prisma select shape in server actions
  user?: {
    id: string;
    firstName?: string | null;
    lastName?: string | null;
    email?: string | null;
    avatar?: string | null;
  } | null;
}

export type BookingFilter = "ALL" | "PENDING" | "CONFIRMED";
// lib/validations/service.ts


export const ServiceSchema = z.object({
  checkerId: z.string().min(1, "Checker ID is required"),
  name: z.string().min(3, "Name must be at least 3 characters"),
  description: z.string().min(10, "Description is too short"),
  price: z.number().positive("Price must be positive"),
  duration: z.number().int().positive("Duration must be a positive integer"),
  includes: z
    .array(z.string().min(1, "Item cannot be empty"))
    .min(1, "At least one item is required"),
  requirements: z.array(z.string()).optional().default([]),
});

export type ServiceFormValues = z.infer<typeof ServiceSchema>;