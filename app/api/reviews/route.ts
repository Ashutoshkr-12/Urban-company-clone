import { prisma } from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const user = await currentUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const {  serviceId, rating, comment } = await req.json();

  if (!serviceId || !rating) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }



  // Add review
  const review = await prisma.review.create({
    data: {
      userId: user.id,
      serviceId,
      rating,
      comment,
    },
  });

  return NextResponse.json({ success: true, data: review });
}

export async function GET(req: Request, { params }: { params: { serviceId: string } }) {
  const reviews = await prisma.review.findMany({
    where: { serviceId: params.serviceId },
    include: { user: true },
  });

  return NextResponse.json({ success: true, data: reviews });
}
