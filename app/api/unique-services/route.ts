import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { id } = await req.json();

    if (!id) {
      return NextResponse.json(
        { success: false, error: "Service ID missing" },
        { status: 400 }
      );
    }

    const service = await prisma.service.findUnique({
      where: { id },
      include: { reviews:{
        include: {
          user: true
        }
      } },
    });

    if (!service) {
      return NextResponse.json({ success: false, error: "Service not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, data: service }, { status: 200 });

  } catch (error) {
    console.error("SERVICE DETAIL ERROR:", error);
    return NextResponse.json(
      { success: false, error: "Server error" },
      { status: 500 }
    );
  }
}
