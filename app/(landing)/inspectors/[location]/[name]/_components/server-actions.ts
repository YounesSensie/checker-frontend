"use server";

import prisma from "@/lib/db";
import { CheckerProfile } from "./types-checker";
import { Prisma } from "@/app/generated/prisma";

const checkerProfileWithRelations = Prisma.validator<Prisma.CheckerProfileDefaultArgs>()({
  include: {
    user: true,
    services: {
      where: { isActive: true },
      orderBy: { price: "asc" },
    },
    certifications: true,
    specialties: true,
    bookings: {
      where: { status: "COMPLETED" },
      include: {
        reviews: {
          where: { isPublic: true },
          include: {
            reviewer: {
              select: {
                firstName: true,
                lastName: true,
                avatar: true,
              },
            },
          },
          take: 3, // max reviews per booking (usually 1)
        },
      },
      orderBy: { completedAt: "desc" },
      take: 20, // fetch last 20 completed bookings to gather reviews from
    },
  },
});

type PrismaCheckerProfile = Prisma.CheckerProfileGetPayload<typeof checkerProfileWithRelations>

function mapToCheckerProfile(res: PrismaCheckerProfile): CheckerProfile {
  // Flatten reviews from all bookings, then sort + limit
  const reviews = res.bookings
    .flatMap((booking) =>
      booking.reviews.map((r) => ({
        id: r.id,
        rating: r.rating,
        title: r.title,
        comment: r.comment,
        communication: r.communication,
        punctuality: r.punctuality,
        quality: r.quality,
        value: r.value,
        isPublic: r.isPublic,
        isVerified: r.isVerified,
        response: r.response,
        createdAt: r.createdAt.toISOString(),
        serviceType: booking.serviceTitle, // from the parent booking
        reviewer: {
          firstName: r.reviewer.firstName,
          lastName: r.reviewer.lastName,
          avatar: r.reviewer.avatar,
        },
      }))
    )
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 10); // keep latest 10

  return {
    id: res.id,
    userId: res.userId,
    businessName: res.businessName,
    professionalTitle: res.professionalTitle,
    description: res.description,
    yearsOfExperience: res.yearsOfExperience,
    status: res.status as CheckerProfile["status"],
    verificationStatus: res.verificationStatus as CheckerProfile["verificationStatus"],
    isAvailable: res.isAvailable,
    responseTime: res.responseTime,
    basePrice: Number(res.basePrice),
    currency: res.currency,
    pricePerHour: res.pricePerHour !== null ? Number(res.pricePerHour) : null,
    totalBookings: res.totalBookings,
    completedBookings: res.completedBookings,
    averageRating: Number(res.averageRating),
    totalReviews: res.totalReviews,
    coverageAreas: res.coverageAreas,
    serviceRadius: res.serviceRadius,

    user: {
      id: res.user.id,
      firstName: res.user.firstName,
      lastName: res.user.lastName,
      avatar: res.user.avatar,
      city: res.user.city,
      country: res.user.country,
      languages: res.user.languages,
    },

    services: res.services.map((s) => ({
      id: s.id,
      name: s.name,
      description: s.description,
      price: Number(s.price),
      duration: s.duration,
      isActive: s.isActive,
      includes: s.includes,
    })),

    certifications: res.certifications.map((c) => ({
      id: c.id,
      name: c.name,
      issuer: c.issuer,
      isVerified: c.isVerified,
    })),

    specialties: res.specialties.map((sp) => ({
      id: sp.id,
      category: sp.category,
      subcategory: sp.subcategory,
      level: sp.level,
    })),

    reviews,
  };
}

export async function getCheckerProfile(id: string): Promise<CheckerProfile | null> {
  try {
    const res = await prisma.checkerProfile.findUnique({
      where: { id },
      ...checkerProfileWithRelations,
    });

    if (!res) return null;

    return mapToCheckerProfile(res);
  } catch (error) {
    console.error("Error fetching checker profile:", error);
    return null;
  }
}