import { ServiceSchema } from "@/app/(dashboard)/checker/services/_components/types-services";
import prisma from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
 
    const validation = ServiceSchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json(
        {
          success: false,
          errors: validation.error.format(),
        },
        { status: 400 },
      );
    }
 
    const service = await prisma.checkerService.create({
      data: {
        checkerId: validation.data.checkerId,
        name: validation.data.name,
        description: validation.data.description,
        price: validation.data.price,
        duration: validation.data.duration,
        includes: validation.data.includes,
        requirements: validation.data.requirements,
        isActive: true,
      },
    });
 
    return NextResponse.json({ success: true, service }, { status: 201 });
  } catch (error) {
    console.error("API_ERROR_CREATE_SERVICE:", error);
    return NextResponse.json(
      { success: false, error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
 