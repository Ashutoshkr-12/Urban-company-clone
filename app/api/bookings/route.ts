import { prisma } from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const user = await currentUser();
    if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const body = await req.json();
    const { serviceId, date, amount, addressId } = body;

    if (!serviceId || !date || !amount || !addressId) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const booking = await prisma.booking.create({
      data: {
        userId: user.id,
        serviceId,
        date: new Date(date),
        amount,
        addressId,
        status: "PENDING",
      },
    });

    return NextResponse.json({ success: true, data: booking });
  } catch (error) {
    console.error("Booking error:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

export async function GET() {
  const user = await currentUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const bookings = await prisma.booking.findMany({
    where: { userId: user.id },
    include: {
      service: true,
      address: true,
    },
  });

  return NextResponse.json({ success: true, data: bookings });
}
