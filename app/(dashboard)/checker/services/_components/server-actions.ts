"use server"

import prisma from "@/lib/db";
import { Booking, BookingFilter, BookingStatus, CheckerService } from "./types-services";

export async function getCheckerServices(checkerId: string) {
  try {
    const rows = await prisma.checkerService.findMany({
      where: { checkerId },
      orderBy: { createdAt: "desc" },
    });
    // Serialise Decimal → number and Date → ISO string.
    // This is what eliminates the "Date not assignable to string" TS error.
    return rows.map((row) => ({
      ...row,
      price: row.price.toNumber(),
      createdAt: row.createdAt.toISOString(),
      updatedAt: row.updatedAt.toISOString(),
    }));
  } catch {
    return [];
  }
}

const ACTIVE_STATUSES: BookingStatus[] = [
  "PENDING",
  "CONFIRMED",
  "IN_PROGRESS",
];
 
/**
 * Fetch active bookings, optionally filtered by status.
 * @param checkerId  - the authenticated checker's id
 * @param filter     - "ALL" | "PENDING" | "CONFIRMED"
 */
export async function getCheckerBookings(
  checkerId: string,
  filter: BookingFilter = "ALL"
) {
  let statuses: BookingStatus[];
  if (filter === "PENDING") {
    statuses = ["PENDING"];
  } else if (filter === "CONFIRMED") {
    statuses = ["CONFIRMED", "IN_PROGRESS"];
  } else {
    statuses = ACTIVE_STATUSES;
  }
 
  try {
    const rows = await prisma.booking.findMany({
      where: { checkerId, status: { in: statuses } },
      include: {
        user: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true,
            avatar: true,
          },
        },
      },
      orderBy: { scheduledDate: "asc" },
    });
 
    return rows.map((r) => ({
      ...r,
      basePrice: r.basePrice.toNumber(),
      totalAmount: r.totalAmount.toNumber(),
      platformFee: r.platformFee.toNumber(),
      checkerEarnings: r.checkerEarnings.toNumber(),
      discountAmount: r.discountAmount.toNumber(),
      scheduledDate: r.scheduledDate.toISOString(),
      confirmedAt: r.confirmedAt?.toISOString() ?? null,
      startedAt: r.startedAt?.toISOString() ?? null,
      completedAt: r.completedAt?.toISOString() ?? null,
      cancelledAt: r.cancelledAt?.toISOString() ?? null,
      createdAt: r.createdAt.toISOString(),
      updatedAt: r.updatedAt.toISOString(),
    }));
  } catch {
    return [];
  }
}
 